# Copilot Instructions for Hacktoberfest Finder

## Project Architecture

This is a Vue 3 + Tailwind CSS single-page application that helps users find GitHub issues tagged for Hacktoberfest. The app uses Laravel Mix for asset compilation and deploys to Netlify.

### Key Components & Data Flow

- **`src/js/components/App.vue`**: Central state manager and GitHub API integration
- **GitHub API Integration**: Uses direct `fetch()` calls to GitHub Search API (`https://api.github.com/search/issues`)
- **Event Communication**: Components communicate via event bus pattern (`Bus.$on`/`Bus.$emit`) - no Vuex
- **State Persistence**: Filter preferences stored in `localStorage` (language, labels, noReplyOnly)

### Build System & Development

- **Laravel Mix**: Webpack wrapper configured in `webpack.mix.js`
- **Development**: `yarn run dev` (or `npm run dev`) compiles assets with source maps
- **Production**: `yarn run production` creates optimized builds for Netlify
- **Asset Pipeline**: `src/` → `public/` (JS/CSS compilation with versioning in production)

## Critical Patterns

### GitHub API Query Building
```javascript
// Computed properties build GitHub search query strings
filterLabels() {
  return "label:" + this.labels.map(name => `"${name}"`).join("+label:");
}
```

### Component Communication
```javascript
// Event bus pattern for cross-component communication
Bus.$on("chooseLanguage", (language) => {
  this.chooseLanguage(language);
});
```

### Result Processing
```javascript
// API responses are transformed to add computed fields
const items = response.items.map(({ repository_url, updated_at, ...rest }) => ({
  ...rest,
  repo_title: repository_url.split("/").slice(-1).join(),
  formatted_date: this.formatDate(new Date(updated_at))
}));
```

## Styling Conventions

### Tailwind Configuration
- **Custom Theme**: Hacktoberfest branding colors in `tailwind.config.js`
- **Primary Color**: `#A11EC6` (purple theme)
- **Component Styling**: Utility-first with `v-cloak` for hiding unrendered templates

### Responsive Design
- Mobile-first approach with custom breakpoints: `sm: 576px`, `md: 768px`, `lg: 992px`, `xl: 1200px`

## Data Management

### Languages
- Static list in `src/js/data/languages.json` (498+ programming languages)
- Sorted alphabetically at runtime, filtered by user input

### Issue Filtering
- **Labels**: Default `["hacktoberfest", "good first issue"]` with user additions
- **Language**: Optional filter from languages list
- **No Reply**: Filter for issues with `comments:0`
- **Year Filter**: Only shows issues from current year using Moment.js

## Development Guidelines

### Adding New Filters
1. Add state to `App.vue` data
2. Create computed property for query string building
3. Add UI controls to `AppHeader.vue`
4. Implement event handlers for filter changes
5. Update `localStorage` persistence

### API Integration
- No authentication required for GitHub public API
- Rate limiting: ~60 requests/hour for unauthenticated requests
- Pagination via `page` parameter with "Load More" pattern

### Component Structure
- Keep components focused: Header (filters), Main (results), Modal (details), Footer
- Use props down, events up pattern
- Maintain reactivity through Vue's reactive system, not external state managers
