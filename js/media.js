
'use strict'

  var x = window.matchMedia("(max-width: 700px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes
  
  function myFunction(x) {
    if (x.matches) { // If media query matches
      document.body.style.backgroundColor = "rgb(64, 88, 88)";
    } else {
     document.body.style.backgroundColor = "pink";
    }
  }