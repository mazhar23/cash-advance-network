import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const AdminClients = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [expiryDays, setExpiryDays] = useState("30");
  const [pageType, setPageType] = useState("lendingclub-apply");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [clients, setClients] = useState<any[]>([]);
  const [isLoadingClients, setIsLoadingClients] = useState(true);
  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  // Fetch all clients when component mounts
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      console.log('🔵 Fetching all clients from database...');
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('🔵 Fetch response - data:', data);
      console.log('🔵 Fetch response - error:', error);

      if (error) {
        console.error('❌ Error fetching clients:', error);
      } else {
        console.log(`✅ Found ${data?.length || 0} clients in database`);
        setClients(data || []);
      }
    } catch (err) {
      console.error('❌ Exception fetching clients:', err);
    } finally {
      setIsLoadingClients(false);
    }
  };

  const handleDeactivate = async (clientId: string) => {
    if (!window.confirm("Are you sure you want to deactivate this client's token link?")) return;

    setDeactivatingId(clientId);
    try {
      const { error } = await supabase
        .from('clients')
        .update({ is_active: false })
        .eq('id', clientId);

      if (error) {
        throw error;
      }

      console.log(`✅ Client ${clientId} deactivated successfully`);
      // Update local state without re-fetching all
      setClients(clients.map(c => 
        c.id === clientId ? { ...c, is_active: false } : c
      ));
      alert("Client deactivated successfully!");
    } catch (err: any) {
      console.error('❌ Error deactivating client:', err);
      alert(`Failed to deactivate client: ${err.message}`);
    } finally {
      setDeactivatingId(null);
    }
  };

  const generateToken = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const token = generateToken();
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + parseInt(expiryDays));

      console.log('🔵 Creating client with token:', token);
      console.log('🔵 Token expiry:', expiry.toISOString());
      console.log('🔵 Client data:', { name, email, access_token: token, token_expiry: expiry.toISOString(), is_active: true });

      const { data, error } = await supabase
        .from('clients')
        .insert({
          name,
          email,
          access_token: token,
          token_expiry: expiry.toISOString(),
          is_active: true
        })
        .select();

      console.log('🔵 Supabase response - data:', data);
      console.log('🔵 Supabase response - error:', error);

      if (error) {
        console.error('❌ Supabase error:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        console.error('❌ No data returned from Supabase insert');
        throw new Error('No data returned from insert operation');
      }

      console.log('✅ Client created successfully:', data);

      const accessUrl = `${window.location.origin}/${pageType}?token=${token}`;

      // Send email via API
      let emailStatus = '📧 Sending email...';
      setMessage(`✅ Client added locally! ${emailStatus}`);

      try {
        const emailResponse = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            name,
            accessUrl
          }),
        });

        const emailResult = await emailResponse.json();

        if (emailResponse.ok) {
          emailStatus = '✅ Email sent successfully!';
          console.log('✅ Email sent:', emailResult);
        } else {
          emailStatus = `⚠️ Email failed: ${emailResult.error}`;
          console.error('❌ Email failed:', emailResult);
        }
      } catch (emailErr) {
        console.error('❌ Email fetch error:', emailErr);
        emailStatus = '⚠️ Email failed to send (network error)';
      }

      setMessage(`✅ Client added successfully!\n\n${emailStatus}\n\n🔗 Access URL:\n${accessUrl}`);

      // Clear form
      setName("");
      setEmail("");
      setExpiryDays("30");
      fetchClients(); // Refresh the list
    } catch (err: any) {
      console.error('❌ Error adding client:', err);
      setMessage(`❌ Failed to add client: ${err.message || 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#1a1a1a',
          marginBottom: '2rem',
          fontSize: '1.875rem',
          fontWeight: '700'
        }}>
          Admin - Manage Clients
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label htmlFor="name" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#374151'
            }}>
              Client Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <div>
            <label htmlFor="email" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#374151'
            }}>
              Client Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <div>
            <label htmlFor="pageType" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
              Landing Page
            </label>
            <select
              id="pageType"
              value={pageType}
              onChange={(e) => setPageType(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }}
            >
              <option value="lendingclub-apply">🏦 LendingClub Style Page</option>
              <option value="advanceamerica-apply">🇺🇸 Advance America Style Page</option>
              <option value="prosper-apply">🤝 Prosper Style Page</option>
              <option value="standalone-apply">📋 Standard Apply Page</option>
            </select>
          </div>

          <div>
            <label htmlFor="expiryDays" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#374151'
            }}>
              Token Expiry Duration
            </label>
            <select
              id="expiryDays"
              value={expiryDays}
              onChange={(e) => setExpiryDays(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem',
                backgroundColor: 'white',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="3">3 Days</option>
              <option value="5">5 Days</option>
              <option value="7">7 Days</option>
              <option value="15">15 Days</option>
              <option value="30">30 Days</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '0.875rem',
              backgroundColor: isSubmitting ? '#9ca3af' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) e.currentTarget.style.backgroundColor = '#1d4ed8';
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) e.currentTarget.style.backgroundColor = '#2563eb';
            }}
          >
            {isSubmitting ? "Adding..." : "Add Client"}
          </button>

          {message && (
            <div style={{
              padding: '1rem',
              borderRadius: '8px',
              backgroundColor: message.includes('✅') ? '#f0fdf4' : '#fef2f2',
              border: `1px solid ${message.includes('✅') ? '#86efac' : '#fca5a5'}`
            }}>
              <p style={{
                fontSize: '0.875rem',
                whiteSpace: 'pre-line',
                color: message.includes('✅') ? '#15803d' : '#b91c1c',
                margin: 0
              }}>
                {message}
              </p>
              {message.includes('✅') && (
                <button
                  type="button"
                  onClick={() => {
                    const urlMatch = message.match(/(https?:\/\/[^\s]+)/);
                    if (urlMatch) {
                      navigator.clipboard.writeText(urlMatch[0]);
                      alert('URL copied to clipboard!');
                    }
                  }}
                  style={{
                    marginTop: '0.75rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Copy URL to Clipboard
                </button>
              )}
            </div>
          )}
        </form>

        <div style={{ marginTop: '3rem', borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1a1a1a' }}>Existing Clients</h2>
          {isLoadingClients ? (
            <p>Loading clients...</p>
          ) : clients.length === 0 ? (
            <p>No clients found.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {clients.map((client) => (
                <div key={client.id} style={{
                  padding: '1rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '6px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '600' }}>{client.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.875rem', color: client.is_active ? 'green' : 'red', fontWeight: '500' }}>
                        {client.is_active ? 'Active' : 'Inactive'}
                      </span>
                      {client.is_active && (
                        <button
                          onClick={() => handleDeactivate(client.id)}
                          disabled={deactivatingId === client.id}
                          style={{
                            padding: '0.25rem 0.75rem',
                            fontSize: '0.75rem',
                            backgroundColor: deactivatingId === client.id ? '#fca5a5' : '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: deactivatingId === client.id ? 'not-allowed' : 'pointer',
                            fontWeight: '600',
                            transition: 'background-color 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            if (deactivatingId !== client.id) e.currentTarget.style.backgroundColor = '#dc2626';
                          }}
                          onMouseLeave={(e) => {
                            if (deactivatingId !== client.id) e.currentTarget.style.backgroundColor = '#ef4444';
                          }}
                        >
                          {deactivatingId === client.id ? 'Deactivating...' : 'Deactivate'}
                        </button>
                      )}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>{client.email}</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    Expires: {new Date(client.token_expiry).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminClients;