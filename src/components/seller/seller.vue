<template>
  <div class="seller" v-el:seller-wrapper>
    <div class="seller-content">
      <div class="overview-top border-1px">
        <h1 class="name">{{seller.name}}</h1>
        <star :size="36" :score="seller.score" class="star"></star>
        <span class="score">({{seller.score}})</span>
        <span class="sellCount">月售{{seller.sellCount}}单</span>
      </div>
      <div class="overview-bottom">
        <div class="bottom-left">
          <div class="price-desc">起送价</div>
          <span class="min-price">{{seller.minPrice}}</span><span class="unit">元</span>
        </div>
        <div class="bottom-middle">
          <div class="delivery-desc">商家配送</div>
          <span class="delivery-price">{{seller.deliveryPrice}}</span><span class="unit">元</span>
        </div>
        <div class="bottom-right">
          <div class="time-desc">平均配送时间</div>
          <span class="delivery-time">{{seller.deliveryTime}}</span><span class="minute">分钟</span>
        </div>
      </div>
      <split></split>
      <div class="notice">
        <h1 class="notice-title">公告与活动</h1>
        <div class="notice-wrapper border-1px">
          <p class="bulletin">{{seller.bulletin}}</p>
        </div>
        <ul class="supports">
          <li class="support border-1px" v-for="support in seller.supports">
            <span class="support-icon" :class="classMap[support.type]"></span>
            <span class="support-desc">{{support.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="seller-scene">
        <h1 class="scene-name">商家实景</h1>
        <div class="scene-pics" v-el:pics-wrapper>
          <ul class="pics-content" v-el:pics-content>
            <li class="pics-item" v-for="pic in seller.pics" >
              <img :src="pic" alt="商家图片" width="120" height="90"/>
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="seller-info">
        <h1 class="info-name border-1px">商家信息</h1>
        <ul class="info-wrapper">
          <li class="info-item border-1px" v-for="info in seller.infos">
            {{info}}
          </li>
        </ul>
      </div>
      <div class="collection-wrapper" @click.stop="toggleCollection">
        <span class="icon-favorite" :class="{'collected': isCollection}"></span>
        <div class="collection-desc" v-el:collection-desc>{{favoriteText}}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from '../../components/star/star';
  import split from '../../components/split/split';
  import BScroll from 'better-scroll';
  import {saveToLocal, loadFromLocal} from '../../common/js/store';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        isCollection: (() => {
          return loadFromLocal(this.seller.id, 'like', false);
        })()
      };
    },
    computed: {
      favoriteText () {
        return this.isCollection ? '已收藏' : '收藏';
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    watch: {
      seller () {
        // 通过watch监听seller的变化，seller在从后台拿到数据重新赋值那一刻有变化
        this._initPicScroll();
      }
    },
    ready () {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$els.sellerWrapper, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
      this._initPicScroll();
    },
    methods: {
      _initPicScroll () {
        if (this.seller.pics) {
          let picsContent = this.$els.picsContent;
          let picWidth = 120;
          let margin = 6;
          // seller为什么为空，seller一开始初始化的时候是空的，是后面拿到数据之后再重新赋值
          picsContent.style.width = (this.seller.pics.length * (picWidth + margin) - margin) + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              // 要让better-scroll可以横向滚动，必须设置scrollX的值，一开始就是没有设置这个值，导致一直滚动不了。
              this.picScroll = new BScroll(this.$els.picsWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      },
      toggleCollection () {
        this.isCollection = !this.isCollection;
        if (this.isCollection) {
          this.$els.collectionDesc.textContent = '已收藏';
        } else {
          this.$els.collectionDesc.textContent = '收藏';
        }
        saveToLocal(this.seller.id, 'like', this.isCollection);
      }
    },
    components: {
      star,
      split
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
  .seller
    position: fixed
    top: 174px
    bottom: 18px
    left: 0
    width: 100%
    overflow: hidden
    .seller-content
      padding-top: 18px
      .overview-top
        margin: 0 18px 0 18px
        padding-bottom: 18px
        font-size: 0
        .name
          font-size: 14px
          line-height: 14px
          color: rgb(7, 17, 27)
          margin-bottom: 8px
        &.border-1px
          border-1px(rgba(7, 17, 27, 0.1))
        .star
          display: inline-block
          margin-right: 8px
          vertical-align: top
        .score
          display: inline-block
          margin-right: 12px
          font-size: 10px
          color: rgb(77, 85, 93)
          line-height: 18px
        .sellCount
          display: inline-block
          font-size: 10px
          color: rgb(77, 85, 93)
          line-height: 18px
      .overview-bottom
        display: flex
        margin: 0 18px
        padding: 18px 0
        .bottom-left
          flex: 1
          padding: 4px 0
          color: rgb(7, 17, 27)
          font-weight: 200
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          .price-desc
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 10px
            text-align: center
            margin-bottom: 4px
          .min-price
            display: inline-block
            font-size: 24px
            line-height: 24px
          .unit
            display: inline-block
            font-size: 10px
            line-height: 24px
        .bottom-middle
          flex: 1
          padding: 4px 0
          color: rgb(7, 17, 27)
          font-weight: 200
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          .delivery-desc
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 10px
            margin-bottom: 4px
          .delivery-price
            display: inline-block
            font-size: 24px
            line-height: 24px
          .unit
            display: inline-block
            font-size: 10px
            line-height: 24px
        .bottom-right
          flex: 1
          padding: 4px 0
          color: rgb(7, 17, 27)
          font-weight: 200
          text-align: center
          .time-desc
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 10px
            text-align: center
            margin-bottom: 4px
          .delivery-time
            display: inline-block
            font-size: 24px
            line-height: 24px
          .minute  
            display: inline-block
            font-size: 10px
            line-height: 24px
      .notice 
        padding: 18px 18px 0 18px
        .notice-title
          margin-bottom: 8px
        .notice-wrapper 
          padding: 0 12px
          &.border-1px
            border-1px(rgba(7, 17, 27, 0.1))
          .bulletin
            font-size: 12px
            font-weight: 200
            color: rgb(240, 20, 20)
            line-height: 24px
      .supports
        .support
          padding: 16px 12px
          &.border-1px
            border-1px(rgba(7, 17, 27, 0.1))
          font-size: 0
          &:last-child
            border-none()
          .support-icon
            display: inline-block
            width: 16px
            height: 16px
            margin-right: 6px
            vertical-align: top
            background-size: 16px 16px
            &.decrease
              bg-img('decrease_4')
            &.discount  
              bg-img('discount_4')
            &.guarantee
              bg-img('guarantee_4')
            &.invoice
              bg-img('invoice_4')
            &.special
              bg-img('special_4')
          .support-desc
            display: inline-block
            font-size: 12px
            font-weight: 200
            line-height: 16px
            height: 16px
            color: rgb(7, 17, 27)
      .seller-scene
        padding: 18px 0 18px 18px
        .scene-name
          margin-bottom: 12px
        .scene-pics
          width: 100%
          overflow: hidden
          .pics-content
            white-space: nowrap
            font-size: 0
            .pics-item
              display: inline-block
              margin-right: 6px
              &:last-child
                margin-right: 0
      .seller-info
        padding: 18px 18px 0 18px
        .info-name
          padding-bottom: 12px
          &.border-1px
            border-1px(rgba(7, 17, 27, 0.1))
        .info-wrapper
          .info-item
            padding: 16px 12px
            font-size: 12px 
            font-weight: 200
            color: rgb(7, 17, 27)
            line-height: 16px
            &.border-1px
              border-1px(rgba(7, 17, 27, 0.1))
      .collection-wrapper
        position: absolute
        top: 18px
        right: 10px
        text-align: center
        .icon-favorite
          display: inline-block
          font-size: 24px
          color: #d4d6d9
          line-heigth: 24px
          &.collected
            color: rgb(240, 20, 20)
        .collection-desc
          width: 40px
          font-size: 10px
          line-height: 10px
          color: rgb(77, 85, 93)
</style>
