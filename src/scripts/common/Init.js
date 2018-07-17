import catalog from './catalog';
import { renderItems, renderTotalPrice, setCount, dataChange } from './handleFunctions';
import { overlay } from '../main';

function init() {
  const itemsList = document.querySelector('.basket__list');
  const deleteItems = document.querySelector('#deleteItem');

  renderItems(itemsList, catalog);
  renderTotalPrice();

  const items = itemsList.querySelectorAll('.basket__item');
  let totalCount = 0;
  const checkedItems = [];

  setCount(totalCount);

  items.forEach((item, index) => {
    const checkbox = item.querySelector('.checkbox');
    const openCount = item.querySelector('#count');

    item.addEventListener('click', (e) => {
      if (e.target.classList.contains('checkbox-template')) {
        const checkbox = e.target.previousElementSibling;

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
  
  deleteItems.addEventListener('click', (e) => {
    e.preventDefault();

    if (checkedItems.length > 0) {
      checkedItems.forEach((item) => {
        catalog.splice(item, 1);
      })
      
      init();
    }
  })
}

export { init };
