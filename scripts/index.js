function sortPage(){
    const sortBy = document.getElementsByClassName("sortDropdown")[0].value;
    const content = document.getElementsByClassName("container-items")[0]
    const items = Array.from(content.querySelectorAll(".item"));
    if(sortBy === "name"){
        items.sort((a, b)=>{
            return a.querySelector(".headline").innerHTML.localeCompare(b.querySelector(".headline").innerHTML);
        })
    } else if(sortBy === "recent"){
        items.sort((a, b)=>{
            return new Date(b.querySelector(".date").innerHTML.slice(1, -1)) - new Date(a.querySelector(".date").innerHTML.slice(1, -1));
        })
    }  else if(sortBy === "best"){
        items.sort((a, b)=>{
            return parseInt(a.dataset.dylan_ranking) - parseInt(b.dataset.dylan_ranking);
        })
    } else if(sortBy === "oldest"){
        items.sort((b, a)=>{
            return new Date(b.querySelector(".date").innerHTML.slice(1, -1)) - new Date(a.querySelector(".date").innerHTML.slice(1, -1));
        })
    }
    content.innerHTML = "";
    for(const i of items){
        content.appendChild(i);
    }
}