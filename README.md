# [@gld5000-cli/dependency-finder](https://www.npmjs.com/package/@gld5000-cli/dependency-finder)

[![npm version](https://badge.fury.io/js/@gld5000-cli%2Fdependency-finder.svg)](https://www.npmjs.com/package/@gld5000-cli/dependency-finder)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A CLI tool that analyzes your codebase to find component dependencies and identify unused components. Perfect for refactoring, deprecation planning, and keeping your codebase clean.

## Features

- 🔍 **Dependency Analysis** - Scans your components and finds all files that import them
- 📊 **Usage Reports** - Generates detailed JSON reports categorizing components by usage
- 🎯 **Dead Code Detection** - Identifies components with zero dependents (potential candidates for removal)
- ⚙️ **Flexible Configuration** - Customize search patterns, target paths, and ignore patterns
- 🚀 **Zero Config** - Works out of the box with sensible defaults for React/TypeScript projects
- 📁 **Batch Analysis** - Analyze multiple component directories at once

## Use Cases

- **Identify Unused Components** - Find components that are never imported or used
- **Refactoring Priorities** - Determine which components are most heavily used before making breaking changes
- **Deprecation Planning** - Safely deprecate components by knowing exactly where they're used
- **Code Cleanup** - Remove dead code with confidence
- **Codebase Health** - Get insights into component coupling and usage patterns

## Prerequisites

- Node.js 14.x or higher

## Run with prompts

```
npx @gld5000-cli/dependency-finder
```

## Run with arguments

```
npx @gld5000-cli/dependency-finder [Component directory] [Dependents paths] [File ignore patterns] [PascalCase only] [Import path includes]
```

### Arguments

| Argument                 | Description                                                  | Default                                   | Example                         |
| ------------------------ | ------------------------------------------------------------ | ----------------------------------------- | ------------------------------- |
| **Component directory**  | Glob pattern for component files to analyze                  | `./components/**/*.tsx`                   | `./src/components/**/*.tsx`     |
| **Dependents paths**     | Pipe-separated glob patterns for where to search for imports | `./components/**/*.tsx\|./pages/**/*.tsx` | `./src/**/*.tsx\|./app/**/*.ts` |
| **File ignore patterns** | Pipe-separated patterns to exclude from analysis             | `.test\|.stories`                         | `.test\|.spec\|.mock`           |
| **PascalCase only**      | Filter exports to PascalCase names only (React components)   | `y`                                       | `y` or `n`                      |
| **Import path includes** | Filter imports to only those containing this substring       | (none)                                    | `folder-a` or `@components`     |

### Example Usage

```bash
# Analyze all TSX components in a specific structure
npx @gld5000-cli/dependency-finder "./components/**/*.tsx" "./components/**/*.tsx|./pages/**/*.tsx" ".test|.stories"

# Analyze TypeScript files across the entire src directory
npx @gld5000-cli/dependency-finder "./src/components/**/*.ts" "./src/**/*.ts" ".test|.spec"

# Analyze React components including JSX
npx @gld5000-cli/dependency-finder "./components/**/*.{tsx,jsx}" "./src/**/*.{tsx,jsx}|./pages/**/*.{tsx,jsx}" ".test|.stories|.mock"

# Analyze TSX components with PascalCase filtering (for strict React component naming)
npx @gld5000-cli/dependency-finder "./components/**/*.tsx" "./components/**/*.tsx|./pages/**/*.tsx" ".test|.stories" "y"

# Analyze JSX components with PascalCase filtering enabled
npx @gld5000-cli/dependency-finder "./src/components/**/*.jsx" "./src/**/*.jsx" ".test|.stories" "y"

# Filter imports to only those from a specific folder path
npx @gld5000-cli/dependency-finder "./components/**/*.tsx" "./src/**/*.tsx" ".test|.stories" "y" "folder-a"

# Filter imports to only those from a scoped package
npx @gld5000-cli/dependency-finder "./components/**/*.tsx" "./src/**/*.tsx" ".test" "y" "@mycompany/components"
```

## Output

The tool generates a `dependents-report.json` file in your project root with the following structure:

```json
{
  "noDependents": {
    "count": 2,
    "results": [
      {
        "matches": [],
        "filePath": "components/Button/index.tsx",
        "dependents": []
      },
      {
        "matches": ["UnusedComponent"],
        "filePath": "components/UnusedComponent.tsx",
        "dependents": []
      }
    ]
  },
  "someDependents": {
    "count": 1,
    "results": [
      {
        "matches": ["Header"],
        "filePath": "components/Header.tsx",
        "dependents": [
          {
            "filePath": "pages/index.tsx",
            "matches": ["import { Header } from '../components/Header'"]
          },
          {
            "filePath": "pages/about.tsx",
            "matches": ["import { Header } from '../components/Header'"]
          }
        ]
      }
    ]
  }
}
```

### Understanding the Output

- **noDependents**: Components with zero imports (candidates for removal)
  - `count`: Number of unused components
  - `results`: Array of unused component details
- **someDependents**: Components that are imported somewhere
  - `count`: Number of used components
  - `results`: Array of components with their import locations
- **matches**: Export names found in the component file
- **dependents**: List of files that import this component and the exact import statements

## How It Works

1. **Discover Components** - Scans your codebase using the component directory pattern to find all component files
2. **Extract Exports** - Identifies exported components in each file
3. **Filter Exports** - Optionally filters exports to include only PascalCase names (enforces React component naming conventions)
4. **Search for Imports** - Searches target paths for import statements referencing each component
5. **Categorize Results** - Groups components into those with dependents and those without
6. **Generate Report** - Creates a detailed JSON report with all findings

The tool uses glob patterns for flexible file matching and supports filtering to exclude test files, stories, and other non-production code. For TSX/JSX components, enable PascalCase filtering to strictly enforce React naming conventions and ignore helper functions and utilities.

## Examples

### Find Unused Components in a Large Project

```bash
npx @gld5000-cli/dependency-finder "./src/components/**/*.tsx" "./src/**/*.tsx|./app/**/*.tsx" ".test|.stories|.spec"
```

After running, check `dependents-report.json` and review the `noDependents` section for components that can be safely removed.

### Audit Before Deprecating a Component Library

```bash
npx @gld5000-cli/dependency-finder "./components/**/*.tsx" "./pages/**/*.tsx|./features/**/*.tsx|./layouts/**/*.tsx" ".test"
```

Review the `someDependents` section to see exactly where each component is used before deprecating or refactoring.

### Quick Check on Component Usage

```bash
# Run with defaults for standard React project structure
npx @gld5000-cli/dependency-finder
```

Follow the prompts to customize paths for your project structure.

## Contributing

Contributions are welcome! Feel free to:

- Report bugs by opening an issue
- Suggest new features
- Submit pull requests

Please ensure any changes include appropriate tests.

## License

MIT License

Copyright (c) 2026 Gareth L Devlin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
