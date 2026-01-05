Assist with the following:
# Tailwind setup
- Scan the files in @src/html for classes used in the HTML files to be added to the @tailwind.css file.
- Set up Tailwind CSS to use the @tailwind.css file as the input file and the @src/temp folder as the output folder.
# Customizing @gulpfile.js
The gulpfile needs to:
- compile the SCSS files in @custom.scss using the SASS preprocessor into a CSS file in the @src/temp folder. The CSS file should be named @custom.css
- Concatenate the @custom.css file with the @tailwind.css file into a single CSS file in the @src/temp folder. The CSS file should be named @custom.css
- Minify the @custom.css file and save it to the @dist/css folder. The CSS file should be named @custom.min.css and should be timestamped with a comment at the top of the file.
- The @custom.css file should be deleted after it is concatenated with the @tailwind.css file.
- Lint and concatenate any JS files in the @src/js folder and save them to the @src/temp folder.
- Minify the JS file and save it to the @dist/js folder. The JS file should be named @custom.min.js and should be timestamped with a comment at the top of the file.
## Gulp Tasks
1. **Compile** - All steps prior to minification that save in the @src/temp folder should be executable as a single gulp task to allow for code inspection.
2. **Minify** - The Minification step should be executable as a single gulp task.
3. **Build** - Both steps should be executable as a single gulp task. 

- Make it such that there is a watch task that monitors the @src folder for changes and runs the appropriate gulp tasks.
- Ensure the order of concatenation uses the compiled output from @tailwind.css first and then the @custom.css output.

## Gulp dependencies
- Ensure all gulp dependencies for these tasks are installed and up to date and tracked in the @package.json file.

- Ensure the @gulpfile.js file is executable from the command line.

# Setup Readme.md
Generate a Setup.md file that documents the steps to set up the project and operate gulp tasks. Include the following:
- How to install dependencies
- How to run gulp tasks
- How to run gulp tasks in watch mode

# gitignore
Update the .gitignore file to ignore everything in @app/public except for:
@app/public/wp-content/themes/botanica/src