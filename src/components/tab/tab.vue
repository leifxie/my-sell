<template>
  <div class="tab border-1px">
    <div class="tab-item" >
      <router-link :to="{path: '/goods'}">商品</router-link>
    </div>
    <div class="tab-item">
      <router-link :to="{path: '/ratings'}">评价</router-link>
    </div>
    <div class="tab-item">
      <router-link :to="{path: '/seller'}">商家</router-link>
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
    width: 100%
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
