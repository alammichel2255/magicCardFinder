module.exports = {
    ScryfallFetch: require('./scryfallFetch'),
    cardDisplay: require('./cardDisplay')
  }

//Testing purposes
const jsdom = require("jsdom");
const dom = new jsdom(`<!DOCTYPE html><body><p id="main">My First JSDOM!</p></body>`);
// This prints "My First JSDOM!"
console.log(dom.window.document.getElementById("main").textContent);

var content = `
<div class="center-search">
<h1>MagiDex</h1>
<p> This Game Will Ruin Your Life</p>
<input class = "search-bar long" type="text" placeholder="Search..." autocomplete="off" maxlength="100" minlength="0">
</div>
<div class="search-buttons">
<input class = "search-buttons-long" type="button" value="Search">
<input class = "search-buttons-long" type="button" value="Advanced Search">
<input class = "search-buttons-long" type="button" value="Random Search">
</div>
<div class="bottom-image"> 
<img src="/images/DSC_9651.jpg" width="15%" height="25%">
</div>`



document.querySelector("#Homepage").addEventListener("click", ()=>{
    document.preventDecault();
    document.querySelector(".content").innerHTML += content;
})

document.querySelector("#Advanced").addEventListener("click", ()=>{
    document.preventDecault();
    document.querySelector(".content").innerHTML += content;
})



// document.querySelector("#searchButton").addEventListener("click", (event) => {
//     event.preventDefault();
//     document.querySelector(".content-container").innerHTML = `
//     <div class="search-result-box">
//     </div>`
// });
//     let search = document.querySelector("#searchBar").value.toString();
//     let fetchURL = `https://api.scryfall.com/cards/search?q=` + search
//     fetch(fetchURL)
//     .then((response) => response.json())
//     .then((data) => {
//         //grab needed data
//         for(let i =0; i<data.data.length; i++){
//             if(data.data[i].image_uris){
//                 content = `
//                 <div class="search-result-item">
//                     <a href="SearchResult.html">
//                         <img src="${data.data[i].image_uris.png}" height="300px" >
//                     </a>
//                 </div>`
//             }
//         }
//                 document.querySelector(".search-result-box").innerHTML += content;
//     });





// document.querySelector("#Homepage").addEventListener("click", ()=>{
//     document.querySelector(".content").innerHTML += content;
// })



// const callMeMaybe = document.querySelector("#content").innerHTML += "<p>Hello World</p>"

// document.getElementById("button1").addEventListener("click", callMeMaybe);
// document.addEventListener("DOMContentLoaded", ()=>{
//     document.querySelector("#content").innerHTML = content;
// })

// document.querySelector("#Homepage").addEventListener("click", (event)=>{
//     event.preventDefault();
//     document.querySelector("#content").innerHTML = content;
// })

