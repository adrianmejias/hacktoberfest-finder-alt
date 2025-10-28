# Claude AI Assistant Guide

## Project Overview

**Hacktoberfest Finder** is a Vue 3 single-page application that helps users discover GitHub issues tagged for Hacktoberfest participation. The app uses the GitHub Search API to find and display issues, with filtering capabilities by programming language, labels, and reply status.

## Architecture

### Tech Stack
- **Frontend Framework**: Vue 3
- **Styling**: Tailwind CSS 3
- **Build Tool**: Laravel Mix (Webpack wrapper)
- **Event Bus**: Mitt
- **Package Manager**: Yarn
- **Deployment**: Netlify

### Project Structure
```
hacktoberfest-finder-alt/
├── src/
│   ├── js/
│   │   ├── app.js                 # Main entry point, sets up Vue app & mitt emitter
│   │   ├── components/
│   │   │   ├── App.vue            # Root component with API logic
│   │   │   ├── AppHeader.vue      # Filter controls & navigation
│   │   │   ├── AppMain.vue        # Results display grid
│   │   │   ├── AppMainModal.vue   # Issue detail modal
│   │   │   └── AppFooter.vue      # Footer content
│   │   └── data/
│   │       └── languages.json     # 498+ programming languages
│   └── css/
│       └── app.css                # Tailwind imports & custom styles
├── public/                        # Compiled assets (auto-generated)
├── webpack.mix.js                 # Laravel Mix configuration
├── tailwind.config.js             # Tailwind theme customization
└── package.json                   # Dependencies & scripts

```

## Key Patterns & Conventions

### Component Communication
The app uses **mitt** for event-driven communication between components:

```javascript
// In app.js - emitter is provided globally
import mitt from 'mitt';
const emitter = mitt();
app.provide('emitter', emitter);

// In components - inject and use
inject: ['emitter'],
methods: {
  someMethod() {
    this.emitter.emit('eventName', data);
  }
}
```

**Event Names:**
- `toggleFilter` - Show/hide language filter dropdown
- `chooseLanguage` - Change language filter
- `removeLabel` - Remove a label from filters
- `toggleNoReplyFilter` - Toggle "no reply" filter
- `loadMoreIssues` - Load next page of results
- `appendLabel` - Add new label to filters
- `toggleIssue` - Open issue detail modal
- `closeModal` - Close issue detail modal

### GitHub API Integration
Direct fetch calls to GitHub Search API:

```javascript
const url = `https://api.github.com/search/issues?q=${query}&page=${page}`;
```

**Query Building:** Computed properties in `App.vue` build search query strings:
```javascript
filterLabels() {
  return "label:" + this.labels.map(name => `"${name}"`).join("+label:");
}
```

### State Management
- **No Vuex** - Uses props down, events up pattern
- **LocalStorage** persists:
  - `language` - Selected programming language
  - `labels` - Active filter labels (default: `["hacktoberfest", "good first issue"]`)
  - `noreply` - No reply filter state
  - `auto-refresh` - Auto-refresh toggle state

### Styling
- **Utility-first Tailwind CSS**
- **Custom theme colors** in `tailwind.config.js`:
  - Primary: `#A11EC6` (Hacktoberfest purple)
  - Secondary: Custom color scheme
- **Responsive breakpoints**: sm (576px), md (768px), lg (992px), xl (1200px)
- **Fixed header** using `vue-fixed-header` component

## Development Workflow

### Build Commands
```bash
# Install dependencies
yarn install

# Development build with source maps
yarn run dev

# Production build (optimized, minified)
yarn run production

# Watch mode (auto-recompile on changes)
yarn run watch
```

### File Watching
Laravel Mix compiles:
- `src/js/**/*.{js,vue}` → `public/js/app.js`
- `src/css/app.css` → `public/css/app.css` (with Tailwind processing)

### Adding New Features

**Adding a Filter:**
1. Add state to `App.vue` data
2. Create computed property for query string
3. Add UI controls to `AppHeader.vue`
4. Implement event handlers
5. Update localStorage persistence

**Adding a Component:**
1. Create `.vue` file in `src/js/components/`
2. Import in parent component
3. Register in `components: { }` object
4. Use `inject: ['emitter']` for event bus access

## Common Issues & Solutions

### FixedHeader Component
- **Package**: `vue-fixed-header`
- **Must be installed**: `yarn add vue-fixed-header`
- **Must be imported**: `import FixedHeader from "vue-fixed-header";`
- **Must be registered**: `components: { FixedHeader }`

### ClickOutside Directive
- **Package**: `vue-click-outside` (already in package.json)
- **Usage**: `v-click-outside="methodName"` on filter dropdown

### Tailwind Warnings
If you see "content option missing" warnings, this is expected but doesn't break the build. The app uses an older Tailwind config format.

### API Rate Limiting
GitHub API limits unauthenticated requests to ~60/hour. Consider adding authentication tokens for higher limits in production use.

## Important Files

### `src/js/app.js`
Sets up Vue app instance, mitt emitter, and mounts to `#app` element.

### `src/js/components/App.vue`
- Central state manager
- GitHub API integration
- Event listeners for all component communications
- Issue data transformation and pagination logic

### `webpack.mix.js`
Laravel Mix configuration:
- JavaScript compilation with Vue loader
- PostCSS/Tailwind processing
- Asset versioning for production
- Source map generation for development

### `tailwind.config.js`
Custom Tailwind configuration with Hacktoberfest branding colors and responsive breakpoints.

## API Response Processing

Issues from GitHub API are transformed to add computed fields:

```javascript
const items = response.items.map(({ repository_url, updated_at, ...rest }) => ({
  ...rest,
  repo_title: repository_url.split("/").slice(-1).join(),
  formatted_date: this.formatDate(new Date(updated_at))
}));
```

## Testing
Currently, there is no test suite for this project.

## Deployment
The app deploys to Netlify automatically from the git repository. The `public/` directory contains the compiled assets that are served.

## Contributing
See `CONTRIBUTING.md` for contribution guidelines. This is an open-source project welcoming first-time contributors during Hacktoberfest and year-round.

---

**Last Updated:** October 2025
**Vue Version:** 3.x
**Node Version:** 24.x (recommended)
