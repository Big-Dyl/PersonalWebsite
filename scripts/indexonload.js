let dragging = false;
let draggedElement;
let offsetX = 0; 
let offsetY = 0;
document.addEventListener("mouseup", (e)=>{
    dragging = false;
});
document.addEventListener("mousemove",(e)=>{
    if (!draggedElement || !dragging) return;
    draggedElement.style.left = `${e.clientX - offsetX}px`;
    draggedElement.style.top = `${e.clientY - offsetY}px`;
});
document.body.onload = ()=>{
    setBg();
    typeText();
    loadPopUps();
}

function setBg(){
    //set random background image
    document.body.style.backgroundImage = `url('img/bg/bg${Math.floor(Math.random() * 4)}.png')`;
}
function typeText() {
    const menuContent = document.getElementById('menu-content');
    const totype = [];

    for (const li of menuContent.children) {
        const link = li.querySelector('a'); 
        if (link) {
            totype.push(link.textContent.trim());
            link.textContent = "";
        } else {
            totype.push(li.textContent.trim());
            li.textContent = "";
        }
    }

    setTimeout(type_next, 75, 0, 0);

    function type_next(element, char) {
        if (element >= totype.length) return;
        const li = menuContent.children[element];
        const link = li.querySelector('a');
        const target = link || li;

        if (char >= totype[element].length) return type_next(element + 1, 0);

        target.textContent += totype[element].charAt(char);
        setTimeout(type_next, 75, element, char + 1);
    }
}
async function loadPopUps(){
    //Load newest Music Popup
    createPopUp("img/music/destroyers.jpg","https://www.youtube.com/watch?app=desktop&v=yaj0bVfBuGs","Music: new song 'Destroyers'", '', 0.25 * Math.random() * window.innerWidth + 0.5 * window.innerWidth, Math.random() * window.innerHeight * 0.33, 100, "1");
    setTimeout(()=>{
        //Load newest News Popup
        createPopUp("img/music/destroyers.jpg","music.html","Music: new song 'Destroyers'", '', 0.25 * Math.random() * window.innerWidth + 0.5 * window.innerWidth, (Math.random() * 0.3 + 0.3) * window.innerHeight, 100, "2");
    }, 500)
    setTimeout(()=>{
        //Load About me Popup
        createPopUp("img/bg.png","music.html","Music: new song 'Destroyers'", '', 0.25 * Math.random() * window.innerWidth + 0.5 * window.innerWidth, (Math.random() * 0.3 + 0.6) * window.innerHeight,100,"3");
    }, 1000)
}

function createPopUp(img, link, title, text, posLeft, posTop, width, id){
    const popupTemplate = `<div class = "popup" id = "${id}" style = "left:${posLeft}; top:${posTop}">
        <div style = "margin-left: 5px; margin-right: 5px;">
            <p style = "font-size: 8pt; padding-left: 10px; padding-right: 30px"><b>${title}</b><button onclick = "closePopup('${id}')" style = "right:5px; position:absolute; top:5px">X</button></p>
            <div style = "position:relative; top:5%; text-align:center; align-items:center" class = "popup-content">
                <div style = "background-color:black">
                <a href = "${link}">
                    ${img ? `<img src = ${img} style = "width:${width}px; margin:5px;margin-bottom: 20px;">` : ''}
                    <p>${text}</p>
                </a>
                </div>
            </div>
        </div>
    </div>`;
    const popup = document.createElement('div');
    popup.innerHTML = popupTemplate;
    const content = popup.getElementsByClassName("popup")[0]
    content.addEventListener('mousedown', (e) => {
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
    document.getElementById(id).innerHTML = "";
}

