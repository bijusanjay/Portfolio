# Development Setup Guide

## Project Structure

```
src/
├── api/              # API client and endpoints
├── assets/           # Images, SVGs, fonts
├── components/       # Reusable components
│   ├── ui/          # UI components (Button, Input, etc.)
│   ├── layouts/     # Layout components
│   └── authorisation/ # Auth-related components
├── hooks/           # Custom React hooks
├── store/           # Zustand state management
├── types/           # TypeScript type definitions
├── utils/           # Helper functions and constants
├── views/           # Page components
└── routes/          # Route configuration
```

## Current Code Quality Status

ESLint is configured with **dev-friendly** rules:
- **6 warnings** - Minor `any` type usage (warnings only, won't block development)
- **0 errors** - All blocking errors have been resolved
- Focus on critical checks that prevent production bugs

**Philosophy**: Fast development with TypeScript safety, not perfectionism.

## Code Quality Tools

This project uses multiple tools to maintain code quality:

### 1. TypeScript

Strict type checking is enabled with the following rules:
- `noImplicitAny`: Disallows any implicit any types
- `strictNullChecks`: Strict null checking
- `noUnusedLocals`: Reports errors on unused local variables
- `noUnusedParameters`: Reports errors on unused parameters
- `noImplicitReturns`: Reports error when function has code paths that don't return a value

### 2. ESLint

**Dev-Friendly Configuration** - Only critical checks enabled:
- React Hooks rules (error level) - Prevents hook bugs
- `any` type usage (warning level) - Suggests better types without blocking
- Console statements allowed for debugging
- Unused variables/imports allowed during development
- No floating promise checks (too noisy)

**Note**: Import order rules are disabled to avoid excessive file changes.

### 3. Prettier

Auto-formatting with consistent style:
- 2 spaces indentation
- Single quotes
- No semicolons
- Trailing commas where valid

## Running Checks

### Individual Checks

Type checking only:
```bash
npm run type-check
```

Linting only:
```bash
npm run lint
```

Auto-fix lint issues:
```bash
npm run lint:fix
```

Format checking:
```bash
npm run format:check
```

Auto-format code:
```bash
npm run format
```

### Run All Checks

Before committing or deploying:
```bash
npm run validate
```

This will run:
1. Format check
2. Lint check
3. Type check

## VS Code Integration

### Required Extensions

Install these VS Code extensions:
1. ESLint (dbaeumer.vscode-eslint)
2. Prettier - Code formatter (esbenp.prettier-vscode)

### Auto-fix on Save

The project includes `.vscode/settings.json` which enables:
- Format on save with Prettier
- ESLint auto-fix on save
- Import organization on save

## Common Issues and Solutions

### Issue: ESLint shows errors for imports

Solution: Make sure the import order follows the configured pattern:
1. External packages (react, react-router-dom, etc.)
2. Internal imports with path aliases
3. Type imports

### Issue: TypeScript complains about 'any' type

Solution: Always provide explicit types. Instead of:
```tsx
const data: any = ...
```

Use:
```tsx
const data: User | null = ...
```

### Issue: Unused variable warnings

Solution: Either remove unused variables or prefix with underscore if intentionally unused:
```tsx
const handleClick = (_event: React.MouseEvent) => {
  // Event parameter not used but required by type
}
```

### Issue: Import not found with path alias

Solution: Check that:
1. Path is correct in `tsconfig.app.json`
2. Path is correct in `vite.config.ts`
3. VS Code is using workspace TypeScript version

## Deployment Checklist

Before deploying:

1. Run validation script:
```bash
./deploy.sh
```

2. Check that all tests pass (if any)

3. Verify environment variables are set in Vercel

4. Review changes before pushing

5. Push to main branch for automatic Vercel deployment

## Git Workflow

1. Create feature branch: `feature/feature-name`
2. Make changes
3. Run `npm run validate` before committing
4. Commit with conventional commit message
5. Push and create pull request
6. Review and merge
7. Vercel will automatically deploy from main branch

## Environment Setup

### First Time Setup

1. Clone repository
2. Install dependencies: `npm install`
3. Copy environment file: `cp .env.example .env`
4. Fill in environment variables
5. Start dev server: `npm run dev`
6. Install VS Code extensions (ESLint, Prettier)
7. Reload VS Code to apply settings

### Team Members

All team members should:
- Use the same Node.js version (20.x)
- Have Prettier and ESLint extensions installed
- Enable format on save in VS Code
- Run validation before pushing code
- Follow the coding guidelines in README.md
