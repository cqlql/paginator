(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Paginator = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/**
 * 翻页按钮生成
 *
 * Created by cql on 2017/4/29.
 */

// import 'paginator.pcss';


var Paginator = function () {
    function Paginator(_ref) {
        var ePage = _ref.ePage,
            _ref$onChange = _ref.onChange,
            onChange = _ref$onChange === undefined ? function () {} : _ref$onChange,
            _ref$aroundNum = _ref.aroundNum,
            aroundNum = _ref$aroundNum === undefined ? 1 : _ref$aroundNum,
            _ref$sideNum = _ref.sideNum,
            sideNum = _ref$sideNum === undefined ? 2 : _ref$sideNum,
            _ref$total = _ref.total,
            total = _ref$total === undefined ? 0 : _ref$total,
            _ref$page = _ref.page,
            page = _ref$page === undefined ? 0 : _ref$page;
        classCallCheck(this, Paginator);


        this.paginatorInit = function () {
            var _this = this;

            this.paginatorInit = function () {};

            ePage.addEventListener('click', function (e) {
                var t = e.target;
                if (t.tagName === 'A') {

                    var _page = t.dataset.index * 1;
                    if (_this.currPage !== _page) {
                        _this.build(_page);
                        onChange(_page);
                        _this.currPage = _page;
                    }
                }
            });
        };

        // 当前显示页数
        this.currPage = -1;
        this.total = total;

        /// 公开
        this.ePage = ePage;
        this.aroundNum = aroundNum;
        this.sideNum = sideNum;

        this.build(page);
    }

    /// 公开
    // 核心构建，返回 按钮数据。可以使用vue


    createClass(Paginator, [{
        key: 'buildBase',
        value: function buildBase(_ref2) {
            var pageIndex = _ref2.pageIndex,
                total = _ref2.total,
                aroundNum = _ref2.aroundNum,
                sideNum = _ref2.sideNum;


            var min = (aroundNum + sideNum) * 2 + 1,
                // 总按钮数
            d = [];

            if (total < min + 1) {
                for (var i = 0; i < total; i++) {
                    d.push(i);
                }
            } else {

                var start = [],
                    end = [];

                /// 头尾数组
                for (var _i = aroundNum; _i--;) {
                    start.unshift(_i);
                    end.push(total - _i - 1);
                }

                /// 中间数组
                var startLast = start[aroundNum - 1],
                    midMin = pageIndex - sideNum,
                    endFirst = end[0],
                    minMax = pageIndex + sideNum,
                    dif = 0;

                // 先算偏移
                if (midMin - startLast < 2) {
                    end.unshift(null);
                    dif = startLast - midMin + 1;
                } else if (endFirst - minMax < 2) {
                    start.push(null);
                    dif = endFirst - minMax - 1;
                } else {
                    end.unshift(null);
                    start.push(null);
                }

                // 生成
                var mid = [pageIndex + dif];
                for (var _i2 = 0, len; _i2 < sideNum; _i2++) {
                    mid.unshift(pageIndex - _i2 - 1 + dif);
                    mid.push(pageIndex + _i2 + 1 + dif);
                }

                /// 合并
                d = start.concat(mid.concat(end));
            }

            return d;
        }
    }, {
        key: 'build',
        value: function build(page) {
            this.paginatorInit();

            var total = this.total,
                pageData = this.buildBase({
                pageIndex: page,
                total: total,
                aroundNum: this.aroundNum,
                sideNum: this.sideNum
            });

            var html = '';

            // 上一页
            if (page > 0) {
                html += '<a data-index="' + (page - 1) + '">&lt;</a>';
            } else {
                html += '<span>&lt;</span>';
            }

            pageData.forEach(function (p, i) {

                var className = '',
                    inner = p + 1;

                if (p === null) {
                    html += '<span>...</span>';
                } else {

                    if (p === page) {
                        className += ' active';
                    }

                    html += '<a data-index="' + p + '" class="' + className + '">' + inner + '</a>';
                }
            });

            // 下一页
            if (page < total - 1) {
                html += '<a data-index="' + (page + 1) + '">&gt;</a>';
            } else {
                html += '<span>&gt;</span>';
            }

            this.ePage.innerHTML = html;
        }
    }, {
        key: 'totalInit',
        value: function totalInit(total) {
            this.total = total;
            this.currPage = -1;
        }
    }]);
    return Paginator;
}();

return Paginator;

})));
