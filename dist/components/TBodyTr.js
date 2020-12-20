"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var makeLevelingSpace = function makeLevelingSpace(level) {
  var out = [];
  if (level > 0) for (var i = 0; i < level; i++) {
    out.push('');
  }
  return out;
};

var colSpan = function colSpan(leveling, level, max_lev) {
  if (!leveling) return 1;
  return max_lev + 1 - level;
};

var cells = function cells(props) {
  var out = [];
  var row = props.source;
  var callbacks = props.callbacks;
  var max_level = props.max_level;
  var columns = props.columns;
  var style = {
    cell: {
      borderLeft: 'none',
      borderRight: 'none'
    },
    cell_s: {
      borderLeft: 'none',
      borderRight: 'none',
      width: 22
    },
    cell_s_first: {
      borderRight: 'none',
      width: 22
    },
    cell_last: {
      borderLeft: 'none'
    }
  };
  var key = 0;

  var _iterator = _createForOfIteratorHelper(columns),
      _step;

  try {
    var _loop = function _loop() {
      var column = _step.value;
      var leveling = column.leveling;
      var level = leveling ? row._level : 0;
      var number = column.number;
      makeLevelingSpace(level).map(function (d, j) {
        out.push( /*#__PURE__*/_react["default"].createElement("td", {
          key: key++,
          style: leveling && j === 0 ? style.cell_s_first : style.cell_s
        }));
      });
      out.push( /*#__PURE__*/_react["default"].createElement("td", {
        key: key++,
        style: leveling && (level === 0 ? {} : style.cell_last),
        colSpan: colSpan(column.leveling, level, max_level),
        callbacks: callbacks
      }, column.contents(column, row, key)));
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return out;
};

function TBodyTr(props) {
  return /*#__PURE__*/_react["default"].createElement("tr", null, cells(props));
}

var _default = TBodyTr;
exports["default"] = _default;