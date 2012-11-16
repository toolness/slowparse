"use strict";

var Slowmangle = (function() {
  function findAttrNode(element, name) {
    for (var i = 0; i < element.attributes.length; i++) {
      var attr = element.attributes[i];
      if (attr.nodeName == name)
        return attr;
    }
  }
  
  function Slowmangle(html, document) {
    this.html = html;
    this.document = document;
    this.vsot = new VSOT(html);
  }
  
  Slowmangle.prototype = {
    attr: function(element, name, value) {
      var attrNode;
      if (element.hasAttribute(name)) {
        attrNode = findAttrNode(element, name);
        var pi = attrNode.parseInfo;
        attrNode.nodeValue = value;
        // Assume the value is quoted...
        this.vsot.splice(pi.value.start + 1, 
                         pi.value.end - pi.value.start - 2,
                         // TODO: HTML-escape the value.
                         value);
      } else {
        attrNode = document.createAttribute(name);
        attrNode.nodeValue = value;
        element.attributes.setNamedItem(attrNode);
        this.vsot.insert(element.parseInfo.openTag.end - 1,
                         // TODO: HTML-escape the value, maybe name too.
                         ' ' + name + '="' + value + '"');
      }
    },
    serialize: function() {
      return this.vsot.serialize();
    }
  };
  
  return Slowmangle;
})();
