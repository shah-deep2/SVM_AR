
function addPoint(color) {

    if(color == 'red') {
        red_btn = true;
        current_data_color = 'r';
    } else if (color == 'green') {
        green_btn = true;
        current_data_color = 'g';
    } else {
        console.log("Wrong Color Error");
        return
    }

    move_enable = false;

    svm_plane.addEventListener('click', handlePointAdd);
}
    
function handlePointAdd(e)  {
    try {
        e.preventDefault();

        if (isMarkerVisible && (e.target.id == 'svm_plane')) {  
            // console.log(e);

            let intersects = e.detail.intersection;

            // console.log(intersects);

            let px, py, pz;
            px = intersects.point.x;
            py = intersects.point.y;
            pz = intersects.point.z;

            // console.log("Marker", document.getElementById("markerA").object3D.position);
            // console.log("svm_plane", document.getElementById("svm_plane").object3D.position);
            // let zcor = document.getElementById("markerA").object3D.position.z;

            if(intersects) {
                addSphere(current_data_color, px, py, pz);
            }
        }
    } catch (error) {
        console.log("Error adding data point: ", error);
    } finally {
        endPointAdd();
    }
};

function endPointAdd() {
    svm_plane.removeEventListener('click', handlePointAdd);
    move_enable = true;
    current_data_color = null; 
    green_btn = false;
    red_btn = false;
}