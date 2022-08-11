var content = `<div>
<h1>MagiDex</h1>
<p> andinoianlasdkjgalijbg - Winston Churchill</p>
<input type="text" placeholder="Search something..." autocomplete="off" maxlength="100" minlength="0">
</div>
<div>
<input class="button1" type="button" value="Search">
<input type="button" onclick="randomFunc()" value="Advanced Search">
<input type="button" onclick="randomFunc()" value="Random Search">
</div>
<div class="stage">
<div class="container">
    <div class="ring">
        <div class="img">1</div>
        <div class="img">2</div>
        <div class="img">3</div>
        <div class="img">4</div>
        <div class="img">5</div>
        <div class="img">6</div>
        <div class="img">7</div>
        <div class="img">8</div>
        <div class="img">9</div>
        <div class="img">10</div>
    </div>
</div>  
</div>`


document.querySelector("#Homepage").addEventListener("click", ()=>{
    document.querySelector(".content").innerHTML += content;
})



// const callMeMaybe = document.querySelector("#content").innerHTML += "<p>Hello World</p>"

// document.getElementById("button1").addEventListener("click", callMeMaybe);
