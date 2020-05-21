console.log("Working");

//Array to save the names 
const list = new Array();

//wait fo the element appears and get the names 
const interval = setInterval(() => {
    let names = document.getElementsByClassName("cS7aqe");
    console.log(names);

    if (names.length > 0) {
        //check if the names are already saved, then saves it
        for (let name of names) {
            console.log(name.textContent);

            if (!list.includes(name.textContent)) {
                localStorage.setItem("aluno"+localStorage.length, name.textContent);
                list.push(name.textContent);
            }

        }
    }

}, 1000);


//listen to the message from the popup and gives it a response
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg === 'getData') {
        console.log("message received");
        // const elements = [...document.getElementsByClassName('cS7aqe')];
        const elements = [];
        setList(elements)
        console.log(elements);
        //const texts = elements.map(el => el.textContent);
        const uniqTexts = [...new Set(elements)];
        sendResponse(uniqTexts);
    }
})

function setList(list) {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem("aluno" + i)) {
            list.push(localStorage.getItem("aluno" + i));
        }
    }
}