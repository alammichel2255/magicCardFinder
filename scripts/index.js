import {ScryfallFetch} from "./scryfallFetch.js";

window.onload = () => {
  if ('URLSearchParams' in window) {
    let searchParams = new URLSearchParams(window.location.search); 
    if(searchParams.has('q')) {
        buildCardPage(searchParams.get('q'));
    } else{
      buildHomePage();
    } 
  } else {
    buildHomePage();
  }
}


///////////////////////// Navigation event triggers //////////////////////////////
document.querySelector("#Homepage").addEventListener("click", (event) => {
  event.preventDefault();
  let searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('q')){
    searchParams.delete('q')
    window.location.search = searchParams.toString();
  }
  document.querySelector(".searchBar").value = document.querySelector(".searchBar").defaultValue;
  buildHomePage();
});

document.querySelector("#Random-Card").addEventListener("click", (event) => {
  event.preventDefault();
  let searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('q')){
    searchParams.delete('q')
    window.location.search = searchParams.toString();
  }
  document.querySelector(".searchBar").value = document.querySelector(".searchBar").defaultValue;
  buildCardPage();
});

// document.querySelector("#Advanced-Search").addEventListener("click", (event) => {
//   event.preventDefault();
//   document.querySelector(".searchBar").value = document.querySelector(".searchBar").defaultValue;
//   buildAdvancedSearchPage();
// });

document.querySelector("#About").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector(".searchBar").value = document.querySelector(".searchBar").defaultValue;
  let searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('q')){
    searchParams.delete('q')
    window.location.search = searchParams.toString();
  }
  buildAboutPage();
});


///////////////////////// Home Page //////////////////////////////
const buildHomePage = async () => {

  //pass query string for random card to just fetch image [https://scryfall.com/docs/api/cards/random]
  let getQuery = '?format=image&version=small'

  let landingImage1 = await ScryfallFetch.getRandom();
  while (!landingImage1.image_uris){
    landingImage1 = await ScryfallFetch.getRandom();
  }
  // let landingImage2 = await ScryfallFetch.getRandom();
  // let landingImage3 = await ScryfallFetch.getRandom();

  // document.getElementById("bg-image").style.backgroundImage = `url(${landingImage1.image_uris.art_crop})`;
  
  var content = ``;
  var landing = `
  <div class="center-search"></div>
  <h1>MagiDex</h1>
  <p> This Game Will Ruin Your Life</p>
  <input id="searchBar" class = "search-bar long" type="text" placeholder="Search..." autocomplete="off" maxlength="100" minlength="0">
  </div>
  <div class="search-buttons">
  <button id="searchButton" class = "search-buttons-long">Search</button>
  <button id="advanced-search" class="search-buttons-long" type="button">Advanced Search</button>
  <button id="random-search" class = "search-buttons-long" type="button">Random Search</button>
  </div>
  <div class="bottom-image"> 
  <a href="">
    <img id = "${landingImage1.name}" src="${landingImage1.image_uris.small}" height=300px>
  </a>
  </div>`;

  document.querySelector("#content-container").innerHTML = landing;
  
  document.querySelector(".bottom-image").addEventListener("click", (event) => {
    if(event.target){
      //console.log(event.target.id)
      buildCardPage(event.target.id);
      
    }
    
  });
  
  //Deals with generating the search result page when using the navigation bar's search bar in the middle of the screen////////
  document.querySelector(".searchButton").addEventListener("click", async (event) => {
    event.preventDefault();
    document.getElementById("bg-image").style.backgroundImage = `none`;
    if (document.querySelector(".searchBar").value !== "") {
      let search = document.querySelector(".searchBar").value;
      document.querySelector("#content-container").innerHTML = ` 
          <div class="search-result-box">
          </div>`;

      let data = await ScryfallFetch.getSearch(search);
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].image_uris) {
            content = `
                    <div class="search-result-item">
                        <a href="#">
                            <img id="${data.data[i].name}" src="${data.data[i].image_uris.small}" height="300px" >
                        </a>
                    </div>`;
            document.querySelector(".search-result-box").innerHTML += content;
          }
        }
      document.querySelector(".search-result-box").addEventListener("click", (event) => {
        if(event.target.id !== "search-result-box" && event.target.id !== null) {
          let searchParams = new URLSearchParams(window.location.search);
          if (searchParams.has('q')){
            searchParams.delete('q')
            window.location.search = searchParams.toString();
          }
          buildCardPage(event.target.id)
        }
      })
    }
  });

//Deals with generating the search result page when using the landing page's search bar in the middle of the screen////////
  document.querySelector("#content-container").addEventListener("click", async (event) => {
    event.preventDefault();
    if (event.target && event.target.id === "searchButton") {
      if (document.querySelector("#searchBar").value !== "") {
        let search = document.querySelector("#searchBar").value;
        document.querySelector("#content-container").innerHTML = ` 
        <div class="search-result-box">
        </div>`;
        let data = await ScryfallFetch.getSearch(search);
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].image_uris) {
            content = `
                <div class="search-result-item">
                    <a href="#">
                        <img id="${data.data[i].name}" src="${data.data[i].image_uris.small}" height="300px" >
                    </a>
                </div>`;
            document.querySelector(".search-result-box").innerHTML += content;
          }
        }
        document.querySelector(".search-result-box").addEventListener("click", (event) => {
          if(event.target){
            let searchParams = new URLSearchParams(window.location.search);
            if (searchParams.has('q')){
              searchParams.delete('q')
              window.location.search = searchParams.toString();
            }
            buildCardPage(event.target.id)
          }
        });
      }
    }
  });
}


///////////////////////// Card Page //////////////////////////////
const buildCardPage = async(inputCard) => {
  
  document.querySelector("body").style.backgroundImage = 'none';
  document.querySelector("#content-container").innerHTML = `<div class="main-content"></div>`;

  let card
  if ('URLSearchParams' in window) {
    let searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has('q')) {
      card = await ScryfallFetch.getNamed(searchParams.get('q'))
    } else if (inputCard){
      card = await ScryfallFetch.getNamed(inputCard)
      searchParams.append("q", card.name);
      window.location.search = searchParams.toString();
    } else {
      card = await ScryfallFetch.getRandom();
      searchParams.append("q", card.name);
      window.location.search = searchParams.toString();
    }
  }
  
  // grab symbols then rip out only what the card uses into array
  let symbols = await ScryfallFetch.getSymbols();
  console.log(card.scryfall_uri);
  // let manaCost = card.mana_cost.match(/.{1,3}/g);
  // works but changes order to alphabetical
  let manaCost = []
  for (let i = 0; i < card.mana_cost.length; i += 3){
    let currentMana = '';
    currentMana += card.mana_cost[i]
    currentMana += card.mana_cost[i+1]
    currentMana += card.mana_cost[i+2]
    manaCost.push(currentMana)
  }
  // change oracle text to have images for the symbols
  let cardCMC = ''
  for (let item of manaCost){
    for (let obj of symbols){
      if(obj.name === item){
        let currentItem = `<img src="${obj.url}" alt="${item}" width="30" height="30">`
        cardCMC += currentItem;
      }
    }
  }
  //console.log(cardCMC)
  //console.log(card.oracle_text)

  let cardOracleTxt = card.oracle_text

  for (let item of symbols) {
    let replacement = `<img src="${item.url}" alt="${item}" width="20" height="20">`;
    cardOracleTxt = cardOracleTxt.replaceAll(item.name, replacement)
  }
  cardOracleTxt = cardOracleTxt.replaceAll('\n', '<br>')
  //console.log(card.oracle_text)


  let cardImgPng = card.image_uris.png;
  let cardImgArt = card.image_uris.art_crop;
  let cardType = card.type_line;
  let cardRarity = card.rarity;
  let cardFlavorText
  if (card.flavor_text){
    cardFlavorText = card.flavor_text;
  } else {
    cardFlavorText = ''
  }
  let cardArtist = card.artist;
  let cardName = card.name;
  let cardHealth = `${card.power}/${card.toughness}`
  // console.log(card)
  
  document.getElementById("bg-image").style.backgroundImage = `url(${cardImgArt})`;


  let pageHtml = `
<div class="main-content">
  <div class="card-image">
    <img src=${cardImgPng} alt="card image" class="responsive" id="cardImg">
  </div>
  <div class="text-box" id="testBox">
    <h2>Card Information</h2>
    ${cardName}  ${cardCMC}<br> 
    <hr class="rounded">
    Type: ${cardType}, Rarity: ${cardRarity}<br>
    <hr class="solid">
    ${cardOracleTxt}<br>
    <hr class="solid">
    <i>${cardFlavorText}</i><br>
    Power: <b>${card.power}</b> / Toughness: <b>${card.toughness}</b>
    <hr class="dotted">
    Artist: ${cardArtist}<br>
    <hr class="rounded">
      <h2>Download/Links</h2>
      <p><a id="full-card-dl" href="" target="_blank">Full Card Art</a>|| 
      <a id="card-art-dl" href="" target="_blank">Card Art</a></p>
      <a id="gatherer" href="" target="_blank">View on official MTG Site</a>

    </div>
    <div class="text-box2"></div>
    <div class="text-box3"></div>
</div>`;

  document.querySelector("#content-container").innerHTML = pageHtml;

  document.querySelector("#full-card-dl").addEventListener("click", (event) => {
    console.log(event);
    window.open(cardImgPng, "_blank");
  });

  document.querySelector("#card-art-dl").addEventListener("click", (event) => {
    console.log(event);
    window.open(cardImgArt, "_blank");
  });

  document.querySelector("#gatherer").addEventListener("click", (event) => {
    console.log(event);
    window.open(card.related_uris.gatherer, "_blank");
  });

} 


///////////////////////// About Page //////////////////////////////
const buildAboutPage = () => {
  let aboutHtml = `
<div class="about">
  <h1>MagiDex Story</h1>
  
  <h2 class="we-are">Who We Are</h2>
  <div class="about-page">
    <p>
      We are a team of 5 developers, by the names of Alex, Michel, Tristian,
      Avery and Eric. Our journey into this space started in a classroom only
      a few weeks ago as students and we’ve been rapidly involving into true
      professionals. We have a variation of knowledge and backgrounds and have
      worked a number of projects and continue enhance our abilities. We all
      have one true combined goal and that's to provide you with the best
      product possible and continue to build it from there. You won’t find a
      better team of gentlemen out there, guaranteed!!
    </p>
  </div>

  <h2 class="different">Why We Are Different</h2>
  <div class="about-page">
    <p>
      In August 2022, after noticing a problem, we started MagiDex to help our
      fellow Magic users to find a simpler way to enter the Magic the
      Gathering scene and learn in a more user-friendly way. We saw firsthand
      how difficult is was to accomplish so, since Monday 8 August 2022 we’ve
      poured every ounce of our blood, sweat, and tears into MagiDex and
      making it simple but enjoyable experience for our users.  We’ve tackled
      big challenges for our users and are constantly making it better. We
      created solutions for learning how to play, getting access/details about
      every card you can imagine, linking our users to the Magi community and
      much more. All so that Magic the Gathering enthusiast like yourself can
      better understand the ins and outs of game and also provide an
      environment where beginners will not feel overwhelmed when stepping into
      scene.  As a result, our work has been recognized by Galvanize as one of
      the best web applications they've ever seen, EVER! We couldn’t be
      prouder to offer you MagiDex and it’s user-friendly interface. We look
      forward to bringing you some high-quality features for years to come!
    </p>
  </div>

  <h2 class="mission">Our Mission</h2>
  <div class="about-page">
    <p class="about">
      MagiDex is an entertainment company focused on providing high-quality
      content and service to our MagiDex users.  As a company, they wanted to
      change the way entering into the Magic the Gathering scene was done and
      make it more appealing to the audience. In 2022, through research and
      customer feedback they determined that Magic the Gathering is an
      incredibly complex and difficult to learn game and current resources do
      not allow for players looking to enter the scene to have a tool they can
      learn and discover new cards/deck archetypes that is intuitive or
      user-friendly which discourages people from trying in the first place. In
      that moment realized that we had an opportunity to make some major
      enhancements in this space. They decided to create MagiDex to help those
      users and other sites that had the same issues. We believe in MagiDex and
      our commitment to excellence and providing a more pleasant environment for
      the Magic the Gathering community.
    </p>
  </div>

  <br>
  <h2>Resources</h2>
    <a id="about-link1" href="https://magic.wizards.com/en/how-to-play" target="_blank">How To Play</a>
    <!-- <a id="about-link" href="#" target="_blank">FAQs</a> -->
    <!-- <a id="about-link" href="#" target="_blank">Twitter</a> -->
    <a id="about-link2" href="https://github.com/adpears94/sdi-blended-project1-scaffold" target="_blank">GitHub</a><br>
    <button>Contact Us</button>

</div>`;

  document.querySelector("#content-container").innerHTML = aboutHtml;

  document.querySelector("#about-link1").addEventListener("click", (event) => {
    console.log(event);
    window.open("https://magic.wizards.com/en/how-to-play", "_blank");
  });
  document.querySelector("#about-link2").addEventListener("click", (event) => {
    console.log(event);
    window.open("https://github.com/adpears94/sdi-blended-project1-scaffold", "_blank");
  });
}
