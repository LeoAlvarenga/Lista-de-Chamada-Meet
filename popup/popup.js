// for(let name of list){

//     chrome.browserAction.getPopup(() => {
//         let ul = document.getElementById("List");
//         let li = document.createElement("li");
//         li.innerHTML = name;
//         ul.appendChild(li);
//     })
        
//     }


chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
    setInterval(ping, 1000, tab);
});

function ping(tab) {
    console.log("sending");
    chrome.tabs.sendMessage(tab.id, 'getData', res => {
        console.log(res);
        const ul = document.querySelector("#chamada");
        console.log(ul);
        ul.appendChild(...res.map(createItem));
    });
}

function createItem(text) {
    const li = document.createElement("li");
    li.textContent = text;
    return li;
}