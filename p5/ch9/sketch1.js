
var textSpace;
var rad;
var dblClk;
//setup the canvas for starting
function setup(){
    rad = createCanvas(200,200)
    rad.position(100,250)
    frameRate(25)
    textSpace = document.getElementById("domCreate")
}
//working on the drawing, that is running continuously at 60 Hz
function draw(){
    background(100,200,0)
    textSize(40)
    fill(250,0,0)
    text('clickMe',50,100)
    
    if (dblClk == 'yes'){
        textSize(20)
        text('doubleClicked',5,150)
    }
} 

function mousePressed(){
    createP(`You have clicked me at ${mouseX},${mouseY} coordinates.`)
        .parent(textSpace)
}

function doubleClicked(){
    dblClk = 'yes'
}