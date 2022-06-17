"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDecoratorStyles = void 0;

var _types = require("./types");

var getDecoratorStyles = function getDecoratorStyles(pos) {
  switch (pos) {
    case _types.Positions.TopLeft:
      {
        return {
          position: 'absolute',
          top: 0,
          left: 0
        };
      }

    case _types.Positions.TopCenter:
      {
        return {
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          WebkitTransform: 'translateX(-50%)',
          msTransform: 'translateX(-50%)'
        };
      }

    case _types.Positions.TopRight:
      {
        return {
          position: 'absolute',
          top: 0,
          right: 0
        };
      }

    case _types.Positions.CenterLeft:
      {
        return {
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          WebkitTransform: 'translateY(-50%)',
          msTransform: 'translateY(-50%)'
        };
      }

    case _types.Positions.CenterCenter:
      {
        return {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          WebkitTransform: 'translate(-50%, -50%)',
          msTransform: 'translate(-50%, -50%)'
        };
      }

    case _types.Positions.CenterRight:
      {
        return {
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
          WebkitTransform: 'translateY(-50%)',
          msTransform: 'translateY(-50%)'
        };
      }

    case _types.Positions.BottomLeft:
      {
        return {
          position: 'absolute',
          bottom: 0,
          left: 0
        };
      }

    case _types.Positions.BottomCenter:
      {
        return {
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          WebkitTransform: 'translateX(-50%)',
          msTransform: 'translateX(-50%)'
        };
      }

    case _types.Positions.BottomRight:
      {
        return {
          position: 'absolute',
          bottom: 0,
          right: 0
        };
      }

    default:
      {
        return {
          position: 'absolute',
          top: 0,
          left: 0
        };
      }
  }
};

exports.getDecoratorStyles = getDecoratorStyles;