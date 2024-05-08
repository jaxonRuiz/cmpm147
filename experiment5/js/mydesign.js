/* exported p4_inspirations, p4_initialize, p4_render, p4_mutate */


function getInspirations() {
  return [
    {
      name: "Hollow Knight Vessel", 
      assetUrl: "img/hk_vessel.png",
      credit: "Hollow Knight Vessel. Team Cherry"},

      {name: "Persona 5",
      assetUrl: "img/p5bg.png",
      credit: "Persona 5, Atlus Games"},

      {name: "Persona 3",
      assetUrl:"img/p3bg.png",
      credit: "Persona 3 Reload, Atlus Games",
      },

      {name: "Breath of The Wild",
      assetUrl: "img/botwbg.png",
      credit: "The Legend of Zelda: Breath of The Wild, Nintendo"
    }
  ];
}
let rangeFactor = 0.4;
function initDesign(inspiration) {
  //colorMode(HSB,255, 255,255,255)
  // set the canvas size based on the container
  let canvasContainer = $('.image-container'); // Select the container using jQuery
  let canvasWidth = canvasContainer.width(); // Get the width of the container
  let aspectRatio = inspiration.image.height / inspiration.image.width;
  let canvasHeight = canvasWidth * aspectRatio; // Calculate the height based on the aspect ratio
  resizeCanvas(canvasWidth, canvasHeight);
  //resizeCanvas(inspiration.image.width/4, inspiration.image.height/4);
  $(".caption").text(inspiration.credit); // Set the caption text

  // add the original image to #original
  const imgHTML = `<img src="${inspiration.assetUrl}" style="width:${canvasWidth}px;">`
  $('#original').empty();
  $('#original').append(imgHTML);

  
  let design = {
    bg: 125,
    colors: {
    red: [],
    blue: [],
    green: []}
  }
  let genR, genG, genB;
  switch(inspiration.name) {
    case "Persona 5":
      genR = 80;
      genG = 70;
      genB = 70;
      break;
    case "Persona 3":
      genR = 66;
      genG = 66;
      genB = 75;
      break;
    case "Hollow Knight Vessel":
      genR = 50;
      genG = 50;
      genB = 50;
      break;
    case "Breath of The Wild":
      genR = 60;
      genG = 60;
      genB = 70;
      break;
    default:
      genR = 66;
      genG = 66;
      genB = 66;
    }
  for(let i = 0; i < genR; i++) {
    design.colors.red.push({x: random(width),
      y: random(height),
      w: random(width/2),
      h: random(height/2),
      colorVal: random(255),
      alpha: random(125)})
    }
  for(let i = 0; i < genG; i++) {
    design.colors.green.push({x: random(width),
      y: random(height),
      w: random(width/2),
      h: random(height/2),
      colorVal: random(255),
      alpha: random(75, 125)})
    }
  for(let i = 0; i < genB; i++) {
    design.colors.blue.push({x: random(width),
      y: random(height),
      w: random(width/2),
      h: random(height/2),
      colorVal: random(255),
      alpha: random(75, 125)})
    }

  return design;
}

function renderDesign(design, inspiration) {
  background(design.bg);
  noStroke();
  for(let [colorName, boxes] of Object.entries(design.colors)){
    for(let box of boxes) {
      switch(inspiration.name) {
        case ("Breath of The Wild"):
          console.log("botw")
          // CMY
          switch(colorName){
            case "red":
             fill(box.colorVal, box.colorVal, 0, box.alpha);
             break;
           case "green":
             fill(0, box.colorVal, box.colorVal, box.alpha);
             break;
           case "blue":
             fill(box.colorVal, 0, box.colorVal, box.alpha);
             break;
           default:
             console.log("wtf");
         }
        break;
        case ("Hollow Knight Vessel"):
          // greyscale
          switch(colorName){
            case "red":
              fill(box.colorVal, box.colorVal, box.colorVal, box.alpha);
              break;
            case "green":
              fill(box.colorVal, box.colorVal, box.colorVal, box.alpha);
              break;
            case "blue":
              fill(box.colorVal, box.colorVal, box.colorVal, box.alpha);
              break;
            default:
              console.log("wtf");
          }
          break;
        case ("Persona 3"):
          switch(colorName){
             case "red":
              fill(box.colorVal, box.colorVal, 0, box.alpha);
              break;
            case "green":
              fill(0, box.colorVal, box.colorVal, box.alpha);
              break;
            case "blue":
              fill(box.colorVal, 0, box.colorVal, box.alpha);
              break;
            default:
              console.log("wtf");
          }
        break;
        default:
          // RGB
          switch(colorName){
            case "red":
              fill(box.colorVal, 0, 0, box.alpha);
              break;
            case "green":
              fill(0, box.colorVal, 0, box.alpha);
              break;
            case "blue":
              fill(0, 0, box.colorVal, box.alpha);
              break;
            default:
              console.log("wtf");
          }
          break;
    }
      
      rect(box.x, box.y, box.w, box.h);
    }
  }
}

function mutateDesign(design, inspiration, rate) {
  design.bg = mut(design.bg, 0, 255, rate);
  for(let [colorName, boxes] of Object.entries(design.colors)){
    for(let box of boxes) {
    
      //baseColor = inspiration.image.get(box.x, box.y)
      let baseColor = pixelCalc(box.x, box.y);
      //console.log(box.x, box.y, baseColor);
      //box.fill = baseColor[0], baseColor[1], baseColor[2];//mut(box.fill, 0, 255, rate);
      box.colorVal = mut2(box.colorVal, 0, 255, rate);
      box.alpha = mut2(box.alpha, 0, 255, rate);

      box.x = mut(box.x, 0, width, rate);
      box.y = mut(box.y, 0, height, rate);
      box.w = mut(box.w, 0, width/rangeFactor, rate);
      box.h = mut(box.h, 0, height/rangeFactor, rate);
    }
  }
}


function mut(num, min, max, rate) {
    return constrain(randomGaussian(num, (rate * (max - min)) / 10), min, max);
}
function mut2(num, min, max, rate) {
  return constrain(randomGaussian(num, (rate * (max - min)) / 5), min, max);
}
