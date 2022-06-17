function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Fragment } from 'react';
import { getDecoratorStyles } from './control-styles';
import { Positions } from './types';
var controlsMap = [{
  funcName: 'renderTopLeftControls',
  key: Positions.TopLeft
}, {
  funcName: 'renderTopCenterControls',
  key: Positions.TopCenter
}, {
  funcName: 'renderTopRightControls',
  key: Positions.TopRight
}, {
  funcName: 'renderCenterLeftControls',
  key: Positions.CenterLeft
}, {
  funcName: 'renderCenterCenterControls',
  key: Positions.CenterCenter
}, {
  funcName: 'renderCenterRightControls',
  key: Positions.CenterRight
}, {
  funcName: 'renderBottomLeftControls',
  key: Positions.BottomLeft
}, {
  funcName: 'renderBottomCenterControls',
  key: Positions.BottomCenter
}, {
  funcName: 'renderBottomRightControls',
  key: Positions.BottomRight
}];

var renderControls = function renderControls(props, count, currentSlide, moveSlide, _nextSlide, prevSlide, slidesToScroll) {
  if (props.withoutControls) {
    return null;
  }

  return controlsMap.map(function (control) {
    var _props$control$funcNa;

    if (!props[control.funcName] || typeof props[control.funcName] !== 'function') {
      return /*#__PURE__*/React.createElement(Fragment, {
        key: control.funcName
      });
    }

    return /*#__PURE__*/React.createElement("div", {
      key: control.funcName,
      className: ["slider-control-".concat(control.key.toLowerCase()), props.defaultControlsConfig.containerClassName || ''].join(' ').trim(),
      style: _objectSpread({}, getDecoratorStyles(control.key))
    }, (_props$control$funcNa = props[control.funcName]) === null || _props$control$funcNa === void 0 ? void 0 : _props$control$funcNa.call(props, {
      cellAlign: props.cellAlign,
      cellSpacing: props.cellSpacing,
      currentSlide: currentSlide,
      defaultControlsConfig: props.defaultControlsConfig || {},
      goToSlide: function goToSlide(index) {
        return moveSlide(index);
      },
      nextSlide: function nextSlide() {
        return _nextSlide();
      },
      previousSlide: function previousSlide() {
        return prevSlide();
      },
      scrollMode: props.scrollMode,
      slideCount: count,
      slidesToScroll: slidesToScroll,
      slidesToShow: props.slidesToShow || 1,
      vertical: props.vertical,
      wrapAround: props.wrapAround
    }));
  });
};

export default renderControls;