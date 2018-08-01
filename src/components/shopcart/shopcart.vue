<template>
  <div class="shopcart">
    <div class="shopcart-left">
      <div class="icon-wrapper">
        <div class="icon-background">
          <span class="icon-shopping_cart"></span>
        </div>
      </div>
      <div class="price">￥0</div><div class="description">另需配送费￥4元</div>
    </div><div class="shopcart-right">￥20起送</div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    display: flex
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 47px
    background-color: #141d27
    z-index: 10
    .shopcart-left
      flex: 1
      .icon-wrapper
        display: inline-block
        position: relative
        left: 18px
        width: 58px
        height: 58px
        margin-top: -10px
        font-size: 16px
        font-weight: 700
        line-height: 24px
        background-color: #141d27
        border-radius: 50%
        z-index: 50
        .icon-background
          display: inline-block
          width: 44px
          height: 44px
          margin: 6px 0 0 6.5px
          background-color: #2b343c
          border-radius: 50%
          .icon-shopping_cart
            position: absolute
            top: 50%
            left: 50%
            margin-top: -12px
            margin-left: -12px
            font-size: 24px
            color: rgb(255, 255, 255, .4)
            line-height: 24px
      .price
        display: inline-block
        margin-top: 5.5px
        padding: 11px 0 12px 18px
        vertical-align: top
        color: #919396
        &:after
          border-left: 1px solid rgba(255, 255, 255, .1)
          height: 30px
          margin: 0 0 0 12px
          content: ''
      .description
        display: inline-block
        margin-top: 5.5px
        padding: 11px 0 12px 12px
        vertical-align: top
        color: #6c7177
    .shopcart-right
      flex: 0 0 105px
      text-align: center
      line-height: 47px
      font-size: 12px
      color: rgba(255, 255, 255, .4)
      background: #2b333b
</style>
