# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hacktoberfest Finder - A web application that helps developers discover open source issues tagged for Hacktoberfest by searching the GitHub API. Built with Laravel 12, Inertia.js, Vue 3, TypeScript, and Tailwind CSS 4.

## Tech Stack

- **Backend**: Laravel 12 with custom GitHub API service
- **Frontend**: Vue 3 + TypeScript + Inertia.js (SPA with SSR support)
- **Styling**: Tailwind CSS 4 + Reka UI components
- **Auth**: Laravel Fortify (with 2FA support)
- **Testing**: Pest (Feature + Unit tests)
- **Routing**: Laravel Wayfinder for type-safe Vue routing
- **MCP**: Laravel MCP server for AI integration

## Development Commands

### Starting Development

```bash
composer dev  # Runs server + queue + logs + vite concurrently
# OR separately:
php artisan serve
npm run dev
```

### Testing

```bash
composer test           # Run all Pest tests
php artisan test        # Alternative
php artisan test --filter DashboardTest  # Run specific test
```

### Building for Production

```bash
npm run build           # Client-side only
npm run build:ssr       # With SSR support
composer dev:ssr        # Run with SSR in dev mode
```

### Code Quality

```bash
./vendor/bin/pint       # Format PHP (Laravel Pint)
npm run format          # Format JS/Vue (Prettier)
npm run format:check    # Check formatting
npm run lint            # Lint & fix (ESLint)
```

### Route Generation

```bash
php artisan wayfinder:generate  # Generate type-safe routes
# Auto-runs in dev mode via vite plugin
```

### IDE Helper

```bash
php artisan ide-helper:generate  # Generate IDE helper files
# Auto-runs on composer update
```

## Architecture

### Service Layer Pattern

This project uses a custom service layer for external integrations:

- **Location**: `app/Services/{Service}/`
- **Pattern**: Contract interface + concrete implementation + service provider
- **Registration**: Services registered in `bootstrap/providers.php` as singletons
- **Usage**: Inject via controller constructors: `public function __construct(private GitHubContract $github)`

Example structure:
```
app/Services/GitHub/
├── Contracts/GitHubContract.php (interface)
├── GitHub.php (implementation)
├── GitHubServiceProvider.php (registers singleton)
├── Facades/GitHub.php (optional facade)
└── Exceptions/GitHubException.php
```

The GitHub service handles all GitHub API interactions. It uses unauthenticated search which is rate limited to 10 requests/minute.

### Frontend Architecture

- **Pages**: `resources/js/pages/` - Top-level Inertia views (Welcome.vue, Dashboard.vue, auth/*, settings/*)
- **Layouts**: `resources/js/layouts/` - Shared layouts (AppLayout, AuthLayout, settings variants)
- **Components**: `resources/js/components/` - Reusable Vue components
  - `ui/` - Reka UI component library (shadcn/ui-like components)
  - App-specific components at root level
- **Composables**: `resources/js/composables/` - Shared logic (e.g., `useAppearance` for dark mode)
- **Routes**: `resources/js/routes/index.ts` - Auto-generated type-safe route helpers via Wayfinder
- **Actions**: `resources/js/actions/` - Fortify auth action handlers
- **Types**: `resources/js/types/` - TypeScript type definitions

### Type-Safe Routing with Wayfinder

Routes defined in `routes/web.php` are auto-generated as TypeScript helpers:

```typescript
import { dashboard, login } from '@/routes';

// Usage in Vue:
<Link :href="dashboard()">Dashboard</Link>
router.visit(login());
```

Run `php artisan wayfinder:generate` after route changes (auto-runs in dev mode via Vite plugin).

### MCP Server Integration

Laravel MCP server provides AI-powered Hacktoberfest assistance:

- **Location**: `app/Mcp/`
- **Server**: `Servers/HacktoberfestServer.php` - Main MCP server definition
- **Tools**: `Tools/` - AI-callable functions (e.g., GetCurrentHacktoberfestInfoTool)
- **Resources**: `Resources/` - Static information resources
- **Prompts**: `Prompts/` - Pre-built conversation prompts
- **Route**: `/mcp/hacktoberfest` (defined in `routes/ai.php`)

To add new MCP functionality:
1. Create tool/resource/prompt class in appropriate directory
2. Register in `HacktoberfestServer.php` arrays
3. Add corresponding tests in `tests/Feature/Mcp/`

### Configuration Files

- **GitHub API**: `config/github.php` - API endpoint, supported languages, default labels/filters
  - `top_languages` - Languages shown first in UI
  - `default_labels` - Default search includes 'hacktoberfest' + 'good first issue'
  - `languages` - Comprehensive list of all GitHub languages
- **Fortify**: `config/fortify.php` - Authentication configuration
- **Inertia**: `config/inertia.php` - Inertia.js settings

### Dark Mode Implementation

- Composable: `resources/js/composables/useAppearance.ts`
- Middleware: `app/Http/Middleware/HandleAppearance.php` - Syncs cookie with localStorage
- Persists via localStorage + cookie (for SSR)
- Three modes: 'light', 'dark', 'system'
- Applied via Tailwind's `dark:` classes

## Common Tasks

### Adding a New Service

1. Create contract interface: `app/Services/{Service}/Contracts/{Service}Contract.php`
2. Implement service class: `app/Services/{Service}/{Service}.php`
3. Create service provider with singleton registration: `app/Services/{Service}/{Service}ServiceProvider.php`
4. Register in `bootstrap/providers.php`
5. Add config file if needed: `config/{service}.php`
6. Create exceptions directory: `app/Services/{Service}/Exceptions/`

### Adding a New Page

1. Create Vue component: `resources/js/pages/{Page}.vue`
2. Add route: `routes/web.php` (or `routes/settings.php` for settings pages)
3. Create controller: `app/Http/Controllers/{Page}Controller.php`
4. Return Inertia response: `return Inertia::render('PageName', [...props])`
5. Type-safe routes auto-generate via Wayfinder

### Working with Inertia

- Props passed from controller are reactive in Vue
- Use `<Link>` component for SPA navigation (not `<a>`)
- Forms: Use Inertia's `useForm` composable or `router.post()` methods
- Shared data (e.g., auth user): Available via `$page.props.auth`

### Adding Tests

- Use Pest's `test()` function syntax
- Feature tests extend `Tests\TestCase` and use `RefreshDatabase`
- Test authenticated routes: `$this->actingAs(User::factory()->create())`
- Test structure: Arrange, Act, Assert
- MCP tests: Use `Mcp::web()` fake in `tests/Feature/Mcp/`

## File Naming Conventions

- **Vue files**: PascalCase (e.g., `WelcomeController.vue`, `AppLayout.vue`)
- **PHP files**: PascalCase classes, snake_case config files
- **TypeScript**: camelCase files except components
- **CSS**: kebab-case for custom classes

## Component Patterns

- **Reka UI First**: Use Reka UI components from `resources/js/components/ui/` for consistent design
- **Layout Composition**: Pages import layouts, not the reverse
- **TypeScript Props**: Always define props with types using `defineProps<{ ... }>()`
- **Composition API**: Use `<script setup>` syntax for all Vue 3 components

## Key Files to Review

- `app/Services/GitHub/GitHub.php` - GitHub API integration logic
- `resources/js/app.ts` - Vue app initialization
- `vite.config.ts` - Build configuration with Wayfinder plugin
- `config/github.php` - GitHub API configuration
- `tests/Pest.php` - Test configuration & global helpers
- `bootstrap/providers.php` - Service provider registration
- `app/Mcp/Servers/HacktoberfestServer.php` - MCP server definition

## Environment Setup

The project uses SQLite by default for the database. After cloning:

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate
```

Or use the setup script:

```bash
composer setup
```
