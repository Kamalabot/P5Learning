//setup the canvas for starting
function setup(){
    createCanvas(400,400)
}
//working on the drawing
function draw(){
    background(200,210,15)
    
    describe('white rect with black outline in mid-right of canvas');
    
    circle(175,50,25)

    triangle(50,50,75,105,105,105)

    line(5,7,78,80)

    fill(57,57,75)
    rectMode(CORNER)
    rect(10,70,50,100,15) //woah..goes straight to make the rect
    
    fill(50,78,125)
    circle(200,200,100)
    
    fill(255)
    circle(180,180,20)

    fill(255)
    circle(240,180,20)

    fill(255)
    triangle(195,200,205,200,200,195)

    


}