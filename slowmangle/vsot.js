"use strict";

// Simple class for Very Simple Operational Transformation (VSOT).
var VSOT = (function() {
  function compareOperations(a, b) {
    var cmp = a.index - b.index;
    if (cmp != 0)
      return cmp;
    return a.id - b.id;
  }
  
  function VSOT(string) {
    this._string = string;
    this._operations = [];
    this._id = 1;
  }
  
  VSOT.prototype = {
    insert: function(index, string) {
      var op = {
        type: "insert",
        id: this._id++,
        index: index,
        string: string
      };
      this._operations.push(op);
      return op;
    },
    delete: function(index, length) {
      this._operations.push({
        type: "delete",
        id: this._id++,
        index: index,
        length: length
      });
    },
    splice: function(index, length, string) {
      this.delete(index, length);
      return this.insert(index, string);
    },
    serialize: function() {
      var lastIndex = 0;
      var parts = [];
      var sortedOps = this._operations.slice();
      sortedOps.sort(compareOperations);
      sortedOps.forEach(function(op) {
        if (op.type == "insert") {
          var slice = this._string.slice(lastIndex, op.index);
          parts.push(slice);
          parts.push(op.string);
          lastIndex += slice.length;
        } else if (op.type == "delete") {
          var slice = this._string.slice(lastIndex, op.index);
          parts.push(slice);
          lastIndex += slice.length + op.length;
        }
      }, this);
      parts.push(this._string.slice(lastIndex, this._string.length));
      return parts.join('');
    }
  };
  
  return VSOT;
})();
