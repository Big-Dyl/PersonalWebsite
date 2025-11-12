let dragging = false;
let draggedElement;
document.addEventListener("mouseup", (e)=>{
    dragging = false;
});
document.addEventListener("mousemove",(e)=>{
    if (!draggedElement || !dragging) return;
    draggedElement.style.left = `${e.clientX}px`;
    draggedElement.style.top = `${e.clientY}px`;
});
document.body.onload = ()=>{
    setBg();
    typeText();
    loadPopUps();
    setTimeout(() => {
            Array.from(document.getElementsByClassName("popup")).map(x => x.style.transform = "scale(1.5, 1.5)");
    }, 1);
}

function setBg(){
    //set random background image
    if(Math.random() > 0.5){
        document.body.style.backgroundImage = "url('img/bg.png')";
    }
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
function loadPopUps(){
    function createPopUp(img, link, title, text, posLeft, posTop, id){
        const popupTemplate = `<div class = "popup" id = "${id}" style = "left:${posLeft}; top:${posTop}">
            <div style = "margin-left: 5px; margin-right: 5px;">
                <p style = "padding-left: 10px; padding-right: 10px">${title}<button onclick = "closePopup('${id}')" style = "right:5px; position:absolute; top:5px">X</button></p>
                <div style = "position:relative; top:5%;" class = "popup-content">
                    <a href = "${link}">
                        <img src = "${img}" style = "width:150px; margin:5px;margin-bottom: 20px;">
                        <p>${text}</p>
                    </a>
                </div>
            </div>
        </div>`;
        let popup = document.createElement('div');
        popup.innerHTML = popupTemplate;
        popup.getElementsByClassName("popup")[0].addEventListener('mousedown', () => {
            dragging = true;
            draggedElement = popup.getElementsByClassName("popup")[0];
        });
        document.getElementById("popups").appendChild(popup);
        
    }
    createPopUp("img/bg.png","news.html","TEST","",700,100,"popup1");
}

function closePopup(id){
    document.getElementById(id).innerHTML = "";
}

