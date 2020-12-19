"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function BodyTr(props) {
  var row = props.source;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("tr", null, props.columns.map(function (column, i) {
    return /*#__PURE__*/_react["default"].createElement("td", {
      key: i
    }, column.contents(column, row, i));
  })));
}

var _default = BodyTr;
exports["default"] = _default;