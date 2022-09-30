var chg;
var remo;
var heads;
var paras;
var supa;
function setup(){
    noCanvas()
    chg = select('#changer')
    remo = select('#remover')
    supa = select('#superior')

    heads = selectAll('h1')
    paras = selectAll('p')

    chg.mousePressed(blueGreen)
    chg.mouseReleased(greenOrange)

    supa.mousePressed(styleBg)
    supa.mouseReleased(styleGo)

    remo.mouseClicked(removeMagic)
    console.log(heads)

    for(let pr of paras){
        pr.mouseOver(highlighter)
        pr.mouseOut(unHighlighter)
    }

}

function highlighter(){
    this.style('color','purple')
}

function unHighlighter(){
    this.style('color','yellow')
}

function styleBg(){
    for (let head of heads){
        if (head.class()){
            var hClass = head.class()
            head.removeClass(hClass)
            head.addClass('blue')
        }
        head.addClass('blue')
    }
    for (let pa of paras){
        pa.style('color','green')
    }
} 

function styleGo(){
    for (let head of heads){
        if (head.class()){
            var hClass = head.class()
            head.removeClass(hClass)
            head.addClass('green')
        }
        head.addClass('green')
    }
    for (let pa of paras){
        pa.style('color','orange')
    }
}


function blueGreen(){
    for (let head of heads){
        if (head.class()){
            var hClass = head.class()
            head.removeClass(hClass)
            head.addClass('blue')
        }
        head.addClass('blue')
    }
    for (let pa of paras){
        if(pa.class()){
            var pClass = pa.class()
            pa.removeClass(pClass)            
            pa.addClass('green')
        }
        pa.addClass('green')
    }
} 

function greenOrange(){
    for (let head of heads){
        if (head.class()){
            var hClass = head.class()
            head.removeClass(hClass)
            head.addClass('green')
        }
        head.addClass('green')
    }
    for (let pa of paras){
        if(pa.class()){
            var pClass = pa.class()
            pa.removeClass(pClass)
            pa.addClass('orange')
        }
        pa.addClass('orange')
    }
}   

function removeMagic(){
    for (let head of heads){
        var headClass = head.class()
        head.removeClass(headClass)
    }
    
    for (let pa of paras){
        pa.style('color','black')
    }
}
