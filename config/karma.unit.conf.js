basePath = '../';

files = [
  MOCHA,
  MOCHA_ADAPTER,
  './config/mocha.conf.js',

  //3rd Party Code
  './lib/angular.min.js',
  './lib/d3.min.js',

  //App-specific Code
  './src/js/angular-dchart.js',
  './src/js/*.js',

  //Test-Specific Code
  './node_modules/chai/chai.js',
  './test/lib/chai-expect.js',
  './test/lib/angular/angular-mocks.js',

  //Test-Specs
  './test/unit/*.js'
];

port = 9201;
runnerPort = 9301;
captureTimeout = 5000;

growl     = true;
colors    = true;
singleRun = true;
autoWatch = false;
browsers  = ['PhantomJS'];
reporters = ['progress'];