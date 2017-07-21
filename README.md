
# 翻页组件

## 快速使用

```html
<div class="paginator"></div>
<script>
    var paginator = new Paginator({
        el: document.querySelector('.paginator'),
        // aroundNum: 1,// 头尾
        // sideNum: 2, // 当前页旁边
        // page: 0, // 初始页。从0开始，默认0
        total: 60,// 总页数
        onChange(page){
            console.log(page);
        }
    });
</script>

```
