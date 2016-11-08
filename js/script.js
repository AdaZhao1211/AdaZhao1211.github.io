function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}




$(document).ready(function(){
  // Get the button that opens the modal
  var btn = $(".modalimg");

  // Get the <span> element that closes the modal
  var span = $(".close");
  var thismodal;
  var themodal;
  // When the user clicks the button, open the modal
  btn.click(function() {
    thismodal = btn.attr("id");
    thismodal += "modal"
    themodal = $("#"+thismodal);
    themodal.show();
  })

  // When the user clicks on <span> (x), close the modal
  span.click(function() {
    themodal.hide();
  })

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target.className == "modalBox") {
          themodal.hide();
      }
  }
})
