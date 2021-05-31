class Product {
    constructor(number, name, price, imgUrl) {
        this.number = number;
        this.name = name;
        this.price = price;
        this.imgUrl = imgUrl;
    }
}

const products = [
    new Product(1,"ブレッド","200円","https://cdn.pixabay.com/photo/2018/06/10/20/30/bread-3467243_1280.jpg"),
    new Product(2,"ワッフル", "80円","https://cdn.pixabay.com/photo/2016/03/17/07/50/waffles-1262435_1280.jpg"),
    new Product(3,"クロワッサン","100円","https://cdn.pixabay.com/photo/2012/02/28/00/55/background-17943_1280.jpg"),
    new Product(4,"クッキー","120円","https://cdn.pixabay.com/photo/2016/11/17/22/53/biscuit-1832917_1280.jpg"),
    new Product(5,"サンドイッチ","200円","https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863_1280.jpg"),
    new Product(6,"コーヒー","120円","https://cdn.pixabay.com/photo/2012/04/14/15/14/coffee-34251_1280.png"), 
    new Product(7,"紅茶","150円","https://cdn.pixabay.com/photo/2016/03/30/18/58/greeting-1291329_1280.png"), 
    new Product(8,"コーラ","150円","https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png"),
    new Product(9,"オレンジジュース","150円","https://cdn.pixabay.com/photo/2012/04/26/14/06/juice-42560_1280.png")
];


function generateImgTags() {   
    let imgBox = document.getElementById("imgBox");    
    for(let i = 0; i < products.length; i++) {
        imgBox.innerHTML += `
            <div class ="images d-flex justify-content-center p-2"><img class="w-100 h-100" src="${products[i].imgUrl}"></div>
        `;
    };
};

generateImgTags();
let main = document.getElementById("main");
let extra = document.getElementById("extra");
let images = document.querySelectorAll(".images");
//初期値
main.setAttribute("data-index","0");
slideJump(0);
generateButtons();

function slideJump(number) {
    let index = parseInt(main.getAttribute("data-index"));
    let curr = images[index];
    let next = images[number];

    main.setAttribute("data-index", number.toString());

    infoBoxAnimation(number);
    if(index > number) displayAnimation(curr, next, "left");
    displayAnimation(curr, next, "right");
}

function displayAnimation(curr, next, animationType) {
    let slider = document.getElementById("slider");

    if (curr == next) return main.append(curr);
    main.innerHTML = "";
    main.append(next);
    
    extra.innerHTML = "";
    extra.append(curr);

    main.classList.add("expand-animation");
    extra.classList.add("deplete-animation");
 
    if(animationType == "right") {
        slider.innerHTML = ""; 
        slider.append(main);
        slider.append(extra);        
    } else if (animationType == "left") {
        slider.innerHTML = "";
        slider.append(extra);
        slider.append(main);
    }
}

function infoBoxAnimation(number) {
    let infoBox = document.getElementById("infoBox");
    let innerText = `
        <h4 class="p-2 m-2 w-25 bg-success text-center">${products[number].number}</h4>
        <div>
            <h6>${products[number].name}</h6>
            <h6>${products[number].price}</h6>
        </div>`;
    infoBox.innerHTML = innerText;
}

function generateButtons(){
    const buttonBox = document.getElementById("buttonBox");
    let buttonDiv = "";
    for(let i = 0; i < products.length; i++){
        buttonDiv += `<button id="select${i}" class="buttons m-1 w-25" onclick="slideJump(${i})">${products[i].number}</button>`
    };
    buttonBox.innerHTML = buttonDiv;
}

function purchaseAlert() {
    let index = main.getAttribute("data-index");
    window.alert(products[index].name + "を購入しました。");
}