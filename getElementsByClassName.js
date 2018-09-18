// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
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