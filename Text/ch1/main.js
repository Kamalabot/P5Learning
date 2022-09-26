var inputLoc;
var output;
var submit;
var textOut;
var textField;
var preTxt;
var preTxtOut;

var fileSubmit;
var subTxt;
var subTxtOut;

var chosenFileTxt;

function preload(){
    preTxt = loadStrings('textFile.txt')
}

function loadFile(){
    loadStrings('anotherTxt.txt', fileReady)
}

function fileReady(data){
    subTxtOut.html(data)
}

function gotFile(file){
    chosenFileTxt.html(file.data)
}

function setup(){
    noCanvas();
    //inputText.changed(newText);
    textOut = select('#textOut')
    textField = select('#food')
    submit = select('#submit');

    submit.mousePressed(areaText);

    inputLoc = select('#loc');
    inputLoc.changed(getAQ);

    output = select('#output');

    preTxtOut = select("#preTxt");
    preTxtOut.html(preTxt);

    fileSubmit = select('#fileSubmit');
    fileSubmit.mousePressed(loadFile);
    subTxtOut = select('#fileSubOut');

    createFileInput(gotFile);

    chosenFileTxt = select('#chosenOut')
}

function areaText(){
    textOut.html(textField.value())
}

function getAQ(){
    output.html(`The length is ${+inputLoc.value() * 3.28084} feet`)
}

