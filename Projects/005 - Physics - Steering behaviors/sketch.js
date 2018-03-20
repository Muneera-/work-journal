const VEHICLES = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    for(let i = 0; i < 50; i++) {
        VEHICLES.push(new Vehicle(random(width), random(height)));
    }
}

function draw() {
    background(200);

    for(let vehicle of VEHICLES) {
        vehicle.align(VEHICLES);
        vehicle.separate(VEHICLES);
        vehicle.update();
        vehicle.checkEdges();
        vehicle.draw();
    }
}

function mousePressed() {
    VEHICLES.push(new Vehicle(mouseX, mouseY));
}