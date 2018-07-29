import catalog from './catalog';
import states from './states';
import { renderItems, renderTotalPrice, setCount, calculatePrice } from './handlerFunctions';
import { Overlay } from './createOverlay';

function Init() {
  const itemsList = document.querySelector('.basket__list');
  const deleteItems = document.querySelector('#deleteItems');
  let totalCount = 0;

  renderItems(itemsList, catalog);
  setCount(totalCount);
  renderTotalPrice(catalog);
  calculatePrice(catalog);

  const items = itemsList.querySelectorAll('.basket__item');

  function deleteItemsHandler(e) {
    e.preventDefault();

    if (states.checkedItems.length) {
      states.checkedItems.sort((a, b) => b > a)
        .forEach((item) => {
          catalog.splice(item, 1);
        })
      states.checkedItems = [];
      Init();
    }
  }

  deleteItems.addEventListener('click', deleteItemsHandler);

  items.forEach((item, index) => {
    const openCount = item.querySelector('#count');

    item.addEventListener('click', (e) => {
      if (e.target.classList.contains('checkbox-template')) {
        const checkbox = e.target.previousElementSibling;

        if (!checkbox.checked) {
          totalCount++;
          states.checkedItems.push(index);
          
        } else {
          totalCount--

          states.checkedItems.forEach((item, index_) => {
            if (item === index) {
              states.checkedItems.splice(index_, 1);
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
