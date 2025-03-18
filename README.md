<p align="center">
  <h2 align="center">justadrop.xyz 🌊 </h2>
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF)](https://vitejs.dev/)
[![CI](https://github.com/shravan20/justadrop.xyz/actions/workflows/ci.yml/badge.svg)](https://github.com/shravan20/justadrop.xyz/actions/workflows/ci.yml)
[![CodeQL](https://github.com/shravan20/justadrop.xyz/actions/workflows/codeql.yml/badge.svg)](https://github.com/shravan20/justadrop.xyz/actions/workflows/codeql.yml)
[![Dependency Review](https://github.com/shravan20/justadrop.xyz/actions/workflows/dependency-review.yml/badge.svg)](https://github.com/shravan20/justadrop.xyz/actions/workflows/dependency-review.yml)
[![Bundle Size](https://github.com/shravan20/justadrop.xyz/actions/workflows/bundle-size.yml/badge.svg)](https://github.com/shravan20/justadrop.xyz/actions/workflows/bundle-size.yml)
[![Dead Code Check](https://github.com/shravan20/justadrop.xyz/actions/workflows/dead-code.yml/badge.svg)](https://github.com/shravan20/justadrop.xyz/actions/workflows/dead-code.yml)
[![Lighthouse Check](https://github.com/shravan20/justadrop.xyz/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/shravan20/justadrop.xyz/actions/workflows/lighthouse.yml)

Just A Drop is an open-source platform connecting volunteers with NGOs and charitable organizations. Our mission is to facilitate meaningful connections between compassionate individuals and organizations making a difference in their communities.

## 🌟 Features

- **Multi-User Roles**: Support for volunteers, NGOs, and administrators
- **Opportunity Management**: Create, browse, and manage volunteer opportunities
- **Real-time Updates**: Built with modern React and Supabase for real-time features
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Modern Stack**: Built with React 18, TypeScript, and Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm/pnpm/yarn
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shravan20/justadrop.xyz.git
   cd justadrop.xyz
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your Supabase credentials:

   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:8080`

### Building for Production

```bash
npm run build
```

## 🏗️ Project Structure

```
justadrop.xyz/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/      # React context providers
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── services/      # API and service functions
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── public/            # Static assets
└── supabase/         # Supabase configuration and migrations
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Backend/Database**: Supabase
- **State Management**: React Query
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Icons**: Lucide React

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with love for FOSS
- UI Components powered by [Radix UI](https://www.radix-ui.com/)
- Icons by [Lucide](https://lucide.dev/)

## 📫 Contact

For any queries or suggestions, please reach out to:

- Email: <shravan@ohmyscript.com>
- Project Link: [https://github.com/shravan20/justadrop.xyz](https://github.com/shravan20/justadrop.xyz)
