/*
- Build a checkbox selector for libraries, and then link it to the activities that the libraries can perform. 
    - When a library is checked the button with the name of activity performed needs to be highlighted

- Go through the libraries and understand the activities that can be performed
    - List down the activities that will be shown here
    - List down the steps required to process each activity
    - program the checkboxes to show the buttons accordingly

- Design how the output of each activity will be shown after processing

*/

var textGiven;
var dropper;

var incomingText;

var ritaC;
var compromiseC;
var traceryC;

var wcntB;
var posB;
var markovB;
var generateB;
var storyB;
var emotionB;


function setup(){
    noCanvas()
    textGiven = select('#textData');
    dropper = select('#dropZone')

    dataOut = select("#output")

    ritaC = select('#RiTa')
    compromiseC = select('#Compromise')
    traceryC = select('#Tracery')
    
    ritaC.changed(changedRita)
    compromiseC.changed(changedComp)
    traceryC.changed(changedTracery)

    wcntB = select('#wcnt')
    emotionB = select("#emotion")
    storyB = select("#story")
    generateB = select("#generate")
    markovB = select("#markov")
    posB = select("#pos")

    wcntB.hide()
    emotionB.hide()
    storyB.hide()
    generateB.hide()
    markovB.hide()
    posB.hide()


    wcntB.mouseClicked(generateWordC)
    emotionB.mouseClicked(generateEmotion)
    storyB.mouseClicked(generateStory)
    generateB.mouseClicked(generateMiscel)
    markovB.mouseClicked(generateMarkov)
    posB.mouseClicked(generatePos)

    dropper.drop(afterDrop)
}


//setting the button's visibility
function changedRita(){
    //console.log('got Sig Rita')
    if(ritaC.checked() || compromiseC.checked()){
        markovB.show()
        posB.show()
        wcntB.show()
    }

    if(!ritaC.checked()){
        markovB.hide()
        posB.hide()
        wcntB.hide()
    }

}

function changedComp(){
    if(ritaC.checked() || compromiseC.checked()){
        markovB.show()
        posB.show()
        wcntB.show()
        generateB.show()
    }

    if(!compromiseC.checked()){
        markovB.hide()
        posB.hide()
        wcntB.hide()
        generateB.hide()
    }
}

function changedTracery(){
    if(traceryC.checked()){
        emotionB.show()
        storyB.show()
    }

    if(!traceryC.checked()){
        emotionB.hide()
        storyB.hide()
    }

}



function processHtml(textData){
    let htmlReg = "(?<=(\s))<\w+>(?=(\s))|<(?<=<)[^<>]+(?=>)>|<(?<=<)\/[^><]+(?=>)>|<>|<|>|(?<=(\s))>\w+(?=(\s))|(?<=(\s))<\w+(?=(\s))|[\b.,?]\s{2,}|\b\s{2,}|(?<=>)\s+(?=<)"
    let regEx = new RegExp(htmlReg,'g')
    //initiating replace 
    return textData.replace(regEx,'')
}

function afterDrop(fileIncoming){
    incomingText = fileIncoming.data;
    if(fileIncoming.type == 'text'){
        //creating Heading
        createElement('h1')
            .parent('textData')
            .html('Your File Data')
        //bringing in the data
        createP(incomingText) 
            .class('lh-copy f4')
            .parent('textData')
    }else{
        let incomingP = createP('Drop a Valid File') 
            .class('lh-copy f2 bg-red')
            .parent('textData')
    }
}

function generatePos(){
    console.log('got Sig')
}

function generateMarkov(){
    console.log('got Sig')
}

function generateMiscel(){
    console.log('got Sig')
}

function generateStory(){
    console.log('got Sig')
}

function generateEmotion(){
    console.log('got Sig')
}

function generateWordC(){
    console.log('got Sig')
}
