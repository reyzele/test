import catalog from './catalog';
import { renderItems, renderTotalPrice, setCount, calculatePrice } from './handlerFunctions';
import { Overlay } from './createOverlay';
import { states } from '../main';

function Init(checkedItems = []) {
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

    if (!states.flag) {
      checkedItems = []
    }

    if (checkedItems.length) {
      checkedItems.sort((a, b) => b > a);
      checkedItems.forEach((item) => {
        catalog.splice(item, 1);
      })
      checkedItems = [];
      Init();
    }
  })

  items.forEach((item, index) => {
    const openCount = item.querySelector('#count');

    item.addEventListener('click', (e) => {
      if (e.target.classList.contains('checkbox-template')) {
        const checkbox = e.target.previousElementSibling;
        states.flag = true;


        if (!checkbox.checked) {
          totalCount += catalog[index].count;
          checkedItems.push(index);
        } else {
          totalCount -= catalog[index].count;
          checkedItems.forEach((item, index_) => {
            if (item === index) {
              checkedItems.splice(index_, 1);
              return 0;
            }
          })
        }
        setCount(totalCount);
      }
    })

    openCount.addEventListener('click', (e) => {
      Overlay.open(e);
      Overlay.setContent(e.target);
    })
  })
}

export { Init };
