// building layer 2
class Buildings02 {
    constructor() {
        this.buildings = [];
        this.numBuildings = random(Math.floor(width/77), Math.floor(width/59));
        // generate the random buildings
        for (let i=0; i<this.numBuildings; i++) {
            // generating positions with amount of randomness
            let x_pos = map(i, 0, this.numBuildings, 0-(width*0.05), width*1.05);
            let y_pos = map(i, 0, this.numBuildings, height/5.5, height/2.2);
            x_pos = x_pos * random(0.9, 1.1);
            y_pos = y_pos * random(0.7, 1.5);

            let building = new BuildingV1(x_pos, y_pos, 2, 50, 40, 30, 7);
            this.buildings.push(building);
        }
    }

    // update for layer, drawing each building as needed
    draw() {
        this.buildings.forEach(building => {
            building.draw();

            let moveOffsetX = map(mouseX, 0, width, -width/42, width/42)
            let moveOffsetY = map(mouseY, 0, height, -height/102, height/102);

            building.move(moveOffsetX, moveOffsetY);
        });
    }
}