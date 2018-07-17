import catalog from './catalog';

function renderItems(itemsList, catalog) {
  const template = document.querySelector('#item-template').innerHTML;
  const render = Handlebars.compile(template);
  Handlebars.registerHelper('inc', function (value) {
    return parseInt(value) + 1;
  });

  itemsList.innerHTML = render({ items: catalog });
  calculatePrice(catalog);
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

function calculatePrice(arr) {
  const totalPrice = document.querySelectorAll('#total');

  totalPrice.forEach((item, index) => {
    const total = arr[index].price * arr[index].count;

    item.innerHTML = total + " р";
  })
}

function setCount(number) {
  const countOfChecks = document.querySelector('#countOfChecks');

  countOfChecks.innerHTML = number;
}

function dataChange(index, totalChecked) {
  catalog.splice(index, totalChecked);

  catalog.forEach((item, index) => {
    item.id = index + 1;
  })
}

export { renderItems, renderTotalPrice, setCount, dataChange }