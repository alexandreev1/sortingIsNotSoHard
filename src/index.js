let arr = [];
let optionValue = "shell";
let rangeValue = 10;

let input = document.getElementById("textInput");
let select = document.getElementById("way");
let range = document.getElementById("speed");
let button = document.getElementById("applyButton");
let display = document.getElementById("display");
let randomButton = document.getElementById("randomButton");
let contentPlace = document.getElementById("contentPlace");

input.addEventListener("change", (e) => {
    arr = e.target.value.split(/[, ]/g);
    for(let i = 0; i < arr.length; i++) {
        arr[i] = parseInt(arr[i]);
    }
});

select.addEventListener("change", (e) => {
    optionValue = e.target.value;
});

range.addEventListener("change", (e) => {
    rangeValue = parseInt(e.target.value);
});

randomButton.addEventListener("click", () => {
    let randArr = getRandom(1, 99, 8);
    console.log(randArr);
    displayCurrentArray(randArr);
    for(let i = 0; i < randArr.length; i++) {
        if (!document.getElementById(i.toString())) {
            let bubble = document.createElement("div");
            bubble.className = "bubble";
            bubble.innerHTML = randArr[i].toString();
            bubble.id = i.toString();
            contentPlace.appendChild(bubble);
        }
    }
});

//описывем функцию-рандомайзер для быстрого получения массива значений
//пишется для тестирования во время разработки, но почему бы и не оставить
function getRandom(from, to, size) {
    let randArr = [];
    for (let i = 0; i < size; i++) {
        randArr.push(Math.floor(+from + Math.random() * (+to + 1 - +from)));
    }
    return randArr;
}

//для отображения того, что мы вообще ввели в начале, в т.ч. рандомные значения
function displayCurrentArray(arr) {
    if(!document.getElementById("theOne")) {
        let currentArray = document.createElement("h1");
        currentArray.id = "theOne";
        currentArray.innerHTML = arr.join(" ");
        display.appendChild(currentArray);
    }
}
