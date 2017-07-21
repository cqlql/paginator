/**
 * Created by cql on 2017/7/21.
 */


import Paginator from './paginator.js';

let aroundNum = 2;// 头尾
let sideNum = 3;// 当前页旁边
let total = 68;// 总页数
// let count=endCount+sideCount;

function getData(page) {


    setTimeout(function () {

        paginator({
            // 当前页
            page,
            aroundNum,
            sideNum,
            total,
            onChange: function (page) {

                getData(page);
            }
        });
    }, 1000);

}

let ePage = document.querySelector('.paginator');

let paginator = new Paginator({
    ePage,

    onChange(page){
        console.log(page);
    }
});

paginator.totalInit(68);


paginator.build(0);