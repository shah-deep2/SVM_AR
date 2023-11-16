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

svm_plane.addEventListener("loaded", (e) => {
  // graph = this.el.getObject3D('mesh');
  // var graphw = new THREE.Mesh(graphGeom, graphMat);
  // console.log(graphw);
  graph = document.getElementById("svm_plane").getObject3D('mesh');

  graph.geometry = graphGeom;
  graph.material = graphMat;

  generateModel();

  graph.name = "SVM_model";
  plot_grp.add(graph);
});




function generateModel() {
    
  // // f(x,z)
  let pos = graphGeom.attributes.position;
  // console.log(pos);
  for(let i = 0; i < pos.count; i++){
    let x = pos.getX(i);
    let z = pos.getZ(i);

    var dec = svm.marginOne([x, z]);

    if(dec>0) {
      three_color.setHex(0x64c864);
    }
    else {
      three_color.setHex(0xc86464);
    //  console.log(x, z, dec);
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

var sphereList = new Array();

function addSphere(color, x, z, y=0, size=0.032) {
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
  // plot_grp.add( sphere );
  scene.add(sphere);
  // console.log(sphere);
  plot_grp.attach(sphere);

  sphereList.push(sphere);
  // console.log(sphere);
  // console.log(x,y,z);

  if(Math.abs(sphere.position.y) != 2) {
    data.push([sphere.position.x, sphere.position.z]);
    if(color=='g') {
        labels.push(1);
    } else {
        labels.push(-1);
    }
  }
}

for(let i = 0; i < data.length; i++) { 
  if(labels[i]>0) 
    addSphere('g', data[i][0], data[i][1], labels[i]*2, 0.096);
  else
    addSphere('r', data[i][0], data[i][1], labels[i]*2, 0.096);
  
    // console.log(data[i], svm.marginOne(data[i]));
}

plot_grp.scale.set(0.3, 0.3, 0.3);
plot_grp.rotateX(Math.PI * -0.5);
plot_grp.rotateY(Math.PI * -0.5);


