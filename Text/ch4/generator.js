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
var about;

var ritaC;
var compromiseC;
var traceryC;
var wikiC;

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
    about = select('#about')

    ritaC = select('#RiTa')
    compromiseC = select('#Compromise')
    traceryC = select('#Tracery')
    wikiC = select('#wiki')
    
    ritaC.changed(changedRita)
    compromiseC.changed(changedComp)
    traceryC.changed(changedTracery)
    wikiC.changed(changedWiki)

    wcntB = select('#wcnt')
    emotionB = select("#emotion")
    storyB = select("#topic")
    generateB = select("#generate")
    markovB = select("#markov")
    posB = select("#pos")

    emotionB.hide()
    storyB.hide()

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
    if(select("#about").html()){
        select("#about").html('')
    }
    if(ritaC.checked()){
    createP('Strength of RiTa is generating alternate texts using the one you have provided. It does POS and Grammar creation too.')
            .class('lh-copy f4')
            .parent('about')
    }
    if(!ritaC.checked()){
        createP('')
        .class('lh-copy f4')
        .parent('about')
    }
}

function changedComp(){
        //console.log('got Sig Rita')
    if(select("#about").html()){
        select("#about").html('')
    }
    if(compromiseC.checked()){    
    createP('Topic Generation, POS extraction, Grammar Creation and Text Analysis. You name it, Compromise does it')
        .class('lh-copy f4')
        .parent('about')
    }
    if(!compromiseC.checked()){
        createP('')
        .class('lh-copy f4')
        .parent('about')
    }
}

function changedTracery(){
    if(select("#about").html()){
        select("#about").html('')
    }    
    if(traceryC.checked()){
    createP('Tracery is Context Free Grammar based Story Generator. It does not stop there!!! Will be explored differently, wait for it...')
        .class('lh-copy f4')
        .parent('about')
    }
    if(!traceryC.checked()){
        createP('')
        .class('lh-copy f4')
        .parent('about')
    }

}

function changedWiki(){
    if(select("#about").html()){
        select("#about").html('')
    }
    if(wikiC.checked()){
        emotionB.show()
        storyB.show()

        createP('Library with Super Powers with access to Wikipedia. Provides API to wiki database, and allows to do more by structuring the data.')
        .class('lh-copy f4')
        .parent('about')

    }
    if(!wikiC.checked()){
        emotionB.hide()
        storyB.hide()
        
        createP('')
        .class('lh-copy f4')
        .parent('about')

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
    //replace the existing text with the user data.
    if(select('#textData').html()){
        select('#textData').html('')
    }
    if(fileIncoming.type == 'text'){
        //creating Heading
        createElement('h4')
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

printList=function(doc){
    return JSON.stringify(doc.out('array'), null, 2)
  }

function generatePos(){
    //give preference to RiTa
    print('recd Sig')
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
    //getting data
    let getData  = processHtml(textGiven.html())
    //making Compromise Object
    let nlpObject = nlp(getData)
    // Showing the No of Sentences
    createElement('div')
        .parent('output')
        .class('w-25 f4')
        .id('sentence')

    createElement('h3')
        .parent('sentence')
        .html('No of Sentences')
    
    createP(nlpObject.length)
        .parent('sentence')
        .class('f1 tc')

    // Showing the No of Words
    createElement('div')
        .parent('output')
        .class('w-25 f4')
        .id('wordC')

    createElement('h3')
        .parent('wordC')
        .html('No of words')
    
    createP(nlpObject.wordCount())
        .parent('wordC')
        .class('f1 tc')
    // Showing the first sentences and its tags
    createElement('div')
        .parent('output')
        .class('w-50 f4')
        .id('sentF')

    createElement('h3')
        .parent('sentF')
        .html('First Sentence')

    createP(nlpObject.sentences().eq(0).text())
        .parent('sentF')
        .class('f5 tc')

    // coloring POS tags
    createElement('div')
        .parent('output')
        .class('w-50 f4')
        .id('tagP')

    createElement('h3')
        .parent('tagP')
        .html('POS Tagged')
    let tagObject = myObj.json()[0].terms.map(t=>[t.text, t.penn])
    let tagSet = new Set(myObj.json()[0].terms.map(t=> t.penn))
    let pennUrl = 'https://www.ling.upenn.edu/courses/Fall_2003/ling001/penn_treebank_pos.html'
    
    createP(nlpObject.sentences().eq(0).text())
        .parent('tagP')
        .class('f5 tc')

    return nlpObject
}
