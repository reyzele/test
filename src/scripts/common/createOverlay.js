import catalog from './catalog';
import { Init } from './Init'
import { states } from '../main';

const overlayTemplate = document.querySelector("#overlayTemplate").innerHTML;
const Overlay = createOverlay(overlayTemplate);

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
    total.innerHTML = count.value * parseInt(price.innerHTML) + ' р';
  }

  function closeOverlayFunc(e) {
    let target = e.target;

    while (overlayOpen && !target === target.classList.contains('overlay')) {
      if (target.classList.contains('wrapper')) {
        Overlay.close();
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
      Overlay.close();
      states.flag = false;
      Init();
    } else if (e.target === closeOverlay) {
      Overlay.close();
    }
  });

  [minus, plus].forEach(item => {
    item.addEventListener('click', function () {
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
      const price_ = content.dataset.price;
      const count_ = content.dataset.count;
      const total_ = count_ * price_;

      price.innerHTML = price_ + ' x';
      total.innerHTML = total_ + ' р';

      count.value = count_;
    }
  };
}

export { Overlay };