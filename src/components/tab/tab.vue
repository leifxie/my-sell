<template>
  <div class="tab border-1px">
    <div class="tab-item" >
      <a v-link="{path: '/goods'}">商品</a>
    </div>
    <div class="tab-item">
      <a v-link="{path: '/ratings'}">评价</a>
    </div>
    <div class="tab-item">
      <a v-link="{path: '/seller'}">商家</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
 export default {};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin';
  .tab
    display: flex
    align-items: center
    width: 375px
    height: 40px
    border-1px(rgba(7, 17, 27, .1))
    .tab-item
      flex: 1
      text-align: center
      a
        display: block
        line-height: 40px
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
