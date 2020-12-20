"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var buttonClass = function buttonClass(props) {
  if (props.source.visible === true) return "button is-small is-warning";
  return "button is-small";
};

function ButtonVisible(props) {
  var click = function click() {
    props.callbacks.body.row.visible(props.source.number, !props.source.visible);
  };

  return /*#__PURE__*/_react["default"].createElement("button", {
    className: buttonClass(props),
    onClick: click
  }, "\u8868\u793A");
}

var _default = ButtonVisible;
exports["default"] = _default;