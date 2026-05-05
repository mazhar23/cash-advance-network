# USA Loan Hub

A comprehensive web application for USA Loan Hub, providing fast and easy access to various loan services including payday loans, personal loans, debt consolidation, and more.

## Features

- **Loan Application Form**: Multi-step form for applying to different types of loans
- **Loan Calculator**: Calculate loan payments and interest
- **Informational Pages**: Detailed information about different loan types, FAQs, and company information
- **Responsive Design**: Built with Tailwind CSS for mobile-first responsive design
- **Backend Integration**: Uses Supabase for database and authentication

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation
- **Backend**: Supabase
- **State Management**: TanStack Query
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd usa-loan-hub-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:8080](http://localhost:8080) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── LoanApplicationForm/  # Multi-step loan application
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── integrations/       # External service integrations
└── assets/             # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Contact

For questions or support, please contact the development team.
