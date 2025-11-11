document.body.onload = ()=>{
    setBg();
    typeText();
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
        let textNode = Array.from(li.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
        if (textNode) {
            totype.push(textNode.textContent.trim());
            textNode.textContent = ""; 
        } else {
            totype.push(""); 
        }
    }
    setTimeout(type_next, 75, 0, 0);
    function type_next(element, char) {
        if (element >= totype.length) return;
        let li = menuContent.children[element];
        let textNode = Array.from(li.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
        if (!textNode) return type_next(element + 1, 0);
        if (char >= totype[element].length) return type_next(element + 1, 0);
        textNode.textContent += totype[element].charAt(char);
        setTimeout(type_next, 75, element, char + 1);
    }
}