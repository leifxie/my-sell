<template>
  <div class="shopcart">
    <div class="shopcart-left">
      <div class="icon-wrapper">
        <div class="icon-background" :class="{'highlight': totalCount > 0}">
          <span class="icon-shopping_cart"></span>
        </div>
        <div class="count" v-show="totalCount > 0">{{totalCount}}</div>
      </div>
      <div class="price" :class="{'highlight': totalPrice > 0}">￥{{totalPrice}}</div><div class="description">另需配送费￥{{deliveryPrice}}元</div>
      
    </div><div class="shopcart-right" :class="{'highlight': totalPrice >= minPrice}">{{payStatus}}</div>
    <div class="ball-container" v-for="ball in balls">
      <div class="ball" transition="ball-move" v-show="ball.show">
        <div class="inner inner-hook"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
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
        dropBalls: []
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
      }
    },
    transitions: {
      ballMove: {
        beforeEnter (el) {
          console.log(el);
          let count = this.balls.length;
          while (count--) {
            let ball = this.balls[count];
            if (ball.show) {
              let rect = ball.el.getBoundingClientRect();// 获取增加按钮相对于视口的位移。
              let x = rect.x - 40; // 水平距离
              let y = -(window.innerHeight - rect.y - 22);// y是负数，因为左上角的小球相对于静止小球的y值为负
              el.style.display = '';
              el.style.webkitTransform = `translate3d(0, ${y}px,0)`; // 外层控制纵向移动
              el.style.transform = `translate3d(0, ${y}px, 0)`;
              let inner = el.getElementsByClassName('inner-hook')[0]; // 取到小球的内层元素,内层控制横向移动
              inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
              inner.style.transform = `translate3d(${x}px, 0, 0)`;
            }
          }
        },
        enter (el) {
          // console.log(el);
          /* eslint-disable no-unused-vars */
          let rf = el.offsetHeight; // 手动触发重绘html
          el.style.webkitTransform = 'translate3d(0, 0, 0)';
          el.style.transform = 'translate3d(0, 0, 0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0, 0, 0)';
          inner.style.transform = 'translate3d(0, 0, 0)';
        },
        afterEnter (el) {
          // console.log(el);
          let ball = this.dropBalls.shift();
          if (ball) {
            ball.show = true;
            el.style.display = 'none';
          }
        }
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
      }
    }
  };
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
    .ball-container
      .ball
        position: fixed
        left: 40px
        bottom: 22px
        z-index: 999
        &.ball-move-transition
          transition: all 0.4s cubic-bezier(.84,-0.38,.93,.9)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
</style>
