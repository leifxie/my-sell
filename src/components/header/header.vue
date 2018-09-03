<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar"/>
      </div>
      <div class="text-wrapper">
        <div class="top">
          <span class="brand"></span>
          <span class="title">{{seller.name}}</span>
        </div>
        <div class="middle">
          <span class="desc">{{seller.description}} / {{seller.deliveryTime}}分钟送达</span>
        </div>
        <div v-if="seller.supports" class="bottom">
          <span class="support-icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="support-desc">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div v-if="seller.supports" class="right-button" @click="showDetailPage()">
      <span class="text">{{seller.supports.length}}个</span><i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="notice-wrapper" @click="showDetailPage()">
      <span class="notice-icon"></span><span class="notice-content">{{seller.bulletin}}</span><i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail" >
        <div class="detail-wrapper clearfix">
          <div class="detail-content">
            <h1 class="detail-title">{{seller.name}}</h1>
            <div class="v-star">
              <star :score="seller.score" :size="48"></star>
            </div>
            <div class="small-title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li v-for="(item,index) in classMap" class="support" :key="index">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="small-title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="detail-bulletin">
              {{seller.bulletin}}
            </div>
          </div>
        </div>
        <div class="detail-close" @click="closeDetailPage()">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from '../star/star';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      };
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    methods: {
      showDetailPage () {
        this.detailShow = true;
      },
      closeDetailPage () {
        this.detailShow = false;
      }
    },
    components: {
      star
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .header
    position: relative
    width: 100%
    height: 134px
    overflow: hidden
    background-color: rgba(7, 17, 27, .5)
    color: rgb(255, 255, 255)
    .content-wrapper
      position: relative
      top: 24px
      left: 24px
      margin-bottom: 18px
      font-size: 0
      .avatar
        display: inline-block
        width: 64px
        height: 64px
        & > img
          width: 100%
          height: 100%
          border-radius: 2px
      .text-wrapper
        display: inline-block
        vertical-align: top
        margin-left: 16px
        .top
          margin: 2px 0px 8px 0px
          .brand
            display: inline-block
            width: 30px
            height: 18px
            bg-img('brand')
            background-repeat: no-repeat
            background-size: 30px 18px
          .title
            margin-left: 6px
            vertical-align: top
            font-size: 16px
            font-weight: bold
            line-height: 18px
        .middle
          font-size: 12px
          line-height: 12px
        .bottom
          margin: 10px 0px 2px 0px
          font-weight: 200
          font-size: 10px
          line-height: 12px
          .support-icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-img('decrease_1')
            &.discount
              bg-img('discount_1')
            &.guarantee
              bg-img('guarantee_1')
            &.invoice
              bg-img('invoice_1')
            &.special
              bg-img('special_1')
    .right-button
      position: absolute
      right: 12px
      bottom: 40px
      padding: 0 8px
      height: 24px
      background-color: rgba(0, 0, 0, .2)
      border-radius: 14px
      .text
        vertical-align: top
        line-height: 24px
        font-size: 10px
        font-weight: 200
      .icon-keyboard_arrow_right
        line-height: 24px
        font-size: 10px
    .notice-wrapper
      position: absolute
      bottom: 0
      left: 0
      padding: 0 22px 0 12px
      width: 100%
      height: 28px
      background-color: rgba(7, 17, 27, .2)
      .notice-icon
        display: inline-block
        width: 22px
        height: 12px
        margin-bottom: 8px
        bg-img('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .notice-content
        display: inline-block
        width: 308px
        height: 28px
        margin: 0 4px 0 4px
        line-height: 28px
        font-size: 10px
        font-weight: 200
        white-space: nowrap
        text-overflow: ellipsis
        overflow: hidden
      .icon-keyboard_arrow_right
        position: absolute
        top: 8px
        font-size: 10px
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .detail
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      background-color:rgba(7, 17, 27, .8)
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.6s
        opacity: 1
      &.fade-enter, &.fade-leave-to
        opacity: 0
      .detail-wrapper
        min-height: 100%
        width: 100%
        .detail-content
          margin-top: 64px
          padding-bottom: 64px
          .detail-title
            text-align: center
            font-size: 16px
            font-weight: 700
            line-height: 16px
          .v-star
            margin: 16px 0 28px 0
            text-align: center
          .small-title
            display: flex
            margin: 28px auto 24px auto
            width: 80%
            .line
              flex: 1
              position: relative
              top: -7.5px
              border-bottom: 1px solid rgba(255, 255, 255, .2)
            .text
              margin: 0 12px
              font-size: 14px
              font-weight: 700
              line-height: 14px
          .supports
            width: 80%
            margin: 24px auto 28px auto
            padding: 0 12px
            box-sizing: border-box
            .support
              margin-bottom: 12px
            .icon
              display: inline-block
              width: 16px
              height: 16px
              margin-right: 6px
              background-size: 16px 16px
              &.decrease
                bg-img('decrease_2')
              &.discount
                bg-img('discount_2')
              &.guarantee
                bg-img('guarantee_2')
              &.invoice
                bg-img('invoice_2')
              &.special
                bg-img('special_2')
            .text
              display: inline-block
              position: relative
              top: -4px
              font-size: 12px
              font-weight: 200
              line-height: 12px
          .detail-bulletin
            width: 80%
            box-sizing: border-box
            margin: 0 auto
            padding: 0 12px
            text-align: left
            line-height: 24px
            font-size: 12px
            font-weight: 200
      .detail-close
          position: relative
          width: 32px
          height: 32px
          margin: -64px auto 0 auto
          clear: both
          .icon-close
            font-size: 32px
            color: rgba(255, 255, 255, .5)
</style>
