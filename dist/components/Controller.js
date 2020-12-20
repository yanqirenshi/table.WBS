"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var style = {
  root: {
    display: 'flex'
  },
  left: {
    flexGrow: 1,
    display: 'flex',
    paddingTop: 11,
    marginBottom: 8
  },
  right: {
    display: 'flex',
    marginLeft: 22,
    padding: 11,
    borderRadius: '8px 8px 0px 0px'
  }
};

function Controller(props) {
  var style_right = _objectSpread({}, style.right);

  if (props.open) style_right.background = '#f3f3f3';

  var clickColumns = function clickColumns() {
    props.callbacks.chooser["switch"]();
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: style.root
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: style.left
  }), /*#__PURE__*/_react["default"].createElement("div", {
    style: style_right
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: "button",
    onClick: clickColumns
  }, "Columns")));
}

var _default = Controller;
exports["default"] = _default;