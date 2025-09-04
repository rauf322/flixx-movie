# Agent Guidelines for Flixx Movie App

## Project Structure
- Pure vanilla JavaScript ES6+ modules with HTML/CSS
- No build tools, package.json, or frameworks - serves static files directly
- Uses external APIs (TMDB) with config-based API keys

## Commands
- No npm/yarn commands - this is a static site
- Open with Live Server or serve via HTTP server
- No tests configured - manual browser testing only

## Code Style
- Use ES6+ modules with `export/import` syntax
- File naming: camelCase for JS files, kebab-case for HTML
- Function naming: camelCase with descriptive names
- Use `async/await` for API calls, not promises
- Import order: external libs, then local modules by dependency
- Use template literals for HTML generation
- Console.log for debugging (remove in production)
- Error handling: try/catch blocks with console.error
- Use `const` by default, `let` when reassignment needed
- CSS: Use CSS custom properties for colors, BEM-like naming

## File Organization  
- `/js/components/` - Page-specific functionality
- `/js/utils/` - Reusable utilities
- `/js/api.js` - API communication layer
- `/js/config.js` - Configuration constants