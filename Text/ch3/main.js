var textGiven;
var expression;
var textOut

var matcher;
var tester;
var execer;

function setup(){
    noCanvas()
    textGiven = select('#textData');
    expression = select('#expr');
    textOut = select('#textOut')

    matcher = select('#mat')
    tester = select('#tes')
    execer = select('#exe')

    matcher.mouseClicked(matchExpr)
    tester.mouseClicked(testExpr)
    execer.mouseClicked(execExpr)
}

function testExpr(){
    print(textGiven.value())
    let locReg = new RegExp(expression.value())
    let locRes = locReg.test(textGiven)
    
    var resPara = createP(locRes)
            .parent('textOut')
}

function matchExpr(){
    print(textGiven.value())
    console.log('got Sig')
    let locReg = new RegExp(expression.value(), 'i')
    
    let locRes = textGiven.value().match(locReg)
    
    console.log(locRes)
    
    var resPara = createP(locRes)
        .parent('textOut')
}

function execExpr(){

    let locReg = new RegExp(expression.value(), 'i')
    
    while(true){    
        let locRes = locReg.exec(textGiven.value());
    print(locReg)
    if(locRes){
        createP(locRes[0])
            .parent('textOut')
    }
}