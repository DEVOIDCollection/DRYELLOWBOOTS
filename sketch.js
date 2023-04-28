let img1;
let img2;
let angleX = 1;
let angleY = 0;
let scaleVal = 0.55;
let fogDensity = 0.005;

let imgWidth, imgHeight;
let cameraX = 0;
let cameraY = 0;
let time = 0;
let logoImg;

function preload() {
logoImg = loadImage('https://i.ibb.co/M2xKNV6/YELLOWBOOTSTITLE.png');
  img1 = loadImage('https://i.ibb.co/FKT0KfW/DR-YELLOWBOOTSP1.png');
  img2 = loadImage('https://i.ibb.co/RPmCWxK/DR-YELLOWBOOTSP2.png');
}

function setup() {
  createCanvas(1000, 1000, WEBGL);
  
  noStroke();
  imgWidth = img1.width;
  imgHeight = img1.height;
  perspective(50 / 180 * PI, width/height, 0.1, 5000);
  ambientLight(10);
  directionalLight(145, 125, 255, 0, 0, -1);
  
    // Set the renderer to support transparency
  setAttributes('premultipliedAlpha', true);
  // Define the blend mode constants
  const ONE = 1;
  const ONE_MINUS_SRC_ALPHA = 0x0303;

  // Set the blend mode
  blendMode(ONE, ONE_MINUS_SRC_ALPHA);
}

function draw() {
  background(10);
// Draw the logo image in the bottom right corner
  push();
  translate(width/2 - logoImg.width/2, height/2 - logoImg.height/2);
scale(0.08);
  image(logoImg, -800, 5000);
  pop();
  scale(scaleVal);
  rotateX(angleX);
  rotateY(angleY);
  


  // Create the plane object with both images on opposite sides
  push();
  translate(0, 0, -imgWidth/200);
  rotateZ(PI);
  scale(1, -1);
  texture(img2);
  plane(imgWidth, imgHeight);
  pop();
  
  push();
  translate(0, 0, imgWidth/1200);
  texture(img1);
  plane(imgWidth, imgHeight);
  pop();
  
  
  restingAnimation(); // Call the restingAnimation() function
}
  
function restingAnimation() {
  // Use Perlin noise to generate smoothly changing values for each axis
  let xNoise = noise(time + 5250);
  let yNoise = noise(time + 4000);
  let xMotion = map(xNoise, 0, 1, -0.01, 0.01);
  let yMotion = map(yNoise, 0, 1, -0.005, 0.005);

  // Add the motion values to the current angles
  angleX += yMotion;
  angleY += xMotion;

  // Constrain the angles to a certain range
  angleX = constrain(angleX, -0.25, 0.25);
  angleY = atan2(sin(angleY), cos(angleY));

  // Increment the time value
  time += 0.001;
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    angleX += 0.1;
  } else if (keyCode === DOWN_ARROW) {
    angleX -= 0.1;
  } else if (keyCode === LEFT_ARROW) {
    angleY += 0.1;
  } else if (keyCode === RIGHT_ARROW) {
    angleY -= 0.1;
  } else if (key === '+') {
    scaleVal += 0.1;
  } else if (key === '-') {
    scaleVal -= 0.1;
  }
}

function touchStarted() {
  // Check if there is only one touch point
  if (touches.length === 1) {
    // Store the initial touch position for later use
    touchX = touches[0].x;
    touchY = touches[0].y;
  }
}

function touchMoved() {
  // Check if there is only one touch point
  if (touches.length === 1) {
    // Calculate the touch movement
    let dx = touches[0].x - touchX;
    let dy = touches[0].y - touchY;

    // Rotate on Z-axis
    angleY += dx * 0.01;
    
    // Pan on X-axis
    cameraX += dx * 0.1;
    
    // Pan on Y-axis
    cameraY += dy * 0.1;

    // Set the camera position
    camera(cameraX, cameraY, height/2 / tan(PI*30/180), 0, 0, 0, 0, 1, 0);

    // Store the current touch position for later use
    touchX = touches[0].x;
    touchY = touches[0].y;
  }
}

function touchEnded() {
  // Reset the touch position variables
  touchX = null;
  touchY = null;
}

function mouseDragged() {
  // Check if there is only one mouse button pressed
  if (mouseButton === LEFT) {
    // Rotate on Z-axis
    angleY += (mouseX - pmouseX) * 0.01;
    
    // Pan on X-axis
    cameraX += (mouseX - pmouseX) * 0.1;
    
    // Pan on Y-axis
    cameraY += (mouseY - pmouseY) * 0.1;

    // Set the camera position
    camera(cameraX, cameraY, height/2 / tan(PI*30/180), 0, 0, 0, 0, 1, 0);
  }
}

function mouseReleased() {
  // Reset the touch position variables
  touchX = null;
  touchY = null;
}


function mouseWheel(event) {
  scaleVal += event.delta * 0.01;
  scaleVal = constrain(scaleVal, 0.1, 10);
}

