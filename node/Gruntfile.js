module.exports = function (grunt) {
  var fs = require('fs');

  var src = '../html-dev/';
  var fileArr = fs.readdirSync( src );
  var includeArr = [];
  fileArr.forEach(function( name ){
    name = name.replace(/\.html/, '');
    includeArr.push({name : name});
  });

  var opt = {
    baseUrl: '../js-dev/',
    path: {},
    modules : includeArr,
    dir : '../js/',
    removeCombined: true
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs:{
      compile:{
        options: opt
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.registerTask('require-task', ['requirejs']);
}