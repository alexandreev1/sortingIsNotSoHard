let elArr = [];
let optionValue = "shell";
let rangeValue = 500;
let heapCounter = 0;

let input = document.querySelector("#textInput");
let select = document.querySelector("#way");
let range = document.querySelector("#speed");
let button = document.querySelector("#applyButton");
let display = document.querySelector("#display");
let randomButton = document.querySelector("#randomButton");
let contentPlace = document.querySelector("#contentPlace");

input.addEventListener("change", e => {
    contentPlace.innerHTML = "";
    elArr = [];
    if(e.target.value !== "" && e.target.value !== " ") {
        let tempArr = e.target.value.split(/[, ]/g);
        for(let i = 0; i < tempArr.length; i++) {
            if(parseInt(tempArr[i]) > 99 || parseInt(tempArr[i]) < 0) {
                alert(`В введенной числовой последовательности:\n"${e.target.value}"\n присутствует элемент больше 99 или меньше 0: ${tempArr[i]}`);
                input.value = "";
                return;
            } else if(isNaN(parseInt(tempArr[i]))) {
                alert(`В введенной числовой последовательности: "${e.target.value}" присутствует не числовой элемент: ${tempArr[i]}`);
                input.value = "";
                return;
            }
        }
        if(tempArr.length >= 2) {
            tempArr.forEach(el => elArr.push({el: null, value: parseInt(el)}));
            displayCurrentArray(elArr);
            makeBubble(elArr);
        } else {
            alert(`Введенная числовая последовательность: "${e.target.value}" имеет менее двух элементов`);
        }
    } 
});

select.addEventListener("change", e => {
    optionValue = e.target.value;
});

range.addEventListener("change", e => {
    rangeValue = parseInt(e.target.value, 10);
    rangeValue = 2000 - rangeValue;
});

randomButton.addEventListener("click", () => {
    elArr = getRandom(1, 50, 8);
    displayCurrentArray(elArr);
    makeBubble(elArr);
});

button.addEventListener("click", () => {
    heapCounter = 0;
    switch(optionValue) {
        case "bubble":
            elArr = bubbleSort(elArr);
            break;
        case "shell":
            elArr = shellSort(elArr);
            break;
        case "pyramidal":
            elArr = heapSort(elArr);
    }
    console.log(elArr);
    displayCurrentArray(elArr);
    input.value = "";
});

//описывем функцию-рандомайзер для быстрого получения массива значений
//пишется для тестирования во время разработки, но почему бы и не оставить
function getRandom(from, to, size) {
    contentPlace.innerHTML = "";
    let randArr = [];
    for (let i = 0; i < size; i++) {
        randArr.push({el: null, value: Math.floor(+from + Math.random() * (+to + 1 - +from))});
    }
        
    return randArr;   
}

//для отображения того, что мы вообще ввели в начале, в т.ч. рандомные значения
function displayCurrentArray(arr) {
    let shown = document.querySelector("#theOne");

    if (!shown) {
        let shown = document.createElement("h1");
        shown.id = "theOne";
        shown.innerHTML = arr.map(el => el.value).join(" - ");
        display.appendChild(shown);
        return;
    }
    shown.innerHTML = arr.map(el => el.value).join(" - ");
}

//функция с говорящим названием делает шарики, которые потом анимированно меняют своё местоположение в такт сортировке
function makeBubble(arr) {
    for (let i = 0; i < arr.length; i++) {
        let bubble = document.querySelector(`#bubble-${i.toString()}`);
        if (!bubble) {
            let bubble = document.createElement("div");
            bubble.className = "bubble";
            bubble.style.transform = `translateX(${56 * i}px)`;
            bubble.innerHTML = arr[i].value.toString();
            bubble.id = `bubble-${i.toString()}`;
            contentPlace.appendChild(bubble);
            elArr[i] = ({el: bubble, value: arr[i].value});            
        }
        if(arr[i].el) {
            arr[i].el.style.transform = `translateX(${56 * i}px)`;
            arr[i].el.innerHTML = arr[i].value.toString();
        }
    }
}

//сортировка "пузырьком"
function bubbleSort(arr) {
    let counter = 0;
    for (let i = 0, endI = arr.length - 1; i < endI; i++) {
        let wasSwap = false;
        for (let j = 0, endJ = endI - i; j < endJ; j++) {
            if (arr[j].value > arr[j + 1].value) {
                let swap = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = swap;
                wasSwap = true;
                (function(arr) {
                    setTimeout(() => makeBubble(arr), rangeValue * ++counter);
                }(arr.slice()));
            }
        }
        if (!wasSwap) break;
    }
    return arr;
}

//сортировка Шелла
function shellSort(arr) {
    let n = arr.length, i = Math.floor(n / 2), counter = 0;

    while (i > 0) {
        for (let j = 0; j < n; j++) {
            let k = j, temp = arr[j];

            while (k >= i && arr[k-i].value > temp.value) {
                arr[k] = arr[k-i];
                k -= i;
            }
            arr[k] = temp;
            (function(arr) {
                setTimeout(() => makeBubble(arr), rangeValue * ++counter);
            }(arr.slice()));
        }

        i = Math.floor(i / 2);
    }

    return arr;
}

//пирамидальная сортировка (сортировка кучей)
function heapSort(arr) {
    let length = arr.length;
    let i = Math.floor(length / 2 - 1);
    let k = length - 1;

    while(i >= 0) {
        heapify(arr, length, i);
        i--;
    }

    while(k >= 0) {
        [arr[0], arr[k]] = [arr[k], arr[0]];

        (function(arr) {
            setTimeout(() => makeBubble(arr), rangeValue * ++heapCounter);
        }(arr.slice()));

        heapify(arr, k, 0);
        k--;
    }
    return arr;
}

//"рабочая лошадка" пирамидальной сортировки. Делает почти всю работу
function heapify(arr, length, i) {
    let largest = i;
    let left = i * 2 + 1;
    let right = left + 1;

    if(left < length && arr[left].value > arr[largest].value) {
        largest = left;
    }

    if(right < length && arr[right].value > arr[largest].value) {
        largest = right;
    }

    if(largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, length, largest);
    }

    (function(arr) {
        setTimeout(() => makeBubble(arr), rangeValue * ++heapCounter);
    }(arr.slice()));

    return arr;
}
