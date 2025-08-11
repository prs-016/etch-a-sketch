let down = false;
function generate(size){
    container.innerHTML='';
    for(let i =0; i<size*size; i++)
    {
        const cell = document.createElement('div');
        cell.classList.add("grid-cell");
        cell.style.flex = `0 0 ${100/size}%`;
        container.appendChild(cell);
        cell.addEventListener("mouseover",(e)=>changeColor(e.target));
        cell.addEventListener("mousedown",(e)=>{down = true; changeColor(e.target);});
    }
}

const slide = document.querySelector(".slide");
const slide_text = document.querySelector(".slider_text");
const container = document.querySelector(".container")
const showGridBtn = document.querySelector('.ShowGridlines')
const RainbowBtn = document.querySelector('.rainbow_color');
const EraseBtn = document.querySelector('.eraser');
const ClearBtn = document.querySelector('.Clear');
const colorPicker = document.querySelector('.pen-color');


generate(16);

slide.addEventListener("input",()=>slide_text.textContent=`${slide.value} X ${slide.value}`);
slide.addEventListener("change",()=>generate(slide.value));

showGridBtn.addEventListener("click", ()=>{container.classList.toggle('show-grid'); showGridBtn.classList.toggle('active');});


let rainbow = false;
let erase = false;
let color = "normal";
let clear = false;
let currentColor = colorPicker.value;

colorPicker.addEventListener("input", e => currentColor = e.target.value)

document.body.addEventListener("mousedown",()=>down= true);
document.body.addEventListener("mouseup",()=>down=false);

RainbowBtn.addEventListener("click" , ()=>{
    RainbowBtn.classList.toggle('active');
    rainbow=!rainbow;
    if(erase){EraseBtn.classList.toggle('active'); erase = false;}
    if(clear){ClearBtn.classList.toggle('active'); clear = false;}
    rainbowMode();
});

EraseBtn.addEventListener("click" , ()=>{
    EraseBtn.classList.toggle('active');
    erase=!erase;
    if(rainbow){RainbowBtn.classList.toggle('active'); rainbow=false;}
    if(clear){ClearBtn.classList.toggle('active'); clear=false;}
    eraseMode();
});

ClearBtn.addEventListener("click" , ()=>{
    if(ClearBtn.disabled){
        return;
    }
    ClearBtn.disabled = true;
    ClearBtn.classList.remove('active');
    clear = false;

    ClearBtn.classList.add('active');
    clear = true;
    if(rainbow){RainbowBtn.classList.toggle('active'); rainbow=false;}
    if(erase){EraseBtn.classList.toggle('active'); erase= false;}
    clearMode();
});

function clearMode(){
    document.querySelectorAll('.container .grid-cell').forEach(cells => cells.style.backgroundColor = 'transparent');
    setTimeout(() => {
        ClearBtn.classList.toggle('active');
        clear=false;
        ClearBtn.disabled = false; 
    }, 1000);
    
}

function eraseMode(){
    if(erase)
    {
        color = "erase";
    }
}

function rainbowMode(){
    if(rainbow)
    {
        color = "rainbow";
    }
}

function changeColor(cell)
{
    if(down==true)
    {
        if(color == 'rainbow' && rainbow==true)
        {
            cell.style.backgroundColor = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`;
        }
        else if(color == 'erase' && erase==true)
        {
            cell.style.backgroundColor='transparent';
        }
        else if(color=='normal'||(rainbow == false && clear == false && erase == false))
        {
            cell.style.backgroundColor = currentColor;
        }
    }
}