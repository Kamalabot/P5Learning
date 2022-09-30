
var textSpace;
var rad;
var dblClk;

var textBox; 
var slide;

var controlSpace;
//setup the canvas for starting
function setup(){
    rad = createCanvas(200,200)
    rad.position(100,250)
    frameRate(25)
    textSpace = document.getElementById("domCreate")
    controlSpace = document.getElementById('sketch')

    textBox = createInput('Enter your Name')
        .parent(controlSpace)
    
    textBox.changed(updatePara)
    textBox.mouseOver(hovering)
    textBox.mouseOut(unHovering)

    slide = createSlider(17,157,65)
        .parent(controlSpace)
    
    slide.mouseOver(hovering)
    slide.mouseOut(unHovering)
        
    
    textOut = createP('Some Text will Come')
        .parent(textSpace)

}

function unHovering(){
    textOut.class('bg-blue')
    textOut.html(`You left an element`)
}

function hovering(){
    textOut.class('bg-green')
    textOut.html(`You are on top of an elment`)
}

function updatePara(){
    textOut.class('bg-pink')
    textOut.html(`Your update is ${textBox.value()}`)
}

//working on the drawing, that is running continuously at 60 Hz
function draw(){
    background(100,200,0)
    textSize(slide.value())
    fill(250,0,0)
    text('clickMe',50,100)
    
    if (dblClk == 'yes'){
        textSize(20)
        text('doubleClicked',5,150)
    }
} 

function mousePressed(){
    createP(`You have clicked me at ${mouseX.toFixed(1)},${mouseY.toFixed(1)} coordinates.`)
        .parent(textSpace)
}

function doubleClicked(){
    dblClk = 'yes'
}