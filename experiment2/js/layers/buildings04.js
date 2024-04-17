// building layer 4
class Buildings04 {
    constructor() {
        this.buildings = [];
        this.numBuildings = random(Math.floor(width/191), Math.floor(width/109));
        // generate the random buildings
        for (let i=0; i<this.numBuildings; i++) {
            // generating positions with amount of randomness
            let x_pos = map(i, 0, this.numBuildings, 0-(width*0.05), width*1.05);
            let y_pos = map(i, 0, this.numBuildings, height/16, height/7);
            x_pos = x_pos * random(0.8, 1.2);
            y_pos = y_pos * random(0.8, 1.2);

            let building = new BuildingV1(x_pos, y_pos, 4, 80, 60, 30, 7);
            this.buildings.push(building);
        }
    }

    // update for layer, drawing each building as needed
    draw() {
        this.buildings.forEach(building => {
            building.draw();

            let moveOffsetX = map(mouseX, 0, width, -width/128, width/128)
            let moveOffsetY = map(mouseY, 0, height, -height/256, height/256);

            building.move(moveOffsetX, moveOffsetY);
        });
    }
}