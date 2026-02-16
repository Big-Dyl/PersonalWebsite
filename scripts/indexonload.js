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
        setTimeout(type_next, 75, element, char + 1);
    }
}

async function loadPopUps(){
    //Load newest Music Popup
    createPopUp("img/music/destroyers.png","music.html","Music: new song 'Destroyers'", '', 0.1 * Math.random() *  window.innerWidth + 0.65 * window.innerWidth, (Math.random() * 0.1 + 0.1) * window.innerHeight , "80%", "1");
    setTimeout(()=>{
        //Load newest Project Popup
        createPopUp("img/projects/ChopstixSolver.jpg","projects.html","Projects: 'check out Chopstix Solver'", '', 0.1 * Math.random() * window.innerWidth + 0.4 * window.innerWidth, (Math.random() * 0.1 + 0.35) * window.innerHeight, "80%", "2");
    }, 500)
    setTimeout(()=>{
        //Load Games Popup
        createPopUp("img/projects/SpeedStreets.jpg","games.html","Games: play 'Speed Streets'", '', 0.1 * Math.random() * window.innerWidth + 0.65 * window.innerWidth, (Math.random() * 0.1 + 0.6) * window.innerHeight, "80%","3");
    }, 1000)
}

