
var textSpace;
var rad;
var dblClk;

var textBox; 
var slide;

var controlSpace;

var loadedImages = [];

var myButton;
var myList;

var remBu;

//setup the canvas for starting
function preload(){
    for(var x = 1; x < 10; x++){
        loadedImages.push(new loadImage(`pics/pic${1}.jpg`))
    }
}


function setup(){
    rad = createCanvas(200,200)
    rad.parent('#sketch') //don't select it as done below, directly make it a parent
    frameRate(25)
    textSpace = document.getElementById("domCreate")
    controlSpace = document.getElementById('sketch')
    createP('').parent('#sketch')
    textBox = createInput('Enter your Name')
        .parent('#sketch')
    
    textBox.changed(updatePara)
    textBox.mouseOver(hovering)
    textBox.mouseOut(unHovering)
    createP('').parent('#sketch')
    slide = createSlider(17,157,65)
        .parent('#sketch')
    
    slide.mouseOver(hovering)
    slide.mouseOut(unHovering)
        
    
    textOut = createP('Some Text will Come')
        .parent(textSpace)


    myButton = select('#myButton')
    myButton.mouseClicked(getPictures)
    //How about list of happy faces???
     
    remBu = select("#remPics")
    remBu.mouseClicked(removeAllPics)
}
var i = 1;

// function getPictures(){
//     console.log('button pressed')
//     createElement('img')
//         .parent('myList')
//         .attribute('src',`./pics/pic${i}.jpg`)
//     i = i + 1;        
// }

function getPictures(){
    console.log('button pressed')
    for(var i = 1; i < 9; i ++){
    createImg(`./pics/pic${i}.jpg`)
        .parent('myList')
        .size(150,150)
        .position(random(600,1000),random(500,1000))
    }
    // if (i > 8){
    //     console.log(i)
    //     i = 1
    // } else{
    // i = i + 1; 
    // }       
}

function removeAllPics(){
    var imagesArr = selectAll("img");
    for(var im of imagesArr){
        im.remove()
    }
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

// function mousePressed(){
//     createP(`You have clicked me at ${mouseX.toFixed(1)},${mouseY.toFixed(1)} coordinates.`)
//         .parent(textSpace)
// }

function doubleClicked(){
    dblClk = 'yes'
}