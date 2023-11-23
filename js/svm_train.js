

//////////////////////////////////////////////////////////////////////////////////
//		SVM Model Creation
//////////////////////////////////////////////////////////////////////////////////


var N = 10; //number of data points
var data = new Array(N);
var labels = new Array(N);
var svm = new svmjs.SVM();
var rbfKernelSigma = 0.5;
var svmC = 1.0;

function myinit(){
  
  data = [[-0.4326  ,  1.1909 ], [3.0, 4.0], [0.1253 , -0.0376   ], [0.2877 ,   0.3273  ], [-1.1465 ,   0.1746 ], [1.8133 ,   2.1139  ], [2.7258 ,   3.0668  ], [1.4117 ,   2.0593  ], [4.1832 ,   1.9044  ], [1.8636 ,   1.1677  ] ];
  labels = [1, 1, 1, 1, 1, -1, -1, -1, -1, -1];
  
  retrainSVM();
}

function retrainSVM() {
    var trainstats = svm.train(data, labels, { kernel: 'rbf', rbfsigma: rbfKernelSigma, C: svmC});
}

myinit();