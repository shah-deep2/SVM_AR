var plot_grp = new THREE.Group();
plot_grp.add(new THREE.AmbientLight(0xffffff, 0.5));

// let grid = new THREE.GridHelper(10, 20, 0xb49600, 0xb49600);
// let axes = new THREE.AxesHelper(2);
// markerA.add( axes);

var graphGeom = new THREE.PlaneGeometry(10, 10, 50, 50);
graphGeom.rotateX(Math.PI * -0.5);

const count = graphGeom.attributes.position.count;
const three_color = new THREE.Color();

graphGeom.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
const graph_colors = graphGeom.attributes.color;

// console.log(graphGeom);
let graphMat = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, wireframe: false, transparent: true, opacity:0.85, vertexColors: true,});

var graph;

var sphereList = new Array();

svm_plane.addEventListener("loaded", (e) => {
  // var graphw = new THREE.Mesh(graphGeom, graphMat);
  graph = document.getElementById("svm_plane").getObject3D('mesh');

  graph.geometry = graphGeom;
  graph.material = graphMat;

  generateModel();

  graph.name = "SVM_model";
  plot_grp.add(graph);
});

for(let i = 0; i < data.length; i++) { 
  let y = svm.marginOne(data[i]) * 2;
  if(labels[i]>0) 
    addSphere('g', data[i][0], y, data[i][1], 0.096, false);
  else
    addSphere('r', data[i][0], y, data[i][1], 0.096, false);
}

plot_grp.scale.set(0.3, 0.3, 0.3);
plot_grp.rotateX(Math.PI * -0.5);
plot_grp.rotateY(Math.PI * -0.5);


function generateModel() {
    
  // // f(x,z)
  let pos = graphGeom.attributes.position;

  for(let i = 0; i < pos.count; i++){
    let x = pos.getX(i);
    let z = pos.getZ(i);

    var dec = svm.marginOne([x, z]);

    if(dec>0) {
      three_color.setHex(0x64c864);
    }
    else {
      three_color.setHex(0xc86464);
    }

    graph_colors.setXYZ(i, three_color.r, three_color.g, three_color.b);
    
    pos.setY(i, dec*2);
    // console.log(pos.getX(i), pos.getY(i), pos.getZ(i));
  }

  // console.log(pos);
  graphGeom.attributes.position.needsUpdate = true;
  graphGeom.attributes.color.needsUpdate = true;
  graphGeom.computeVertexNormals(); 
}


function addSphere(color, x, y, z, size=0.032, user_added=true) {
  if(color=='g') {
      var color_rgb = 'rgb(100,180,100)';
  } else if(color=='r') {
      var color_rgb = 'rgb(180,100,100)';
  } else {
      console.error("Color Error");
      return
  }

  const geometry2 = new THREE.SphereGeometry(size, 32, 16 ); 
  const material2 = new THREE.MeshBasicMaterial( { color: color_rgb } ); 
  const sphere = new THREE.Mesh( geometry2, material2 ); 
  sphere.position.set(x, y, z);
  
  scene.add(sphere);

  plot_grp.attach(sphere);

  if(user_added) {
    data.push([sphere.position.x, sphere.position.z]);
    if(color=='g') {
        labels.push(1);
    } else {
        labels.push(-1);
    }
    N += 1;
  }
  
  sphereList.push(sphere);

}

function updateSpheres() {
  sphereList.forEach(sphere => {
    sphere.position.y = svm.marginOne([sphere.position.x, sphere.position.z]) * 2;
  });
}


