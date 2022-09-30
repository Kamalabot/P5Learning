var canv;
function setup(){
    canv = createCanvas(300,300)
    canv.position(0,1700)
}

function draw(){
    clear()
    fill(220,0,mouseX,75)
    rect(50,70,150,280)
}

function mousePressed(){
    canv.position(0,1700 + mouseX * 0.2)
}