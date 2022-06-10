
const RANGE = document.querySelector('#size-select');
const PADS = document.querySelector('.board');
const CLEAR = document.querySelector('.clear');
const RAINBOW =document.querySelector('.rainbow');
const OPACITY = document.querySelector('.opacity')
const COLOR = document.querySelector('#color-select');

RANGE.onchange = setRange;

CLEAR.onclick = ()=>setPads(RANGE.value);
RAINBOW.onclick = ()=>{
    RAINBOW.classList.toggle('active');
    OPACITY.classList.remove('active');
}
OPACITY.onclick = ()=>{
    OPACITY.classList.toggle('active');
    RAINBOW.classList.remove('active');
}


function getColor(ev){

    //generate random hex number
    if(Array.from(RAINBOW.classList).includes('active')){
        
        let rgb = Math.floor(0xffffff*Math.random()).toString(16);
        return ev.target.style.backgroundColor = '#'+rgb;

        //add opacity by 20%
    }else if(Array.from(OPACITY.classList).includes('active')){
        if(!ev.target.style.backgroundColor.match(/rgba?\(0..0..0/i) || ev.target.style.backgroundColor ==='' ){
            return ev.target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        }else{
           return ev.target.style.backgroundColor = ev.target.style.backgroundColor.replace(/0\.\d/ , parseFloat(ev.target.style.backgroundColor.match(/0\.\d/))+0.2)
        }

    }else return ev.target.style.backgroundColor = COLOR.value;
}

function setRange(ev){

    let size = document.querySelector('.size');
    size.textContent = `${ev.target.value} x ${ev.target.value}`
    setPads(ev.target.value)

}

function removeAllChild(node){

    while(node.firstChild){
        node.removeChild(node.firstChild)
    }
}

function setPads(num){

    removeAllChild(PADS)

    
    PADS.style.cssText= `grid-template-columns : repeat(${num}, 1fr);
             grid-template-rows : repeat(${num}, 1fr);`

    for(let i=0; i<num*num; i++){

        let pad = document.createElement('div')
        pad.classList.add('pad');
        pad.onmouseenter = getColor;
        PADS.appendChild(pad);
    }

}
let num ="rgba(0, 0, 0, 0.2)";
console.log(num.replace(/0\.\d/,parseFloat(num.match(/0\.\d/))+0.2))
setPads(16);