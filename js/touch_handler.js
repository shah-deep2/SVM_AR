
function addPoint(color) {
    if(color == 'red') {
        greenBtnElem.classList.remove('highlight');
        red_btn = true;
        current_data_color = 'r';
        redBtnElem.classList.add('highlight');
    } 
    else if (color == 'green') {
        redBtnElem.classList.remove('highlight');
        green_btn = true;
        current_data_color = 'g';
        greenBtnElem.classList.add('highlight');
    } 
    else {
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

            let intersects = e.detail.intersection;
            let px, py, pz;
            px = intersects.point.x;
            py = intersects.point.y;
            pz = intersects.point.z;

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
    greenBtnElem.classList.remove('highlight');
    redBtnElem.classList.remove('highlight');
}