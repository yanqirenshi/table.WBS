"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _deepmerge = _interopRequireDefault(require("deepmerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Core = /*#__PURE__*/function () {
  function Core() {
    _classCallCheck(this, Core);
  }

  _createClass(Core, [{
    key: "margin",
    value: function margin(level) {
      var out = "";

      for (var i = 0; i < level; i++) {
        out += "　";
      }

      return out;
    }
    /* **************************************************************** *
     *  Column
     * **************************************************************** */

  }, {
    key: "templateColumn",
    value: function templateColumn(i) {
      return {
        number: i,
        label: 'col-' + (i + 1),
        required: false,
        visible: true,
        contents: function contents(c, d) {
          return d._id;
        }
      };
    }
  }, {
    key: "makeColumn",
    value: function makeColumn(seed, i) {
      var column = (0, _deepmerge["default"])(this.templateColumn(i), seed);
      return column;
    }
  }, {
    key: "makeColumns",
    value: function makeColumns(seeds) {
      var _this = this;

      if (!Array.isArray(seeds)) return [];
      return seeds.map(function (seed, i) {
        return _this.makeColumn(seed, i);
      });
    }
  }]);

  return Core;
}();

exports["default"] = Core;