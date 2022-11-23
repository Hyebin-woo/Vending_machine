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
let moneySpan = document.querySelector(".txt-mymoney");
const wonSpan = document.querySelector(".txt-won"); //잔액
const moneyInput = document.querySelector(".txt-money"); //입금 인풋

moneySpan.textContent = `${Locale(
    parseInt(prompt("지갑에 얼마있는지 알려주세요!!."))
)}원`;

function Locale(x) {
    if (typeof x === "number") {
        return x.toLocaleString("ko-KR");
    } else if (typeof x === "string") {
        return parseInt(x).toLocaleString("ko-KR");
    } else {
        return 0;
    }
}

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
// 입금하기(잔액이 뜸)
function pushMoney() {
    const pushBtn = document.querySelector(".btn-push"); //입금 버튼
    pushBtn.addEventListener("click", function () {
        let money = parseInt(
            moneySpan.textContent.replace("원", "").replace(",", "")
        ); //소지금
        if (moneyInput.value >= 0 && money >= moneyInput.value) {
            wonSpan.textContent = `${Locale(parseInt(moneyInput.value))}원`;
            moneySpan.textContent = `${Locale(money - moneyInput.value)}원`;
        } else {
            alert("지갑에 그 만큼 없습니다.!");
        }
    });
}
pushMoney();

// 거스름반환 버튼을 누르기.
function returnMoney() {
    const returnBtn = document.querySelector(".btn-return");
    returnBtn.addEventListener("click", function () {
        let money =
            parseInt(moneySpan.textContent.replace("원", "").replace(",", "")) +
            parseInt(wonSpan.textContent.replace("원", "").replace(",", ""));

        console.log();
        moneySpan.textContent = `${Locale(money)}원`;
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
                parseInt(
                    wonSpan.textContent.replace(",", "").replace("원", "")
                ) >= parseInt(colaData[colaId].price)
            ) {
                addItem(colaId);
            } else {
                alert("입금 먼저 부탁드립니다!");
            }
        });
    }
}
clickMenu();

let cart = [];

function addItem(id) {
    const counter = document.getElementById(`list${id}`);

    if (cart.find((col) => col.colId == id) === undefined) {
        cart.push({ colId: id, count: 1 });
        const get_cola = document.createElement("li");
        get_cola.innerHTML = `
    <button class="btn-item" type="button">
      <img class="img-cola" src="${colaData[id].img}" alt="${colaData[id].title}" /> 
      <strong class="item-name">${colaData[id].title}</strong>
      <span class="item-counter" id="list${id}">1</span></button>`;
        get_list.appendChild(get_cola);
    } else {
        let cartIndex = cart.findIndex((col) => col.colId == id);
        cart[cartIndex].count = cart[cartIndex].count + 1;
        counter.textContent = cart[cartIndex].count;
    }

    let won =
        parseInt(wonSpan.textContent.replace("원", "").replace(",", "")) -
        colaData[id].price;
    wonSpan.textContent = `${Locale(won)}원`;
}

// 획득 클릭하면 오른쪽에 획득한 음료가 뜸
function getColas() {
    const getDrink = document.querySelector(".get-drink .select-list");
    const getBtn = document.querySelector(".btn-get");
    const total = document.querySelector(".total-price");

    getBtn.addEventListener("click", function (e) {
        let totalPrice = parseInt(
            total.textContent.replace("원", "").replace(",", "")
        );
        for (let i = 0; i < cart.length; i++) {
            totalPrice = totalPrice + cart[i].count * 1000;
            const get_cola = document.createElement("li");
            get_cola.innerHTML = `
            <button class="btn-item" type="button">
            <img class="img-cola" src="${colaData[cart[i].colId].img}" 
            alt="${colaData[cart[i].colId].title}" /> 
            <strong class="item-name">${colaData[cart[i].colId].title}</strong>
            <span class="item-counter">${cart[i].count}</span></button>`;
            getDrink.appendChild(get_cola);
        }

        total.textContent = `${Locale(totalPrice)}원`;
        cart = [];
        get_list.innerHTML = "";
    });
}
getColas();
