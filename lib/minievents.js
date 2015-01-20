function MiniEvents() {
  this._events = {};
}

MiniEvents.prototype.on = function(ev, cb) {
  // Push the callback to the existing array or create a new array and push. 
  // This allows multiple listeners for the same event. 
  (this._events[ev] || (this._events[ev]=[])).push(cb);
};

MiniEvents.prototype.emit = function(ev) {
  // allow an arbitrary number of event arguments
  var args = Array.prototype.slice.call(arguments, 1);
  for(i = 0; i < this._events[ev].length; i++) {
    this._events[ev][i].apply(this, args);
  }
};

MiniEvents.prototype.mixin = function(destObj) {
  // transfer MiniEvents properties to the destination object
  for (var p in this) {
    if(this.hasOwnProperty(p)) {
      destObj.prototype[p] = this[p];
    }
  }
};

// the module object is not available in a browser environment
if(typeof module !== 'undefined')
  module.exports = MiniEvents;
