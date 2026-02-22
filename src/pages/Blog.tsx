import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Understanding Payday Loans: What You Need to Know Before Borrowing",
    excerpt: "Payday loans can be a lifeline in emergencies, but it's important to understand how they work. Learn about interest rates, repayment terms, and when a payday loan might be the right choice.",
    author: "Financial Team",
    date: "January 3, 2026",
    category: "Payday Loans",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400"
  },
  {
    id: 2,
    title: "5 Strategies to Improve Your Credit Score in 2026",
    excerpt: "Your credit score affects everything from loan approvals to interest rates. Discover proven strategies to boost your score and improve your financial health this year.",
    author: "Credit Expert",
    date: "January 2, 2026",
    category: "Credit Tips",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400"
  },
  {
    id: 3,
    title: "Debt Consolidation: Is It Right for You?",
    excerpt: "Struggling with multiple debt payments? Learn how debt consolidation works, its benefits and drawbacks, and whether it could help simplify your finances.",
    author: "Debt Specialist",
    date: "December 28, 2025",
    category: "Debt Consolidation",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400"
  },
  {
    id: 4,
    title: "Emergency Fund 101: How Much Should You Save?",
    excerpt: "An emergency fund can help you avoid high-interest loans when unexpected expenses arise. Learn how much to save and the best strategies to build your safety net.",
    author: "Financial Team",
    date: "December 22, 2025",
    category: "Financial Tips",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400"
  },
  {
    id: 5,
    title: "Personal Loans vs. Credit Cards: Which Is Better for Large Purchases?",
    excerpt: "When making a big purchase, should you use a personal loan or credit card? We break down the pros and cons of each option to help you decide.",
    author: "Loan Expert",
    date: "December 18, 2025",
    category: "Personal Loans",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400"
  },
  {
    id: 6,
    title: "How to Avoid the Payday Loan Trap",
    excerpt: "Payday loans can become a cycle that's hard to break. Learn strategies to use payday loans responsibly and avoid falling into a debt spiral.",
    author: "Financial Advisor",
    date: "December 15, 2025",
    category: "Payday Loans",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
                Financial Insights Blog
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80">
                Expert advice, tips, and guides to help you make informed financial decisions 
                and achieve your money goals.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="bg-card border-border overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium bg-accent text-accent-foreground px-2 py-1 rounded">
                          <Tag className="h-3 w-3 inline mr-1" />
                          {post.category}
                        </span>
                      </div>
                      <CardTitle className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Articles
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Stay Informed</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get the latest financial tips and loan advice delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button variant="default" size="lg">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
