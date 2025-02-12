# Nutri-Soft

A professional nutrition management platform built with Next.js and Supabase, designed for nutritionists to manage their patients, appointments, and nutritional plans.

## Features

- 🏥 Clinical History Management
- 📊 Weight Tracking & Progress Charts
- 📅 Appointment Scheduling
- 📄 Document Management
- 👥 Patient Management
- 🔐 Secure Authentication
- 🌓 Dark/Light Mode
- 📱 Responsive Design

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Database & Auth:** Supabase
- **Styling:** Tailwind CSS + shadcn/ui
- **Forms:** React Hook Form + Zod
- **Email:** Resend
- **Charts:** Recharts

## Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Supabase account

### Installation

1. Clone the repository

    git clone [repository-url]
    cd nutri-soft

2. Install dependencies

    npm install

3. Create a `.env` file in the root directory with the following variables:

    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

4. Start the development server:

    npm run dev

Visit `http://localhost:3000` to see the application.

## Project Structure

    ├── app/                  # Next.js app directory
    ├── common/              # Shared components and utilities
    ├── features/            # Feature-based modules
    │   ├── appointments/    # Appointment management
    │   ├── auth/           # Authentication
    │   ├── documents/      # Document management
    │   └── email/          # Email templates
    ├── public/             # Static assets
    └── types/              # TypeScript type definitions

## Development

### Code Style

This project uses ESLint and Prettier for code formatting. Run the following commands:

    # Format code
    npm run format

    # Lint code
    npm run lint

### Commit Convention

We follow conventional commits specification. Each commit message should be structured as follows:

    <type>(<scope>): <description>

    [optional body]

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## License

This project is licensed under the MIT License.