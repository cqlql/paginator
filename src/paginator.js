/**
 * 翻页按钮生成
 *
 * Created by cql on 2017/4/29.
 */


// import 'paginator.pcss';


export default class Paginator {

    constructor({
                    ePage,
                    onChange = function () {

                    },
                    aroundNum = 1,
                    sideNum = 2,
                    total = 0,
                    page = 0// 起始页
                }) {


        this.paginatorInit = function () {
            this.paginatorInit = function () {
            };


            ePage.addEventListener('click', (e) => {
                let t = e.target;
                if (t.tagName === 'A') {

                    let page = t.dataset.index * 1;
                    if (this.currPage !== page) {
                        this.build(page);
                        onChange(page);
                        this.currPage = page;
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

        this.build(page)
    }

    /// 公开
    // 核心构建，返回 按钮数据。可以使用vue
    buildBase({pageIndex, total, aroundNum, sideNum}) {

        let
            min = (aroundNum + sideNum) * 2 + 1,// 总按钮数
            d = [];

        if (total < min + 1) {
            for (let i = 0; i < total; i++) {
                d.push(i)
            }
        }
        else {

            let start = [],
                end = [];

            /// 头尾数组
            for (let i = aroundNum; i--;) {
                start.unshift(i);
                end.push(total - i - 1);
            }

            /// 中间数组
            let startLast = start[aroundNum - 1],
                midMin = pageIndex - sideNum,

                endFirst = end[0],
                minMax = pageIndex + sideNum,
                dif = 0;

            // 先算偏移
            if (midMin - startLast < 2) {
                end.unshift(null);
                dif = startLast - midMin + 1;
            }
            else if (endFirst - minMax < 2) {
                start.push(null);
                dif = endFirst - minMax - 1;
            }
            else {
                end.unshift(null);
                start.push(null);
            }

            // 生成
            let mid = [pageIndex + dif];
            for (let i = 0, len; i < sideNum; i++) {
                mid.unshift(pageIndex - i - 1 + dif);
                mid.push(pageIndex + i + 1 + dif);
            }

            /// 合并
            d = start.concat(mid.concat(end));
        }


        return d;
    }

    build(page) {
        this.paginatorInit();

        let
            total = this.total,
            pageData = this.buildBase({
                pageIndex: page,
                total,
                aroundNum: this.aroundNum,
                sideNum: this.sideNum
            });

        let html = '';


        // 上一页
        if (page > 0) {
            html += '<a data-index="' + (page - 1) + '">&lt;</a>';
        }
        else {
            html += '<span>&lt;</span>';
        }

        pageData.forEach(function (p, i) {

            let className = '',
                inner = p + 1;


            if (p === null) {
                html += '<span>...</span>';
            }
            else {

                if (p === page) {
                    className += ' active';
                }

                html += '<a data-index="' + p + '" class="' + className + '">' + inner + '</a>';
            }


        });

        // 下一页
        if (page < total - 1) {
            html += '<a data-index="' + (page + 1 ) + '">&gt;</a>';
        }
        else {
            html += '<span>&gt;</span>';
        }

        this.ePage.innerHTML = html;

    }

    totalInit(total) {
        this.total = total;
        this.currPage = -1;
    }
}

