<template>
  <div class="shopcart">
    <div class="shopcart-wrapper">
      <div class="shopcart-bottom" @click="toggleCart">
        <div class="shopcart-left">
          <div class="icon-wrapper">
            <div class="icon-background" :class="{'highlight': totalCount > 0}">
              <span class="icon-shopping_cart"></span>
            </div>
            <div class="count" v-show="totalCount > 0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight': totalPrice > 0}">￥{{totalPrice}}</div><div class="description">另需配送费￥{{deliveryPrice}}元</div>
        </div><div class="shopcart-right" :class="{'highlight': totalPrice >= minPrice}" @click.stop="pay">{{payStatus}}</div>
        <div class="ball-wrapper">
          <div transition="drop" class="ball" v-for="ball in balls" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </div>
      </div>
      <div class="shopcart-list" v-show="listShow" transition="slide">
        <div class="list-header">
          <span class="title">购物车</span>
          <span class="reset" @click="reset">清空</span>
        </div>
        <div class="content-wrapper" v-el:content-wrapper>
          <ul class="list-content">
            <li class="list-item" v-for="food in selectedFoods">
              <span class="name">{{food.name}}</span>
              <span class="price">￥{{food.price * food.num}}</span>
              <div class="wrapper">
                <carnumber :food="food"></carnumber>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="shopcart-mask" v-show="listShow" @click="hideList" transition="fade"></div>
  </div> 
</template>
<script type="text/ecmascript-6">
  import carnumber from '../../components/carnumber/carnumber';
  import BScroll from 'better-scroll';
  export default {
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectedFoods: {
        type: Array,
        default () {
          return []; // 在vue中,父组件传入给子组件的属性如果类型为array或者object,默认值用函数表示。
        }
      }
    },
    data () {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        fade: true
      };
    },
    computed: {
      totalPrice () {
        let price = 0;
        this.selectedFoods.forEach(function (food) {
          price += food.price * food.num;
        });
        return price;
      },
      totalCount () {
        let count = 0;
        this.selectedFoods.forEach(function (food) {
          count += food.num;
        });
        return count;
      },
      payStatus () {
        if (this.totalPrice <= 0) {
          return `￥${this.minPrice}起送`;
        } else if (this.totalPrice < this.minPrice) {
          return `还差￥${this.minPrice - this.totalPrice}起送`;
        } else {
          return '去结算';
        }
      },
      listShow () {
        let show = false;
        if (!this.totalCount) {
          this.fade = true; // fade=true表示列表折叠
          return show;
        }
        show = !this.fade;
        // 使用this.$nextTick确保dom视图更新后再初始化BScroll,否则容易计算错高度。
        this.$nextTick(() => {
          if (!this.contentWrapper) {
            this.contentWrapper = new BScroll(this.$els.contentWrapper, {
              probeType: 3,
              click: true
            });
          } else {
            this.contentWrapper.refresh();
          }
        });
        return show;
      }
    },
    methods: {
      drop (target) {
        let balls = this.balls;
        for (let i = 0; i < balls.length; i++) {
          let ball = balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = target;
            this.dropBalls.push(ball); // 每点击一次只放入一个小球进dropBalls数组中
            return;
          }
        }
      },
      toggleCart () {
        if (!this.totalCount) {
          return;
        }
        this.fade = !this.fade;
      },
      pay () {
        window.alert(`您共需支付${this.totalPrice}元, 谢谢支持!`);
      },
      hideList () {
        this.fade = true;
      },
      reset () {
        // 清空购物车只需要将所有的food的num设置为0就可以。
        this.selectedFoods.forEach(function (food) {
          food.num = 0;
        });
      }
    },
    transitions: {
      drop: {
        beforeEnter (el) {
          let count = this.balls.length;
          while (count--) {
            let ball = this.balls[count];
            if (ball.show) {
              let rect = ball.el.getBoundingClientRect();
              let x = rect.left - 40;
              let y = -(window.innerHeight - rect.top - 22);
              el.style.display = '';
              el.style.webkitTransform = `translate3d(0,${y}px,0)`;
              el.style.transform = `translate3d(0,${y}px,0)`;
              let inner = el.getElementsByClassName('inner-hook')[0];
              inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
              inner.style.transform = `translate3d(${x}px,0,0)`;
            }
          }
        },
        enter (el) {
          /* eslint-disable no-unused-vars */
          let rf = el.offsetHeight;
          this.$nextTick(() => {
            el.style.webkitTransform = 'translate3d(0,0,0)';
            el.style.transform = 'translate3d(0,0,0)';
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(0,0,0)';
            inner.style.transform = 'translate3d(0,0,0)';
          });
        },
        afterEnter (el) {
          let ball = this.dropBalls.shift();
          if (ball) {
            ball.show = false;
            el.style.display = 'none';
          }
        }
      }
    },
    components: {
      carnumber
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .shopcart
    overflow: hidden
    .shopcart-wrapper
      .shopcart-bottom
        display: flex
        position: fixed
        bottom: 0
        left: 0
        width: 100%
        height: 47px
        background-color: #141d27
        z-index: 20
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
              &.highlight
                background-color: rgb(0, 160, 220)
                color: #fff
              .icon-shopping_cart
                position: absolute
                top: 50%
                left: 50%
                margin-top: -12px
                margin-left: -12px
                font-size: 24px
                color: rgb(255, 255, 255, 0.4)
                line-height: 24px
            .count
              display: inline-block
              position: absolute
              top: 2px
              left: 36px
              width: 24px
              height: 16px
              line-height: 16px
              text-align: center
              font-size: 9px
              font-weight: 700
              color: rgb(255, 255, 255)
              background: red
              border-radius: 12px
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
              z-index: 99
          .price
            display: inline-block
            margin-top: 5.5px
            padding: 11px 0 12px 18px
            vertical-align: top
            color: #919396
            &.highlight
              color: #fff
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
          color: rgba(255, 255, 255, 0.4)
          background: #2b333b
          &.highlight
            background-color: #00b43c
        .ball-wrapper
          .ball
            display: inline-block
            position: fixed
            left: 40px
            bottom: 22px
            z-index: 500
            &.drop-transition
              transition: all 0.4s cubic-bezier(.74,-0.58,.74,.55)
              .inner
                width: 16px
                height: 16px
                border-radius: 50%
                background: rgb(0, 160, 220)
                transition: all 0.4s linear
      .shopcart-list
        position: fixed 
        left: 0
        bottom: 0 
        width: 100%
        max-height: 305.5px
        padding-bottom: 47px
        z-index: 10
        box-sizing: border-box
        &.slide-transition
          transition: all 0.6s linear 
          transform: translate3d(0, 0, 0)
        &.slide-enter, &.slide-leave
          transform: translate3d(0, 100%, 0)
        .list-header  
          position: relative
          width: 100%
          height: 40px  
          padding: 0 18px 
          background: #f3f5f7
          box-sizing: border-box
          .title
            display: inline-block
            height: 40px
            font-size: 200 14px
            color: rgb(7, 17, 27)
            line-height: 40px
          .reset
            display: inline-block
            position: absolute 
            right: 18px
            height: 40px
            font-size: 12px
            color: rgb(0, 160, 220)
            line-height: 40px
        .content-wrapper
          max-height: 218.5px
          overflow: hidden
          background: #fff
          .list-content
            width: 100%
            padding: 0 18px
            box-sizing: border-box
            .list-item 
              position: relative
              height: 48px
              border-1px(rgba(7, 17, 27, 0.1))
              .name
                display: inline-block
                height: 48px
                font: 14px 
                color: rgb(7, 17, 27)
                line-height: 48px
              .price
                display: inline-block
                position: absolute 
                right: 72px
                height: 48px
                margin: 0 12px 0 18px
                line-height: 48px
                color: rgb(240, 20, 20)
                font: 700 14px
              .wrapper
                display: inline-block
                position: absolute 
                right: 0
                margin: 12px 0  
    .shopcart-mask
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 1
      background: rgba(7, 17, 27, 0.6)
      filter: blur(10px)
      transform: scale(1.2);
      &.fade-transition
        transition: all 0.5s linear
        opacity: 1
      &.fade-enter, &.fade-leave
        opacity: 0
</style>
