let img;
let detectorb;

let loadRes;

function preload(){
    img = loadImage('kitchen-7471627_640.jpg')
    detectorb = ml5.objectDetector('cocossd', modelReady)
}

function modelReady(){
    console.log('...modelReady')
}

function predictResult(error, results){
    if(error){
        console.log(error)
    } else {
        const outData = results[0].label.split(',');
        const outText = outData.join('or')
        console.log(outText)
        var confidence = results[0].confidence * 100;
        confidence = confidence.toFixed(2)
        loadRes.html(`The image is ${outText} with a confidence of ${confidence}%.`)

        //Writing on image itself
        label = `It is a picture of ${results[0].label.split(',')[0]}`; 
        
        for(let i = 0; i < results.length; i++){
            let object = results[i];
            stroke(0,255,0);
            strokeWeight(3);
            noFill();
            rect(object.x,object.y,object.width,object.height)
            noStroke()
            fill(0);
            textSize(24)
            text(object.label, object.x + 10, object.y + 10)
        }
    }
}
function setup(){
    createCanvas(640,480)
    image(img,0,0)
    detectorb.detect(img,predictResult)
    loadRes = select('#resOut')
}