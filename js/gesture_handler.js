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
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseRotation = this.mouseRotation.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    
    this.initialScale = this.el.object3D.scale.clone();
    this.scaleFactor = 1;
    this.lastMouseX; 
    this.lastMouseY; 
    this.isRotating = false;

    this.el.sceneEl.addEventListener("markerFound", (e) => {
      isMarkerVisible = true;
    });

    this.el.sceneEl.addEventListener("markerLost", (e) => {
      isMarkerVisible = false;
    });
  },

  update: function () {
    if (this.data.enabled && move_enable) {
      this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
      this.el.sceneEl.addEventListener("mousedown",  this.mouseDown);
      this.el.sceneEl.addEventListener("mousemove",  this.mouseRotation);
      this.el.sceneEl.addEventListener("mouseup",  this.mouseUp);
    } 
    else {
      this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
      this.el.sceneEl.removeEventListener("mousedown",  this.mouseDown);
      this.el.sceneEl.removeEventListener("mousemove",  this.mouseRotation);
      this.el.sceneEl.removeEventListener("mouseup",  this.mouseUp);
    }
  },

  remove: function () {
    this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
    this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
    this.el.sceneEl.removeEventListener("mousedown",  this.mouseDown);
    this.el.sceneEl.removeEventListener("mousemove",  this.mouseRotation);
    this.el.sceneEl.removeEventListener("mouseup",  this.mouseUp);
  },

  handleRotation: function (event) {
    if (isMarkerVisible && move_enable) {
      this.el.object3D.rotation.x +=
        event.detail.positionChange.y * this.data.rotationFactor;
      this.el.object3D.rotation.z +=
        event.detail.positionChange.x * this.data.rotationFactor * rotationMultiplier;
    }
  },

  handleScale: function (event) {
    if (isMarkerVisible && move_enable) {
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

  mouseDown: function(event) {
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
    this.isRotating = true;
  },

  mouseRotation: function(event) {
    event.preventDefault();
    if (this.isRotating && isMarkerVisible) {
        let deltaX = event.clientX - this.lastMouseX;
        let deltaY = event.clientY - this.lastMouseY;

        this.el.object3D.rotation.x += deltaY / 200;
        this.el.object3D.rotation.z += deltaX / 200 * rotationMultiplier;

        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;
    }
  },

  mouseUp: function(event) {
    this.isRotating = false;
  },
});