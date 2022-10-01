var yourText;
var fileDrop;
var textShow;
var textChng;
var chosenFileTxt;

var chosenFile;

var wordList;
var wordarr;
function preload(){
    // wordList = loadJSON('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json');
    wordList = loadJSON('words_dictionary.json');
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

function findNoun(word){
  var url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=ac4d9ce6-0379-40ff-8837-baf179ac9ed1`
  var reply = loadJSON(url)
  print(reply)
  //return (reply[0].fl == 'noun')
}

function mousePressed(){
  // print('initiating Change.')
  let dictionary = Object.entries(wordList).map(t => t[0])
  // print(dictionary)
  var splitData = chosenFile.split(/[,. \s]/)
  
  const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
  
  var targetData = splitData;

  for (let i = 0; i <= splitData.length; i++){
    let temp = splitData[i].replace(regex,'')
    findNoun(temp)
  }  
}

function initiateChange(){
    // print('initiating Change.')
    let dictionary = Object.entries(wordList).map(t => t[0])
    // print(dictionary)
    var splitData = chosenFile.split(/[,. \s]/)
    
    const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    
    var targetData = splitData;

    for (let i = 0; i <= splitData.length; i++){
      let temp = splitData[i].replace(regex,'')
      findNoun(temp)
    }  
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
    // print(wordList)
}
