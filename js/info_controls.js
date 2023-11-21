// Get the modal
var modal = document.getElementById("info-modal");

// Get the button that opens the modal
var infobtn = document.querySelector(".info-btn");


// When the user clicks the button, open the modal 
infobtn.onclick = function() {
  modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
}
