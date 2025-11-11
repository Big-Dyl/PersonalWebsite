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
function typeText(){
    //type out text for the nav bar
    const menuContent = document.getElementById('menu-content');
    const totype = [];
    for(const li of menuContent.children){
        if(li.textContent){
            totype.push(li.textContent);
            li.textContent = "";
        }
    }
    setTimeout(type_next, 75, 0 ,0);
    function type_next(element, char){
        console.log(element)
        if(element >= totype.length) return;
        if(char >= totype[element].length) return type_next(element + 1, 0);
        menuContent.children[2 * element].textContent += totype[element].charAt(char);
        setTimeout(type_next, 75, element, char + 1);
    }

}