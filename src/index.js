let elArr = [];
let optionValue = "shell";
let rangeValue = 10;

let input = document.querySelector("#textInput");
let select = document.querySelector("#way");
let range = document.querySelector("#speed");
let button = document.querySelector("#applyButton");
let display = document.querySelector("#display");
let randomButton = document.querySelector("#randomButton");
let contentPlace = document.querySelector("#contentPlace");

input.addEventListener("change", e => {
    //elArr = [];
    if(!elArr.length && e.target.value !== "") {
        e.target.value.split(/[, ]/g).forEach(el => elArr.push({el: null, value: parseInt(el)}));
        displayCurrentArray(elArr);
        makeABubble(elArr);
        console.log(elArr);
    } else if (e.target.value !== "") {
        let tempArr = e.target.value.split(/[, ]/g);
        for (let i = 0; i < elArr.length; i++) {
            elArr[i].value = parseInt(tempArr[i]);
        }
        displayCurrentArray(elArr);
        makeABubble(elArr);
        console.log(elArr);
    }
});

select.addEventListener("change", e => {
    optionValue = e.target.value;
});

range.addEventListener("change", e => {
    rangeValue = parseInt(e.target.value, 10);
});

randomButton.addEventListener("click", () => {
    if(!elArr.length) {
        elArr = getRandom(1, 50, 8);
        displayCurrentArray(elArr);
        makeABubble(elArr);
    } else {
        getRandom(1, 50, 8);
        console.log(elArr);
        displayCurrentArray(elArr);
        makeABubble(elArr);
    }
});

button.addEventListener("click", () => {
    elArr = bubbleSort(elArr);
    displayCurrentArray(elArr);
    input.value = "";
});

//описывем функцию-рандомайзер для быстрого получения массива значений
//пишется для тестирования во время разработки, но почему бы и не оставить
function getRandom(from, to, size) {
    if(!elArr.length) {
        let randArr = [];
        for (let i = 0; i < size; i++) {
            randArr.push({el: null, value: Math.floor(+from + Math.random() * (+to + 1 - +from))});
        }
        return randArr;
    }
    elArr.forEach(el => el.value = Math.floor(+from + Math.random() * (+to + 1 - +from)));
}

//для отображения того, что мы вообще ввели в начале, в т.ч. рандомные значения
function displayCurrentArray(arr) {
    let shown = document.querySelector("#theOne");

    if (!shown) {
        let shown = document.createElement("h1");
        shown.id = "theOne";
        shown.innerHTML = arr.map(el => el.value).join(" ");
        display.appendChild(shown);
        return;
    }
    shown.innerHTML = arr.map(el => el.value).join(" ");
}

//TODO: Разобраться с setTimeout. !!!Не забыть закодить удаление лишних "шаров" при генерации меньшего числа компонентов, относительно предыдущей сортировки.
function makeABubble(arr) {
    for (let i = 0; i < arr.length; i++) {
        let bubble = document.querySelector(`#bubble-${i.toString()}`);
        if (!bubble) {
            let bubble = document.createElement("div");
            bubble.className = "bubble";
            bubble.style.transform = `translateY(${56 * i}px)`;
            bubble.innerHTML = arr[i].value.toString();
            bubble.id = `bubble-${i.toString()}`;
            contentPlace.appendChild(bubble);
            elArr[i] = ({el: bubble, value: arr[i].value});
            continue;
        } else if(arr[i].el) {
            arr[i].el.style.transform = `translateY(${56 * i}px)`;
            arr[i].el.innerHTML = arr[i].value.toString();
            continue;
        }
        bubble.style.transform = `translateY(${56 * i}px)`;
        bubble.innerHTML = arr[i].value.toString();
    }
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
                arr = arr.slice();
                (function(arr) {
                    setTimeout(() => makeABubble(arr), 500 * i);
                }(arr));
            }
        }
        if (!wasSwap) break;
    }
    return arr;
}
