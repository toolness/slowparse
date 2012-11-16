"use strict";

(function() {
  var html, $, sm;
  
  function mangleTest(name, options, fn) {
    test(name, function() {
      html = options.html;
      var result = Slowparse.HTML(document, html);
      if (result.error)
        throw new Error("HTML has errors: " + html);
      sm = new Slowmangle(html, result.document, options.mutateDOM);
      $ = function(selector) {
        return result.document.querySelector(selector);
      };
      fn();
    });
  }

  module("slowmangle");

  mangleTest("changing an attribute once works", {
    mutateDOM: true,
    html: '<p  id="foo">hello</p>'
  }, function() {
    sm.attr($("p"), "id", "bar");
    equal($("p").getAttribute("id"), "bar");
    equal(sm.serialize(), '<p  id="bar">hello</p>');
  });
  
  mangleTest("adding an attribute once works", {
    mutateDOM: true,
    html: '<p  id="foo">hello</p>'
  }, function() {
    sm.attr($("p"), "data-meh", "bar");
    equal($("p").getAttribute("data-meh"), "bar");
    equal(sm.serialize(), '<p  id="foo" data-meh="bar">hello</p>');
  });
  
  mangleTest("changing element text once works", {
    mutateDOM: true,
    html: '<p  id="foo">hello</p>'
  }, function() {
    sm.text($("p"), "bar");
    equal($("p").textContent, "bar");
    equal(sm.serialize(), '<p  id="foo">bar</p>');
  });
})();
