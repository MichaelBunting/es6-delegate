/*
  global
    EVENTS
    trigger
    targetElement
    relatedElements
*/

import 'element-closest';

import HTML from '../mocks/delegate.html';
import delegate from '../../delegate';

beforeEach(() => {
  document.body.innerHTML = HTML;

  global.EVENTS = {
    click: new Event('click', { bubbles: true }),
    focus: new Event('focus', { bubbles: true }),
  };

  const triggerFns = {
    trigger: (e) => {
      global.targetElement = e.target;
      global.relatedElements = e.relatedElements;
    },
  };

  global.trigger = jest.spyOn(triggerFns, 'trigger');
});

const removeEvent = (element = document, event, method) => {
  element.removeEventListener(event, method, true);
};

const setupElementsTest = (eles, events = 'click') => {
  let elements = eles;
  let method;

  if (elements) {
    method = delegate(elements, events, '.btn', trigger);
  } else {
    method = delegate(events, '.btn', trigger);

    elements = document.documentElement;
  }

  if (elements && elements.constructor.name === 'String') {
    elements = document.querySelector(elements);
  }

  const splitEvents = events.split(' ');

  splitEvents.forEach((event) => {
    document.querySelector('.btn').dispatchEvent(EVENTS[event]);
  });

  expect(trigger).toHaveBeenCalledTimes(splitEvents.length);

  if (elements && !elements.forEach) elements = [elements];

  elements.forEach((element) => {
    expect(relatedElements.indexOf(element)).toBeGreaterThan(-1);
  });

  elements.forEach((element) => {
    splitEvents.forEach((event) => {
      removeEvent(element, event, method);
    });
  });
};

describe('when delegating event', () => {
  describe('when passing different types of elements', () => {
    describe('when elements is null', () => {
      it('should bind the event to the document', () => {
        setupElementsTest();
      });
    });

    describe('when elements is a String', () => {
      it('should bind the event to the node of the selector', () => {
        setupElementsTest('.delegate');
      });
    });

    describe('when elements is a Node', () => {
      it('should bind the event to the node passed to it', () => {
        setupElementsTest(document.querySelector('.delegate'));
      });
    });

    describe('when elements is a NodeList', () => {
      it('should bind the event to all nodes passed to it', () => {
        setupElementsTest(document.querySelectorAll('.delegate'));
      });
    });
  });

  describe('when there are multiple events', () => {
    it('should bind each event to the node', () => {
      setupElementsTest(document, 'click focus');
    });
  });

  describe('when passing different types of selector', () => {
    describe('when selector is a String', () => {
      it('should trigger the event when actioned element matches the selector', () => {
        const method = delegate('click', '.btn', trigger);

        [1, 2, 3, 4, 5].forEach((key) => {
          document.getElementById(`btn${key}`).dispatchEvent(EVENTS.click);
        });

        expect(trigger).toHaveBeenCalledTimes(5);
        expect(targetElement.matches('.btn')).toBe(true);

        document.documentElement.removeEventListener('click', method, true);
      });
    });

    describe('when selector is a Node', () => {
      it('should trigger the event when actioned element matches node', () => {
        const method = delegate('click', document.getElementById('btn1'), trigger);

        document.getElementById('btn1').dispatchEvent(EVENTS.click);
        document.getElementById('btn2').dispatchEvent(EVENTS.click);

        expect(trigger).toHaveBeenCalledTimes(1);
        expect(targetElement.matches('#btn1')).toBe(true);
        expect(targetElement.matches('#btn2')).toBe(false);
        expect(targetElement.matches('#btn5')).toBe(false);

        document.documentElement.removeEventListener('click', method, true);
      });
    });

    describe('when selector is a NodeList', () => {
      it('should trigger the event when actioned element matches nodes in nodelist', () => {
        const btns = document.querySelectorAll('.delegate .btn');
        const btnsArray = [...btns];
        const method = delegate('click', btns, trigger);

        btnsArray.forEach((btn) => {
          btn.dispatchEvent(EVENTS.click);

          expect(targetElement === btn).toBe(true);
          expect(targetElement === document.getElementById('btn5')).toBe(false);
        });

        expect(trigger).toHaveBeenCalledTimes(4);

        document.documentElement.removeEventListener('click', method, true);
      });
    });
  });
});
