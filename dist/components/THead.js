"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var colSpan = function colSpan(leveling, max_level) {
  if (!leveling) return 1;
  return max_level + 1;
};

function THead(props) {
  var max_level = props.max_level;
  return /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", null, props.columns.map(function (d, i) {
    return /*#__PURE__*/_react["default"].createElement("th", {
      key: i,
      colSpan: colSpan(d.leveling, max_level),
      style: {
        background: '#fcc800'
      }
    }, d.label);
  })));
}

var _default = THead;
exports["default"] = _default;