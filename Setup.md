# Project Setup and Gulp Workflow

This project uses Gulp and Tailwind CSS for assets processing.

## Prerequisites

- Node.js (v18+ recommended)
- npm

## Setup Instructions

1.  **Install Dependencies**:
    Navigate to the theme directory and install the necessary npm packages:
    ```bash
    cd app/public/wp-content/themes/botanica
    npm install
    ```

2.  **Run Gulp Tasks**:
    Available tasks in the theme directory:

    -   **Compile**: Executes SCSS compilation, Tailwind processing, and JS concatenation into the `src/temp` folder.
        ```bash
        npx gulp compile
        # OR
        npm run compile
        ```
    -   **Minify**: Minifies the files in `src/temp` and saves them to `dist/css` and `dist/js` with a timestamped header.
        ```bash
        npx gulp minify
        # OR
        npm run minify
        ```
    -   **Build** (Default): Runs both `compile` and `minify` tasks in sequence.
        ```bash
        npx gulp build
        # OR
        npm run build
        ```
    -   **Watch**: Monitors the `src` folder (CSS, JS, and HTML) for changes and automatically runs the `build` task.
        ```bash
        npx gulp watch
        # OR
        npm run watch
        ```

## Directory Structure

-   `src/css/custom.scss`: Main SCSS file (SASS @use "base" is used here).
-   `src/css/tailwind.css`: Input file for Tailwind CSS.
-   `src/js/*.js`: JavaScript source files (linted and concatenated).
-   `src/html/**/*.html`: HTML files scanned for Tailwind classes.
-   `src/temp/`: Intermediate processed files (for inspection).
-   `dist/`: Final minified and production-ready assets.
