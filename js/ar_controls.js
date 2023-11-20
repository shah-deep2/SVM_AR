
// console.log(model_entity);
model_entity.add(plot_grp);

function reModel() {
    retrainSVM();
    generateModel();
    updateSpheres();
}