/* global AFRAME, THREE */

var isMarkerVisible = false;

AFRAME.registerComponent("gesture-handler", {
  schema: {
    enabled: { default: true },
    rotationFactor: { default: 5 },
    minScale: { default: 0.3 },
    maxScale: { default: 8 },
  },

  init: function () {
    this.handleScale = this.handleScale.bind(this);
    this.handleRotation = this.handleRotation.bind(this);

    
    this.initialScale = this.el.object3D.scale.clone();
    this.scaleFactor = 1;

    this.el.sceneEl.addEventListener("markerFound", (e) => {
      isMarkerVisible = true;
    });

    this.el.sceneEl.addEventListener("markerLost", (e) => {
      isMarkerVisible = false;
    });
  },

  update: function () {
    if (this.data.enabled) {
      this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
    } else {
      this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
    }
  },

  remove: function () {
    this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
    this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
  },

  handleRotation: function (event) {
    if (isMarkerVisible) {
      this.el.object3D.rotation.y +=
        event.detail.positionChange.x * this.data.rotationFactor;
      this.el.object3D.rotation.x +=
        event.detail.positionChange.y * this.data.rotationFactor;
    }
  },

  handleScale: function (event) {
    if (isMarkerVisible) {
      this.scaleFactor *=
        1 + event.detail.spreadChange / event.detail.startSpread;

      this.scaleFactor = Math.min(
        Math.max(this.scaleFactor, this.data.minScale),
        this.data.maxScale
      );

      this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
      this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
      this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
    }
  },
});


AFRAME.registerComponent('plane-touch', {
  init: function () {
    var el = this.el;
    console.log(el);
    el.addEventListener('click', (e) => {   
      e.preventDefault();
      if (isMarkerVisible && (e.target.id == 'svm_plane')) {  
        console.log(e);
        let intersects = e.detail.intersection;
        console.log(intersects);
        console.log(e.target.id);

        let px, py;
        try {
          px = intersects.point.x;
          py = intersects.point.y;
        } catch (error) {
          console.log(error);
        }

        // console.log("Marker", document.getElementById("markerA").object3D.position);
        // console.log("svm_plane", document.getElementById("svm_plane").object3D.position);
        let zcor = document.getElementById("markerA").object3D.position.z;
        // let local = document.getElementById("scene").object3D.worldToLocal(new THREE.Vector3(zcor, zcor, zcor));
        // console.log(local);
        if(intersects) {
            // document.getElementById("yellow-sphere").setAttribute("position", {x: px, y: py, z: document.getElementById("markerA").object3D.position.z})
            addSphere('r', px, zcor, py);
        }
      }
    });
  }
});