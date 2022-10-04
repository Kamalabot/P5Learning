
var predictor;
var mobilenet;

var loadRes;
var camdeo;

var slideY;
var slideX;

var trainB;
var saveB;
var loadB;

var addPic;
var value;

function preload(){
    
}

function modelReady(){
    console.log('...modelReady')
    predictor.load('./model/model.json',()=>{
        print('customModel Ready...')
        predictor.predict(getResults)
    })
}

function camdeoReady(){
    console.log('...Vid Ready')
}

function whileTrainin(loss){
    if(loss == null){
        print('trained')
        predictor.predict(getResults)
    }else{
        print(loss)
    }
}

function draw(){ //draw function imposes video on the canvas
    background(255)
    fill(255,0,255)
    rect(450,value,25,25)
    //image(camdeo,0,0,400,400)
 }

function getResults(error, result){
    if (error){
        print(error)
    } else {
        value = result.value
        print(value)
        predictor.predict(getResults)
    }

}

function setup(){
    var canv = createCanvas(500,500)
    canv.parent('resOut')
    camdeo = createCapture(VIDEO)
    camdeo.hide()
   
    
    mobilenet = ml5.featureExtractor('MobileNet',modelReady) 
    
    predictor = mobilenet.regression(camdeo, camdeoReady)
    
    loadRes= select("#resOut")

    slideX = createSlider(0,30,1,0.5).size(300,30).parent('slideX')
    slideY = createSlider(0,25,1,0.5).size(300,30).parent('slideY')
    
    trainB = createButton('train').size(70,25).parent('train')
    addPic = createButton('addPic').size(100,50).parent('add')
    saveB = createButton('saveModel').size(100,50).parent('save')
    
    loadB = createButton('load Model').size(100,50).parent('load')

    saveB.mouseClicked(()=>{
        predictor.save();
    })
    //Adding X & Y location
    addPic.mouseClicked(()=>{
        predictor.addImage(slideX.value())
        // predictor.addImage(slideY.value())
    })

    //initiating Training
    trainB.mouseClicked(()=>{
        predictor.train(whileTrainin)
    })

}