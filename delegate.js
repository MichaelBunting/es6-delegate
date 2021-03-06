/**
 * Function for delegating events from one element to another
 *
 * @param {(String|Node|NodeList)} [elements] Elements to bind events to
 * @param {String} eventListeners Space separated list of events to bind
 * @param {(String|Node|NodeList)} selector Element to trigger events
 * @param {Function} callback Callback function
 */
export default (...delegateArgs) => {
  let args = delegateArgs;

  if (args.length === 3) {
    args = [[document.documentElement], ...args];
  }

  if (args[0].constructor.name === 'String') {
    args[0] = [...document.querySelectorAll(args[0])];
  } else if (!args[0].forEach) {
    args[0] = [args[0]];
  } else {
    args[0] = [...args[0]];
  }

  if (args[2].constructor.name !== 'String') {
    if (!args[2].forEach) {
      args[2] = [args[2]];
    } else {
      args[2] = [...args[2]];
    }
  }

  const [elements, eventListeners, selector, callback] = args;
  const events = eventListeners.split(' ');

  const callMethod = (e) => {
    let delegateTarget;

    if (selector.constructor.name === 'String') {
      delegateTarget = e.target.closest(selector);
    } else {
      [delegateTarget] = selector.filter(node => (
        node === e.target || node.contains(e.target)
      ));
    }

    if (delegateTarget) {
      e.relatedElements = elements;
      callback.call(delegateTarget, e, delegateTarget);
    }
  };

  elements.forEach((element) => {
    events.forEach((event) => {
      element.addEventListener(event, callMethod, true);
    });
  });

  return callMethod;
};
