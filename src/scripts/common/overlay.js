import catalog from './catalog';
import { init } from './Init'
import { overlay } from '../main';

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
      catalog[itemID - 1].count = +count.value;
      overlay.close();
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

export { createOverlay };