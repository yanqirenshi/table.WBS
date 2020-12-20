"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ButtonVisible = _interopRequireDefault(require("./ButtonVisible.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var style = {
  root: {
    padding: 22,
    background: '#f3f3f3',
    borderRadius: '8px 0px 8px 8px'
  }
};

function ChooserColumn(props) {
  var columns = props.columns || [];
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: style.root
  }, /*#__PURE__*/_react["default"].createElement("table", {
    className: "table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
  }, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", {
    style: {
      background: 'rgba(252, 200, 0, 0.3)'
    }
  }, /*#__PURE__*/_react["default"].createElement("th", {
    rowSpan: "2"
  }), /*#__PURE__*/_react["default"].createElement("th", {
    colSpan: "3"
  }, "\u57FA\u672C"), /*#__PURE__*/_react["default"].createElement("th", {
    colSpan: "3"
  }, "\u6587\u5B57"), /*#__PURE__*/_react["default"].createElement("th", {
    colSpan: "1"
  }, "\u80CC\u666F")), /*#__PURE__*/_react["default"].createElement("tr", {
    style: {
      background: 'rgba(252, 200, 0, 0.3)'
    }
  }, /*#__PURE__*/_react["default"].createElement("th", null, "Label"), /*#__PURE__*/_react["default"].createElement("th", null, "Width"), /*#__PURE__*/_react["default"].createElement("th", null, "Leveling"), /*#__PURE__*/_react["default"].createElement("th", null, "Size"), /*#__PURE__*/_react["default"].createElement("th", null, "Color"), /*#__PURE__*/_react["default"].createElement("th", null, "Bold"), /*#__PURE__*/_react["default"].createElement("th", null, "Color"))), /*#__PURE__*/_react["default"].createElement("tbody", null, columns.map(function (d, i) {
    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: i
    }, /*#__PURE__*/_react["default"].createElement("td", {
      style: {
        width: 66,
        textAlign: 'center'
      }
    }, d.required === true && /*#__PURE__*/_react["default"].createElement("p", {
      style: {
        color: '#ccc'
      }
    }, "\u5FC5\u9808"), d.required !== true && /*#__PURE__*/_react["default"].createElement(_ButtonVisible["default"], {
      source: d,
      callbacks: props.callbacks
    })), /*#__PURE__*/_react["default"].createElement("td", null, d.label), /*#__PURE__*/_react["default"].createElement("td", null, "--"), /*#__PURE__*/_react["default"].createElement("td", null, d.leveling ? '○' : '×'), /*#__PURE__*/_react["default"].createElement("td", null, "--"), /*#__PURE__*/_react["default"].createElement("td", null, "--"), /*#__PURE__*/_react["default"].createElement("td", null, "--"), /*#__PURE__*/_react["default"].createElement("td", null, "--"));
  }))));
}

var _default = ChooserColumn;
exports["default"] = _default;