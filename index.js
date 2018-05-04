var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Function for delegating events from one element to another
 *
 * @param {(String|Node|NodeList)} [elements] Elements to bind events to
 * @param {String} eventListeners Space separated list of events to bind
 * @param {(String|Node|NodeList)} selector Element to trigger events
 * @param {Function} callback Callback function
 */
var delegate = (function () {
  for (var _len = arguments.length, delegateArgs = Array(_len), _key = 0; _key < _len; _key++) {
    delegateArgs[_key] = arguments[_key];
  }

  var args = delegateArgs;

  if (args.length === 3) {
    args = [[document]].concat(_toConsumableArray(args));
  }

  if (args[0].constructor.name === 'String') {
    args[0] = [].concat(_toConsumableArray(document.querySelectorAll(args[0])));
  } else if (!args[0].forEach) {
    args[0] = [args[0]];
  } else {
    args[0] = [].concat(_toConsumableArray(args[0]));
  }

  if (args[2].constructor.name !== 'String') {
    if (!args[2].forEach) {
      args[2] = [args[2]];
    } else {
      args[2] = [].concat(_toConsumableArray(args[2]));
    }
  }

  var _args = args,
      _args2 = _slicedToArray(_args, 4),
      elements = _args2[0],
      eventListeners = _args2[1],
      selector = _args2[2],
      callback = _args2[3];

  var events = eventListeners.split(' ');

  var callMethod = function callMethod(e) {
    var delegateTarget = void 0;

    if (selector.constructor.name === 'String') {
      delegateTarget = e.target.closest(selector);
    } else {
      var _selector$filter = selector.filter(function (node) {
        return node === e.target || node.contains(e.target);
      });

      var _selector$filter2 = _slicedToArray(_selector$filter, 1);

      delegateTarget = _selector$filter2[0];
    }

    if (delegateTarget) {
      e.relatedElements = elements;
      callback.call(delegateTarget, e, delegateTarget);
    }
  };

  elements.forEach(function (element) {
    events.forEach(function (event) {
      element.addEventListener(event, callMethod, true);
    });
  });

  return callMethod;
});

export default delegate;
