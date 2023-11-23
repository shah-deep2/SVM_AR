/**
 * AR elements from AFrame
 */
const scene = document.getElementById("scene").object3D;
const model_entity = document.getElementById("model_entity").object3D;
const markerA = document.getElementById("markerA").object3D;
const svm_plane = document.getElementById("svm_plane");

/**
 * UI Elements
 */
const greenBtnElem = document.getElementById('greenBtn');
const redBtnElem = document.getElementById('redBtn');
const cSlider = document.getElementById('c-slider');
const sigmaSlider = document.getElementById('sigma-slider');
const cValueDisplay = document.getElementById('c-value');
const sigmaValueDisplay = document.getElementById('sigma-value');
const convergeValueDisplay = document.getElementById('converge-val');
const numVectorValueDisplay = document.getElementById('num-vector');


/**
 * UI Handling Parameters
 */
var green_btn = false;
var red_btn = false;
var refresh_btn = false;
var move_enable = true;
var isMarkerVisible = false;
var current_data_color = null; 


/**
 * SVM Model Training Parameters
 */
var N = 10; //number of data points
var data = new Array(N);
var labels = new Array(N);
var svm = new svmjs.SVM();
var rbfKernelSigma = 0.5;
var svmC = 1.0;
var trainstats;

document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});