# Hacktoberfest Finder

> A modern web application that helps developers discover open source issues tagged for Hacktoberfest by searching the GitHub API.

## What is Hacktoberfest?

[Hacktoberfest](https://hacktoberfest.com/) is an annual festival that encourages people to participate in the open-source software community by contributing to projects throughout October.

## Features

- **GitHub Issue Search** - Search for Hacktoberfest-tagged issues with advanced filters
- **Language Filtering** - Filter issues by programming language
- **Smart Defaults** - Pre-configured search with sensible defaults for finding good first issues
- **Single-View Navigation** - TikTok-style interface with keyboard controls (↑↓ or j/k keys)
- **Dark Mode** - System-aware theme with manual toggle support
- **Authentication** - User accounts with 2FA support via Laravel Fortify
- **AI Integration** - MCP server for AI-powered Hacktoberfest assistance
- **Type-Safe Routing** - Auto-generated TypeScript route helpers with Laravel Wayfinder
- **Progressive Web App** - Offline support with service worker

## Tech Stack

### Backend
- **[Laravel 12](https://laravel.com/)** - PHP framework
- **[Laravel Fortify](https://laravel.com/docs/fortify)** - Authentication backend (with 2FA)
- **[Laravel Wayfinder](https://github.com/laravel/wayfinder)** - Type-safe routing for Vue
- **[Laravel MCP](https://laravel.com/docs/mcp)** - AI integration via Model Context Protocol

### Frontend
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[Inertia.js](https://inertiajs.com/)** - SPA experience with SSR support
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Reka UI](https://www.reka-ui.com/)** - Accessible Vue component library

### Developer Experience
- **[Laravel Pint](https://laravel.com/docs/pint)** - PHP code formatter
- **[Pest](https://pestphp.com/)** - Testing framework with browser testing
- **[ESLint](https://eslint.org/)** & **[Prettier](https://prettier.io/)** - JavaScript/Vue linting and formatting
- **[Vite](https://vitejs.dev/)** - Fast frontend build tool

## Local Setup

### Requirements

- **PHP** 8.4 or higher
- **Composer** 2.x
- **Node.js** 18.x or higher
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adrianmejias/hacktoberfest-finder-alt.git
   cd hacktoberfest-finder-alt
   ```

2. **Install dependencies**
   ```bash
   composer install
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Create database**
   ```bash
   touch database/database.sqlite
   php artisan migrate
   ```

   Or use the automated setup script:
   ```bash
   composer setup
   ```

### Development

**Start the development server** (runs Laravel server + queue worker + logs + Vite):
```bash
composer dev
```

Or run services separately:
```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: Vite dev server
npm run dev
```

The application will be available at `http://localhost:8000` (or via Laravel Herd at `https://hacktoberfest-finder-alt.test`).

### Testing

```bash
# Run all tests
composer test
# or
php artisan test

# Run specific test file
php artisan test tests/Feature/DashboardTest.php

# Run with filter
php artisan test --filter testUserCanSearch
```

### Code Quality

```bash
# Format PHP code
./vendor/bin/pint

# Format JavaScript/Vue
npm run format

# Lint JavaScript/Vue
npm run lint

# Check formatting
npm run format:check
```

### Building for Production

```bash
# Client-side only
npm run build

# With SSR support
npm run build:ssr
```

## MCP Server Integration

This project includes a Laravel MCP server for AI-powered Hacktoberfest assistance. The server provides tools for suggesting projects, searching issues, and getting Hacktoberfest information.

### Setup with Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "hacktoberfest": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-fetch",
        "http://localhost:8000/mcp/hacktoberfest"
      ]
    }
  }
}
```

Make sure your Laravel development server is running before using the MCP server.

## Project Structure

```
├── app/
│   ├── Actions/GitHub/       # GitHub API action classes
│   ├── Http/Controllers/     # Laravel controllers
│   ├── Mcp/                  # MCP server, tools, resources, prompts
│   └── Models/               # Eloquent models
├── config/                   # Configuration files
├── database/                 # Migrations, factories, seeders
├── resources/
│   ├── js/
│   │   ├── components/       # Vue components
│   │   │   ├── ui/          # Reka UI component library
│   │   │   └── icons/       # SVG icon components
│   │   ├── composables/      # Vue composables
│   │   ├── layouts/          # Inertia layouts
│   │   ├── pages/           # Inertia page components
│   │   └── routes/          # Auto-generated type-safe routes
│   └── views/               # Blade templates
├── routes/
│   ├── web.php              # Web routes
│   ├── ai.php               # MCP server routes
│   └── console.php          # Console routes
└── tests/
    ├── Feature/             # Feature tests
    ├── Unit/                # Unit tests
    └── Browser/             # Browser tests (Pest v4)
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the project's code style
4. Run tests and code formatters:
   ```bash
   composer test
   ./vendor/bin/pint
   npm run format
   npm run lint
   ```
5. Commit your changes with a descriptive message
6. Push to your fork and submit a pull request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

First-time contributors should add their name to [CONTRIBUTORS.md](CONTRIBUTORS.md).

## License

This project is open-sourced software licensed under the MIT license.

## Acknowledgments

- [Digital Ocean](https://www.digitalocean.com/) for organizing Hacktoberfest
- All the amazing [contributors](CONTRIBUTORS.md) who have helped improve this project
- The Laravel and Vue.js communities for their excellent tools and documentation
