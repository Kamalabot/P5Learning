var yourText;
var fileDrop;
var textShow;
var textChng;
var chosenFileTxt;

var chosenFile;

var wordList;
var wordarr;
function preload(){
    wordList = loadJSON('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json');
    wordarr = Object.entries(wordList)
    console.log(wordList)
}

function gotFile(file){
  chosenFile = file.data
  if (file.type === 'text') {
    textShow.html(chosenFile);
  } else {
    textShow.html('That was not a text file.!!!')
  }
}

function dropFile(file){
    chosenFile = file.data
    if (file.type === 'text') {
      textShow.html(chosenFile);
    } else {
      textShow.html('That was not a text file.!!!')
    }
 }

function getSentence(){
    chosenFile = yourText.value() 
    textShow.html(chosenFile)
}

function lightDrop(){
    fileDrop.addClass('bg-green')
}

function initiateChange(){
    print('initiating Change.')
    var splitData = chosenFile.split(/[,. \s]/)
    var wordNoun;
    var url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${wordNoun}?key=ac4d9ce6-0379-40ff-8837-baf179ac9ed1`
    print(splitData.slice(1,5))    
}

function setup(){
    noCanvas();

    textShow = select('#textShow')

    yourText = select('#yourText')
    fileDrop = select('#fileDrop')
    chosenFileTxt = createFileInput(gotFile)
        .parent("selectFile")

    textChng = select('textChng')

    yourText.input(getSentence)
    fileDrop.drop(dropFile, lightDrop)

    var makeChangeButton = createButton('Make Change')
        .parent('selectFile')

    makeChangeButton.mouseClicked(initiateChange)
    //print(wordarr)
}
