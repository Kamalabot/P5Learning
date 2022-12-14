
var mobilenet;
var arcticFox;
var loadRes;
var label;

function getClassifier(){
    console.log('Model Ready...')
    mobilenet.predict(arcticFox,getResults);
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

    }   

function getImage(){
    image(arcticFox,0,0,width,height)
    //loadImg.html(arcticFox)
}

function setup(){
    createCanvas(400, 400);
    background(0);
    
    arcticFox = createImg('arcticFox.jpg',getImage)
    arcticFox.hide()

    mobilenet = ml5.imageClassifier('MobileNet',getClassifier) 
 
    loadRes= select("#resOut")
}