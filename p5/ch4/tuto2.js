var xCoord = 35;
var rad;
var backg = 0;
//setup the canvas for starting
function setup(){
    createCanvas(400,400)
    frameRate(25)
    console.log(backg)
}
//working on the drawing, that is running continuously at 60 Hz
function draw(){
    background(backg)
    noStroke()
    fill(random(60,170),random(10,255),random(0,150))
    rad = random(10,50)
    circle(xCoord,mouseY,rad)
    xCoord = xCoord + 5
    //this can be return as xCoord += 5 and this kind of operators can 
    //use with *, / and -
    backg = map(mouseY,0,height,0,255) 
} 

function mousePressed(){
    background(0)
    xCoord = 35
}

let sketch = function(p) {
    p.setup = function(){  
        p.createCanvas(400,400)
        p.background(0)
        p.noStroke()
        p.fill(255)
        p.circle(mouseX,mouseY,25)
        
        p.fill(50,78,125)
        p.circle(200,200,100)

        p.fill(150,200,0)
        p.circle(180,180,20)

        p.fill(150,86)
        p.circle(240,180,20)
    
    }
  };
new p5(sketch, window.document.getElementById("container"));