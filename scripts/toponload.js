document.body.onload = ()=>{
    setBg();
    typeText();
    if (typeof loadPopUps === "function") loadPopUps();
}

function setBg(){
    //set random background image
    document.body.style.backgroundImage = `url('img/bg/bg${Math.ceil(Math.random() * 3)}.png')`;
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
        if(totype[element].charAt(char) == " ") return type_next(element, char + 1);

        setTimeout(type_next, 75, element, char + 1);
    }
}

