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

var pennColors;
var deskTagMap;

var markoFilo;

function preload(){
    pennColors = loadJSON("./pennTagColored.json")
    markoFilo = loadStrings("./textFile2.txt")
}


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
    
    pennTagMap = new Map(Object.entries(pennColors).map(d =>[d[1].tag,d[1].color])) 
    deskTagMap = new Map(Object.entries(pennColors).map(d =>[d[1].description,d[1].color]))
    // print(pennTagMap)
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
    //getting data
    if(select('#output').html()){
        select('#output').html('')
    }
    let getData  = processHtml(textGiven.html())
    //making Compromise Object
    let nlpObject = nlp(getData)
    // Showing the No of Sentences
    // Placing the words and coloring POS tags
    createElement('div')
        .parent('output')
        .class('w-60-ns fl')
        .id('tagP')

    createElement('h3')
        .parent('tagP')
        .html('POS Tagged')
    
    let tagObject = nlpObject.terms().json().map(d => [d.terms[0].text, d.terms[0].tags[0]])
    
    createP('').parent('tagP').id('posText')
    for(let w of tagObject){
        // print(w[1])
        createElement('span')
            .parent('posText')
            .class(`f5 tc bg-${deskTagMap.get(w[1])}`)
            .html(`${w[0]}`)
        createElement('span')
            .parent('posText')
            .html('&emsp;')
    }   

    //bringing the tag Legends
    createElement('div')
        .parent('output')
        .class('w-40-ns fl')
        .id('tagL')

    createElement('h4')
        .parent('tagL')
        .html('Legend of Penn')
    //learnt how to give space in html
    for (let penn of Object.entries(pennColors)){
        // createElement('span')
        //     .parent('tagL')
        //     .class(`f5 tc`)
        //     .html(`${penn[1].tag}:&emsp;`)
        
        createElement('span')
            .parent('tagL')
            .class(`f5 tc bg-${penn[1].color}`)
            .html(`${penn[1].description} &emsp;`)

        createElement('span')
            .parent('tagL')
            .html('&emsp;')
    }
    return nlpObject

}

function generateMarkov(){
    //getting data
    if(select('#output').html()){
        select('#output').html('')
    }
    let getData  = processHtml(textGiven.html())
    //making Compromise Object
    let markov = RiTa.markov(4);

    // load text into the model
    markov.addText(getData);
    markov.addText(markoFilo.join('\n'));
    
    var lines = markov.generate(10)
    
    // print(lines)

    createElement('div')
        .parent('output')
        .class('w-50-ns fl')
        .id('story')

    createElement('h3')
        .parent('story')
        .html('Generated Story')
    createP('')
        .parent('story')
        .id('anch')
        .class('lh-copy f4')

    for(let lin of lines){
    createElement('span')
        .parent('anch')
        .html(`${lin} `)
    }
///////////////////////
    createElement('div')
        .parent('output')
        .class('w-50-ns fl')
        .id('grama')

    createElement('h3')
        .parent('grama')
        .html('Which Grammar Used?')
    let sentStart = markov.sentenceStarts
    let sentEnd = markov.sentenceEnds
    createP("RiTa uses Markov Chains to generate Context free-grammar using the text under the Data Processed section, and another text file")
        .parent('grama')
        .class('lh-copy f4')

    createElement('h3')
        .parent('grama')
        .html('Sentence Starts in that Grammar are')
    
    createP('')
        .parent('grama')
        .id('hanc')
        .class('lh-copy f4')
    for(let lin of sentStart){
        createElement('span')
            .parent('hanc')
            .class('lh-copy f4')
            .html(`${lin} `)
        }
    
    createElement('h3')
        .parent('grama')
        .html('Sentence Starts in that Grammar are')
    
    createP('')
        .parent('grama')
        .id('hand')
        .class('lh-copy f4')
    
    for(let lin of sentEnd){
        createElement('span')
            .parent('hand')
            .class('lh-copy f4')
            .html(`${lin} `)
        }
    
    createElement('h3')
        .parent('grama')
        .html('That is All folks.')

    return markov
}

function generateMiscel(){
    //getting data
    if(select('#output').html()){
        select('#output').html('')
    }
    let getData  = processHtml(textGiven.html())
    //making Compromise Object

    let conCord = Object.entries(RiTa.concordance(getData + markoFilo)).sort((a,b)=>(b[1] - a[1]))

    createElement('div')
        .parent('output')
        .class('w-50-ns fl')
        .id('concord')

    createElement('h3')
        .parent('concord')
        .html('Can you guess what the Story is About?')
    
    createElement('p')
        .parent('concord')
        .html('The words and their usage frequency is listed below')

    createP('')
        .parent('concord')
        .id('anch')
        .class('lh-copy f4')

    for(let lin of conCord.slice(0,20)){
        createElement('span')
            .parent('anch')
            .class('lh-copy f4')
            .html(`${lin[0]}: &nbsp;${lin[1]} &emsp;`)
        }
    createElement('h4')
        .parent('concord')
        .html('Try importing your files and check')
    return conCord
}

function generateStory(){
    console.log('got Sig')
}

function generateEmotion(){
    console.log('got Sig')
}

function generateWordC(){
    //getting data
    if(select('#output').html()){
        select('#output').html('')
    }
    let getData  = processHtml(textGiven.html())
    //making Compromise Object
    let nlpObject = nlp(getData)
    // Showing the No of Sentences
    createElement('div')
        .parent('output')
        .class('w-25-ns fl') //flow left is applied every div
        .id('sentence')

    createElement('h3')
        .parent('sentence')
        .html('No of Sentences')
    
    createP(nlpObject.length)
        .parent('sentence')
        .class('tc')

    // Showing the No of Words
    createElement('div')
        .parent('output')
        .class('w-25-ns fl') //ns is not-small, very important
        .id('wordC')

    createElement('h3')
        .parent('wordC')
        .html('No of words')
    
    createP(nlpObject.wordCount())
        .parent('wordC')
        .class('tc')
    // Showing the first sentences and its tags
    createElement('div')
        .parent('output')
        .class('w-50-ns fl')
        .id('sentF')

    createElement('h3')
        .parent('sentF')
        .html('First Sentence')

    createP(nlpObject.sentences().eq(0).text())
        .parent('sentF')
        .class('f5 tc')
}
