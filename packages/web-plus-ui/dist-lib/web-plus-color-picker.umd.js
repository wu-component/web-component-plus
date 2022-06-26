(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@canyuegongzi/web-core-plus')) :
    typeof define === 'function' && define.amd ? define(['exports', '@canyuegongzi/web-core-plus'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.webUIPlusColorPicker = {}, global.webCorePlus));
})(this, (function (exports, webCorePlus) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z$3 = ":host {\n  display: inline-block;\n  width: 30px;\n  height: 30px;\n  font-size: 14px;\n}\n\n:host([block]) {\n  display: block;\n}\n\n:host([disabled]) {\n  pointer-events: none;\n}\n\n:host(:focus-within) wu-plus-popover, :host(:hover) wu-plus-popover {\n  z-index: 2;\n}\n\nwu-plus-popover {\n  width: 100%;\n  height: 100%;\n}\n\n.color-btn {\n  width: 100%;\n  height: 100%;\n  padding: 5px;\n  background-clip: content-box;\n  background-color: var(--themeColor, #42b983);\n  min-width: 16px;\n  min-height: 16px;\n  border-radius: 2px;\n}\n\n.color-btn:hover {\n  z-index: auto;\n}\n\nwu-plus-popover {\n  display: block;\n}\n\n#popcon {\n  min-width: 100%;\n}\n\n.pop-footer {\n  display: flex;\n  justify-content: flex-end;\n  padding: 0 0.8em 0.8em;\n}\n\n.pop-footer wu-plus-button {\n  font-size: 0.8em;\n  margin-left: 0.8em;\n}\n\n.color-btn::before {\n  content: \"\";\n  position: absolute;\n  left: 5px;\n  top: 5px;\n  right: 5px;\n  bottom: 5px;\n  z-index: -1;\n  background: linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0), linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0);\n  background-position: 0 0, 5px 5px;\n  background-size: 10px 10px;\n}\n\n.wu-color-picker {\n  display: inline-block;\n  box-sizing: border-box;\n  height: 40px;\n  width: 40px;\n  padding: 4px;\n  border: 1px solid #e6e6e6;\n  border-radius: 4px;\n  font-size: 0;\n  position: relative;\n  cursor: pointer;\n}\n\n.wu-color-picker .wu-color-picker_inner {\n  position: relative;\n  display: block;\n  box-sizing: border-box;\n  border: 1px solid #999;\n  border-radius: 2px;\n  width: 100%;\n  height: 100%;\n  text-align: center;\n}\n\n.wu-color-picker-medium {\n  height: 36px;\n  width: 36px;\n}\n\n.wu-color-picker-small {\n  height: 32px;\n  width: 32px;\n}\n\n.wu-color-picker-mini {\n  height: 28px;\n  width: 28px;\n}";
    styleInject(css_248z$3);

    var top = 'top';
    var bottom = 'bottom';
    var right = 'right';
    var left = 'left';
    var auto = 'auto';
    var basePlacements = [top, bottom, right, left];
    var start = 'start';
    var end = 'end';
    var clippingParents = 'clippingParents';
    var viewport = 'viewport';
    var popper = 'popper';
    var reference = 'reference';
    var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
      return acc.concat([placement + "-" + start, placement + "-" + end]);
    }, []);
    var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
      return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
    }, []); // modifiers that need to read the DOM

    var beforeRead = 'beforeRead';
    var read = 'read';
    var afterRead = 'afterRead'; // pure-logic modifiers

    var beforeMain = 'beforeMain';
    var main = 'main';
    var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

    var beforeWrite = 'beforeWrite';
    var write = 'write';
    var afterWrite = 'afterWrite';
    var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

    function getNodeName(element) {
      return element ? (element.nodeName || '').toLowerCase() : null;
    }

    function getWindow(node) {
      if (node == null) {
        return window;
      }

      if (node.toString() !== '[object Window]') {
        var ownerDocument = node.ownerDocument;
        return ownerDocument ? ownerDocument.defaultView || window : window;
      }

      return node;
    }

    function isElement(node) {
      var OwnElement = getWindow(node).Element;
      return node instanceof OwnElement || node instanceof Element;
    }

    function isHTMLElement(node) {
      var OwnElement = getWindow(node).HTMLElement;
      return node instanceof OwnElement || node instanceof HTMLElement;
    }

    function isShadowRoot(node) {
      // IE 11 has no ShadowRoot
      if (typeof ShadowRoot === 'undefined') {
        return false;
      }

      var OwnElement = getWindow(node).ShadowRoot;
      return node instanceof OwnElement || node instanceof ShadowRoot;
    }

    // and applies them to the HTMLElements such as popper and arrow

    function applyStyles(_ref) {
      var state = _ref.state;
      Object.keys(state.elements).forEach(function (name) {
        var style = state.styles[name] || {};
        var attributes = state.attributes[name] || {};
        var element = state.elements[name]; // arrow is optional + virtual elements

        if (!isHTMLElement(element) || !getNodeName(element)) {
          return;
        } // Flow doesn't support to extend this property, but it's the most
        // effective way to apply styles to an HTMLElement
        // $FlowFixMe[cannot-write]


        Object.assign(element.style, style);
        Object.keys(attributes).forEach(function (name) {
          var value = attributes[name];

          if (value === false) {
            element.removeAttribute(name);
          } else {
            element.setAttribute(name, value === true ? '' : value);
          }
        });
      });
    }

    function effect$2(_ref2) {
      var state = _ref2.state;
      var initialStyles = {
        popper: {
          position: state.options.strategy,
          left: '0',
          top: '0',
          margin: '0'
        },
        arrow: {
          position: 'absolute'
        },
        reference: {}
      };
      Object.assign(state.elements.popper.style, initialStyles.popper);
      state.styles = initialStyles;

      if (state.elements.arrow) {
        Object.assign(state.elements.arrow.style, initialStyles.arrow);
      }

      return function () {
        Object.keys(state.elements).forEach(function (name) {
          var element = state.elements[name];
          var attributes = state.attributes[name] || {};
          var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

          var style = styleProperties.reduce(function (style, property) {
            style[property] = '';
            return style;
          }, {}); // arrow is optional + virtual elements

          if (!isHTMLElement(element) || !getNodeName(element)) {
            return;
          }

          Object.assign(element.style, style);
          Object.keys(attributes).forEach(function (attribute) {
            element.removeAttribute(attribute);
          });
        });
      };
    } // eslint-disable-next-line import/no-unused-modules


    var applyStyles$1 = {
      name: 'applyStyles',
      enabled: true,
      phase: 'write',
      fn: applyStyles,
      effect: effect$2,
      requires: ['computeStyles']
    };

    function getBasePlacement(placement) {
      return placement.split('-')[0];
    }

    var max$1 = Math.max;
    var min$1 = Math.min;
    var round$1 = Math.round;

    function getBoundingClientRect(element, includeScale) {
      if (includeScale === void 0) {
        includeScale = false;
      }

      var rect = element.getBoundingClientRect();
      var scaleX = 1;
      var scaleY = 1;

      if (isHTMLElement(element) && includeScale) {
        var offsetHeight = element.offsetHeight;
        var offsetWidth = element.offsetWidth; // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
        // Fallback to 1 in case both values are `0`

        if (offsetWidth > 0) {
          scaleX = round$1(rect.width) / offsetWidth || 1;
        }

        if (offsetHeight > 0) {
          scaleY = round$1(rect.height) / offsetHeight || 1;
        }
      }

      return {
        width: rect.width / scaleX,
        height: rect.height / scaleY,
        top: rect.top / scaleY,
        right: rect.right / scaleX,
        bottom: rect.bottom / scaleY,
        left: rect.left / scaleX,
        x: rect.left / scaleX,
        y: rect.top / scaleY
      };
    }

    // means it doesn't take into account transforms.

    function getLayoutRect(element) {
      var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
      // Fixes https://github.com/popperjs/popper-core/issues/1223

      var width = element.offsetWidth;
      var height = element.offsetHeight;

      if (Math.abs(clientRect.width - width) <= 1) {
        width = clientRect.width;
      }

      if (Math.abs(clientRect.height - height) <= 1) {
        height = clientRect.height;
      }

      return {
        x: element.offsetLeft,
        y: element.offsetTop,
        width: width,
        height: height
      };
    }

    function contains(parent, child) {
      var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

      if (parent.contains(child)) {
        return true;
      } // then fallback to custom implementation with Shadow DOM support
      else if (rootNode && isShadowRoot(rootNode)) {
          var next = child;

          do {
            if (next && parent.isSameNode(next)) {
              return true;
            } // $FlowFixMe[prop-missing]: need a better way to handle this...


            next = next.parentNode || next.host;
          } while (next);
        } // Give up, the result is false


      return false;
    }

    function getComputedStyle$1(element) {
      return getWindow(element).getComputedStyle(element);
    }

    function isTableElement(element) {
      return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
    }

    function getDocumentElement(element) {
      // $FlowFixMe[incompatible-return]: assume body is always available
      return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
      element.document) || window.document).documentElement;
    }

    function getParentNode(element) {
      if (getNodeName(element) === 'html') {
        return element;
      }

      return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
        // $FlowFixMe[incompatible-return]
        // $FlowFixMe[prop-missing]
        element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        element.parentNode || ( // DOM Element detected
        isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        getDocumentElement(element) // fallback

      );
    }

    function getTrueOffsetParent(element) {
      if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
      getComputedStyle$1(element).position === 'fixed') {
        return null;
      }

      return element.offsetParent;
    } // `.offsetParent` reports `null` for fixed elements, while absolute elements
    // return the containing block


    function getContainingBlock(element) {
      var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
      var isIE = navigator.userAgent.indexOf('Trident') !== -1;

      if (isIE && isHTMLElement(element)) {
        // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
        var elementCss = getComputedStyle$1(element);

        if (elementCss.position === 'fixed') {
          return null;
        }
      }

      var currentNode = getParentNode(element);

      if (isShadowRoot(currentNode)) {
        currentNode = currentNode.host;
      }

      while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
        var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
        // create a containing block.
        // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

        if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
          return currentNode;
        } else {
          currentNode = currentNode.parentNode;
        }
      }

      return null;
    } // Gets the closest ancestor positioned element. Handles some edge cases,
    // such as table ancestors and cross browser bugs.


    function getOffsetParent(element) {
      var window = getWindow(element);
      var offsetParent = getTrueOffsetParent(element);

      while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
        offsetParent = getTrueOffsetParent(offsetParent);
      }

      if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
        return window;
      }

      return offsetParent || getContainingBlock(element) || window;
    }

    function getMainAxisFromPlacement(placement) {
      return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
    }

    function within(min, value, max) {
      return max$1(min, min$1(value, max));
    }
    function withinMaxClamp(min, value, max) {
      var v = within(min, value, max);
      return v > max ? max : v;
    }

    function getFreshSideObject() {
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };
    }

    function mergePaddingObject(paddingObject) {
      return Object.assign({}, getFreshSideObject(), paddingObject);
    }

    function expandToHashMap(value, keys) {
      return keys.reduce(function (hashMap, key) {
        hashMap[key] = value;
        return hashMap;
      }, {});
    }

    var toPaddingObject = function toPaddingObject(padding, state) {
      padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
        placement: state.placement
      })) : padding;
      return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    };

    function arrow(_ref) {
      var _state$modifiersData$;

      var state = _ref.state,
          name = _ref.name,
          options = _ref.options;
      var arrowElement = state.elements.arrow;
      var popperOffsets = state.modifiersData.popperOffsets;
      var basePlacement = getBasePlacement(state.placement);
      var axis = getMainAxisFromPlacement(basePlacement);
      var isVertical = [left, right].indexOf(basePlacement) >= 0;
      var len = isVertical ? 'height' : 'width';

      if (!arrowElement || !popperOffsets) {
        return;
      }

      var paddingObject = toPaddingObject(options.padding, state);
      var arrowRect = getLayoutRect(arrowElement);
      var minProp = axis === 'y' ? top : left;
      var maxProp = axis === 'y' ? bottom : right;
      var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
      var startDiff = popperOffsets[axis] - state.rects.reference[axis];
      var arrowOffsetParent = getOffsetParent(arrowElement);
      var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
      var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
      // outside of the popper bounds

      var min = paddingObject[minProp];
      var max = clientSize - arrowRect[len] - paddingObject[maxProp];
      var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
      var offset = within(min, center, max); // Prevents breaking syntax highlighting...

      var axisProp = axis;
      state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
    }

    function effect$1(_ref2) {
      var state = _ref2.state,
          options = _ref2.options;
      var _options$element = options.element,
          arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

      if (arrowElement == null) {
        return;
      } // CSS selector


      if (typeof arrowElement === 'string') {
        arrowElement = state.elements.popper.querySelector(arrowElement);

        if (!arrowElement) {
          return;
        }
      }

      if (!contains(state.elements.popper, arrowElement)) {

        return;
      }

      state.elements.arrow = arrowElement;
    } // eslint-disable-next-line import/no-unused-modules


    var arrow$1 = {
      name: 'arrow',
      enabled: true,
      phase: 'main',
      fn: arrow,
      effect: effect$1,
      requires: ['popperOffsets'],
      requiresIfExists: ['preventOverflow']
    };

    function getVariation(placement) {
      return placement.split('-')[1];
    }

    var unsetSides = {
      top: 'auto',
      right: 'auto',
      bottom: 'auto',
      left: 'auto'
    }; // Round the offsets to the nearest suitable subpixel based on the DPR.
    // Zooming can change the DPR, but it seems to report a value that will
    // cleanly divide the values into the appropriate subpixels.

    function roundOffsetsByDPR(_ref) {
      var x = _ref.x,
          y = _ref.y;
      var win = window;
      var dpr = win.devicePixelRatio || 1;
      return {
        x: round$1(x * dpr) / dpr || 0,
        y: round$1(y * dpr) / dpr || 0
      };
    }

    function mapToStyles(_ref2) {
      var _Object$assign2;

      var popper = _ref2.popper,
          popperRect = _ref2.popperRect,
          placement = _ref2.placement,
          variation = _ref2.variation,
          offsets = _ref2.offsets,
          position = _ref2.position,
          gpuAcceleration = _ref2.gpuAcceleration,
          adaptive = _ref2.adaptive,
          roundOffsets = _ref2.roundOffsets,
          isFixed = _ref2.isFixed;
      var _offsets$x = offsets.x,
          x = _offsets$x === void 0 ? 0 : _offsets$x,
          _offsets$y = offsets.y,
          y = _offsets$y === void 0 ? 0 : _offsets$y;

      var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
        x: x,
        y: y
      }) : {
        x: x,
        y: y
      };

      x = _ref3.x;
      y = _ref3.y;
      var hasX = offsets.hasOwnProperty('x');
      var hasY = offsets.hasOwnProperty('y');
      var sideX = left;
      var sideY = top;
      var win = window;

      if (adaptive) {
        var offsetParent = getOffsetParent(popper);
        var heightProp = 'clientHeight';
        var widthProp = 'clientWidth';

        if (offsetParent === getWindow(popper)) {
          offsetParent = getDocumentElement(popper);

          if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
            heightProp = 'scrollHeight';
            widthProp = 'scrollWidth';
          }
        } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


        offsetParent = offsetParent;

        if (placement === top || (placement === left || placement === right) && variation === end) {
          sideY = bottom;
          var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
          offsetParent[heightProp];
          y -= offsetY - popperRect.height;
          y *= gpuAcceleration ? 1 : -1;
        }

        if (placement === left || (placement === top || placement === bottom) && variation === end) {
          sideX = right;
          var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
          offsetParent[widthProp];
          x -= offsetX - popperRect.width;
          x *= gpuAcceleration ? 1 : -1;
        }
      }

      var commonStyles = Object.assign({
        position: position
      }, adaptive && unsetSides);

      var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
        x: x,
        y: y
      }) : {
        x: x,
        y: y
      };

      x = _ref4.x;
      y = _ref4.y;

      if (gpuAcceleration) {
        var _Object$assign;

        return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
      }

      return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
    }

    function computeStyles(_ref5) {
      var state = _ref5.state,
          options = _ref5.options;
      var _options$gpuAccelerat = options.gpuAcceleration,
          gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
          _options$adaptive = options.adaptive,
          adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
          _options$roundOffsets = options.roundOffsets,
          roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

      var commonStyles = {
        placement: getBasePlacement(state.placement),
        variation: getVariation(state.placement),
        popper: state.elements.popper,
        popperRect: state.rects.popper,
        gpuAcceleration: gpuAcceleration,
        isFixed: state.options.strategy === 'fixed'
      };

      if (state.modifiersData.popperOffsets != null) {
        state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.popperOffsets,
          position: state.options.strategy,
          adaptive: adaptive,
          roundOffsets: roundOffsets
        })));
      }

      if (state.modifiersData.arrow != null) {
        state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.arrow,
          position: 'absolute',
          adaptive: false,
          roundOffsets: roundOffsets
        })));
      }

      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-placement': state.placement
      });
    } // eslint-disable-next-line import/no-unused-modules


    var computeStyles$1 = {
      name: 'computeStyles',
      enabled: true,
      phase: 'beforeWrite',
      fn: computeStyles,
      data: {}
    };

    var passive = {
      passive: true
    };

    function effect(_ref) {
      var state = _ref.state,
          instance = _ref.instance,
          options = _ref.options;
      var _options$scroll = options.scroll,
          scroll = _options$scroll === void 0 ? true : _options$scroll,
          _options$resize = options.resize,
          resize = _options$resize === void 0 ? true : _options$resize;
      var window = getWindow(state.elements.popper);
      var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

      if (scroll) {
        scrollParents.forEach(function (scrollParent) {
          scrollParent.addEventListener('scroll', instance.update, passive);
        });
      }

      if (resize) {
        window.addEventListener('resize', instance.update, passive);
      }

      return function () {
        if (scroll) {
          scrollParents.forEach(function (scrollParent) {
            scrollParent.removeEventListener('scroll', instance.update, passive);
          });
        }

        if (resize) {
          window.removeEventListener('resize', instance.update, passive);
        }
      };
    } // eslint-disable-next-line import/no-unused-modules


    var eventListeners = {
      name: 'eventListeners',
      enabled: true,
      phase: 'write',
      fn: function fn() {},
      effect: effect,
      data: {}
    };

    var hash$1 = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    };
    function getOppositePlacement(placement) {
      return placement.replace(/left|right|bottom|top/g, function (matched) {
        return hash$1[matched];
      });
    }

    var hash = {
      start: 'end',
      end: 'start'
    };
    function getOppositeVariationPlacement(placement) {
      return placement.replace(/start|end/g, function (matched) {
        return hash[matched];
      });
    }

    function getWindowScroll(node) {
      var win = getWindow(node);
      var scrollLeft = win.pageXOffset;
      var scrollTop = win.pageYOffset;
      return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
      };
    }

    function getWindowScrollBarX(element) {
      // If <html> has a CSS width greater than the viewport, then this will be
      // incorrect for RTL.
      // Popper 1 is broken in this case and never had a bug report so let's assume
      // it's not an issue. I don't think anyone ever specifies width on <html>
      // anyway.
      // Browsers where the left scrollbar doesn't cause an issue report `0` for
      // this (e.g. Edge 2019, IE11, Safari)
      return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
    }

    function getViewportRect(element) {
      var win = getWindow(element);
      var html = getDocumentElement(element);
      var visualViewport = win.visualViewport;
      var width = html.clientWidth;
      var height = html.clientHeight;
      var x = 0;
      var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
      // can be obscured underneath it.
      // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
      // if it isn't open, so if this isn't available, the popper will be detected
      // to overflow the bottom of the screen too early.

      if (visualViewport) {
        width = visualViewport.width;
        height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
        // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
        // errors due to floating point numbers, so we need to check precision.
        // Safari returns a number <= 0, usually < -1 when pinch-zoomed
        // Feature detection fails in mobile emulation mode in Chrome.
        // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
        // 0.001
        // Fallback here: "Not Safari" userAgent

        if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
          x = visualViewport.offsetLeft;
          y = visualViewport.offsetTop;
        }
      }

      return {
        width: width,
        height: height,
        x: x + getWindowScrollBarX(element),
        y: y
      };
    }

    // of the `<html>` and `<body>` rect bounds if horizontally scrollable

    function getDocumentRect(element) {
      var _element$ownerDocumen;

      var html = getDocumentElement(element);
      var winScroll = getWindowScroll(element);
      var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
      var width = max$1(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
      var height = max$1(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
      var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
      var y = -winScroll.scrollTop;

      if (getComputedStyle$1(body || html).direction === 'rtl') {
        x += max$1(html.clientWidth, body ? body.clientWidth : 0) - width;
      }

      return {
        width: width,
        height: height,
        x: x,
        y: y
      };
    }

    function isScrollParent(element) {
      // Firefox wants us to check `-x` and `-y` variations as well
      var _getComputedStyle = getComputedStyle$1(element),
          overflow = _getComputedStyle.overflow,
          overflowX = _getComputedStyle.overflowX,
          overflowY = _getComputedStyle.overflowY;

      return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
    }

    function getScrollParent(node) {
      if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
        // $FlowFixMe[incompatible-return]: assume body is always available
        return node.ownerDocument.body;
      }

      if (isHTMLElement(node) && isScrollParent(node)) {
        return node;
      }

      return getScrollParent(getParentNode(node));
    }

    /*
    given a DOM element, return the list of all scroll parents, up the list of ancesors
    until we get to the top window object. This list is what we attach scroll listeners
    to, because if any of these parent elements scroll, we'll need to re-calculate the
    reference element's position.
    */

    function listScrollParents(element, list) {
      var _element$ownerDocumen;

      if (list === void 0) {
        list = [];
      }

      var scrollParent = getScrollParent(element);
      var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
      var win = getWindow(scrollParent);
      var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
      var updatedList = list.concat(target);
      return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
      updatedList.concat(listScrollParents(getParentNode(target)));
    }

    function rectToClientRect(rect) {
      return Object.assign({}, rect, {
        left: rect.x,
        top: rect.y,
        right: rect.x + rect.width,
        bottom: rect.y + rect.height
      });
    }

    function getInnerBoundingClientRect(element) {
      var rect = getBoundingClientRect(element);
      rect.top = rect.top + element.clientTop;
      rect.left = rect.left + element.clientLeft;
      rect.bottom = rect.top + element.clientHeight;
      rect.right = rect.left + element.clientWidth;
      rect.width = element.clientWidth;
      rect.height = element.clientHeight;
      rect.x = rect.left;
      rect.y = rect.top;
      return rect;
    }

    function getClientRectFromMixedType(element, clippingParent) {
      return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
    } // A "clipping parent" is an overflowable container with the characteristic of
    // clipping (or hiding) overflowing elements with a position different from
    // `initial`


    function getClippingParents(element) {
      var clippingParents = listScrollParents(getParentNode(element));
      var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
      var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

      if (!isElement(clipperElement)) {
        return [];
      } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


      return clippingParents.filter(function (clippingParent) {
        return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
      });
    } // Gets the maximum area that the element is visible in due to any number of
    // clipping parents


    function getClippingRect(element, boundary, rootBoundary) {
      var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
      var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
      var firstClippingParent = clippingParents[0];
      var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
        var rect = getClientRectFromMixedType(element, clippingParent);
        accRect.top = max$1(rect.top, accRect.top);
        accRect.right = min$1(rect.right, accRect.right);
        accRect.bottom = min$1(rect.bottom, accRect.bottom);
        accRect.left = max$1(rect.left, accRect.left);
        return accRect;
      }, getClientRectFromMixedType(element, firstClippingParent));
      clippingRect.width = clippingRect.right - clippingRect.left;
      clippingRect.height = clippingRect.bottom - clippingRect.top;
      clippingRect.x = clippingRect.left;
      clippingRect.y = clippingRect.top;
      return clippingRect;
    }

    function computeOffsets(_ref) {
      var reference = _ref.reference,
          element = _ref.element,
          placement = _ref.placement;
      var basePlacement = placement ? getBasePlacement(placement) : null;
      var variation = placement ? getVariation(placement) : null;
      var commonX = reference.x + reference.width / 2 - element.width / 2;
      var commonY = reference.y + reference.height / 2 - element.height / 2;
      var offsets;

      switch (basePlacement) {
        case top:
          offsets = {
            x: commonX,
            y: reference.y - element.height
          };
          break;

        case bottom:
          offsets = {
            x: commonX,
            y: reference.y + reference.height
          };
          break;

        case right:
          offsets = {
            x: reference.x + reference.width,
            y: commonY
          };
          break;

        case left:
          offsets = {
            x: reference.x - element.width,
            y: commonY
          };
          break;

        default:
          offsets = {
            x: reference.x,
            y: reference.y
          };
      }

      var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

      if (mainAxis != null) {
        var len = mainAxis === 'y' ? 'height' : 'width';

        switch (variation) {
          case start:
            offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
            break;

          case end:
            offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
            break;
        }
      }

      return offsets;
    }

    function detectOverflow(state, options) {
      if (options === void 0) {
        options = {};
      }

      var _options = options,
          _options$placement = _options.placement,
          placement = _options$placement === void 0 ? state.placement : _options$placement,
          _options$boundary = _options.boundary,
          boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
          _options$rootBoundary = _options.rootBoundary,
          rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
          _options$elementConte = _options.elementContext,
          elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
          _options$altBoundary = _options.altBoundary,
          altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
          _options$padding = _options.padding,
          padding = _options$padding === void 0 ? 0 : _options$padding;
      var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
      var altContext = elementContext === popper ? reference : popper;
      var popperRect = state.rects.popper;
      var element = state.elements[altBoundary ? altContext : elementContext];
      var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
      var referenceClientRect = getBoundingClientRect(state.elements.reference);
      var popperOffsets = computeOffsets({
        reference: referenceClientRect,
        element: popperRect,
        strategy: 'absolute',
        placement: placement
      });
      var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
      var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
      // 0 or negative = within the clipping rect

      var overflowOffsets = {
        top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
        bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
        left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
        right: elementClientRect.right - clippingClientRect.right + paddingObject.right
      };
      var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

      if (elementContext === popper && offsetData) {
        var offset = offsetData[placement];
        Object.keys(overflowOffsets).forEach(function (key) {
          var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
          var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
          overflowOffsets[key] += offset[axis] * multiply;
        });
      }

      return overflowOffsets;
    }

    function computeAutoPlacement(state, options) {
      if (options === void 0) {
        options = {};
      }

      var _options = options,
          placement = _options.placement,
          boundary = _options.boundary,
          rootBoundary = _options.rootBoundary,
          padding = _options.padding,
          flipVariations = _options.flipVariations,
          _options$allowedAutoP = _options.allowedAutoPlacements,
          allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
      var variation = getVariation(placement);
      var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
        return getVariation(placement) === variation;
      }) : basePlacements;
      var allowedPlacements = placements$1.filter(function (placement) {
        return allowedAutoPlacements.indexOf(placement) >= 0;
      });

      if (allowedPlacements.length === 0) {
        allowedPlacements = placements$1;
      } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


      var overflows = allowedPlacements.reduce(function (acc, placement) {
        acc[placement] = detectOverflow(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          padding: padding
        })[getBasePlacement(placement)];
        return acc;
      }, {});
      return Object.keys(overflows).sort(function (a, b) {
        return overflows[a] - overflows[b];
      });
    }

    function getExpandedFallbackPlacements(placement) {
      if (getBasePlacement(placement) === auto) {
        return [];
      }

      var oppositePlacement = getOppositePlacement(placement);
      return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
    }

    function flip(_ref) {
      var state = _ref.state,
          options = _ref.options,
          name = _ref.name;

      if (state.modifiersData[name]._skip) {
        return;
      }

      var _options$mainAxis = options.mainAxis,
          checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
          _options$altAxis = options.altAxis,
          checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
          specifiedFallbackPlacements = options.fallbackPlacements,
          padding = options.padding,
          boundary = options.boundary,
          rootBoundary = options.rootBoundary,
          altBoundary = options.altBoundary,
          _options$flipVariatio = options.flipVariations,
          flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
          allowedAutoPlacements = options.allowedAutoPlacements;
      var preferredPlacement = state.options.placement;
      var basePlacement = getBasePlacement(preferredPlacement);
      var isBasePlacement = basePlacement === preferredPlacement;
      var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
      var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
        return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          padding: padding,
          flipVariations: flipVariations,
          allowedAutoPlacements: allowedAutoPlacements
        }) : placement);
      }, []);
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var checksMap = new Map();
      var makeFallbackChecks = true;
      var firstFittingPlacement = placements[0];

      for (var i = 0; i < placements.length; i++) {
        var placement = placements[i];

        var _basePlacement = getBasePlacement(placement);

        var isStartVariation = getVariation(placement) === start;
        var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
        var len = isVertical ? 'width' : 'height';
        var overflow = detectOverflow(state, {
          placement: placement,
          boundary: boundary,
          rootBoundary: rootBoundary,
          altBoundary: altBoundary,
          padding: padding
        });
        var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

        if (referenceRect[len] > popperRect[len]) {
          mainVariationSide = getOppositePlacement(mainVariationSide);
        }

        var altVariationSide = getOppositePlacement(mainVariationSide);
        var checks = [];

        if (checkMainAxis) {
          checks.push(overflow[_basePlacement] <= 0);
        }

        if (checkAltAxis) {
          checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
        }

        if (checks.every(function (check) {
          return check;
        })) {
          firstFittingPlacement = placement;
          makeFallbackChecks = false;
          break;
        }

        checksMap.set(placement, checks);
      }

      if (makeFallbackChecks) {
        // `2` may be desired in some cases – research later
        var numberOfChecks = flipVariations ? 3 : 1;

        var _loop = function _loop(_i) {
          var fittingPlacement = placements.find(function (placement) {
            var checks = checksMap.get(placement);

            if (checks) {
              return checks.slice(0, _i).every(function (check) {
                return check;
              });
            }
          });

          if (fittingPlacement) {
            firstFittingPlacement = fittingPlacement;
            return "break";
          }
        };

        for (var _i = numberOfChecks; _i > 0; _i--) {
          var _ret = _loop(_i);

          if (_ret === "break") break;
        }
      }

      if (state.placement !== firstFittingPlacement) {
        state.modifiersData[name]._skip = true;
        state.placement = firstFittingPlacement;
        state.reset = true;
      }
    } // eslint-disable-next-line import/no-unused-modules


    var flip$1 = {
      name: 'flip',
      enabled: true,
      phase: 'main',
      fn: flip,
      requiresIfExists: ['offset'],
      data: {
        _skip: false
      }
    };

    function getSideOffsets(overflow, rect, preventedOffsets) {
      if (preventedOffsets === void 0) {
        preventedOffsets = {
          x: 0,
          y: 0
        };
      }

      return {
        top: overflow.top - rect.height - preventedOffsets.y,
        right: overflow.right - rect.width + preventedOffsets.x,
        bottom: overflow.bottom - rect.height + preventedOffsets.y,
        left: overflow.left - rect.width - preventedOffsets.x
      };
    }

    function isAnySideFullyClipped(overflow) {
      return [top, right, bottom, left].some(function (side) {
        return overflow[side] >= 0;
      });
    }

    function hide(_ref) {
      var state = _ref.state,
          name = _ref.name;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var preventedOffsets = state.modifiersData.preventOverflow;
      var referenceOverflow = detectOverflow(state, {
        elementContext: 'reference'
      });
      var popperAltOverflow = detectOverflow(state, {
        altBoundary: true
      });
      var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
      var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
      var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
      var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
      state.modifiersData[name] = {
        referenceClippingOffsets: referenceClippingOffsets,
        popperEscapeOffsets: popperEscapeOffsets,
        isReferenceHidden: isReferenceHidden,
        hasPopperEscaped: hasPopperEscaped
      };
      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        'data-popper-reference-hidden': isReferenceHidden,
        'data-popper-escaped': hasPopperEscaped
      });
    } // eslint-disable-next-line import/no-unused-modules


    var hide$1 = {
      name: 'hide',
      enabled: true,
      phase: 'main',
      requiresIfExists: ['preventOverflow'],
      fn: hide
    };

    function distanceAndSkiddingToXY(placement, rects, offset) {
      var basePlacement = getBasePlacement(placement);
      var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

      var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
        placement: placement
      })) : offset,
          skidding = _ref[0],
          distance = _ref[1];

      skidding = skidding || 0;
      distance = (distance || 0) * invertDistance;
      return [left, right].indexOf(basePlacement) >= 0 ? {
        x: distance,
        y: skidding
      } : {
        x: skidding,
        y: distance
      };
    }

    function offset(_ref2) {
      var state = _ref2.state,
          options = _ref2.options,
          name = _ref2.name;
      var _options$offset = options.offset,
          offset = _options$offset === void 0 ? [0, 0] : _options$offset;
      var data = placements.reduce(function (acc, placement) {
        acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
        return acc;
      }, {});
      var _data$state$placement = data[state.placement],
          x = _data$state$placement.x,
          y = _data$state$placement.y;

      if (state.modifiersData.popperOffsets != null) {
        state.modifiersData.popperOffsets.x += x;
        state.modifiersData.popperOffsets.y += y;
      }

      state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules


    var offset$1 = {
      name: 'offset',
      enabled: true,
      phase: 'main',
      requires: ['popperOffsets'],
      fn: offset
    };

    function popperOffsets(_ref) {
      var state = _ref.state,
          name = _ref.name;
      // Offsets are the actual position the popper needs to have to be
      // properly positioned near its reference element
      // This is the most basic placement, and will be adjusted by
      // the modifiers in the next step
      state.modifiersData[name] = computeOffsets({
        reference: state.rects.reference,
        element: state.rects.popper,
        strategy: 'absolute',
        placement: state.placement
      });
    } // eslint-disable-next-line import/no-unused-modules


    var popperOffsets$1 = {
      name: 'popperOffsets',
      enabled: true,
      phase: 'read',
      fn: popperOffsets,
      data: {}
    };

    function getAltAxis(axis) {
      return axis === 'x' ? 'y' : 'x';
    }

    function preventOverflow(_ref) {
      var state = _ref.state,
          options = _ref.options,
          name = _ref.name;
      var _options$mainAxis = options.mainAxis,
          checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
          _options$altAxis = options.altAxis,
          checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
          boundary = options.boundary,
          rootBoundary = options.rootBoundary,
          altBoundary = options.altBoundary,
          padding = options.padding,
          _options$tether = options.tether,
          tether = _options$tether === void 0 ? true : _options$tether,
          _options$tetherOffset = options.tetherOffset,
          tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
      var overflow = detectOverflow(state, {
        boundary: boundary,
        rootBoundary: rootBoundary,
        padding: padding,
        altBoundary: altBoundary
      });
      var basePlacement = getBasePlacement(state.placement);
      var variation = getVariation(state.placement);
      var isBasePlacement = !variation;
      var mainAxis = getMainAxisFromPlacement(basePlacement);
      var altAxis = getAltAxis(mainAxis);
      var popperOffsets = state.modifiersData.popperOffsets;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
        placement: state.placement
      })) : tetherOffset;
      var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
        mainAxis: tetherOffsetValue,
        altAxis: tetherOffsetValue
      } : Object.assign({
        mainAxis: 0,
        altAxis: 0
      }, tetherOffsetValue);
      var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
      var data = {
        x: 0,
        y: 0
      };

      if (!popperOffsets) {
        return;
      }

      if (checkMainAxis) {
        var _offsetModifierState$;

        var mainSide = mainAxis === 'y' ? top : left;
        var altSide = mainAxis === 'y' ? bottom : right;
        var len = mainAxis === 'y' ? 'height' : 'width';
        var offset = popperOffsets[mainAxis];
        var min = offset + overflow[mainSide];
        var max = offset - overflow[altSide];
        var additive = tether ? -popperRect[len] / 2 : 0;
        var minLen = variation === start ? referenceRect[len] : popperRect[len];
        var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
        // outside the reference bounds

        var arrowElement = state.elements.arrow;
        var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
          width: 0,
          height: 0
        };
        var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
        var arrowPaddingMin = arrowPaddingObject[mainSide];
        var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
        // to include its full size in the calculation. If the reference is small
        // and near the edge of a boundary, the popper can overflow even if the
        // reference is not overflowing as well (e.g. virtual elements with no
        // width or height)

        var arrowLen = within(0, referenceRect[len], arrowRect[len]);
        var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
        var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
        var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
        var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
        var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
        var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
        var tetherMax = offset + maxOffset - offsetModifierValue;
        var preventedOffset = within(tether ? min$1(min, tetherMin) : min, offset, tether ? max$1(max, tetherMax) : max);
        popperOffsets[mainAxis] = preventedOffset;
        data[mainAxis] = preventedOffset - offset;
      }

      if (checkAltAxis) {
        var _offsetModifierState$2;

        var _mainSide = mainAxis === 'x' ? top : left;

        var _altSide = mainAxis === 'x' ? bottom : right;

        var _offset = popperOffsets[altAxis];

        var _len = altAxis === 'y' ? 'height' : 'width';

        var _min = _offset + overflow[_mainSide];

        var _max = _offset - overflow[_altSide];

        var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

        var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

        var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

        var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

        var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

        popperOffsets[altAxis] = _preventedOffset;
        data[altAxis] = _preventedOffset - _offset;
      }

      state.modifiersData[name] = data;
    } // eslint-disable-next-line import/no-unused-modules


    var preventOverflow$1 = {
      name: 'preventOverflow',
      enabled: true,
      phase: 'main',
      fn: preventOverflow,
      requiresIfExists: ['offset']
    };

    function getHTMLElementScroll(element) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }

    function getNodeScroll(node) {
      if (node === getWindow(node) || !isHTMLElement(node)) {
        return getWindowScroll(node);
      } else {
        return getHTMLElementScroll(node);
      }
    }

    function isElementScaled(element) {
      var rect = element.getBoundingClientRect();
      var scaleX = round$1(rect.width) / element.offsetWidth || 1;
      var scaleY = round$1(rect.height) / element.offsetHeight || 1;
      return scaleX !== 1 || scaleY !== 1;
    } // Returns the composite rect of an element relative to its offsetParent.
    // Composite means it takes into account transforms as well as layout.


    function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
      if (isFixed === void 0) {
        isFixed = false;
      }

      var isOffsetParentAnElement = isHTMLElement(offsetParent);
      var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
      var documentElement = getDocumentElement(offsetParent);
      var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
      var scroll = {
        scrollLeft: 0,
        scrollTop: 0
      };
      var offsets = {
        x: 0,
        y: 0
      };

      if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
        if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
        isScrollParent(documentElement)) {
          scroll = getNodeScroll(offsetParent);
        }

        if (isHTMLElement(offsetParent)) {
          offsets = getBoundingClientRect(offsetParent, true);
          offsets.x += offsetParent.clientLeft;
          offsets.y += offsetParent.clientTop;
        } else if (documentElement) {
          offsets.x = getWindowScrollBarX(documentElement);
        }
      }

      return {
        x: rect.left + scroll.scrollLeft - offsets.x,
        y: rect.top + scroll.scrollTop - offsets.y,
        width: rect.width,
        height: rect.height
      };
    }

    function order(modifiers) {
      var map = new Map();
      var visited = new Set();
      var result = [];
      modifiers.forEach(function (modifier) {
        map.set(modifier.name, modifier);
      }); // On visiting object, check for its dependencies and visit them recursively

      function sort(modifier) {
        visited.add(modifier.name);
        var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
        requires.forEach(function (dep) {
          if (!visited.has(dep)) {
            var depModifier = map.get(dep);

            if (depModifier) {
              sort(depModifier);
            }
          }
        });
        result.push(modifier);
      }

      modifiers.forEach(function (modifier) {
        if (!visited.has(modifier.name)) {
          // check for visited object
          sort(modifier);
        }
      });
      return result;
    }

    function orderModifiers(modifiers) {
      // order based on dependencies
      var orderedModifiers = order(modifiers); // order based on phase

      return modifierPhases.reduce(function (acc, phase) {
        return acc.concat(orderedModifiers.filter(function (modifier) {
          return modifier.phase === phase;
        }));
      }, []);
    }

    function debounce(fn) {
      var pending;
      return function () {
        if (!pending) {
          pending = new Promise(function (resolve) {
            Promise.resolve().then(function () {
              pending = undefined;
              resolve(fn());
            });
          });
        }

        return pending;
      };
    }

    function mergeByName(modifiers) {
      var merged = modifiers.reduce(function (merged, current) {
        var existing = merged[current.name];
        merged[current.name] = existing ? Object.assign({}, existing, current, {
          options: Object.assign({}, existing.options, current.options),
          data: Object.assign({}, existing.data, current.data)
        }) : current;
        return merged;
      }, {}); // IE11 does not support Object.values

      return Object.keys(merged).map(function (key) {
        return merged[key];
      });
    }

    var DEFAULT_OPTIONS = {
      placement: 'bottom',
      modifiers: [],
      strategy: 'absolute'
    };

    function areValidElements() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return !args.some(function (element) {
        return !(element && typeof element.getBoundingClientRect === 'function');
      });
    }

    function popperGenerator(generatorOptions) {
      if (generatorOptions === void 0) {
        generatorOptions = {};
      }

      var _generatorOptions = generatorOptions,
          _generatorOptions$def = _generatorOptions.defaultModifiers,
          defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
          _generatorOptions$def2 = _generatorOptions.defaultOptions,
          defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
      return function createPopper(reference, popper, options) {
        if (options === void 0) {
          options = defaultOptions;
        }

        var state = {
          placement: 'bottom',
          orderedModifiers: [],
          options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
          modifiersData: {},
          elements: {
            reference: reference,
            popper: popper
          },
          attributes: {},
          styles: {}
        };
        var effectCleanupFns = [];
        var isDestroyed = false;
        var instance = {
          state: state,
          setOptions: function setOptions(setOptionsAction) {
            var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
            cleanupModifierEffects();
            state.options = Object.assign({}, defaultOptions, state.options, options);
            state.scrollParents = {
              reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
              popper: listScrollParents(popper)
            }; // Orders the modifiers based on their dependencies and `phase`
            // properties

            var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

            state.orderedModifiers = orderedModifiers.filter(function (m) {
              return m.enabled;
            }); // Validate the provided modifiers so that the consumer will get warned

            runModifierEffects();
            return instance.update();
          },
          // Sync update – it will always be executed, even if not necessary. This
          // is useful for low frequency updates where sync behavior simplifies the
          // logic.
          // For high frequency updates (e.g. `resize` and `scroll` events), always
          // prefer the async Popper#update method
          forceUpdate: function forceUpdate() {
            if (isDestroyed) {
              return;
            }

            var _state$elements = state.elements,
                reference = _state$elements.reference,
                popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
            // anymore

            if (!areValidElements(reference, popper)) {

              return;
            } // Store the reference and popper rects to be read by modifiers


            state.rects = {
              reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
              popper: getLayoutRect(popper)
            }; // Modifiers have the ability to reset the current update cycle. The
            // most common use case for this is the `flip` modifier changing the
            // placement, which then needs to re-run all the modifiers, because the
            // logic was previously ran for the previous placement and is therefore
            // stale/incorrect

            state.reset = false;
            state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
            // is filled with the initial data specified by the modifier. This means
            // it doesn't persist and is fresh on each update.
            // To ensure persistent data, use `${name}#persistent`

            state.orderedModifiers.forEach(function (modifier) {
              return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
            });

            for (var index = 0; index < state.orderedModifiers.length; index++) {

              if (state.reset === true) {
                state.reset = false;
                index = -1;
                continue;
              }

              var _state$orderedModifie = state.orderedModifiers[index],
                  fn = _state$orderedModifie.fn,
                  _state$orderedModifie2 = _state$orderedModifie.options,
                  _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
                  name = _state$orderedModifie.name;

              if (typeof fn === 'function') {
                state = fn({
                  state: state,
                  options: _options,
                  name: name,
                  instance: instance
                }) || state;
              }
            }
          },
          // Async and optimistically optimized update – it will not be executed if
          // not necessary (debounced to run at most once-per-tick)
          update: debounce(function () {
            return new Promise(function (resolve) {
              instance.forceUpdate();
              resolve(state);
            });
          }),
          destroy: function destroy() {
            cleanupModifierEffects();
            isDestroyed = true;
          }
        };

        if (!areValidElements(reference, popper)) {

          return instance;
        }

        instance.setOptions(options).then(function (state) {
          if (!isDestroyed && options.onFirstUpdate) {
            options.onFirstUpdate(state);
          }
        }); // Modifiers have the ability to execute arbitrary code before the first
        // update cycle runs. They will be executed in the same order as the update
        // cycle. This is useful when a modifier adds some persistent data that
        // other modifiers need to use, but the modifier is run after the dependent
        // one.

        function runModifierEffects() {
          state.orderedModifiers.forEach(function (_ref3) {
            var name = _ref3.name,
                _ref3$options = _ref3.options,
                options = _ref3$options === void 0 ? {} : _ref3$options,
                effect = _ref3.effect;

            if (typeof effect === 'function') {
              var cleanupFn = effect({
                state: state,
                name: name,
                instance: instance,
                options: options
              });

              var noopFn = function noopFn() {};

              effectCleanupFns.push(cleanupFn || noopFn);
            }
          });
        }

        function cleanupModifierEffects() {
          effectCleanupFns.forEach(function (fn) {
            return fn();
          });
          effectCleanupFns = [];
        }

        return instance;
      };
    }

    var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
    var createPopper = /*#__PURE__*/popperGenerator({
      defaultModifiers: defaultModifiers
    }); // eslint-disable-next-line import/no-unused-modules

    var css_248z$2 = "/**\n * omiu tip css based on element ui css\n * Licensed under the MIT License\n * https://github.com/ElemeFE/element/blob/dev/LICENSE\n *\n * modified by dntzhang\n */\n:host {\n  display: inline-block;\n}\n\n:host([block]) {\n  display: block;\n}\n\n.tip {\n  position: absolute;\n  background: #fff;\n  min-width: 150px;\n  border-radius: 4px;\n  border: 1px solid #ebeef5;\n  z-index: 2000;\n  color: #606266;\n  line-height: 1.4;\n  text-align: justify;\n  font-size: 14px;\n  word-break: break-all;\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n  min-width: 100%;\n}\n\n.tip .tip-arrow,\n.tip .tip-arrow::after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n\n.tip .tip-arrow {\n  border-width: 6px;\n}\n\n.tip .tip-arrow::after {\n  content: \" \";\n  border-width: 5px;\n}\n\n.tip[data-popper-placement^=top] {\n  margin-bottom: 12px;\n}\n\n.tip[data-popper-placement^=top] .tip-arrow {\n  bottom: -6px;\n  border-top-color: #ebeef5;\n  border-bottom-width: 0;\n}\n\n.tip[data-popper-placement^=top] .tip-arrow::after {\n  bottom: 1px;\n  margin-left: -5px;\n  border-top-color: #ebeef5;\n  border-bottom-width: 0;\n}\n\n.tip[data-popper-placement^=bottom] {\n  margin-top: 12px;\n}\n\n.tip[data-popper-placement^=bottom] .tip-arrow {\n  top: -6px;\n  border-top-width: 0;\n  border-bottom-color: #ebeef5;\n}\n\n.tip[data-popper-placement^=bottom] .tip-arrow::after {\n  top: 1px;\n  margin-left: -5px;\n  border-top-width: 0;\n  border-bottom-color: #ebeef5;\n}\n\n.tip[data-popper-placement^=right] {\n  margin-left: 12px;\n}\n\n.tip[data-popper-placement^=right] .tip-arrow {\n  left: -6px;\n  border-right-color: #ebeef5;\n  border-left-width: 0;\n}\n\n.tip[data-popper-placement^=right] .tip-arrow::after {\n  bottom: -5px;\n  left: 1px;\n  border-right-color: #ebeef5;\n  border-left-width: 0;\n}\n\n.tip[data-popper-placement^=left] {\n  margin-right: 12px;\n}\n\n.tip[data-popper-placement^=left] .tip-arrow {\n  right: -6px;\n  border-right-width: 0;\n  border-left-color: #ebeef5;\n}\n\n.tip[data-popper-placement^=left] .tip-arrow::after {\n  right: 1px;\n  bottom: -5px;\n  margin-left: -5px;\n  border-right-width: 0;\n  border-left-color: #ebeef5;\n}\n\n.tip.is-dark {\n  background: #ebeef5;\n  color: #FFF;\n}\n\n.tip.is-light {\n  background: #FFF;\n}\n\n.tip.is-light[data-popper-placement^=top] .tip-arrow {\n  border-top-color: #ebeef5;\n}\n\n.tip.is-light[data-popper-placement^=top] .tip-arrow::after {\n  border-top-color: #FFF;\n}\n\n.tip.is-light[data-popper-placement^=bottom] .tip-arrow {\n  border-bottom-color: #ebeef5;\n}\n\n.tip.is-light[data-popper-placement^=bottom] .tip-arrow::after {\n  border-bottom-color: #FFF;\n}\n\n.tip.is-light[data-popper-placement^=left] .tip-arrow {\n  border-left-color: #ebeef5;\n}\n\n.tip.is-light[data-popper-placement^=left] .tip-arrow::after {\n  border-left-color: #FFF;\n}\n\n.tip.is-light[data-popper-placement^=right] .tip-arrow {\n  border-right-color: #ebeef5;\n}\n\n.tip.is-light[data-popper-placement^=right] .tip-arrow::after {\n  border-right-color: #FFF;\n}\n\n.fade-enter,\n.fade-leave-to {\n  opacity: 0;\n  padding-top: 10px;\n  pointer-events: none;\n}\n\n.fade-enter-active,\n.fade-leave-active {\n  transition: opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1), padding-top 0.3s cubic-bezier(0.55, 0, 0.1, 1);\n}";
    styleInject(css_248z$2);

    /**
     * classNames based on https://github.com/JedWatson/classnames
     * by Jed Watson
     * Licensed under the MIT License
     * https://github.com/JedWatson/classnames/blob/master/LICENSE
     * modified by dntzhang
     */
    var hasOwn = {}.hasOwnProperty;
    function classNames() {
        var classes = [];
        for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if (!arg)
                continue;
            var argType = typeof arg;
            if (argType === 'string' || argType === 'number') {
                classes.push(arg);
            }
            else if (Array.isArray(arg) && arg.length) {
                // @ts-ignore
                var inner = classNames.apply(null, arg);
                if (inner) {
                    classes.push(inner);
                }
            }
            else if (argType === 'object') {
                for (var key in arg) {
                    if (hasOwn.call(arg, key) && arg[key]) {
                        classes.push(key);
                    }
                }
            }
        }
        return classes.join(' ');
    }
    function extractClass(a, b, c) {
        var _a = __read(Array.prototype.slice.call(arguments, 0)), props = _a[0], args = _a.slice(1);
        if (props.class) {
            args.unshift(props.class);
            delete props.class;
        }
        else if (props.className) {
            args.unshift(props.className);
            delete props.className;
        }
        if (args.length > 0) {
            return { class: classNames.apply(null, args) };
        }
        return { class: '' };
    }

    var readyCallbacks = [];
    document.addEventListener('DOMContentLoaded', function () {
        readyCallbacks.forEach(function (callback) {
            callback();
        });
    });

    /** @class */ ((function (_super) {
        __extends(WuPopover, _super);
        function WuPopover() {
            var _this = _super.call(this) || this;
            _this.isShow = false;
            _this.appear = false;
            _this.disappear = false;
            _this.popper = null;
            _this.onEnter = function (evt) {
                if (_this.disabled)
                    return;
                clearTimeout(_this.timeout);
                _this.isShow = !_this.isShow;
                if (_this.isShow) {
                    _this.appear = true;
                    _this.disappear = false;
                }
                else {
                    _this.appear = false;
                    _this.disappear = true;
                }
                //html 模式过滤文本
                var tip = _this.shadowRoot
                    .querySelector('slot')
                    .assignedNodes()
                    .find(function (node) { return node.nodeType !== 3; });
                _this.popper = createPopper(tip, _this.shadowRoot.querySelector('.tip'), {
                    placement: _this.position,
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 8],
                            },
                        },
                        {
                            name: 'computeStyles',
                            options: {
                                adaptive: false, // true by default
                            },
                        },
                    ],
                });
                evt.stopPropagation();
            };
            _this.onEnterPopover = function (evt) {
                clearTimeout(_this.timeout);
                evt.stopPropagation();
            };
            _this.onLeavePopover = function () {
                if (_this.trigger === 'hover') {
                    _this.timeout = setTimeout(function () {
                        _this.leave();
                    }, 0);
                }
            };
            _this.onLeave = function () {
                _this.timeout = setTimeout(function () {
                    _this.leave();
                }, 0);
            };
            return _this;
        }
        WuPopover.prototype.connected = function (shadowRoot) {
            var _this = this;
            window.addEventListener('click', function (e) {
                var _a, _b;
                // @ts-ignore
                if (((_b = (_a = e.target) === null || _a === void 0 ? void 0 : _a.rootNode) === null || _b === void 0 ? void 0 : _b.$options.name) === 'wu-plus-popover') {
                    return;
                }
                if (_this.trigger === 'manual')
                    return;
                if (_this.isShow) {
                    _this.leave();
                }
            });
        };
        WuPopover.prototype.closeEmit = function () {
            return {
                value: true
            };
        };
        WuPopover.prototype.updatePosition = function () {
            this.popper.update();
        };
        WuPopover.prototype.leave = function () {
            var _this = this;
            this.appear = false;
            this.disappear = true;
            setTimeout(function () {
                _this.isShow = false;
                _this.closeEmit();
            }, 0);
        };
        WuPopover.prototype.render = function (_renderProps, _store) {
            var _a;
            var targetEvents = {
                onMouseEnter: null,
                onMouseLeave: null,
                onClick: null,
            };
            if (this.trigger === 'click') {
                targetEvents.onClick = this.onEnter;
            }
            else if (this.trigger === 'hover') {
                targetEvents.onMouseEnter = this.onEnter;
                targetEvents.onMouseLeave = this.onLeave;
            }
            return (webCorePlus.h("div", { style: "position:relative", appear: this.appear, disappear: this.disappear, name: "fade" },
                webCorePlus.h("slot", __assign({}, targetEvents)),
                webCorePlus.h("div", { style: { display: this.isShow ? 'block' : 'none' }, class: classNames((_a = {
                            tip: true
                        },
                        _a["is-".concat(this.effect)] = this.effect,
                        _a)) },
                    webCorePlus.h("slot", { onMouseEnter: this.onEnterPopover, onMouseLeave: this.onLeavePopover, name: "popover" }),
                    webCorePlus.h("i", { class: "tip-arrow", "data-popper-arrow": true }),
                    webCorePlus.h("slot", { name: "footer" }))));
        };
        __decorate([
            webCorePlus.Prop({ type: String, default: 'bottom' }),
            __metadata("design:type", String)
        ], WuPopover.prototype, "position", void 0);
        __decorate([
            webCorePlus.Prop({ type: String, default: 'light' }),
            __metadata("design:type", String)
        ], WuPopover.prototype, "effect", void 0);
        __decorate([
            webCorePlus.Prop({ type: String, default: 'click' }),
            __metadata("design:type", String)
        ], WuPopover.prototype, "trigger", void 0);
        __decorate([
            webCorePlus.Prop({ type: Boolean, default: false }),
            __metadata("design:type", Boolean)
        ], WuPopover.prototype, "block", void 0);
        __decorate([
            webCorePlus.Prop({ type: String, default: '' }),
            __metadata("design:type", String)
        ], WuPopover.prototype, "content", void 0);
        __decorate([
            webCorePlus.Prop({ type: Boolean, default: false }),
            __metadata("design:type", Object)
        ], WuPopover.prototype, "isShow", void 0);
        __decorate([
            webCorePlus.Prop({ type: Boolean, default: false }),
            __metadata("design:type", Object)
        ], WuPopover.prototype, "appear", void 0);
        __decorate([
            webCorePlus.Prop({ type: Boolean, default: false }),
            __metadata("design:type", Object)
        ], WuPopover.prototype, "disappear", void 0);
        __decorate([
            webCorePlus.Prop({ default: false, type: Boolean }),
            __metadata("design:type", Boolean)
        ], WuPopover.prototype, "disabled", void 0);
        __decorate([
            webCorePlus.Emit('close'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], WuPopover.prototype, "closeEmit", null);
        WuPopover = __decorate([
            webCorePlus.Component({
                name: 'wu-plus-popover',
                css: css_248z$2,
            }),
            __metadata("design:paramtypes", [])
        ], WuPopover);
        return WuPopover;
    })(webCorePlus.WuComponent));

    var css_248z$1 = "@charset \"UTF-8\";\n/**********************系统级别配置*******************************/\n/**********************基本颜色***************************/\n/* z-index\n-------------------------- */\n/* Disable base\n-------------------------- */\n/* Transition\n-------------------------- */\n/* Color\n-------------------------- */\n/* 53a8ff */\n/* 66b1ff */\n/* 79bbff */\n/* 8cc5ff */\n/* a0cfff */\n/* b3d8ff */\n/* c6e2ff */\n/* d9ecff */\n/* ecf5ff */\n/* Fill\n-------------------------- */\n/**********************基本边框***************************/\n/**********************盒模型阴影*************************/\n/**********************基本字体*************************/\n/**********************Button***************************/\n/**************************Radio****************************/\n/* Input-------------------------- */\n/* Break-point\n--------------------------*/\n/* Link\n--------------------------*/\n/* Switch\n-------------------------- */\n/* Table\n-------------------------- */\n/* Pagination\n-------------------------- */\n/* Dropdown\n-------------------------- */\n/* Checkbox\n-------------------------- */\n/* Tag\n-------------------------- */\n/* Message\n-------------------------- */\n/* Rate\n--------------------------*/\n/* Timeline\n--------------------------*/\n/* Select\n-------------------------- */\n/* Avatar\n--------------------------*/\n/* Badge\n-------------------------- */\n/* Empty\n-------------------------- */\n/* Skeleton\n--------------------------*/\n/* Svg\n--------------- */\n/* Card\n--------------------------*/\n/* Header\n  --------------------------*/\n/* Footer\n--------------------------*/\n/* Main\n--------------------------*/\n/* Alert\n-------------------------- */\n/* Pagination\n-------------------------- */\n/* Transition\n-------------------------- */\n/* Collapse\n--------------------------*/\n/* Menu\n--------------------------*/\n/* BEM support Func\n -------------------------- */\n/* Break-points\n -------------------------- */\n/* Scrollbar\n -------------------------- */\n/* Placeholder\n -------------------------- */\n:host {\n  display: inline-block;\n}\n\n:host([block]) {\n  display: block;\n}\n\n.wu-button {\n  display: inline-block;\n  line-height: 1;\n  white-space: nowrap;\n  cursor: pointer;\n  background: #FFFFFF;\n  border: 1px solid #C0C4CC;\n  color: #606266;\n  -webkit-appearance: none;\n  text-align: center;\n  box-sizing: border-box;\n  outline: none;\n  margin: 0;\n  transition: 0.1s;\n  font-weight: 500;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  padding: 12px 20px;\n  font-size: 14px;\n  border-radius: 4px;\n}\n.wu-button + .wu-button {\n  margin-left: 10px;\n}\n.wu-button.is-round {\n  padding: 12px 20px;\n}\n.wu-button:hover, .wu-button:focus {\n  color: #409EFF;\n  border-color: #c6e2ff;\n  background-color: #ecf5ff;\n}\n.wu-button:active {\n  color: #3a8ee6;\n  border-color: #3a8ee6;\n  outline: none;\n}\n.wu-button::-moz-focus-inner {\n  border: 0;\n}\n.wu-button [class*=wu-icon-] + span {\n  margin-left: 5px;\n}\n.wu-button.is-plain:hover, .wu-button.is-plain:focus {\n  background: #FFFFFF;\n  border-color: #409EFF;\n  color: #409EFF;\n}\n.wu-button.is-plain:active {\n  background: #FFFFFF;\n  border-color: #3a8ee6;\n  color: #3a8ee6;\n  outline: none;\n}\n\n.wu-button.is-active {\n  color: #3a8ee6;\n  border-color: #3a8ee6;\n}\n\n.wu-button.is-disabled, .wu-button.is-disabled:hover, .wu-button.is-disabled:focus {\n  color: #C0C4CC;\n  cursor: not-allowed;\n  background-image: none;\n  background-color: #FFFFFF;\n  border-color: #EBEEF5;\n}\n.wu-button.is-disabled.wu-button--text {\n  background-color: transparent;\n}\n.wu-button.is-disabled.is-plain, .wu-button.is-disabled.is-plain:hover, .wu-button.is-disabled.is-plain:focus {\n  background-color: #FFFFFF;\n  border-color: #EBEEF5;\n  color: #C0C4CC;\n}\n\n.wu-button.is-loading {\n  position: relative;\n  pointer-events: none;\n}\n.wu-button.is-loading:before {\n  pointer-events: none;\n  content: \"\";\n  position: absolute;\n  left: -1px;\n  top: -1px;\n  right: -1px;\n  bottom: -1px;\n  border-radius: inherit;\n  background-color: rgba(255, 255, 255, 0.35);\n}\n\n.wu-button.is-round {\n  border-radius: 20px;\n  padding: 12px 23px;\n}\n\n.wu-button.is-circle {\n  border-radius: 50%;\n  padding: 12px;\n}\n\n.wu-button-primary {\n  color: #FFFFFF;\n  background-color: #409EFF;\n  border-color: #409EFF;\n}\n.wu-button-primary:hover, .wu-button-primary:focus {\n  background: #66b1ff;\n  border-color: #66b1ff;\n  color: #FFFFFF;\n}\n.wu-button-primary:active {\n  background: #3a8ee6;\n  border-color: #3a8ee6;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-primary.is-active {\n  background: #3a8ee6;\n  border-color: #3a8ee6;\n  color: #FFFFFF;\n}\n.wu-button-primary.is-disabled, .wu-button-primary.is-disabled:hover, .wu-button-primary.is-disabled:focus, .wu-button-primary.is-disabled:active {\n  color: #FFFFFF;\n  background-color: #a0cfff;\n  border-color: #a0cfff;\n}\n.wu-button-primary.is-plain {\n  color: #409EFF;\n  background: #ecf5ff;\n  border-color: #b3d8ff;\n}\n.wu-button-primary.is-plain:hover, .wu-button-primary.is-plain:focus {\n  background: #409EFF;\n  border-color: #409EFF;\n  color: #FFFFFF;\n}\n.wu-button-primary.is-plain:active {\n  background: #3a8ee6;\n  border-color: #3a8ee6;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-primary.is-plain.is-disabled, .wu-button-primary.is-plain.is-disabled:hover, .wu-button-primary.is-plain.is-disabled:focus, .wu-button-primary.is-plain.is-disabled:active {\n  color: #8cc5ff;\n  background-color: #ecf5ff;\n  border-color: #d9ecff;\n}\n\n.wu-button-success {\n  color: #FFFFFF;\n  background-color: #67C23A;\n  border-color: #67C23A;\n}\n.wu-button-success:hover, .wu-button-success:focus {\n  background: #85ce61;\n  border-color: #85ce61;\n  color: #FFFFFF;\n}\n.wu-button-success:active {\n  background: #5daf34;\n  border-color: #5daf34;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-success.is-active {\n  background: #5daf34;\n  border-color: #5daf34;\n  color: #FFFFFF;\n}\n.wu-button-success.is-disabled, .wu-button-success.is-disabled:hover, .wu-button-success.is-disabled:focus, .wu-button-success.is-disabled:active {\n  color: #FFFFFF;\n  background-color: #b3e19d;\n  border-color: #b3e19d;\n}\n.wu-button-success.is-plain {\n  color: #67C23A;\n  background: #f0f9eb;\n  border-color: #c2e7b0;\n}\n.wu-button-success.is-plain:hover, .wu-button-success.is-plain:focus {\n  background: #67C23A;\n  border-color: #67C23A;\n  color: #FFFFFF;\n}\n.wu-button-success.is-plain:active {\n  background: #5daf34;\n  border-color: #5daf34;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-success.is-plain.is-disabled, .wu-button-success.is-plain.is-disabled:hover, .wu-button-success.is-plain.is-disabled:focus, .wu-button-success.is-plain.is-disabled:active {\n  color: #a4da89;\n  background-color: #f0f9eb;\n  border-color: #e1f3d8;\n}\n\n.wu-button-warning {\n  color: #FFFFFF;\n  background-color: #E6A23C;\n  border-color: #E6A23C;\n}\n.wu-button-warning:hover, .wu-button-warning:focus {\n  background: #ebb563;\n  border-color: #ebb563;\n  color: #FFFFFF;\n}\n.wu-button-warning:active {\n  background: #cf9236;\n  border-color: #cf9236;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-warning.is-active {\n  background: #cf9236;\n  border-color: #cf9236;\n  color: #FFFFFF;\n}\n.wu-button-warning.is-disabled, .wu-button-warning.is-disabled:hover, .wu-button-warning.is-disabled:focus, .wu-button-warning.is-disabled:active {\n  color: #FFFFFF;\n  background-color: #f3d19e;\n  border-color: #f3d19e;\n}\n.wu-button-warning.is-plain {\n  color: #E6A23C;\n  background: #fdf6ec;\n  border-color: #f5dab1;\n}\n.wu-button-warning.is-plain:hover, .wu-button-warning.is-plain:focus {\n  background: #E6A23C;\n  border-color: #E6A23C;\n  color: #FFFFFF;\n}\n.wu-button-warning.is-plain:active {\n  background: #cf9236;\n  border-color: #cf9236;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-warning.is-plain.is-disabled, .wu-button-warning.is-plain.is-disabled:hover, .wu-button-warning.is-plain.is-disabled:focus, .wu-button-warning.is-plain.is-disabled:active {\n  color: #f0c78a;\n  background-color: #fdf6ec;\n  border-color: #faecd8;\n}\n\n.wu-button-danger {\n  color: #FFFFFF;\n  background-color: #F56C6C;\n  border-color: #F56C6C;\n}\n.wu-button-danger:hover, .wu-button-danger:focus {\n  background: #f78989;\n  border-color: #f78989;\n  color: #FFFFFF;\n}\n.wu-button-danger:active {\n  background: #dd6161;\n  border-color: #dd6161;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-danger.is-active {\n  background: #dd6161;\n  border-color: #dd6161;\n  color: #FFFFFF;\n}\n.wu-button-danger.is-disabled, .wu-button-danger.is-disabled:hover, .wu-button-danger.is-disabled:focus, .wu-button-danger.is-disabled:active {\n  color: #FFFFFF;\n  background-color: #fab6b6;\n  border-color: #fab6b6;\n}\n.wu-button-danger.is-plain {\n  color: #F56C6C;\n  background: #fef0f0;\n  border-color: #fbc4c4;\n}\n.wu-button-danger.is-plain:hover, .wu-button-danger.is-plain:focus {\n  background: #F56C6C;\n  border-color: #F56C6C;\n  color: #FFFFFF;\n}\n.wu-button-danger.is-plain:active {\n  background: #dd6161;\n  border-color: #dd6161;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-danger.is-plain.is-disabled, .wu-button-danger.is-plain.is-disabled:hover, .wu-button-danger.is-plain.is-disabled:focus, .wu-button-danger.is-plain.is-disabled:active {\n  color: #f9a7a7;\n  background-color: #fef0f0;\n  border-color: #fde2e2;\n}\n\n.wu-button-info {\n  color: #FFFFFF;\n  background-color: #909399;\n  border-color: #909399;\n}\n.wu-button-info:hover, .wu-button-info:focus {\n  background: #a6a9ad;\n  border-color: #a6a9ad;\n  color: #FFFFFF;\n}\n.wu-button-info:active {\n  background: #82848a;\n  border-color: #82848a;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-info.is-active {\n  background: #82848a;\n  border-color: #82848a;\n  color: #FFFFFF;\n}\n.wu-button-info.is-disabled, .wu-button-info.is-disabled:hover, .wu-button-info.is-disabled:focus, .wu-button-info.is-disabled:active {\n  color: #FFFFFF;\n  background-color: #c8c9cc;\n  border-color: #c8c9cc;\n}\n.wu-button-info.is-plain {\n  color: #909399;\n  background: #f4f4f5;\n  border-color: #d3d4d6;\n}\n.wu-button-info.is-plain:hover, .wu-button-info.is-plain:focus {\n  background: #909399;\n  border-color: #909399;\n  color: #FFFFFF;\n}\n.wu-button-info.is-plain:active {\n  background: #82848a;\n  border-color: #82848a;\n  color: #FFFFFF;\n  outline: none;\n}\n.wu-button-info.is-plain.is-disabled, .wu-button-info.is-plain.is-disabled:hover, .wu-button-info.is-plain.is-disabled:focus, .wu-button-info.is-plain.is-disabled:active {\n  color: #bcbec2;\n  background-color: #f4f4f5;\n  border-color: #e9e9eb;\n}\n\n.wu-button-medium {\n  padding: 10px 20px;\n  font-size: 14px;\n  border-radius: 4px;\n}\n.wu-button-medium.is-round {\n  padding: 10px 20px;\n}\n.wu-button-medium.is-circle {\n  padding: 10px;\n}\n\n.wu-button-small {\n  padding: 9px 15px;\n  font-size: 12px;\n  border-radius: 3px;\n}\n.wu-button-small.is-round {\n  padding: 9px 15px;\n}\n.wu-button-small.is-circle {\n  padding: 9px;\n}\n\n.wu-button-mini {\n  padding: 7px 15px;\n  font-size: 12px;\n  border-radius: 3px;\n}\n.wu-button-mini.is-round {\n  padding: 7px 15px;\n}\n.wu-button-mini.is-circle {\n  padding: 7px;\n}\n\n.wu-button-text {\n  border-color: transparent;\n  color: #409EFF;\n  background: transparent;\n  padding-left: 0;\n  padding-right: 0;\n}\n.wu-button-text:hover, .wu-button-text:focus {\n  color: #66b1ff;\n  border-color: transparent;\n  background-color: transparent;\n}\n.wu-button-text:active {\n  color: #3a8ee6;\n  border-color: transparent;\n  background-color: transparent;\n}\n.wu-button-text.is-disabled, .wu-button-text.is-disabled:hover, .wu-button-text.is-disabled:focus {\n  border-color: transparent;\n}\n\n.loading {\n  width: 1em;\n  height: 1em;\n  display: inline-block;\n  -webkit-animation: loading 1s steps(12, end) infinite;\n          animation: loading 1s steps(12, end) infinite;\n  vertical-align: -0.125em;\n}\n\n@-webkit-keyframes loading {\n  0% {\n    transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\n@keyframes loading {\n  0% {\n    transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    transform: rotate3d(0, 0, 1, 360deg);\n  }\n}";
    styleInject(css_248z$1);

    /** @class */ ((function (_super) {
        __extends(WuButton, _super);
        function WuButton() {
            return _super.call(this) || this;
        }
        WuButton.prototype.render = function (_renderProps, _store) {
            var _a;
            return (webCorePlus.h("button", __assign({ disabled: this.disabled }, extractClass({}, 'wu-button', (_a = {},
                _a['wu-button-' + this.type] = this.type,
                _a['wu-button-' + this.size] = this.size,
                _a['is-plain'] = this.plain,
                _a['is-round'] = this.round,
                _a['is-circle'] = this.circle,
                _a['is-disabled'] = this.disabled,
                _a)), { type: this.nativeType }),
                this.loading && [
                    webCorePlus.h("svg", { class: "loading", viewBox: "0 0 1024 1024", focusable: "false", "data-icon": "loading", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true" },
                        webCorePlus.h("path", { d: "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" })),
                    ' ',
                ],
                this.text,
                webCorePlus.h("slot", null)));
        };
        __decorate([
            webCorePlus.Prop({ default: 'primary', type: String }),
            __metadata("design:type", String)
        ], WuButton.prototype, "type", void 0);
        __decorate([
            webCorePlus.Prop({ default: 'mini', type: String }),
            __metadata("design:type", String)
        ], WuButton.prototype, "size", void 0);
        __decorate([
            webCorePlus.Prop({ default: false, type: Boolean }),
            __metadata("design:type", Boolean)
        ], WuButton.prototype, "plain", void 0);
        __decorate([
            webCorePlus.Prop({ default: false, type: Boolean }),
            __metadata("design:type", Boolean)
        ], WuButton.prototype, "round", void 0);
        __decorate([
            webCorePlus.Prop({ default: false, type: Boolean }),
            __metadata("design:type", Boolean)
        ], WuButton.prototype, "circle", void 0);
        __decorate([
            webCorePlus.Prop({ default: false, type: Boolean }),
            __metadata("design:type", Boolean)
        ], WuButton.prototype, "loading", void 0);
        __decorate([
            webCorePlus.Prop({ default: false, type: Boolean }),
            __metadata("design:type", Boolean)
        ], WuButton.prototype, "disabled", void 0);
        __decorate([
            webCorePlus.Prop({ default: '', type: String }),
            __metadata("design:type", String)
        ], WuButton.prototype, "icon", void 0);
        __decorate([
            webCorePlus.Prop({ default: 'button', type: String }),
            __metadata("design:type", String)
        ], WuButton.prototype, "nativeType", void 0);
        __decorate([
            webCorePlus.Prop({ default: '', type: String }),
            __metadata("design:type", String)
        ], WuButton.prototype, "text", void 0);
        WuButton = __decorate([
            webCorePlus.Component({
                name: 'wu-plus-button',
                css: css_248z$1,
            }),
            __metadata("design:paramtypes", [])
        ], WuButton);
        return WuButton;
    })(webCorePlus.WuComponent));

    var css_248z = ":host {\n  display: block;\n  min-width: 300px;\n}\n\n.color-pane {\n  padding: 0.8em;\n}\n\n.color-palette {\n  position: relative;\n  height: 150px;\n  background: linear-gradient(to top, hsla(0, 0%, 0%, calc(var(--a))), transparent), linear-gradient(to left, hsla(calc(var(--h)), 100%, 50%, calc(var(--a))), hsla(0, 0%, 100%, calc(var(--a)))), linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0), linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0);\n  background-position: 0 0, 0 0, 0 0, 5px 5px;\n  background-size: 100% 100%, 100% 100%, 10px 10px, 10px 10px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: crosshair;\n  opacity: 1;\n  transition: opacity 0.1s;\n}\n\n.color-palette:active {\n  opacity: 0.99;\n}\n\n.color-palette::after {\n  pointer-events: none;\n  position: absolute;\n  content: \"\";\n  box-sizing: border-box;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  border: 2px solid #fff;\n  left: calc(var(--s) * 1%);\n  top: calc((100 - var(--v)) * 1%);\n  transform: translate(-50%, -50%);\n}\n\n.color-chooser {\n  display: flex;\n  padding: 10px 0;\n}\n\n.color-show {\n  display: flex;\n  position: relative;\n  width: 32px;\n  height: 32px;\n  background: var(--c);\n  transition: none;\n  border-radius: 50%;\n  overflow: hidden;\n  cursor: pointer;\n}\n\n.color-show .icon-file {\n  width: 1em;\n  height: 1em;\n  margin: auto;\n  fill: hsl(0, 0%, calc(((2 - var(--s) / 100) * var(--v) / 200 * var(--a) - 0.6) * -999999%));\n  opacity: 0;\n  transition: 0.3s;\n}\n\n.color-show:hover .icon-file {\n  opacity: 1;\n}\n\n.color-show input {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n}\n\n.color-show::after {\n  content: \"\";\n  position: absolute;\n  width: 32px;\n  height: 32px;\n  background: linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0), linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0);\n  background-position: 0 0, 5px 5px;\n  background-size: 10px 10px;\n  z-index: -1;\n}\n\n.color-range {\n  flex: 1;\n  margin-left: 10px;\n}\n\ninput[type=range] {\n  display: block;\n  pointer-events: all;\n  width: 100%;\n  -webkit-appearance: none;\n  outline: 0;\n  height: 10px;\n  border-radius: 5px;\n  margin: 0;\n}\n\ninput[type=range]::-webkit-slider-runnable-track {\n  display: flex;\n  align-items: center;\n  position: relative;\n}\n\ninput[type=range]::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  position: relative;\n  width: 10px;\n  height: 10px;\n  transform: scale(1.2);\n  border-radius: 50%;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n  background: #fff;\n  -webkit-transition: 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46);\n  transition: 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46);\n}\n\ninput[type=range]::-moz-range-thumb {\n  box-sizing: border-box;\n  pointer-events: none;\n  position: relative;\n  width: 10px;\n  height: 10px;\n  transform: scale(1.2);\n  border-radius: 50%;\n  border: 0;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n  background: #fff;\n  -moz-transition: 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46);\n  transition: 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46);\n}\n\ninput[type=range]::-webkit-slider-thumb:active,\ninput[type=range]:focus::-webkit-slider-thumb {\n  transform: scale(1.5);\n}\n\ninput[type=range]::-moz-range-thumb:active,\ninput[type=range]:focus::-moz-range-thumb {\n  transform: scale(1.5);\n}\n\ninput[type=range] + input[type=range] {\n  margin-top: 10px;\n}\n\n.color-hue {\n  background: linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red);\n}\n\n.color-opacity {\n  background: linear-gradient(to right, hsla(calc(var(--h)), 100%, 50%, 0), hsla(calc(var(--h)), 100%, 50%, 1)), linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0), linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0);\n  background-position: 0 0, 0 0, 5px 5px;\n  background-size: 100% 100%, 10px 10px, 10px 10px;\n}\n\n.color-label {\n  position: absolute;\n  display: flex;\n  visibility: hidden;\n  opacity: 0;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  transition: 0.3s;\n}\n\n.color-label input {\n  flex: 1;\n  margin-right: 0.8em;\n  outline: 0;\n  min-width: 0;\n  width: 0;\n  border-radius: var(--borderRadius, 0.25em);\n  border: 1px solid #ddd;\n  padding: 0 5px;\n  line-height: 28px;\n  text-align: center;\n  -moz-appearance: textfield;\n  transition: 0.3s;\n}\n\ninput[type=number]::-webkit-inner-spin-button {\n  display: none;\n}\n\n::-moz-focus-inner, ::-moz-focus-outer {\n  border: 0;\n  outline: 0;\n}\n\n.color-label input:focus {\n  border-color: var(--themeColor, #42b983);\n}\n\n.color-footer {\n  display: flex;\n}\n\n.btn-switch {\n  position: relative;\n  border-radius: var(--borderRadius, 0.25em);\n  background: none;\n  border: 0;\n  outline: 0;\n  line-height: 30px;\n  width: 60px;\n  padding: 0;\n  color: var(--themeColor, #42b983);\n  overflow: hidden;\n}\n\n.btn-switch::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  background: var(--themeBackground, var(--themeColor, #42b983));\n  opacity: 0.2;\n  transition: 0.3s;\n}\n\n.btn-switch:hover::before, .btn-switch:focus::before {\n  opacity: 0.3;\n}\n\n.color-input {\n  position: relative;\n  flex: 1;\n  height: 30px;\n  overflow: hidden;\n}\n\n.color-footer[data-type=HEXA] .color-label:nth-child(1),\n.color-footer[data-type=RGBA] .color-label:nth-child(2),\n.color-footer[data-type=HSLA] .color-label:nth-child(3) {\n  opacity: 1;\n  visibility: inherit;\n  z-index: 2;\n}\n\n.color-sign {\n  padding-top: 10px;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(15px, 1fr));\n  grid-gap: 10px;\n}\n\n.color-sign > button {\n  position: relative;\n  cursor: pointer;\n  width: 100%;\n  padding-bottom: 0;\n  padding-top: 100%;\n  border-radius: 4px;\n  border: 0;\n  outline: 0;\n}\n\n.color-sign > button::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: -1;\n  background: linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0), linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0);\n  background-position: 0 0, 5px 5px;\n  background-size: 10px 10px;\n  border-radius: 4px;\n}\n\n.color-sign > button::after {\n  content: \"\";\n  position: absolute;\n  opacity: 0.5;\n  z-index: -2;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background: inherit;\n  border-radius: 4px;\n  transition: 0.3s;\n}\n\n.color-sign > button:hover::after, .color-sign > button:focus::after {\n  transform: translate(2px, 2px);\n}\n\n.pop-footer {\n  display: flex;\n  justify-content: flex-end;\n  padding: 0 0.8em 0.8em;\n}";
    styleInject(css_248z);

    // Shorthands
    var min = Math.min, max = Math.max, floor = Math.floor, round = Math.round;
    /**
     * Tries to convert a color name to rgb/a hex representation
     * @param name
     * @returns {string | CanvasGradient | CanvasPattern}
     */
    function standardizeColor(name) {
        // Since invalid color's will be parsed as black, filter them out
        if (name.toLowerCase() === 'black') {
            return '#000000';
        }
        var ctx = document.createElement('canvas').getContext('2d');
        ctx.fillStyle = name;
        return ctx.fillStyle === '#000000' ? null : ctx.fillStyle;
    }
    /**
     * Convert HSV spectrum to RGB.
     * @param h Hue
     * @param s Saturation
     * @param v Value
     * @returns {number[]} Array with rgb values.
     */
    function hsvToRgb(h, s, v) {
        h = (h / 360) * 6;
        s /= 100;
        v /= 100;
        var i = floor(h);
        var f = h - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);
        var mod = i % 6;
        var r = [v, q, p, p, t, v][mod];
        var g = [t, v, v, q, p, p][mod];
        var b = [p, p, t, v, v, q][mod];
        return [
            r * 255,
            g * 255,
            b * 255
        ];
    }
    /**
     * Convert HSV spectrum to Hex.
     * @param h Hue
     * @param s Saturation
     * @param v Value
     * @returns {string[]} Hex values
     */
    function hsvToHex(h, s, v) {
        return hsvToRgb(h, s, v).map(function (v) {
            return round(v).toString(16).padStart(2, '0');
        });
    }
    /**
     * Convert HSV spectrum to CMYK.
     * @param h Hue
     * @param s Saturation
     * @param v Value
     * @returns {number[]} CMYK values
     */
    function hsvToCmyk(h, s, v) {
        var rgb = hsvToRgb(h, s, v);
        var r = rgb[0] / 255;
        var g = rgb[1] / 255;
        var b = rgb[2] / 255;
        var k, c, m, y;
        // eslint-disable-next-line prefer-const
        k = min(1 - r, 1 - g, 1 - b);
        // eslint-disable-next-line prefer-const
        c = k === 1 ? 0 : (1 - r - k) / (1 - k);
        // eslint-disable-next-line prefer-const
        m = k === 1 ? 0 : (1 - g - k) / (1 - k);
        // eslint-disable-next-line prefer-const
        y = k === 1 ? 0 : (1 - b - k) / (1 - k);
        return [
            c * 100,
            m * 100,
            y * 100,
            k * 100
        ];
    }
    /**
     * Convert HSV spectrum to HSL.
     * @param h Hue
     * @param s Saturation
     * @param v Value
     * @returns {number[]} HSL values
     */
    function hsvToHsl(h, s, v) {
        s /= 100, v /= 100;
        var l = (2 - s) * v / 2;
        if (l !== 0) {
            if (l === 1) {
                s = 0;
            }
            else if (l < 0.5) {
                s = s * v / (l * 2);
            }
            else {
                s = s * v / (2 - l * 2);
            }
        }
        return [
            h,
            s * 100,
            l * 100
        ];
    }
    /**
     * Convert RGB to HSV.
     * @param r Red
     * @param g Green
     * @param b Blue
     * @return {number[]} HSV values.
     */
    function rgbToHsv(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        var h, s, v;
        var minVal = min(r, g, b);
        var maxVal = max(r, g, b);
        var delta = maxVal - minVal;
        // eslint-disable-next-line prefer-const
        v = maxVal;
        if (delta === 0) {
            h = s = 0;
        }
        else {
            s = delta / maxVal;
            var dr = (((maxVal - r) / 6) + (delta / 2)) / delta;
            var dg = (((maxVal - g) / 6) + (delta / 2)) / delta;
            var db = (((maxVal - b) / 6) + (delta / 2)) / delta;
            if (r === maxVal) {
                h = db - dg;
            }
            else if (g === maxVal) {
                h = (1 / 3) + dr - db;
            }
            else if (b === maxVal) {
                h = (2 / 3) + dg - dr;
            }
            if (h < 0) {
                h += 1;
            }
            else if (h > 1) {
                h -= 1;
            }
        }
        return [
            h * 360,
            s * 100,
            v * 100
        ];
    }
    /**
     * Convert CMYK to HSV.
     * @param c Cyan
     * @param m Magenta
     * @param y Yellow
     * @param k Key (Black)
     * @return {number[]} HSV values.
     */
    function cmykToHsv(c, m, y, k) {
        c /= 100;
        m /= 100;
        y /= 100;
        k /= 100;
        var r = (1 - min(1, c * (1 - k) + k)) * 255;
        var g = (1 - min(1, m * (1 - k) + k)) * 255;
        var b = (1 - min(1, y * (1 - k) + k)) * 255;
        return __spreadArray([], __read(rgbToHsv(r, g, b)), false);
    }
    /**
     * Convert HSL to HSV.
     * @param h Hue
     * @param s Saturation
     * @param l Lightness
     * @return {number[]} HSV values.
     */
    function hslToHsv(h, s, l) {
        s /= 100;
        l /= 100;
        s *= l < 0.5 ? l : 1 - l;
        var ns = (l + s) ? (2 * s / (l + s)) * 100 : 0;
        var v = (l + s) * 100;
        return [h, ns, v];
    }
    /**
     * Convert HEX to HSV.
     * @param hex Hexadecimal string of rgb colors, can have length 3 or 6.
     * @return {number[]} HSV values.
     */
    function hexToHsv(hex) {
        // @ts-ignore
        return rgbToHsv.apply(void 0, __spreadArray([], __read(hex.match(/.{2}/g).map(function (v) { return parseInt(v, 16); })), false));
    }
    /**
     * Try's to parse a string which represents a color to a HSV array.
     * Current supported types are cmyk, rgba, hsla and hexadecimal.
     * @param str
     * @return {*}
     */
    function parseToHSVA(str) {
        // Check if string is a color-name
        str = str.match(/^[a-zA-Z]+$/) ? standardizeColor(str) : str;
        // Regular expressions to match different types of color represention
        var regex = {
            cmyk: /^cmyk[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)/i,
            rgba: /^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,
            hsla: /^((hsla)|hsl)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,
            hsva: /^((hsva)|hsv)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,
            hexa: /^#?(([\dA-Fa-f]{3,4})|([\dA-Fa-f]{6})|([\dA-Fa-f]{8}))$/i
        };
        /**
         * Takes an Array of any type, convert strings which represents
         * a number to a number an anything else to undefined.
         * @param array
         * @return {*}
         */
        var numarize = function (array) { return array.map(function (v) { return /^(|\d+)\.\d+|\d+$/.test(v) ? Number(v) : undefined; }); };
        var match;
        invalid: for (var type in regex) {
            // Check if current scheme passed
            if (!(match = regex[type].exec(str)))
                continue;
            // match[2] does only contain a truly value if rgba, hsla, or hsla got matched
            //const alpha = !!match[2];
            // Try to convert
            switch (type) {
                case 'cmyk': {
                    var _a = __read(numarize(match), 5), c = _a[1], m = _a[2], y = _a[3], k = _a[4];
                    if (c > 100 || m > 100 || y > 100 || k > 100)
                        break invalid;
                    return { values: cmykToHsv(c, m, y, k), type: type };
                }
                case 'rgba': {
                    var _b = __read(numarize(match), 7), r = _b[3], g = _b[4], b = _b[5], a = _b[6];
                    if (r > 255 || g > 255 || b > 255 || a < 0 || a > 1)
                        break invalid;
                    return { values: __spreadArray(__spreadArray([], __read(rgbToHsv(r, g, b)), false), [a], false), a: a, type: type };
                }
                case 'hexa': {
                    var _c = __read(match, 2), hex = _c[1];
                    if (hex.length === 4 || hex.length === 3) {
                        hex = hex.split('').map(function (v) { return v + v; }).join('');
                    }
                    var raw = hex.substring(0, 6);
                    var a = hex.substring(6);
                    // Convert 0 - 255 to 0 - 1 for opacity
                    a = a ? (parseInt(a, 16) / 255) : undefined;
                    return { values: __spreadArray(__spreadArray([], __read(hexToHsv(raw)), false), [a], false), a: a, type: type };
                }
                case 'hsla': {
                    var _d = __read(numarize(match), 7), h = _d[3], s = _d[4], l = _d[5], a = _d[6];
                    if (h > 360 || s > 100 || l > 100 || a < 0 || a > 1)
                        break invalid;
                    return { values: __spreadArray(__spreadArray([], __read(hslToHsv(h, s, l)), false), [a], false), a: a, type: type };
                }
                case 'hsva': {
                    var _e = __read(numarize(match), 7), h = _e[3], s = _e[4], v = _e[5], a = _e[6];
                    if (h > 360 || s > 100 || v > 100 || a < 0 || a > 1)
                        break invalid;
                    return { values: [h, s, v, a], a: a, type: type };
                }
            }
        }
        return { values: null, type: null };
    }

    /**
     * Simple class which holds the properties
     * of the color represention model hsla (hue saturation lightness alpha)
     */
    function HSVaColor(h, s, v, a) {
        if (h === void 0) { h = 0; }
        if (s === void 0) { s = 0; }
        if (v === void 0) { v = 0; }
        if (a === void 0) { a = 1; }
        var mapper = function (original, next) { return function (precision) {
            if (precision === void 0) { precision = 0; }
            return next(~precision ? original.map(function (v) { return Number(v.toFixed(precision)); }) : original);
        }; };
        var that = {
            h: h,
            s: s,
            v: v,
            a: a,
            toHSVA: function () {
                var hsva = [that.h, that.s, that.v, that.a];
                hsva.toString = mapper(hsva, function (arr) { return "hsva(".concat(arr[0], ", ").concat(arr[1], "%, ").concat(arr[2], "%, ").concat(that.a, ")"); });
                return hsva;
            },
            toHSLA: function () {
                var hsla = __spreadArray(__spreadArray([], __read(hsvToHsl(that.h, that.s, that.v)), false), [that.a], false);
                hsla.toString = mapper(hsla, function (arr) { return "hsla(".concat(arr[0], ", ").concat(arr[1], "%, ").concat(arr[2], "%, ").concat(that.a, ")"); });
                return hsla;
            },
            toRGBA: function () {
                var rgba = __spreadArray(__spreadArray([], __read(hsvToRgb(that.h, that.s, that.v)), false), [that.a], false);
                rgba.toString = mapper(rgba, function (arr) { return "rgba(".concat(arr[0], ", ").concat(arr[1], ", ").concat(arr[2], ", ").concat(that.a, ")"); });
                return rgba;
            },
            toCMYK: function () {
                var cmyk = hsvToCmyk(that.h, that.s, that.v);
                cmyk.toString = mapper(cmyk, function (arr) { return "cmyk(".concat(arr[0], "%, ").concat(arr[1], "%, ").concat(arr[2], "%, ").concat(arr[3], "%)"); });
                return cmyk;
            },
            toHEXA: function () {
                var hex = hsvToHex(that.h, that.s, that.v);
                // Check if alpha channel make sense, convert it to 255 number space, convert
                // to hex and pad it with zeros if needet.
                var alpha = that.a >= 1 ? '' : Number((that.a * 255).toFixed(0))
                    .toString(16)
                    .toUpperCase().padStart(2, '0');
                alpha && hex.push(alpha);
                hex.toString = function () { return "#".concat(hex.join('').toUpperCase()); };
                return hex;
            },
            clone: function () { return HSVaColor(that.h, that.s, that.v, that.a); }
        };
        return that;
    }

    var Material_colors = ['#f44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B', 'rgba(0,0,0,.65)', 'transparent'];
    /** @class */ ((function (_super) {
        __extends(WuColorPane, _super);
        function WuColorPane() {
            var _this = _super.call(this) || this;
            _this.val = undefined;
            _this.mousemove = function (ev) {
                if (_this.start) {
                    _this.choose(ev);
                }
            };
            _this.mouseup = function () {
                if (_this.start && _this.palette && (getComputedStyle(_this.palette).opacity + '' !== '1')) {
                    _this.valueChangeEvent();
                }
                _this.start = false;
            };
            return _this;
        }
        WuColorPane.prototype.choose = function (ev) {
            var _a = this.palette.getBoundingClientRect(), x = _a.x, y = _a.y, w = _a.width, h = _a.height;
            var value = __spreadArray([], __read(this.$value), false);
            var _x = Math.min(Math.max(0, (ev.clientX - x) / w * 100), 100);
            var _y = Math.min(Math.max(0, (ev.clientY - y) / h * 100), 100);
            value[1] = _x;
            value[2] = 100 - _y;
            this.val = "hsva(".concat(value[0], ", ").concat(value[1], "%, ").concat(value[2], "%, ").concat(value[3], ")");
            this.updatePicker();
        };
        WuColorPane.prototype.connected = function (shadowRoot) {
            var _this = this;
            this.type = ['HEXA', 'RGBA', 'HSLA'];
            this.typeindex = 0;
            this.palette = this.shadowRoot.getElementById('color-palette');
            this.colors = this.shadowRoot.getElementById('colors');
            this.pane = this.shadowRoot.getElementById('color-pane');
            this.rangeHue = this.shadowRoot.getElementById('range-hue');
            this.rangeOpacity = this.shadowRoot.getElementById('range-opacity');
            this.copyBtn = this.shadowRoot.getElementById('copy-btn');
            this.copyinfo = this.copyBtn.querySelector('input');
            this.switch = this.shadowRoot.getElementById('btn-switch');
            this.colorHexa = this.shadowRoot.getElementById('color-hexa').querySelectorAll('input');
            this.colorRgba = this.shadowRoot.getElementById('color-rgba').querySelectorAll('input');
            this.colorHlsa = this.shadowRoot.getElementById('color-hlsa').querySelectorAll('input');
            this.val = this.defaultvalue;
            this.rangeHue.addEventListener('input', function () {
                var value = __spreadArray([], __read(_this.$value), false);
                value[0] = Number(_this.rangeHue.value);
                _this.nativeclick = true;
                _this.val = "hsva(".concat(value[0], ", ").concat(value[1], "%, ").concat(value[2], "%, ").concat(value[3], ")");
                _this.updatePicker();
            });
            this.palette.addEventListener('mousedown', function (ev) {
                _this.start = true;
                _this.choose(ev);
            });
            document.addEventListener('mousemove', this.mousemove);
            document.addEventListener('mouseup', this.mouseup);
            this.rangeOpacity.addEventListener('input', function () {
                var value = __spreadArray([], __read(_this.$value), false);
                value[3] = Number(_this.rangeOpacity.value);
                _this.nativeclick = true;
                _this.val = "hsva(".concat(value[0], ", ").concat(value[1], "%, ").concat(value[2], "%, ").concat(value[3], ")");
                _this.updatePicker();
            });
            this.colors.addEventListener('click', function (ev) {
                var item = ev.target.closest('button');
                if (item) {
                    _this.nativeclick = true;
                    _this.val = item.dataset.color;
                    _this.updatePicker();
                }
            });
            this.switch.addEventListener('click', function () {
                _this.typeindex++;
                _this.typeindex %= 3;
                _this.switch.textContent = _this.type[_this.typeindex];
                _this.nativeclick = true;
                // this.val = this.val;
                _this.switch.parentNode.dataset.type = _this.type[_this.typeindex];
            });
            this.copyBtn.addEventListener('click', function () {
                _this.copyinfo.select();
                if (document.execCommand('copy')) {
                    document.execCommand('copy');
                }
            });
            this.colorHexa.forEach(function (el) {
                el.addEventListener('change', function () {
                    _this.nativeclick = true;
                    _this.val = el.value;
                    _this.updatePicker();
                });
            });
            this.colorRgba.forEach(function (el, i) {
                el.addEventListener('change', function () {
                    var value = HSVaColor.apply(void 0, __spreadArray([], __read(_this.$value), false)).toRGBA();
                    value[i] = Number(el.value);
                    _this.nativeclick = true;
                    _this.val = "rgba(".concat(value[0], ", ").concat(value[1], ", ").concat(value[2], ", ").concat(value[3], ")");
                    _this.updatePicker();
                });
            });
            this.colorHlsa.forEach(function (el, i) {
                el.addEventListener('change', function () {
                    var value = HSVaColor.apply(void 0, __spreadArray([], __read(_this.$value), false)).toHSLA();
                    value[i] = Number(el.value);
                    _this.nativeclick = true;
                    _this.val = "hsla(".concat(value[0], ", ").concat(value[1], "%, ").concat(value[2], "%, ").concat(value[3], ")");
                    _this.updatePicker();
                });
            });
        };
        WuColorPane.prototype.disConnected = function () {
            document.removeEventListener('mousemove', this.mousemove);
            document.removeEventListener('mouseup', this.mouseup);
        };
        Object.defineProperty(WuColorPane.prototype, "value", {
            get: function () {
                return HSVaColor.apply(void 0, __spreadArray([], __read(this.$value), false))['to' + this.type[this.typeindex]]().toString();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WuColorPane.prototype, "color", {
            get: function () {
                return HSVaColor.apply(void 0, __spreadArray([], __read(this.$value), false));
            },
            enumerable: false,
            configurable: true
        });
        WuColorPane.prototype.valueChange = function (val, old) {
            this.$value = parseToHSVA(val).values;
            //[h,s,v,a]
            var _a = __read(this.$value, 4), h = _a[0], s = _a[1], v = _a[2], _b = _a[3], a = _b === void 0 ? 1 : _b;
            this.pane.style.setProperty('--h', h);
            this.pane.style.setProperty('--s', s);
            this.pane.style.setProperty('--v', v);
            this.pane.style.setProperty('--a', a);
            this.pane.style.setProperty('--c', this.value);
            this.copyinfo.value = this.value;
            this.rangeHue.value = h;
            this.rangeOpacity.value = a.toFixed(2);
            var COLOR = HSVaColor.apply(void 0, __spreadArray([], __read(this.$value), false));
            this.colorHexa[0].value = COLOR.toHEXA().toString();
            var RGBA = COLOR.toRGBA();
            this.colorRgba[0].value = RGBA[0].toFixed(0);
            this.colorRgba[1].value = RGBA[1].toFixed(0);
            this.colorRgba[2].value = RGBA[2].toFixed(0);
            this.colorRgba[3].value = RGBA[3].toFixed(2);
            var HSLA = COLOR.toHSLA();
            this.colorHlsa[0].value = HSLA[0].toFixed(0);
            this.colorHlsa[1].value = HSLA[1].toFixed(0);
            this.colorHlsa[2].value = HSLA[2].toFixed(0);
            this.colorHlsa[3].value = HSLA[3].toFixed(2);
            if (this.nativeclick) {
                this.nativeclick = false;
                this.valueChangeEvent();
            }
        };
        WuColorPane.prototype.valueChangeEvent = function () {
            return {
                value: this.value,
                color: this.color
            };
        };
        WuColorPane.prototype.init = function (color) {
            this.val = color;
            this.defaultvalue = color;
            this.update();
            this.valueChange(color);
        };
        /**
         * 更新
         */
        WuColorPane.prototype.updatePicker = function () {
            var _this = this;
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(function () {
                // this.update();
                _this.valueChange(_this.val);
            }, 100);
        };
        WuColorPane.prototype.render = function (_renderProps, _store) {
            return (webCorePlus.h("div", { className: "color-pane", id: "color-pane" },
                webCorePlus.h("div", { className: "color-palette", id: "color-palette" }),
                webCorePlus.h("div", { className: "color-chooser" },
                    webCorePlus.h("a", { className: "color-show", id: "copy-btn" },
                        webCorePlus.h("svg", { className: "icon-file", viewBox: "0 0 1024 1024" },
                            webCorePlus.h("path", { d: "M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32z" }),
                            webCorePlus.h("path", { d: "M704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z" })),
                        webCorePlus.h("input", null)),
                    webCorePlus.h("div", { className: "color-range" },
                        webCorePlus.h("input", { className: "color-hue", value: "0", min: "0", max: "360", type: "range", id: "range-hue" }),
                        webCorePlus.h("input", { className: "color-opacity", value: "1", min: "0", max: "1", step: "0.01", type: "range", id: "range-opacity" }))),
                webCorePlus.h("div", { className: "color-footer", "data-type": "HEXA" },
                    webCorePlus.h("div", { className: "color-input" },
                        webCorePlus.h("div", { className: "color-label", id: "color-hexa" },
                            webCorePlus.h("input", { spellCheck: "false" })),
                        webCorePlus.h("div", { className: "color-label", id: "color-rgba" },
                            webCorePlus.h("input", { type: "number", min: "0", max: "255", spellCheck: "false" }),
                            webCorePlus.h("input", { type: "number", min: "0", max: "255", spellCheck: "false" }),
                            webCorePlus.h("input", { type: "number", min: "0", max: "255", spellCheck: "false" }),
                            webCorePlus.h("input", { type: "number", min: "0", max: "1", step: "0.01", spellCheck: "false" })),
                        webCorePlus.h("div", { className: "color-label", id: "color-hlsa" },
                            webCorePlus.h("input", { type: "number", min: "0", max: "360", spellCheck: "false" }),
                            webCorePlus.h("input", { type: "number", min: "0", max: "100", spellCheck: "false" }),
                            webCorePlus.h("input", { type: "number", min: "0", max: "100", spellCheck: "false" }),
                            webCorePlus.h("input", { type: "number", min: "0", max: "1", step: "0.01", spellCheck: "false" }))),
                    webCorePlus.h("button", { className: "btn-switch", id: "btn-switch", type: "flat" }, "HEXA")),
                webCorePlus.h("div", { className: "color-sign", id: "colors" }, Material_colors.map(function (item) {
                    return (webCorePlus.h("button", { style: { backgroundColor: item }, "data-color": item }));
                }))));
        };
        __decorate([
            webCorePlus.Prop({ default: '#ff0000', type: String }),
            __metadata("design:type", String)
        ], WuColorPane.prototype, "defaultvalue", void 0);
        __decorate([
            webCorePlus.Watch('val'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [String, String]),
            __metadata("design:returntype", void 0)
        ], WuColorPane.prototype, "valueChange", null);
        __decorate([
            webCorePlus.Emit('picker-change'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], WuColorPane.prototype, "valueChangeEvent", null);
        WuColorPane = __decorate([
            webCorePlus.Component({
                name: 'wu-plus-color-pane',
                css: css_248z,
            }),
            __metadata("design:paramtypes", [])
        ], WuColorPane);
        return WuColorPane;
    })(webCorePlus.WuComponent));

    var WuColorPicker = /** @class */ (function (_super) {
        __extends(WuColorPicker, _super);
        function WuColorPicker() {
            return _super.call(this) || this;
        }
        WuColorPicker.prototype.connected = function (shadowRoot) {
            var _this = this;
            this.popover = this.shadowRoot.getElementById('popover');
            this.popcon = this.shadowRoot.getElementById('popcon');
            this.popcon.addEventListener('close', function () {
                _this.colorPane.val = _this.value;
            });
            this.val = this.defaultvalue;
        };
        /**
         * 确认颜色
         */
        WuColorPicker.prototype.okCallback = function () {
            var _a;
            this.nativeclick = true;
            this.val = this.colorPane.value;
            this.changeEvent();
            (_a = this.popoverRef) === null || _a === void 0 ? void 0 : _a.leave();
        };
        /**
         * 确认颜色
         */
        WuColorPicker.prototype.cancleCallback = function () {
            var _a;
            // this.colorPane.defaultvalue = this.val;
            this.colorPane.init(this.val);
            (_a = this.popoverRef) === null || _a === void 0 ? void 0 : _a.leave();
        };
        /**
         * 打开选择器
         */
        WuColorPicker.prototype.openPicker = function () {
            // this.colorPane = new WuColorPane();
            this.colorPane.init(this.defaultvalue);
            // this.colorPane.defaultvalue = this.defaultvalue;
            // this.popcon.prepend(this.colorPane);
        };
        WuColorPicker.prototype.valueChange = function (value, old) {
            this.$value = value;
            if (this.nativeclick) {
                this.nativeclick = false;
                // this.changeEvent();
            }
            else {
                if (this.colorPane) {
                    this.colorPane.val = this.value;
                }
                else {
                    this.defaultvalue = this.value;
                }
            }
        };
        WuColorPicker.prototype.changeEvent = function () {
            this.defaultvalue = this.val;
            return {
                value: this.value,
                color: this.color
            };
        };
        Object.defineProperty(WuColorPicker.prototype, "color", {
            get: function () {
                return HSVaColor.apply(void 0, __spreadArray([], __read(parseToHSVA(this.$value).values), false));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WuColorPicker.prototype, "value", {
            get: function () {
                return this.$value;
            },
            enumerable: false,
            configurable: true
        });
        WuColorPicker.prototype.render = function (_renderProps, _store) {
            var _a;
            var _this = this;
            return (webCorePlus.h("wu-plus-popover", { trigger: "click", id: "popover", ref: function (e) { return (_this.popoverRef = e); }, position: "bottom" },
                webCorePlus.h("div", __assign({ class: "color-btn wu-color-picker", style: { backgroundColor: this.val }, id: "color-btn", onClick: function () { return _this.openPicker(); }, disabled: this.disabled }, extractClass({}, 'color-btn', (_a = {},
                    _a['wu-color-picker-' + this.size] = this.size,
                    _a['wu-color-picker'] = true,
                    _a))),
                    webCorePlus.h("span", { class: "wu-color-picker_inner" })),
                webCorePlus.h("div", { slot: "popover", tip: "popover", id: "popcon" },
                    webCorePlus.h("wu-plus-color-pane", { ref: function (e) { return (_this.colorPane = e); }, defaultvalue: this.defaultvalue }),
                    webCorePlus.h("div", { class: "pop-footer" },
                        webCorePlus.h("wu-plus-button", { type: "text", onClick: function () { return _this.cancleCallback(); } }, "\u53D6 \u6D88"),
                        webCorePlus.h("wu-plus-button", { type: "primary", id: "btn-submit", onClick: function () { return _this.okCallback(); } }, "\u786E \u8BA4")))));
        };
        __decorate([
            webCorePlus.Prop({ default: 'mini', type: String }),
            __metadata("design:type", String)
        ], WuColorPicker.prototype, "size", void 0);
        __decorate([
            webCorePlus.Prop({ default: '#ff0000', type: String }),
            __metadata("design:type", String)
        ], WuColorPicker.prototype, "defaultvalue", void 0);
        __decorate([
            webCorePlus.Prop({ default: false, type: Boolean }),
            __metadata("design:type", Boolean)
        ], WuColorPicker.prototype, "disabled", void 0);
        __decorate([
            webCorePlus.State({ type: String }),
            __metadata("design:type", String)
        ], WuColorPicker.prototype, "val", void 0);
        __decorate([
            webCorePlus.Watch('val'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [String, String]),
            __metadata("design:returntype", void 0)
        ], WuColorPicker.prototype, "valueChange", null);
        __decorate([
            webCorePlus.Emit('change'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], WuColorPicker.prototype, "changeEvent", null);
        WuColorPicker = __decorate([
            webCorePlus.Component({
                name: 'wu-plus-color-picker',
                css: css_248z$3,
            }),
            __metadata("design:paramtypes", [])
        ], WuColorPicker);
        return WuColorPicker;
    }(webCorePlus.WuComponent));

    exports.WuColorPicker = WuColorPicker;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
