// Get the modal
var modal = document.getElementById("info-modal");

// Get the button that opens the modal
var infobtn = document.querySelector(".info-btn");


// When the user clicks the button, open the modal 
infobtn.onclick = function() {
  modal.style.display = modal.style.display === 'none' ? 'block' : 'none';

  this.classList.add('highlight');

  setTimeout(() => {
    this.classList.remove('highlight');
  }, 100);
}

cSlider.addEventListener('input', function() {
  let C_val = parseFloat(this.value);
  svmC = Math.pow(10, C_val);
  cValueDisplay.textContent = svmC.toPrecision(2);
  reModel();
});

sigmaSlider.addEventListener('input', function() {
  let Sig_val = parseFloat(this.value);
  rbfKernelSigma = Math.pow(10, Sig_val);
  sigmaValueDisplay.textContent = rbfKernelSigma.toPrecision(2);
  reModel();
});


function updateInfo() {
  convergeValueDisplay.textContent = trainstats.iters;
  numVectorValueDisplay.textContent = svm.N + " / " + N;
}

updateInfo();