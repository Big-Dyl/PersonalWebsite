let dragging = false;
let draggedElement;
let offsetX = 0; 
let offsetY = 0;
document.addEventListener("pointerup", (e)=>{
    dragging = false;
});
document.addEventListener("pointermove",(e)=>{
    if (!draggedElement || !dragging) return;
    draggedElement.style.left = `${e.clientX - offsetX}px`;
    draggedElement.style.top = `${e.clientY - offsetY}px`;
});
document.body.onload = ()=>{
    setBg();
    typeText();
    loadPopUps();
}


function createPopUp(img, link, title, text, posLeft, posTop, width, id){
    const popupTemplate = `<div class = "popup" id = "${id}" style = "left:${posLeft}; top:${posTop}">
        <div style = "margin-left: 5px; margin-right: 5px;">
            <p style = "font-size: 8pt; padding-left: 10px; padding-right: 30px"><b>${title}</b><button onclick = "closePopup('${id}')" style = "right:5px; position:absolute; top:5px">X</button></p>
            <div style = "position:relative; top:5%; text-align:center; align-items:center" class = "popup-content">
                <div style = "background-color:black">
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
    content.addEventListener('pointerdown', (e) => {
        offsetX = e.clientX - content.offsetLeft;
        offsetY = e.clientY - content.offsetTop;
        dragging = true;
        draggedElement = content;
    });
        setTimeout(()=>{
        content.style.transform = "scale(1.5, 1.5)";
    },10); 
    document.getElementById("popups").appendChild(popup);   
}

function closePopup(id){
    const popup = document.getElementById(id);
    const popupContent = popup.querySelector(".popup-content");
    const content = popup.innerHTML;
    const button = popup.querySelector("button");
    button.innerHTML = "+";
    button.onclick = ()=>{openPopup(id, content)};
    popupContent.innerHTML = "";
}

function openPopup(id, content){
    const popup = document.getElementById(id);
    const button = popup.querySelector("button");
    button.innerHTML = "X"
    button.onclick = closePopup(id);
    popup.innerHTML = content;
}