let elArr = [];
let optionValue = "shell";
let rangeValue = 10;

let input = document.getElementById("textInput");
let select = document.getElementById("way");
let range = document.getElementById("speed");
let button = document.getElementById("applyButton");
let display = document.getElementById("display");
let randomButton = document.getElementById("randomButton");
let contentPlace = document.getElementById("contentPlace");

input.addEventListener("change", e => {
    elArr = [];
    e.target.value.split(/[, ]/g).forEach(el => elArr.push({el: null, value: el.toString()}));
    displayCurrentArray(elArr);
    makeABubble(elArr);
});

select.addEventListener("change", e => {
    optionValue = e.target.value;
});

range.addEventListener("change", e => {
    rangeValue = parseInt(e.target.value, 10);
});

randomButton.addEventListener("click", () => {
    elArr = [];
    elArr = getRandom(1, 99, 8);
    console.log(elArr);
    displayCurrentArray(elArr);
    makeABubble(elArr);
});

button.addEventListener("click", () => {
    elArr = bubbleSort(elArr);
    displayCurrentArray(elArr);
    input.value = "";
});

//описывем функцию-рандомайзер для быстрого получения массива значений
//пишется для тестирования во время разработки, но почему бы и не оставить
function getRandom(from, to, size) {
    let randArr = [];
    for (let i = 0; i < size; i++) {
        randArr.push({el: null, value: Math.floor(+from + Math.random() * (+to + 1 - +from))});
    }
    return randArr;
}

//для отображения того, что мы вообще ввели в начале, в т.ч. рандомные значения
function displayCurrentArray(arr) {
    let shown = document.getElementById("theOne");

    if (!shown) {
        let shown = document.createElement("h1");
        shown.id = "theOne";
        shown.innerHTML = arr.map(el => el.value).join(" ");
        display.appendChild(shown);
        return;
    }
    shown.innerHTML = arr.map(el => el.value).join(" ");
}

function makeABubble(arr) {
    for (let i = 0; i < arr.length; i++) {
        let bubble = document.getElementById(`bubble-${i.toString()}`);
        if (!bubble) {
            let bubble = document.createElement("div");
            bubble.className = "bubble";
            bubble.style.top = `${56 * i}px`;
            bubble.innerHTML = arr[i].value.toString();
            bubble.id = `bubble-${i.toString()}`;
            contentPlace.appendChild(bubble);
            elArr[i] = ({el: bubble, value: arr[i].value});
            continue;
        }
        bubble.className = "bubble";
        bubble.style.top = `${56 * i}px`;
        bubble.innerHTML = arr[i].value.toString();
        elArr[i] = ({el: bubble, value: arr[i].value});
    }
    console.log(elArr);
}

//сортировка "пузырьком"
function bubbleSort(arr) {
    for (let i = 0, endI = arr.length - 1; i < endI; i++) {
        let wasSwap = false;
        for (let j = 0, endJ = endI - i; j < endJ; j++) {
            if (arr[j].value > arr[j + 1].value) {
                let swap = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = swap;
                wasSwap = true;
            }
        }
        if (!wasSwap) break;
    }
    console.log(arr);
    return arr;
}
