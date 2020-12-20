"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var style = {
  root: {
    flexGrow: 1,
    display: 'flex',
    paddingTop: 11,
    marginBottom: 8
  }
};

function FormInput(props) {
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: style.root
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("button", {
    className: "button"
  }, "Filter")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "field",
    style: {
      flexGrow: 1
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "control",
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/_react["default"].createElement("input", {
    className: "input is-primary",
    type: "text"
  }))));
}

var _default = FormInput;
exports["default"] = _default;