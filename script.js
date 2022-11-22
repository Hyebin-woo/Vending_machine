let colaData = [
    {
        id: 0,
        img: "./images/Original_Cola.png",
        title: "Original_Cola",
        price: 1000,
        Stock: 5,
    },
    {
        id: 1,
        img: "./images/Violet_Cola.png",
        title: "Violet_Cola",
        price: 1000,
        Stock: 5,
    },
    {
        id: 2,
        img: "./images/Yellow_Cola.png",
        title: "Yellow_Cola",
        price: 1000,
        Stock: 5,
    },
    {
        id: 3,
        img: "./images/Cool_Cola.png",
        title: "Cool_Cola",
        price: 1000,
        Stock: 5,
    },
    {
        id: 4,
        img: "./images/Green_Cola.png",
        title: "Green_Cola",
        price: 1000,
        Stock: 5,
    },
    {
        id: 5,
        img: "./images/Orange_Cola.png",
        title: "Orange_Cola",
        price: 1000,
        Stock: 5,
    },
];
const menu = document.querySelector(".select-menu");
const get_list = document.querySelector(".select-list");

// 메뉴에 데이터 넣기 : html에 뿌려주기
function setMemu() {
    for (let i = 0; i < colaData.length; i++) {
        const cola = document.createElement("li");
        cola.innerHTML = `
    <button class="btn-menu" type="button" id="${colaData[i].id}">
      <img class="img-cola" src="${colaData[i].img}" alt="${colaData[i].title}" /> 
        <strong class="cola-name">${colaData[i].title}</strong>
         <span class="menu-price">${colaData[i].price}원</span></button>`;

        menu.appendChild(cola);
    }
}
setMemu();
// 돈의 입금과 음료의 선택 시점은 자유롭지만 돈이 모자라면 음료가 나와서는 안됩니다.
// const money = parseInt(
//   document.querySelector(".txt-mymoney").textContent.replace(",", "")
// );

// 입금하기
const moneySpan = document.querySelector(".txt-mymoney");
const wonSpan = document.querySelector(".txt-won");
const moneyInput = document.querySelector(".txt-money");

function pushMoney() {
    const pushBtn = document.querySelector(".btn-push");
    pushBtn.addEventListener("click", function () {
        let money = parseInt(moneySpan.textContent.replace(",", ""));
        wonSpan.textContent = `${moneyInput.value}원`;
        moneySpan.textContent = `${money - moneyInput.value}`;
    });
}
pushMoney();

// 거스름돈이 나와야 합니다.
function returnMoney() {
    const returnBtn = document.querySelector(".btn-return");
    returnBtn.addEventListener("click", function () {
        let money =
            parseInt(moneySpan.textContent.replace(",", "")) +
            parseInt(wonSpan.textContent.replace("원", ""));

        moneySpan.textContent = `${money}`;
        wonSpan.textContent = `0원`;
    });
}
returnMoney();

// 버튼을 누르면 상품이 1개씩 추가됩니다. (일반적인 자판기와 동일)

function clickMenu() {
    const clickCola = document.querySelectorAll(".btn-menu");

    for (let i = 0; i < clickCola.length; i++) {
        clickCola[i].addEventListener("click", function (e) {
            const colaId = e.currentTarget.getAttribute("id");

            if (
                parseInt(wonSpan.textContent.replace("원", "")) >=
                colaData[colaId].price
            ) {
                addItem(colaId);
            } else {
                alert("헤이 돈 내놔");
            }
        });
    }
}
clickMenu();

let cart = [];
function addItem(id) {
    const counter = document.getElementById(`list${id}`);
    // cart[id] = cart[id] === undefined ? 1 : (cart[id] = cart[id] + 1);

    if (cart.find((col) => col.colId == id) === undefined) {
        // cart[id] = 1;

        cart.push({ colId: id, count: 1 });
        const get_cola = document.createElement("li");
        get_cola.innerHTML = `
    <button class="btn-item" type="button">
      <img class="img-cola" src="${colaData[id].img}" alt="${colaData[id].title}" /> 
      <strong class="item-name">${colaData[id].title}</strong>
      <span class="item-counter" id="list${id}">1</span></button>`;
        get_list.appendChild(get_cola);
    } else {
        // cart[id] = cart[id] + 1;
        let cartIndex = cart.findIndex((col) => col.colId == id);
        cart[cartIndex].count = cart[cartIndex].count + 1;

        counter.textContent = cart[cartIndex].count;
    }

    let won =
        parseInt(wonSpan.textContent.replace("원", "")) - colaData[id].price;
    wonSpan.textContent = `${won}원`;
}

// 획득 클릭하면 오른쪽에 획득한 음료가 뜸
function getColas() {
    const getDrink = document.querySelector(".get-drink .select-list");
    const getBtn = document.querySelector(".btn-get");

    getBtn.addEventListener("click", function (e) {
        for (let i = 0; i < cart.length; i++) {
            const get_cola = document.createElement("li");
            get_cola.innerHTML = `
      <button class="btn-item" type="button">
        <img class="img-cola" src="${colaData[cart[i].colId].img}" 
        alt="${colaData[cart[i].colId].title}" /> 
        <strong class="item-name">${colaData[cart[i].colId].title}</strong>
        <span class="item-counter">${cart[i].count}</span></button>`;
            getDrink.appendChild(get_cola);
        }

        cart = [];
        get_list.innerHTML = "";
    });
}
getColas();
