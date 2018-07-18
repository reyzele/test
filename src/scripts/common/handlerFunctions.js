function renderItems(itemsList, data) {
  const template = document.querySelector('#item-template').innerHTML;
  const render = Handlebars.compile(template);
  Handlebars.registerHelper('inc', function (value) {
    return parseInt(value) + 1;
  });

  itemsList.innerHTML = render({ items: data });
}

function renderTotalPrice(data) {
  const subTotal = document.querySelector('#subTotal');
  const taxTotal = document.querySelector('#taxTotal');
  const totalPrice = document.querySelector('#totalPrice');

  subTotal.innerHTML = Math.round(getSum(data)) + " р";
  taxTotal.innerHTML = Math.round(getSum(data) * 0.18) + " р";
  totalPrice.innerHTML = Math.round(getSum(data) + (getSum(data) * 0.18)) + " р";
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

export { renderItems, renderTotalPrice, calculatePrice, setCount }