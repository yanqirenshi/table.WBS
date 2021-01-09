"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _wnqiBig = _interopRequireDefault(require("@yanqirenshi/wnqi.big.size"));

var _index = require("./index.js");

var Comps = _interopRequireWildcard(require("./Components.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ASSHOLE = new _wnqiBig["default"]();

function WBSTable(props) {
  var _useState = (0, _react.useState)(new _index.Core().makeColumns(props.columns)),
      _useState2 = _slicedToArray(_useState, 2),
      columns = _useState2[0],
      setColumns = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      visible_wp = _useState4[0],
      setVisibleWp = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      chooser_column = _useState6[0],
      setChooserColumn = _useState6[1];

  var style = props.style || {};
  var callbacks = {
    chooser: {
      "switch": function _switch() {
        setChooserColumn(!chooser_column);
      }
    },
    wp: {
      visible: function visible(v) {
        setVisibleWp(v);
      }
    },
    body: {
      row: {
        visible: function visible(number, v) {
          var new_columns = columns.map(function (d) {
            return Object.assign(d);
          });
          var col = new_columns.find(function (d) {
            return d.number === number;
          });
          col.visible = v;
          setColumns(new_columns);
        }
      }
    }
  };
  var records = ASSHOLE.build({
    data: props.source,
    options: props.options,
    start_id: props.start_id,
    flatten: true
  });
  var max_lev = records.reduce(function (lev, d) {
    return d._level > lev ? d._level : lev;
  }, 0);
  var columns_filterd = columns.filter(function (d) {
    return d.visible;
  });
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(Comps.Controller, {
    open: chooser_column,
    visible_wp: visible_wp,
    callbacks: callbacks
  }), chooser_column && /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      marginBottom: 11
    }
  }, /*#__PURE__*/_react["default"].createElement(Comps.ChooserColumn, {
    columns: columns,
    callbacks: callbacks
  }))), /*#__PURE__*/_react["default"].createElement("table", {
    className: "table is-bordered is-striped is-narrow is-hoverable is-fullwidth",
    style: style
  }, /*#__PURE__*/_react["default"].createElement(Comps.THead, {
    columns: columns_filterd,
    max_level: max_lev
  }), /*#__PURE__*/_react["default"].createElement(Comps.TBody, {
    columns: columns_filterd,
    max_level: max_lev,
    records: records,
    callbacks: callbacks,
    visible_wp: visible_wp
  })));
}

var _default = WBSTable;
exports["default"] = _default;