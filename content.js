console.log("Working");
// const list = new Array();
// const interval = setInterval(() => {
//     let names = document.getElementsByClassName("cS7aqe");
//     console.log(names);

//     if(names.length > 0){

//         for(let name of names){
//             console.log(name.textContent);

//             list.includes(name.textContent) ? null : list.push(name.textContent);
           
//         }

//         console.log(list);

//         let options = {
//             active: true,
//             currentWindow: true
//         }

//         chrome.tabs.query(options, gotTabs);
        
//     }
    
// },1000)

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg === 'getData') {
        console.log("message received");
        const elements = [...document.getElementsByClassName('cS7aqe')];
        console.log(elements);
        const texts = elements.map(el => el.textContent);
        const uniqTexts = [...new Set(texts)];
        sendResponse(uniqTexts);
    }
})

