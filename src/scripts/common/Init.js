import catalog from './catalog';
import { renderItems, renderTotalPrice, setCount, dataChange } from './handleFunctions';
import { overlay } from '../main';

function init() {
  const itemsList = document.querySelector('.basket__list');
  const deleteItem = document.querySelector('#deleteItem');

  renderItems(itemsList, catalog);
  renderTotalPrice();

  const items = itemsList.querySelectorAll('.basket__item');
  let totalCount = 0;
  let totalChecked = 0;

  setCount(totalCount);

  items.forEach((item, index) => {
    const checkbox = item.querySelector('.checkbox');
    const countInput = item.querySelector('#count');

    deleteItem.addEventListener('click', (e) => {
      e.preventDefault();

      if (checkbox.checked) {
        dataChange(index, totalChecked);
        checkbox.checked = false;
        init();
      }
    })

    item.addEventListener('click', (e) => {
      if (e.target.classList.contains('checkbox-template')) {
        const input = e.target.previousElementSibling;

        if (input.checked === false) {
          totalCount += catalog[index].count;
          totalChecked >= 0 && totalChecked++;
        } else {
          totalCount -= catalog[index].count;
          totalChecked >= 0 && totalChecked--;
        }
        setCount(totalCount);
      }
    })

    countInput.addEventListener('click', (e) => {

      overlay.open(e);
      overlay.setContent(e.target);
    })
  })
}

export { init };