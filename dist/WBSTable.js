"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _BodyTr = _interopRequireDefault(require("./BodyTr"));

var _wnqiBig = _interopRequireDefault(require("@yanqirenshi/wnqi.big.size"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ASSHOLE = new _wnqiBig["default"]();

function WBSTable(props) {
  var columns = props.columns;
  var records = ASSHOLE.build({
    data: props.source,
    options: props.options,
    start_id: props.start_id,
    flatten: true
  });
  var style = props.style || {};
  return /*#__PURE__*/_react["default"].createElement("table", {
    className: "table is-bordered is-striped is-narrow is-hoverable is-fullwidth",
    style: style
  }, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", null, columns.map(function (d, i) {
    return /*#__PURE__*/_react["default"].createElement("th", {
      key: i
    }, d.label);
  }))), /*#__PURE__*/_react["default"].createElement("tbody", null, records.map(function (d) {
    return /*#__PURE__*/_react["default"].createElement(_BodyTr["default"], {
      key: d._id,
      source: d,
      columns: columns
    });
  })));
}

var _default = WBSTable;
exports["default"] = _default;