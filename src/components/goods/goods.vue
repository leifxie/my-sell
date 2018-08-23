<template>
  <div class="goods">
    <div class="menu-wrapper" v-el:menu-wrapper>
      <ul class="menu">
        <li v-for="item in goods" track-by="$index" class="menu-item" :class="{ scrollActive: scrollIndex === $index}"
        @click="showFoods($index)">
          <span class="text">
            <span v-if="item.type >= 0" :class="classMap[item.type]" class="icon"></span>
          {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" v-el:foods-wrapper>
      <ul>
        <li v-for="item in goods" class="foods-item food-item-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="foods" v-for="food in item.foods">
              <div class="icon-wrapper">
                <img :src="food.icon" class="icon" width="60" height="60"/>
              </div>
              <div class="content">
                <h1 class="content-title">{{food.name}}</h1>
                <div v-show="food.description" class="description">
                  {{food.description}}
                </div>
                <div class="rating">
                    <span class="counts">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price-wrapper">
                  <span class="price">￥{{food.price}}</span>
                  <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  <div class="carnumber">
                    <carnumber :food="food"></carnumber>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart v-ref:shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :selected-foods="selectedFoods"></shopcart>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../../components/shopcart/shopcart';
  import carnumber from '../../components/carnumber/carnumber';
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        scrollHeights: [],
        scrollY: 0,
        menuScroll: {},
        foodsScroll: {}
      };
    },
    computed: {
      scrollIndex () {
        let scrollHeights = this.scrollHeights;
        for (let i = 0; i < scrollHeights.length; i++) {
          let startHeight = scrollHeights[i];
          let endHeight = scrollHeights[i + 1];
          if (!endHeight || this.scrollY >= startHeight && this.scrollY < endHeight) {
            return i;
          }
        }
        return 0;
      },
      selectedFoods () {
        let selectedFoods = [];
        this.goods.forEach(function (good) {
          good.foods.forEach(function (food) {
            if (food.num) {
              selectedFoods.push(food);
            }
          });
        });
        return selectedFoods;
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      this.$http.get('/api/goods').then(res => {
        let response = res.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this.initScroll();
            this.calculateHeight();
          });
        }
      });
    },
    methods: {
      initScroll () {
        this.menuScroll = new BScroll(this.$els.menuWrapper, {
          probeType: 3,
          click: true
        });
        this.foodsScroll = new BScroll(this.$els.foodsWrapper, {
          probeType: 3,
          click: true
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      calculateHeight () {
        let height = 0;
        this.scrollHeights.push(height);
        let foodsList = this.$els.foodsWrapper.querySelectorAll('.food-item-hook');
        for (let i = 0; i < foodsList.length; i++) {
          height += foodsList[i].clientHeight;
          this.scrollHeights.push(height);
        }
      },
      showFoods (index) {
        let foodsList = this.$els.foodsWrapper.querySelectorAll('.food-item-hook');
        let $el = foodsList[index];
        this.foodsScroll.scrollToElement($el, 250);
      },
      _drop (target) {
        // 优化体验，异步执行动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      }
    },
    components: {
      shopcart,
      carnumber
    },
    events: {
      'cart_add' (target) {
        this._drop(target);
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background-color: #f3f5f7
      .menu
        .menu-item
          position: relative
          display: table
          width: 80px
          height: 54px
          font-weight: 200
          &.scrollActive
            margin-top: -1px
            z-index: 10
            font-weight: 700
            background-color: white
            border-none()
          &:after
            position: absolute
            bottom: 0
            left: 10px
            content: ""
            width: 70%
            border-top: 1px solid rgba(7, 17, 27, .1)
          .text
            display: table-cell
            line-height: 14px
            text-align: left
            vertical-align: middle
            padding: 0 12px
            font-size: 12px
            .icon
              display: inline-block
              width: 12px
              height: 12px
              margin-right: 1px
              vertical-align: top
              background-size: 12px 12px
              background-repeat: no-repeat
              &.decrease
                bg-img('decrease_3')
              &.discount
                bg-img('discount_3')
              &.guarantee
                bg-img('guarantee_3')
              &.invoice
                bg-img('invoice_3')
              &.special
                bg-img('special_3')
    .foods-wrapper
      flex: 1
      .foods-item
        width: 100%
        .title
          width: 100%
          height: 26px
          padding-left: 14px
          line-height: 26px
          font-size: 12px
          font-weight: 700
          color: rgb(147, 153, 159)
          background-color: #f3f5f7
          border-left:2px solid #d9dde1
        .foods
          display: flex
          margin: 18px 18px 0 18px
          padding-bottom: 18px
          border-1px(rgba(7, 17, 27, .1))
          &:last-child
            border-none()
          .icon-wrapper
            flex: 0 0 60px
            width: 60px
            height: 60px
          .content
            flex: 1
            margin-left: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
            .content-title
              margin-top: 2px
              line-height: 14px
              font-size: 14px
              color: rgb(7, 17, 27)
            .description
              line-height: 14px
              margin: 8px 0
            .rating
              margin: 8px 0 0 0
              .counts
                margin-right: 12px
            .price-wrapper
              font-weight: 700
              line-height: 24px
              .price
                font-size: 14px
                color: rgb(240, 20, 20)
              .oldPrice
                font-size: 10px
                text-decoration: line-through
              .carnumber
                display: inline-block
                float: right
</style>
