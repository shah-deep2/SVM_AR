var plot_grp = new THREE.Group();
plot_grp.add(new THREE.AmbientLight(0xffffff, 0.5));

// let grid = new THREE.GridHelper(10, 20, 0xb49600, 0xb49600);
// let axes = new THREE.AxesHelper(2);
// scene.add(grid, axes);

var graphGeom = new THREE.PlaneGeometry(10, 10, 50, 50);
graphGeom.rotateX(Math.PI * -0.5);

const count = graphGeom.attributes.position.count;
const color = new THREE.Color();

graphGeom.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
const graph_colors = graphGeom.attributes.color;

// console.log(graphGeom);
let graphMat = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, wireframe: false, transparent: true, opacity:0.8, vertexColors: true,});

var graph;

AFRAME.registerComponent("plane-comp", {
  init: function() {
    this.el.addEventListener("loaded", (e) => {
      // graph = this.el.getObject3D('mesh');
      // var graphw = new THREE.Mesh(graphGeom, graphMat);
      // console.log(graphw);
      graph = document.getElementById("svm_plane").getObject3D('mesh');

      graph.geometry = graphGeom;
      graph.material = graphMat;

      generateModel();

      graph.name = "SVM_model";
      // plot_grp.add(graph);
    })
  }
})



function generateModel() {
    
  // // f(x,z)
  let pos = graphGeom.attributes.position;
  // console.log(pos);
  for(let i = 0; i < pos.count; i++){
    let x = pos.getX(i);
    let z = pos.getZ(i);

    var dec= svm.marginOne([x, z]);

    if(dec>0) {
      color.setHex(0x64c864);
    }
    else {
      color.setHex(0xc86464);
    //  console.log(x, z, dec);
    }

    graph_colors.setXYZ(i, color.r, color.g, color.b);
    
    pos.setY(i, dec*2);
    // console.log(pos.getX(i), pos.getY(i), pos.getZ(i));
  }

  // console.log(pos);
  graphGeom.computeVertexNormals(); 
}


function addSphere(color, x, z, y=0) {
  if(color=='g'){
    color = 'rgb(100,180,100)';
  } else {
    color = 'rgb(180,100,100)';
  }
  const geometry2 = new THREE.SphereGeometry( 0.085, 32, 16 ); 
  const material2 = new THREE.MeshBasicMaterial( { color: color } ); 
  const sphere = new THREE.Mesh( geometry2, material2 ); 
  sphere.position.set(x, y, z);
  plot_grp.add( sphere );
  // model_entity.add(sphere);
  
  console.log(x,y,z);
}

for(let i = 0; i < data.length; i++) { 
  if(labels[i]>0) 
    addSphere('g', data[i][0], data[i][1], labels[i]*2);
  else
    addSphere('r', data[i][0], data[i][1], labels[i]*2);
  
    // console.log(data[i], svm.marginOne(data[i]));
}

// plot_grp.scale.set(0.3, 0.3, 0.3);
// plot_grp.rotateX(Math.PI * -0.5);
// plot_grp.rotateY(Math.PI * -0.5);


