var xCoord = 35
//setup the canvas for starting
function setup(){
    createCanvas(400,400)
    background(0)
    frameRate(25)
    
}
//working on the drawing, that is running continuously at 60 Hz
function draw(){

    describe('white rect with black outline in mid-right of canvas');
    noStroke()
    fill(255)
    
    circle(xCoord,mouseY,25)
    xCoord = xCoord + 5
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