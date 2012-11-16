"use strict";

module("VSOT");

test("splice works", function() {
  var vsot = new VSOT("hello there.");
  vsot.splice(0, 5, "SUP");
  equal(vsot.serialize(), "SUP there.");
});

test("insert-delete-delete works", function() {
  var vsot = new VSOT("hello there.");
  vsot.insert(0, "sup ");
  vsot.delete(6, 1);
  vsot.delete(2, 3);
  equal(vsot.serialize(), "sup he here.");
});

test("delete-insert-delete works", function() {
  var vsot = new VSOT("hello there.");
  vsot.delete(2, 3);
  vsot.insert(0, "sup ");
  vsot.delete(6, 1);
  equal(vsot.serialize(), "sup he here.");
});

test("ordered deletion works", function() {
  var vsot = new VSOT("hello there.");
  vsot.delete(2, 3);
  vsot.delete(6, 1);
  equal(vsot.serialize(), "he here.");
});

test("reverse ordered deletion works", function() {
  var vsot = new VSOT("hello there.");
  vsot.delete(6, 1);
  vsot.delete(2, 3);
  equal(vsot.serialize(), "he here.");
});

test("ordering of insertion at same index is preserved", function() {
  var vsot = new VSOT("hello there.");
  vsot.insert(0, "sup ");
  vsot.insert(0, "yo ");
  equal(vsot.serialize(), "sup yo hello there.");
});

test("ordered insertion works", function() {
  var vsot = new VSOT("hello there.");
  vsot.insert(0, "sup ");
  vsot.insert(5, " dogen");
  equal(vsot.serialize(), "sup hello dogen there.");
});

test("reverse ordered insertion works", function() {
  var vsot = new VSOT("hello there.");
  vsot.insert(5, " dogen");
  vsot.insert(0, "sup ");
  equal(vsot.serialize(), "sup hello dogen there.");
});

test("changing an insertion works", function() {
  var vsot = new VSOT("hello there.");
  var insertion = vsot.insert(0, "sup ");
  equal(insertion.string, "sup ");
  insertion.string = "meh ";
  equal(vsot.serialize(), "meh hello there.");
});

test("changing a splice works", function() {
  var vsot = new VSOT("hello there.");
  var splice = vsot.splice(0, 3, "sup");
  equal(splice.string, "sup");
  splice.string = "meh";
  equal(vsot.serialize(), "mehlo there.");
});
