/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/common/Init.js":
/*!************************************!*\
  !*** ./src/scripts/common/Init.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Init = undefined;\n\nvar _catalog = __webpack_require__(/*! ./catalog */ \"./src/scripts/common/catalog.js\");\n\nvar _catalog2 = _interopRequireDefault(_catalog);\n\nvar _states = __webpack_require__(/*! ./states */ \"./src/scripts/common/states.js\");\n\nvar _states2 = _interopRequireDefault(_states);\n\nvar _handlerFunctions = __webpack_require__(/*! ./handlerFunctions */ \"./src/scripts/common/handlerFunctions.js\");\n\nvar _createOverlay = __webpack_require__(/*! ./createOverlay */ \"./src/scripts/common/createOverlay.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction Init() {\n  var itemsList = document.querySelector('.basket__list');\n  var deleteItems = document.querySelector('#deleteItems');\n  var totalCount = 0;\n\n  (0, _handlerFunctions.renderItems)(itemsList, _catalog2.default);\n  (0, _handlerFunctions.setCount)(totalCount);\n  (0, _handlerFunctions.renderTotalPrice)(_catalog2.default);\n  (0, _handlerFunctions.calculatePrice)(_catalog2.default);\n\n  var items = itemsList.querySelectorAll('.basket__item');\n\n  function deleteItemsHandler(e) {\n    e.preventDefault();\n\n    if (_states2.default.checkedItems.length) {\n      _states2.default.checkedItems.sort(function (a, b) {\n        return b > a;\n      }).forEach(function (item) {\n        _catalog2.default.splice(item, 1);\n      });\n      _states2.default.checkedItems = [];\n      Init();\n    }\n  }\n\n  deleteItems.addEventListener('click', deleteItemsHandler);\n\n  items.forEach(function (item, index) {\n    var openCount = item.querySelector('#count');\n\n    item.addEventListener('click', function (e) {\n      if (e.target.classList.contains('checkbox-template')) {\n        var checkbox = e.target.previousElementSibling;\n\n        if (!checkbox.checked) {\n          totalCount++;\n          _states2.default.checkedItems.push(index);\n        } else {\n          totalCount--;\n\n          _states2.default.checkedItems.forEach(function (item, index_) {\n            if (item === index) {\n              _states2.default.checkedItems.splice(index_, 1);\n              return 0;\n            }\n          });\n        }\n        (0, _handlerFunctions.setCount)(totalCount);\n      }\n    });\n\n    openCount.addEventListener('click', function (e) {\n      _createOverlay.Overlay.open(e);\n      _createOverlay.Overlay.setContent(e.target);\n    });\n  });\n}\n\nexports.Init = Init;\n\n//# sourceURL=webpack:///./src/scripts/common/Init.js?");

/***/ }),

/***/ "./src/scripts/common/catalog.js":
/*!***************************************!*\
  !*** ./src/scripts/common/catalog.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = [{\n  \"id\": 1,\n  \"name\": \"Нож складной WENGER Evolution ,\\\"Автобус\\\" ,13 функций, 85 мм.WENGER\",\n  \"count\": 5,\n  \"price\": 990,\n  \"img\": \"images/Layer1.png\"\n}, {\n  \"id\": 2,\n  \"name\": \"Рюкзак WENGER «NEO»\",\n  \"count\": 3,\n  \"price\": 5500,\n  \"img\": \"images/Layer2.png\"\n}, {\n  \"id\": 3,\n  \"name\": \"Перьевая ручка Waterman Hemisphere Essential, перо: нержавеющая сталь.WATERMAN\",\n  \"count\": 1,\n  \"price\": 3000,\n  \"img\": \"images/Layer3.png\"\n}];\n\n//# sourceURL=webpack:///./src/scripts/common/catalog.js?");

/***/ }),

/***/ "./src/scripts/common/createOverlay.js":
/*!*********************************************!*\
  !*** ./src/scripts/common/createOverlay.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Overlay = undefined;\n\nvar _catalog = __webpack_require__(/*! ./catalog */ \"./src/scripts/common/catalog.js\");\n\nvar _catalog2 = _interopRequireDefault(_catalog);\n\nvar _states = __webpack_require__(/*! ./states */ \"./src/scripts/common/states.js\");\n\nvar _states2 = _interopRequireDefault(_states);\n\nvar _Init = __webpack_require__(/*! ./Init */ \"./src/scripts/common/Init.js\");\n\nvar _handlerFunctions = __webpack_require__(/*! ./handlerFunctions */ \"./src/scripts/common/handlerFunctions.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar overlayTemplate = document.querySelector(\"#overlayTemplate\").innerHTML;\nvar Overlay = createOverlay(overlayTemplate);\n\nfunction createOverlay(template) {\n  var fragment = document.createElement(\"div\");\n\n  fragment.innerHTML = template;\n\n  var overlayElement = fragment.querySelector(\".overlay\");\n  var price = fragment.querySelector(\"#price\");\n  var count = fragment.querySelector(\"#overlayCount\");\n  var minus = fragment.querySelector(\"#minus\");\n  var plus = fragment.querySelector(\"#plus\");\n  var total = fragment.querySelector(\"#overlayTotal\");\n  var closeOverlay = fragment.querySelector(\"#closeOverlay\");\n  var saveButton = fragment.querySelector(\"#saveButton\");\n  var itemID = void 0;\n\n  fragment = null;\n\n  function setTotalPrice() {\n    total.innerHTML = count.value * parseInt(price.innerHTML) + ' р';\n  }\n\n  function closeOverlayFunc(e) {\n    var target = e.target;\n\n    while (_states2.default.overlayOpen && !target === target.classList.contains('overlay')) {\n      if (target.tagName === 'BODY') {\n        Overlay.close();\n        return 0;\n      } else {\n        target = target.parentElement;\n      }\n    }\n  }\n\n  document.addEventListener('click', closeOverlayFunc, true);\n\n  overlayElement.addEventListener(\"click\", function (e) {\n    e.preventDefault();\n\n    if (e.target === saveButton) {\n      _catalog2.default[itemID].count = +count.value;\n      Overlay.close();\n\n      (0, _handlerFunctions.calculatePrice)(_catalog2.default);\n      (0, _handlerFunctions.renderTotalPrice)(_catalog2.default);\n    } else if (e.target === closeOverlay) {\n      Overlay.close();\n    }\n  });\n\n  [minus, plus].forEach(function (item) {\n    item.addEventListener('click', function () {\n      if (this === plus) {\n        count.value++;\n      } else if (this === minus) {\n        count.value <= 1 ? 1 : +count.value--;\n      }\n      setTotalPrice();\n    });\n  });\n\n  count.addEventListener('change', function () {\n    setTotalPrice();\n  });\n\n  function setPosition(elem) {\n    var posY = elem.pageY - overlayElement.offsetHeight / 2;\n    var posX = elem.pageX - overlayElement.offsetWidth / 2;\n\n    overlayElement.style.top = posY + 'px';\n    overlayElement.style.left = posX + 'px';\n  }\n\n  return {\n    open: function open(e) {\n      itemID = e.target.dataset.id;\n      document.body.appendChild(overlayElement);\n      setPosition(e);\n      _states2.default.overlayOpen = true;\n    },\n    close: function close() {\n      document.body.removeChild(overlayElement);\n      _states2.default.overlayOpen = false;\n    },\n    setContent: function setContent(content) {\n      var price_ = content.dataset.price;\n      var count_ = content.value;\n      var total_ = count_ * price_;\n\n      price.innerHTML = price_ + ' x';\n      total.innerHTML = total_ + ' р';\n\n      count.value = count_;\n    }\n  };\n}\n\nexports.Overlay = Overlay;\n\n//# sourceURL=webpack:///./src/scripts/common/createOverlay.js?");

/***/ }),

/***/ "./src/scripts/common/handlerFunctions.js":
/*!************************************************!*\
  !*** ./src/scripts/common/handlerFunctions.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nfunction renderItems(itemsList, data) {\n  var template = document.querySelector('#item-template').innerHTML;\n  var render = Handlebars.compile(template);\n  Handlebars.registerHelper('inc', function (value) {\n    return parseInt(value) + 1;\n  });\n\n  itemsList.innerHTML = render({ items: data });\n}\n\nfunction renderTotalPrice(data) {\n  var subTotal = document.querySelector('#subTotal');\n  var taxTotal = document.querySelector('#taxTotal');\n  var totalPrice = document.querySelector('#totalPrice');\n\n  subTotal.innerHTML = Math.round(getSum(data)) + \" р\";\n  taxTotal.innerHTML = Math.round(getSum(data) * 0.18) + \" р\";\n  totalPrice.innerHTML = Math.round(getSum(data) + getSum(data) * 0.18) + \" р\";\n}\n\nfunction getSum(data) {\n  return data.reduce(function (sum, item) {\n    return sum + item.count * item.price;\n  }, 0);\n}\n\nfunction calculatePrice(data) {\n  var totalPrice = document.querySelectorAll('.basket__item-price');\n\n  totalPrice.forEach(function (item, index) {\n    var total = data[index].price * data[index].count;\n    var totalBlock = item.querySelector('#total');\n    var countInput = item.querySelector('#count');\n\n    countInput.value = data[index].count;\n    totalBlock.innerHTML = total + \" р\";\n  });\n}\n\nfunction setCount(number) {\n  var countOfChecks = document.querySelector('#countOfChecks');\n\n  countOfChecks.innerHTML = number;\n}\n\nexports.renderItems = renderItems;\nexports.renderTotalPrice = renderTotalPrice;\nexports.calculatePrice = calculatePrice;\nexports.setCount = setCount;\n\n//# sourceURL=webpack:///./src/scripts/common/handlerFunctions.js?");

/***/ }),

/***/ "./src/scripts/common/states.js":
/*!**************************************!*\
  !*** ./src/scripts/common/states.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = {\n  overlayOpen: false,\n  checkedItems: []\n};\n\n//# sourceURL=webpack:///./src/scripts/common/states.js?");

/***/ }),

/***/ "./src/scripts/main.js":
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _Init = __webpack_require__(/*! ./common/Init */ \"./src/scripts/common/Init.js\");\n\n(0, _Init.Init)();\n\n//# sourceURL=webpack:///./src/scripts/main.js?");

/***/ })

/******/ });