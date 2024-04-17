// building layer 1
class Buildings01 {
    constructor() {
        console.log(width)
        console.log(height)
        this.buildings = [];
        this.numBuildings = random(Math.floor(width/65), Math.floor(width/48));
        // generate the random buildings
        for (let i=0; i<this.numBuildings; i++) {
            // generating positions with amount of randomness
            let x_pos = map(i, 0, this.numBuildings, 0-(width*0.05), width*1.05);
            
            let y_pos = map(i, 0, this.numBuildings, height/3, height/2);

            x_pos = x_pos * random(0.9, 1.1);            
            y_pos = y_pos * random(0.7, 1.6);

            let building = new BuildingV1(x_pos, y_pos, 1, 40, 45, 30, 12);
            this.buildings.push(building);
        }
    }

    // update for layer, drawing each building as needed
    draw() {
        this.buildings.forEach(building => {
            building.draw();

            let moveOffsetX = map(mouseX, 0, width, -width/32, width/32);
            let moveOffsetY = map(mouseY, 0, height, -height/82, height/82);

            building.move(moveOffsetX, moveOffsetY);
        });
    }
}