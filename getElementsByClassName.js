// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // your code here
  var result = [];
  var hasClass = function(node, className){
    for (var i = 0; i < node.childNodes.length; i++){
      var classes = node.childNodes[i].classList;
      if (classes && classes.contains(className)) {
        result.push(node.childNodes[i]);
      }
      if (node.childNodes[i].childNodes[0]){
        hasClass(node.childNodes[i], className);
      }
    }
  }
    hasClass(document, className);
    return result;
  };



//   var hasClass = function(node, className){
//     //var classesArr = classesArr.push(node.className.split(' '));
//     if (document.body.classList.contains(className)){
//       result.push(getclass(document.body(className.split(' ')));
// document.body.classList.contains('my-class-name')

// https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
// Element.classList.contains( String )
// ie div.classList.contains('foo')
//https://developer.mozilla.org/en-US/docs/Web/API/NodeList
//https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes
//var nodeList = elementNodeReference.childNodes; 

// $("body").hasClass("your-class-name").toString();

// var classes = element.className.split(' ');
