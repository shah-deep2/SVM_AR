
// console.log(model_entity);
model_entity.add(plot_grp);

function reModelClick(element) {
    element.classList.add('highlight');

    reModel();

    setTimeout(() => {
        element.classList.remove('highlight');
    }, 200);
}

function reModel() {
    retrainSVM();
    generateModel();
    updateSpheres();
    updateInfo();
}