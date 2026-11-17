if(document.getElementById("nav-popup") && window.innerWidth < window.innerHeight) closePopup('nav');

let dragging = false;
let draggedElement;
let startX = 0, startY = 0;
let startLeft = 0, startTop = 0;

const NO_DRAG = "select, option, input, textarea, button, a, label";

function startDrag(e, el) {
    if (e.button !== 0) return;                 // left button only
    if (e.target.closest(NO_DRAG)) return;      // don't drag from controls

    startX = e.clientX;
    startY = e.clientY;
    const style = getComputedStyle(el);
    startLeft = parseFloat(style.left) || 0;
    startTop  = parseFloat(style.top)  || 0;
    dragging = true;
    draggedElement = el;
}

document.addEventListener("pointermove", (e) => {
    if (!draggedElement || !dragging) return;
    if (e.buttons === 0) { dragging = false; return; }   // safety net for a lost pointerup
    draggedElement.style.left = `${startLeft + (e.clientX - startX)}px`;
    draggedElement.style.top  = `${startTop  + (e.clientY - startY)}px`;
});

document.addEventListener("pointerup", () => { dragging = false; });
document.addEventListener("pointercancel", () => { dragging = false; });


function createPopUp(img, link, title, text, posLeft, posTop, width, id){
    const popupTemplate = `<div class = "popup" id = "${id}" style = "left:${posLeft}; top:${posTop}; max-width:30vw;">
        <div style = "margin-left: 5px; margin-right: 5px;">
            <p style = "font-size: 8pt; padding-left: 10px; padding-right: 30px;" ><b>${title}</b><button onclick = "closePopup('${id}')" style = "right:5px; position:absolute; top:5px">X</button></p>
            <div style = "position:relative; top:5%; text-align:center; align-items:center" class = "popup-content">
                <div style = "background-color:black; border-radius: 10px;">
                <a href = "${link}">
                    ${img ? `<img src = ${img} style = "width:${width}; margin:5px;margin-bottom: 20px;">` : ''}
                    <p>${text}</p>
                </a>
                </div>
            </div>
        </div>
    </div>`;
    const popup = document.createElement('div');
    popup.innerHTML = popupTemplate;
    const content = popup.getElementsByClassName("popup")[0]
    content.addEventListener('pointerdown', (e) => startDrag(e, content));
        setTimeout(()=>{
        content.style.transform = "scale(1.5, 1.5)";
    },10); 
    document.getElementById("popups").appendChild(popup);   
}

function closePopup(id){
    const popup = document.getElementById(id);
    const button = popup.querySelector("button");
    if(button.innerHTML == "+") return;
    const popupContent = popup.querySelector(".popup-content");
    const content = popup.innerHTML;
    button.innerHTML = "+";
    button.onclick = ()=>{openPopup(id, content)};
    popupContent.innerHTML = "";
}

function openPopup(id, content){
    const popup = document.getElementById(id);
    const button = popup.querySelector("button");
    if(button.innerHTML == "X") return;
    button.innerHTML = "X"
    button.onclick = () => closePopup(id);
    popup.innerHTML = content;
}