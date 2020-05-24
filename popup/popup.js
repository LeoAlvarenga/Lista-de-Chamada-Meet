// array of already received names
const arrNames = [];
const divInfo = document.getElementById("info");
var csv = "";
console.log("csv", csv);
let button = document.getElementById("download");

button.setAttribute("disabled","disabled");
//query to send messages to all active windows with a setInterval
chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    setInterval(ping, 1000, tab);
});

//function executade in setInterval
function ping(tab) {
    console.log("sending");
    //send messages to all tabs and wait for a response
    chrome.tabs.sendMessage(tab.id, 'getData', res => {
        console.log(res);
        if (res.length > 0) {
            divInfo.innerHTML = "";
            button.removeAttribute("disabled");
        }
        const ul = document.querySelector("#chamada");
        console.log(ul);
        //take the response and check the names already received before, and then render the new names
        res.map(el => {
            if (!arrNames.includes(el)) {
                arrNames.push(el);
                ul.appendChild(createItem(el));
                writeCsv(el);
            }
        })
    });
}

function createItem(text) {
    const li = document.createElement("li");
    li.textContent = text;
    return li;
}

function writeCsv(item) {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes();
    csv += item;
    csv += ',' + time;
}

function downloadCsv() {
    let today = new Date();
    console.log("clicou")
    console.log(csv);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'Lista_de_Presença_'+today.getDate()+'/'+(today.getMonth()+1)+'.csv';
    hiddenElement.click();
}

button.addEventListener("click", downloadCsv, false);