"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _TBodyTr = _interopRequireDefault(require("./TBodyTr.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var makeTr = function makeTr(d, props) {
  return /*#__PURE__*/_react["default"].createElement(_TBodyTr["default"], {
    key: d._id,
    source: d,
    columns: props.columns,
    max_level: props.max_level,
    callbacks: props.callbacks
  });
};

var makeTrList = function makeTrList(props) {
  var reducer;
  if (props.visible_wp) reducer = function reducer(list, d) {
    list.push(makeTr(d, props));
    return list;
  };else reducer = function reducer(list, d) {
    if (d._core._class === "WORKPACKAGE") return list;
    list.push(makeTr(d, props));
    return list;
  };
  return props.records.reduce(reducer, []);
};

function TBody(props) {
  return /*#__PURE__*/_react["default"].createElement("tbody", null, makeTrList(props));
}

var _default = TBody;
exports["default"] = _default;