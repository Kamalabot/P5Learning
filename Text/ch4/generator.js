var textGiven;
var expression;
var dropper;

var incomingText;

var matcher;
var tester;
var execer;

var spliter;
var replacer;

var htmlRep;
var tagExp;

function setup(){
    noCanvas()
    textGiven = select('#textData');
    expression = select('#expr');
    replaceStr = select('#substitute')
    
    htmlRep = select('#htmlreplace')
    tagExp = select('#tagex')
    tagExp.mouseClicked(tagExpand)

    dropper = select('#dropZone')
    dataOut = select("#output")

    matcher = select('#mat')
    tester = select('#tes')
    execer = select('#exe')
    replacer = select('#rep')
    spliter = select("#spl")

    matcher.mouseClicked(matchExpr)
    tester.mouseClicked(testExpr)
    execer.mouseClicked(execExpr)
    replacer.mouseClicked(rplcExpr)
    spliter.mouseClicked(splitExpr)

    dropper.drop(afterDrop)
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


function tagExpand(){
    const regex = /(<)|(>)/g;
    // Alternative syntax using RegExp constructor
    // const regex = new RegExp('(<)|(>)', 'g')
    //const str = `/(?<=(\\s))<\\w+>(?=(\\s))|<(?<=<)[^<>]+(?=>)>|<(?<=<)\\/[^><]+(?=>)>|<>|<|>|(?<=(\\s))>\\w+(?=(\\s))|(?<=(\\s))<\\w+(?=(\\s))|[\\b.,?]\\s{2,}|\\b\\s{2,}|(?<=>)\\s+(?=<)/g`;
    let htmlData = htmlRep.value()
    // match is provided from the replace function
    if(htmlData){
        const result = htmlData.replace(regex, (match,g1,g2)=>{
            if(match == "<"){
                return "'&'lt"
            }
            if(match == ">"){
                return "'&'gt"
            }
        });

        createP(`${result}`)
            .parent("htmlText")
    } else {
        createP('No HTML input')
            .parent("htmlText")
    }
    
}

function testExpr(){
    let pageData = textGiven.html();
    let pageProcessed = processHtml(pageData)
    print(pageProcessed)
    let locReg = new RegExp(expression.value())
    let locRes = locReg.test(textGiven)
    
    var resPara = createP(locRes)
            .parent('output')
}

function matchExpr(){
    let pageData = textGiven.html();
    let pageProcessed = processHtml(pageData)
    //print(pageProcessed)

    let locReg = new RegExp(expression.value(), 'gi')

    let locRes = pageProcessed.match(locReg)
    
    
    if(select('#output').html()){
        select('#output').html('')
    }

    if(locRes != null){
        for (let word of pageProcessed.split(/[,.\s]+/)){
            if(locRes.includes(word)){
                createElement('span')
                    .parent('output')
                    .class('bg-green')
                    .html(`${word} `)
            } else {
                createElement('span')
                    .parent('output')
                    .class('bg-orange')
                    .html(`${word} `)
            }

        }
    } else {
        createElement('span')
            .parent('output')
            .class('bg-light-red')
            .html(`No match. Check your Regex`)
    }

}

function splitExpr(){
    let pageData = textGiven.html();
    let pageProcessed = processHtml(pageData)
    //print(pageProcessed)

    let locReg = new RegExp(expression.value())

    let locRes = pageProcessed.split(locReg)
    
    if(select('#output').html()){
        select('#output').html('')
    }

    if (locRes.length > 1){
        for (let word of locRes){
            createP(`${word} `)
                .parent('output')
                .class('bg-green')
        }
    } else{
        createElement('span')
            .parent('output')
            .class('bg-light-red')
            .html(`No match. Check your Regex`)
    }
}

function rplcExpr(){
    let pageData = textGiven.html();

    let pageProcessed = processHtml(pageData)
    //print(pageProcessed)

    let locReg = new RegExp(expression.value(),'gi')

    if(replaceStr.value() == ''){
        createElement('span')
            .parent('output')
            .class('bg-light-red')
            .html(`Provide the Replacement Text in the text Box`)
    }else{
        const result = pageProcessed.replace(locReg,(match)=>{
            return createElement('span')
                    .parent('output')
                    .class('bg-green')
                    .html(`${match} `)                
        })

        const buildReplacer = createElement('span')
            .class('bg-pink')
            .html(replaceStr.value())

        const replaceResult = pageProcessed.replace(locReg,replaceStr.value())
        createP(replaceResult)
            .parent('output')

    }

}

function execExpr(){

    let pageData = textGiven.html();
    let pageProcessed = processHtml(pageData)
    //print(pageProcessed)
    
    if(select('#output').html()){
        select('#output').html('')
    }
    
    let locReg = new RegExp(expression.value(),'gi')

    var locRes = locReg.exec(pageProcessed);

    let calls = 1;

    while(locRes != null){
        print(calls)
        createElement('span')
            .parent('output')
            .class('bg-green')
            .html(`Match_${calls}: ${locRes} `)
        
        locRes = locReg.exec(pageProcessed)
        calls++
    }
    
}