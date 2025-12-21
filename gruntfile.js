module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    sass: {
      // Task
      dist: {
        // Target
        options: {
          // Target options
          style: "expanded",
        },
        files: {
          // Dictionary of files
          "app/public/dest/sass.css": "app/public/src/css/styles.scss", // 'destination': 'source'
        },
      },
    },
    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: "app/public/dest",
            src: ["tw.css", "sass.css"],
            dest: "app/public/dest",
            ext: ".min.css",
          },
        ],
      },
    },

    concat: {
      combine: {
        src: ["app/public/dest/tw.min.css", "app/public/dest/sass.min.css"],
        dest: "app/public/dest/style.min.css",
        options: {
          banner:
            '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n',
        },
      },
    },
    clean: {
      combine: {
        src: ["app/public/dest/*", "!app/public/dest/style.min.css"],
      },
    },
    // Watch for changes and run Tasks

    watch: {
      scripts: {
        files: ["app/public/dest/style.css", "app/public/dest/tw.css"],
        tasks: ["sass", "concat", "cssmin", "clean"],
        options: {
          spawn: false,
        },
      },
    },
  });

  // npm install grunt --save-dev
  // npm install grunt-contrib-watch --save-dev
  grunt.loadNpmTasks("grunt-contrib-watch");
  // npm install grunt-contrib-jshint --save-dev
  grunt.loadNpmTasks("grunt-contrib-jshint");
  // npm install grunt-contrib-concat --save-dev
  grunt.loadNpmTasks("grunt-contrib-concat");
  // npm install grunt-contrib-uglify --save-dev
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-contrib-uglify");
  // Plugin for compiling Sass
  grunt.loadNpmTasks("grunt-contrib-sass");
  // npm install grunt-contrib-clean --save-dev
  // Load the plugin that provides cleaning.
  grunt.loadNpmTasks("grunt-contrib-clean");

  grunt.loadNpmTasks("grunt-contrib-cssmin");

  grunt.registerTask("css", ["concat", "cssmin", "clean"]);
  // Default task(s).
  grunt.registerTask("default", ["sass", "cssmin", "concat", "clean"]);
};
