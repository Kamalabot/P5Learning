var mobilenet;
var camdeo;
var loadRes;
var label;

function getClassifier(){
    console.log('Model Ready...')
    mobilenet.predict(getResults);
}

function getResults(error, prediction){
    if(error){
        console.log(error)
    } else {
        const outData = prediction[0].label.split(',');
        const outText = outData.join(' or a')
        console.log(outText)
        var confidence = prediction[0].confidence * 100;
        confidence = confidence.toFixed(2)
        loadRes.html(`The image is ${outText} with a confidence of ${confidence}%.`)

        //Writing on image itself
        label = `It is a picture of ${prediction[0].label.split(',')[0]}`;    }
        mobilenet.predict(getResults);
    }   

function draw(){ //draw function imposes video on the canvas
    image(camdeo,0,0,width,height)
    //loadImg.html(arcticFox)
}

function setup(){
    createCanvas(500, 400);
    background(0);
    
    camdeo = createCapture(VIDEO)
    camdeo.hide()
    
    mobilenet = ml5.imageClassifier('MobileNet',camdeo, getClassifier) 
 //video is hooked to image classifier function itself....
    loadRes= select("#resOut")
}