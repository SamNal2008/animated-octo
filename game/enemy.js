let Enemy = function() {
    let color = 0xffff00;
    
    let xStart = 150 ;//|| (Math.random() * ((WIDTH * 2) - (-WIDTH/2)) + (-WIDTH/2));
    let yStart = 150 ;//|| (Math.random() * ((HEIGHT * 2) - (-HEIGHT/2)) + (-HEIGHT/2))
    this.position = new THREE.Vector2(xStart, yStart);
    this.material = new THREE.MeshLambertMaterial({
        color: color,
        });
    
    this.life = 3;
    var singleGeometry = new THREE.Geometry();

    vehiculeMesh = new THREE.ConeGeometry(5, 20, 32);
    this.graphic = new THREE.Mesh(vehiculeMesh, this.material);
    this.graphic.position.z = 6;

    this.graphic.rotateOnAxis(new THREE.Vector3(100,100,1), this.direction+(3*Math.PI/2));
}

Enemy.prototype.displayInfo = function () {
    jQuery('#'+this.name+' >.life').text(this.life);
}