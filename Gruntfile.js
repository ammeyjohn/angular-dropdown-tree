module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        html2js: {
            options: {
                useStrict: true,
                module: 'uiDropdownTree',
                singleModule: true,
                existingModule: true
            },
            main: {
                src: ['src/**/*.html'],
                dest: 'build/template.js'
            },
        },
        clean: ['dist', 'build'],
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <ammeyjohn@qq.com> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        concat: {
            options: {
                separator: ';\r\n\r\n',
            },
            dist: {
                src: ['src/**/*.js', 'build/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js',
            },
        },
    });

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // 默认被执行的任务列表。
    grunt.registerTask('template', ['clean', 'html2js']);
    grunt.registerTask('build', ['clean', 'html2js',  'concat', 'uglify']);

};