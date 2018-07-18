const catalog = [
  {
    "id": 1,
    "name": "Нож складной WENGER Evolution ,\"Автобус\" ,13 функций, 85 мм.WENGER",
    "count": 5,
    "price": 990,
    "img": "images/Layer1.png"
  },
  {
    "id": 2,
    "name": "Рюкзак WENGER «NEO»",
    "count": 3,
    "price": 5500,
    "img": "images/Layer2.png"
  },
  {
    "id": 3,
    "name": "Перьевая ручка Waterman Hemisphere Essential, перо: нержавеющая сталь.WATERMAN",
    "count": 1,
    "price": 3000,
    "img": "images/Layer3.png"
  }
]

const overlayTemplate = document.querySelector("#overlayTemplate").innerHTML;
const overlay = createOverlay(overlayTemplate);
let flag = false;

function renderItems(itemsList, catalog) {
  const template = document.querySelector('#item-template').innerHTML;
  const render = Handlebars.compile(template);
  Handlebars.registerHelper('inc', function (value) {
    return parseInt(value) + 1;
  });

  itemsList.innerHTML = render({ items: catalog });
}

function renderTotalPrice() {
  const subTotal = document.querySelector('#subTotal');
  const taxTotal = document.querySelector('#taxTotal');
  const totalPrice = document.querySelector('#totalPrice');

  subTotal.innerHTML = Math.round(getSum(catalog)) + " р";
  taxTotal.innerHTML = Math.round(getSum(catalog) * 0.18) + " р";
  totalPrice.innerHTML = Math.round(getSum(catalog) + (getSum(catalog) * 0.18)) + " р";
}

function getSum(arr) {
  return arr.reduce((sum, item) => { return sum + item.count * item.price }, 0);
}

function calculatePrice(data) {
  const totalPrice = document.querySelectorAll('#total');

  totalPrice.forEach((item, index) => {
    const total = data[index].price * data[index].count;

    item.innerHTML = total + " р";
  })
}

function setCount(number) {
  const countOfChecks = document.querySelector('#countOfChecks');

  countOfChecks.innerHTML = number;
}

function init(checkedItems = []) {
  const itemsList = document.querySelector('.basket__list');
  const deleteItems = document.querySelector('#deleteItem');
  let totalCount = 0;
  
  renderItems(itemsList, catalog);
  setCount(totalCount);
  renderTotalPrice();
  calculatePrice(catalog);

  const items = itemsList.querySelectorAll('.basket__item');
  
  deleteItems.addEventListener('click', (e) => {
    e.preventDefault();
    
    if(!flag) {
      checkedItems = []
    }

    if (checkedItems.length > 0 && flag) {
      checkedItems.sort((a, b) => b > a)
      checkedItems.forEach((item) => {
        catalog.splice(item, 1);
      })
      checkedItems = [];
      init();
    }
  })

  items.forEach((item, index) => {
    const checkbox = item.querySelector('.checkbox');
    const openCount = item.querySelector('#count');

    item.addEventListener('click', (e) => {
      if (e.target.classList.contains('checkbox-template')) {
        const checkbox = e.target.previousElementSibling;
        flag = true;

        if (!checkbox.checked) {
          totalCount += catalog[index].count;
          checkedItems.push(index)
        } else {
          totalCount -= catalog[index].count;
          checkedItems.splice(index, 1)
        }
        setCount(totalCount);
      }
    })

    openCount.addEventListener('click', (e) => {

      overlay.open(e);
      overlay.setContent(e.target);
    })
  })
}

function createOverlay(template) {
  let fragment = document.createElement("div");

  fragment.innerHTML = template;

  const overlayElement = fragment.querySelector(".overlay");
  const price = fragment.querySelector("#price");
  const count = fragment.querySelector("#overlayCount");
  const minus = fragment.querySelector("#minus");
  const plus = fragment.querySelector("#plus");
  const total = fragment.querySelector("#overlayTotal");
  const closeOverlay = fragment.querySelector("#closeOverlay");
  const saveButton = fragment.querySelector("#saveButton");
  let itemID;
  let overlayOpen = false;

  fragment = null;

  function setTotalPrice() {
    total.innerHTML = count.value * price.innerHTML;
  }

  function closeOverlayFunc(e) {
    let target = e.target;

    while (overlayOpen && !target === target.classList.contains('overlay')) {
      if (target.classList.contains('wrapper')) {
        overlay.close();
        return 0;
      } else {
        target = target.parentElement;
      }
    }

    return 0;
  }

  document.addEventListener('click', closeOverlayFunc, true)

  overlayElement.addEventListener("click", e => {
    e.preventDefault();

    if (e.target === saveButton) {
      catalog[itemID].count = +count.value;
      overlay.close();
      flag = false;
      init();
    } else if (e.target === closeOverlay) {
      overlay.close();
    }
  });

  [minus, plus].forEach(item => {
    item.addEventListener('click', function (e) {
      if (this === plus) {
        count.value++;
      } else if (this === minus) {
        count.value <= 1 ? 1 : +count.value--;
      }
      setTotalPrice();
    })
  })

  count.addEventListener('change', () => {
    setTotalPrice();
  })

  function setPosition(elem) {
    let posY = elem.pageY - overlayElement.offsetHeight / 2;
    let posX = elem.pageX - overlayElement.offsetWidth / 2;

    overlayElement.style.top = posY + 'px';
    overlayElement.style.left = posX + 'px';
  }

  return {
    open(e) {
      itemID = e.target.dataset.id;
      document.body.appendChild(overlayElement);
      setPosition(e);
      overlayOpen = true;
    },
    close() {
      document.body.removeChild(overlayElement);
      overlayOpen = false;
    },
    setContent(content) {
      price.innerHTML = content.dataset.price;
      count.value = content.dataset.count;
      total.innerHTML = (content.dataset.count * content.dataset.price)
    }
  };
}

init();
