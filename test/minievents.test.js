debugger;
var MiniEvents = require('../lib/minievents.js'),
    assert = require('assert');


describe('Testing the MiniEvents class', function() {
  this.timeout(3000);
  var ee;

  // mocha hooks, before and after
  beforeEach('create the class', function(done) {
    ee = new MiniEvents();
    done();
  });
  afterEach(function(done) {
   done();
  });

  describe('testing basic functions', function() {
    it('should be able to set a listener and emit an event', function(done) {
      ee.on('eventName', function(args) { 
        assert.ok( args === 'eventValue' ); 
      }); 
      ee.emit('eventName', 'eventValue');
      done();
    });
    it('should be able to set a multiple event listeners and trigger them individually', function(done) {
      var assertions = 0;
      ee.on('eventName1', function(args) { 
        assert.ok( args === 'eventValue1' ); 
        assertions++;
      }); 
      ee.on('eventName2', function(args) { 
        assert.ok( args === 'eventValue2' ); 
        assertions++;
      }); 
      ee.emit('eventName1', 'eventValue1');
      ee.emit('eventName2', 'eventValue2');
      assert.equal(2, assertions);
      done();
    });

  });
  describe('testing more advanced functions', function() {
    it('can set multiple listeners with the same event name', function(done) {
      var assertions = 0;
      ee.on('multipleListeners', function(args) { 
        assert.ok( args === 'eventValue' ); 
        assertions++;
      }); 
      ee.on('multipleListeners', function(args) { 
        assert.ok( args === 'eventValue' ); 
        assertions++;
      }); 
      ee.emit('multipleListeners', 'eventValue');
      assert.equal(2, assertions);
      done();
    });
    it('can pass an arbitrary number of arguments', function(done) {
      var assertions = 0;
      ee.on('multipleArgs', function(arg1, arg2, arg3, arg4) { 
        assert.ok( arg1 === 'arbitrary' ); 
        assert.ok( arg2 === 'number' ); 
        assert.ok( arg3 === 'of' ); 
        assert.ok( arg4 === 'arguments' ); 
        done();
      }); 
      ee.emit('multipleArgs', 'arbitrary', 'number', 'of', 'arguments');
    });
    it('can let other objects inherit from MiniEvents', function(done) {
      function SimpleCounter() {
        this.value = 0;
      }
      SimpleCounter.prototype.increment = function() {
        return (++this.value);
      };
      // inherit MiniEmitter properties.
      ee.mixin(SimpleCounter);
      var userCounter = new SimpleCounter();
      userCounter.on('newUser', function() {
        var count = this.increment();
        assert.ok( count === 1 );
        done();
      });
      userCounter.emit('newUser');
    });

  });
});
