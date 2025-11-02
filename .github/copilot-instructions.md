# Hacktoberfest Finder - AI Coding Agent Instructions

## Project Overview
A Hacktoberfest issue finder built with Laravel 12, Inertia.js, Vue 3, TypeScript, and Tailwind CSS 4. Helps developers discover open source issues tagged for Hacktoberfest by searching the GitHub API.

## Architecture & Key Components

### Stack
- **Backend**: Laravel 12 with custom GitHub API service
- **Frontend**: Vue 3 + TypeScript + Inertia.js (SPA with SSR support)
- **Styling**: Tailwind CSS 4 + Flowbite UI components
- **Auth**: Laravel Fortify (with 2FA support)
- **Testing**: Pest (Feature + Unit tests)
- **Routing**: Laravel Wayfinder for type-safe Vue routing

### Service Layer Pattern
This project uses a custom service layer for external integrations:
- **Service Location**: `app/Services/GitHub/`
- **Pattern**: Contract interface (`GitHubContract`) + concrete implementation + service provider
- **Registration**: Services registered in `bootstrap/providers.php` as singletons
- **Usage**: Inject via controller constructors: `public function __construct(private GitHubContract $github)`

Example service structure:
```
app/Services/GitHub/
├── Contracts/GitHubContract.php (interface)
├── GitHub.php (implementation)
├── GitHubServiceProvider.php (registers singleton)
├── Facades/GitHub.php (optional facade)
└── Exceptions/GitHubException.php
```

### Frontend Architecture
- **Pages**: `resources/js/pages/` - Top-level Inertia views (Welcome.vue, Dashboard.vue, auth/*, settings/*)
- **Layouts**: `resources/js/layouts/` - Shared layouts (AppLayout, AuthLayout, settings variants)
- **Components**: `resources/js/components/` - Reusable Vue components (use Flowbite for consistency)
- **Composables**: `resources/js/composables/` - Shared logic (e.g., `useAppearance` for dark mode)
- **Routes**: `resources/js/routes/index.ts` - Auto-generated type-safe route helpers via Wayfinder

### Type-Safe Routing with Wayfinder
Routes are defined in `routes/web.php` and auto-generated as TypeScript helpers:
```typescript
import { dashboard, login } from '@/routes';

// Usage in Vue:
<Link :href="dashboard()">Dashboard</Link>
router.visit(login());
```
Run `php artisan wayfinder:generate` after route changes (auto-runs in dev mode).

## Development Workflows

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
```

### Code Quality
```bash
composer pint           # Format PHP (Laravel Pint)
npm run format          # Format JS/Vue (Prettier)
npm run lint            # Lint & fix (ESLint)
```

## Project-Specific Conventions

### Configuration Files
- **GitHub API**: `config/github.php` - API endpoint, supported languages, default labels/filters
- **Languages**: Top languages shown first in UI (see `top_languages` array)
- **Default Labels**: Searches include 'hacktoberfest' + 'good first issue' by default

### Dark Mode Implementation
- Uses composable: `resources/js/composables/useAppearance.ts`
- Persists via localStorage + cookie (for SSR)
- Three modes: 'light', 'dark', 'system'
- Applied via Tailwind's `dark:` classes

### Component Patterns
- **Flowbite First**: Use Flowbite components for forms, buttons, modals, dropdowns
- **Layout Composition**: Pages import layouts, not the reverse
- **TypeScript Props**: Always define props with types using `defineProps<{ ... }>()`

### File Naming
- **Vue files**: PascalCase (e.g., `WelcomeController.vue`, `AppLayout.vue`)
- **PHP files**: PascalCase classes, snake_case files where appropriate
- **TypeScript**: camelCase files except components

## Testing Patterns
- Use Pest's `test()` function syntax (not PHPUnit classes)
- Feature tests extend `Tests\TestCase` and use `RefreshDatabase`
- Test authenticated routes: `$this->actingAs(User::factory()->create())`
- Example test structure in `tests/Feature/DashboardTest.php`

## Common Tasks

### Adding a New Service
1. Create contract interface in `app/Services/{Service}/Contracts/`
2. Implement service class
3. Create service provider with singleton registration
4. Register in `bootstrap/providers.php`
5. Add config file if needed: `config/{service}.php`

### Adding a New Page
1. Create Vue component: `resources/js/pages/{Page}.vue`
2. Add route: `routes/web.php`
3. Create controller: `app/Http/Controllers/{Page}Controller.php`
4. Use Inertia: `return Inertia::render('PageName', [...props])`
5. Type-safe routes auto-generate via Wayfinder

### Working with Inertia
- Props passed from controller are reactive in Vue
- Use `<Link>` component for SPA navigation (not `<a>`)
- Forms: Use Inertia's `useForm` composable or `router.post()` methods
- Shared data (e.g., auth user): Available via `$page.props.auth`

## External Dependencies
- **GitHub API**: Unauthenticated search (rate limited to 10 req/min)
- **Flowbite**: UI component library (initialized in `app.ts`)
- **Vite**: Build tool with HMR, configured in `vite.config.ts`

## Critical Files to Review
- `app/Services/GitHub/GitHub.php` - GitHub API integration logic
- `resources/js/app.ts` - Vue app initialization
- `vite.config.ts` - Build configuration with Wayfinder plugin
- `config/github.php` - GitHub API configuration
- `tests/Pest.php` - Test configuration & global helpers
