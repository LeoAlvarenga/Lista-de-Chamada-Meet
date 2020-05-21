// array of already received names
const arrNames = [];

//query to send messages to all active windows with a setInterval
chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
    setInterval(ping, 1000, tab);
});

//function executade in setInterval
function ping(tab) {
    console.log("sending");
    //send messages to all tabs and wait for a response
    chrome.tabs.sendMessage(tab.id, 'getData', res => {
        console.log(res);
        const ul = document.querySelector("#chamada");
        console.log(ul);
        //take the response and check the names already received before, and then render the new names
        res.map(el => {
            if(!arrNames.includes(el)){
                arrNames.push(el);
                ul.appendChild(createItem(el));
            }
        })
    });
}

function createItem(text) {
    const li = document.createElement("li");
    li.textContent = text;
    return li;
}