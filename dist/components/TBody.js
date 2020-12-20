"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _TBodyTr = _interopRequireDefault(require("./TBodyTr.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function TBody(props) {
  return /*#__PURE__*/_react["default"].createElement("tbody", null, props.records.map(function (d) {
    return /*#__PURE__*/_react["default"].createElement(_TBodyTr["default"], {
      key: d._id,
      source: d,
      columns: props.columns,
      max_level: props.max_level,
      callbacks: props.callbacks
    });
  }));
}

var _default = TBody;
exports["default"] = _default;