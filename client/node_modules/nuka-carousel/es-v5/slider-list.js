import React from 'react';
import { Alignment } from './types';

var getSliderListWidth = function getSliderListWidth(count, slidesToShow, wrapAround) {
  var visibleSlides = slidesToShow || 1;

  if (wrapAround) {
    var _percentage = count * 100 / visibleSlides;

    return "".concat(3 * _percentage, "%");
  }

  var percentage = count * 100 / visibleSlides;
  return "".concat(percentage, "%");
};

var getTransition = function getTransition(count, initialValue, currentSlide, cellAlign, wrapAround) {
  if (cellAlign === Alignment.Left) {
    if (wrapAround) {
      var _slideTransition = 100 / (3 * count);

      var currentTransition = initialValue - _slideTransition * (currentSlide - 1);
      return currentTransition - _slideTransition;
    }

    var slideTransition = 100 / count * currentSlide;
    return -(slideTransition + initialValue);
  } else if (cellAlign === Alignment.Center) {
    if (wrapAround) {
      var _slideTransition3 = 100 / (3 * count);

      var _currentTransition = initialValue - _slideTransition3 * (currentSlide - 1);

      return _currentTransition - _slideTransition3;
    }

    var _slideTransition2 = 100 / count * currentSlide;

    return initialValue - _slideTransition2;
  } else if (cellAlign === Alignment.Right) {
    if (wrapAround) {
      var _slideTransition5 = 100 / (3 * count);

      var _currentTransition2 = initialValue - _slideTransition5 * (currentSlide - 1);

      return _currentTransition2 - _slideTransition5;
    }

    var _slideTransition4 = 100 / count * currentSlide;

    return initialValue - _slideTransition4;
  }

  return initialValue;
}; // eslint-disable-next-line complexity


var getPositioning = function getPositioning(cellAlign, slidesToShow, count, currentSlide, wrapAround, move) {
  if (!cellAlign || cellAlign === Alignment.Left) {
    var initialValue = wrapAround ? -(count * (100 / (3 * count))) : 0;
    var horizontalMove = getTransition(count, initialValue, currentSlide, cellAlign, wrapAround);
    var draggableMove = move ? "calc(".concat(horizontalMove, "% - ").concat(move, "px)") : "".concat(horizontalMove, "%");
    return "translate3d(".concat(draggableMove, ", 0, 0)");
  }

  if (cellAlign === Alignment.Right) {
    var right = slidesToShow > 1 ? 100 / count * (slidesToShow - 1) : 0; // if wrapAround is enabled

    var rightAlignedFirstSlide = -(count * (100 / (3 * count))) + (slidesToShow - 1) * (100 / (3 * count));

    var _initialValue = wrapAround ? rightAlignedFirstSlide : right;

    var _horizontalMove = getTransition(count, _initialValue, currentSlide, cellAlign, wrapAround);

    var _draggableMove = move ? "calc(".concat(_horizontalMove, "% - ").concat(move, "px)") : "".concat(_horizontalMove, "%");

    return "translate3d(".concat(_draggableMove, ", 0, 0)");
  }

  if (cellAlign === Alignment.Center) {
    var center = slidesToShow > 1 ? 100 / count * Math.floor(slidesToShow / 2) : 0;
    var validatedCenter = slidesToShow % 2 === 0 ? center - 100 / count / 2 : center; // if wrapAround is enabled

    var centerAlignedFirstSlide = -(count * (100 / (3 * count))) + Math.floor(slidesToShow / 2) * (100 / (3 * count));
    var wrapAroundCenter = slidesToShow % 2 === 0 ? centerAlignedFirstSlide - 100 / (3 * count) / 2 : centerAlignedFirstSlide;

    var _initialValue2 = wrapAround ? wrapAroundCenter : validatedCenter;

    var _horizontalMove2 = getTransition(count, _initialValue2, currentSlide, cellAlign, wrapAround);

    var _draggableMove2 = move ? "calc(".concat(_horizontalMove2, "% - ").concat(move, "px)") : "".concat(_horizontalMove2, "%");

    return "translate3d(".concat(_draggableMove2, ", 0, 0)");
  }

  return 'translate3d(0, 0, 0)';
};

export var getSliderListStyles = function getSliderListStyles(children, currentSlide, animation, slidesToShow, cellAlign, wrapAround, speed, move, slideAnimation) {
  var count = React.Children.count(children);
  var width = getSliderListWidth(count, slidesToShow, wrapAround);
  var positioning = getPositioning(cellAlign || Alignment.Left, slidesToShow || 1, count, currentSlide, wrapAround, move);
  return {
    width: width,
    textAlign: 'left',
    transition: animation && slideAnimation !== 'fade' ? "".concat(speed || 500, "ms ease 0s") : 'none',
    transform: positioning,
    display: 'flex'
  };
};