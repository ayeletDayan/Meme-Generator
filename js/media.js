'use strict'

var gSize = 20;
var gXmedia = 0;
var gYmedia = 0;
var x = window.matchMedia("(max-width: 700px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes

function myFunction(x) {
  if (x.matches) { // If media query matches
    document.body.style.backgroundColor = "rgb(64, 88, 88)";
    let elCanvas = document.querySelector("canvas");
    elCanvas.style.width = "300px";
    elCanvas.style.height = "300px";
  }
  else {
    document.body.style.backgroundColor = "rgb(112, 82, 119)";
    gSize = 40;
    gXmedia = 20;
    gYmedia = 0;
  }
}