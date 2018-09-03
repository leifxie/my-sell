<template>
  <transition name="fade">
    <div class="food" v-show="isShow" ref="food">
      <div food-content>
        <div class="food-image">
          <img :src="food.image" alt="食品头图" class="img"/>
        </div>
        <span class="icon-arrow_lift" @click.stop="back()"></span>
        <div class="description">
          <div class="name">{{food.name}}</div>
          <div class="desc">
            <span class="count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="wrapper">
            <span class="price">￥{{food.price}}</span>
            <span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            <div class="carnumber-wrapper" v-show=" food.num > 0">
              <carnumber :food="food" @add="_add"></carnumber>
            </div>
            <transition name="disappear">
              <div class="add-food-wrapper" @click="_addFoodToCart" v-show="food.num === 0 || !food.num">
                <span class="add-food">加入购物车</span>
              </div>
            </transition>
          </div>
        </div>
        <split v-show="food.info"></split>
        <div class="food-info" v-show="food.info">
          <h1>商品介绍</h1>
          <div class="info">
            {{food.info}}
          </div>
        </div>
        <split></split>
        <div class="food-desc">
          <h1 class="food-comment">商品评价</h1>
          <div class="ratingselect-wrapper">
            <ratingselect @onlyContent="changeOnlyContent" @selectType="changeSelectType" :desc="desc" :select-type="selectType" :rate-type="onlyContent" :ratings="food.ratings"></ratingselect>
          </div>
        </div>
        <div class="rating-wrapper" v-show="food.ratings && food.ratings.length > 0">
          <ul class="rating-content" >
            <li class="rating-item border-1px" v-show="onlyContentRatings(rating.rateType, rating.text)" v-for="(rating, index) in food.ratings" :key="index">
              <div class="user-info">
                <span class="time">{{rating.rateTime | format}}</span><span class="username">{{rating.username}}</span><img class="avatar" width="12" height="12" :src="rating.avatar"/>
              </div>
              <div class="rating-info">
                <span class="icon-thumb_up" v-show="rating.rateType === 0"></span>
                <span class="icon-thumb_down" v-show="rating.rateType !== 0"></span>
                <span class="rating">{{rating.text}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="no-rating" v-show="!food.ratings || food.ratings.length === 0">暂无评价</div>
      </div>
    </div>
  </transition>
</template>
<script>
  import BScroll from 'better-scroll';
  import carnumber from '../../components/carnumber/carnumber';
  import ratingselect from '../../components/ratingselect/ratingselect';
  import {formatDate} from '../../common/js/common';
  import split from '../../components/split/split';
  import Vue from 'vue';
  const ALL = 0;
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        isShow: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        },
        selectType: ALL,
        onlyContent: false
      };
    },
    filters: {
      format (value) {
        let time = new Date(value);
        return formatDate(time, 'yyyy-MM-dd hh:mm');
      }
    },
    methods: {
      show () {
        this.isShow = true;
        this.selectType = ALL;
        this.onlyContent = false;
        // 确保在dom视图更新完毕后初始化BScroll.
        this.$nextTick(() => {
          if (!this.foodWrapper) {
            this.foodWrapper = new BScroll(this.$refs.food, {
              probeType: 3,
              click: true
            });
          } else {
            this.foodWrapper.refresh();
          }
        });
      },
      _add (event) {
        this.$emit('add', event);
      },
      _addFoodToCart (event) {
        if (!this.food.num) {
          Vue.set(this.food, 'num', 1);
        }
        this.$emit('add', event.target);
      },
      back () {
        this.isShow = false;
      },
      onlyContentRatings (type, text) {
        // rateType和text
        if (this.selectType === 0) { // 选择了全部的时候
          // 看的时候最好将三元运算符拆成if语句来理解逻辑，不然不太好理解，这是优化后的代码
          return this.onlyContent ? (text ? 1 : 0) : 1;
        } else if (this.selectType === 1) { // 选择了推荐的时候
          return this.onlyContent ? ((!type && text) ? 1 : 0) : ((!type) ? 1 : 0);
        } else if (this.selectType === 2) { // 选择了吐槽的时候
          return this.onlyContent ? ((type && text) ? 1 : 0) : (type ? 1 : 0);
        }
      },
      changeOnlyContent (onlyContent) {
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          this.ratingsWrapper.refresh();
        });
      },
      changeSelectType (type) {
        this.selectType = type;
        // 修改了selectType之后视图高度会发生变化，所以要重新刷新一次foodWrapper.
        this.$nextTick(() => {
          this.ratingsWrapper.refresh();
        });
      }
    },
    components: {
      carnumber,
      split,
      ratingselect
    }
  };
</script>
<style lang="stylus">
  .food
    position: fixed
    top: 0
    left: 0
    bottom: 47px
    width: 100%
    background: #fff
    z-index: 5
    &.fade-enter-active, &.fade-leave-active
      transform: translate3d(0, 0, 0)
      transition: all 0.3s linear
    &.fade-enter, &.fade-leave-active
      transform: translate3d(100%, 0, 0)
    .food-image
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      .img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
    .icon-arrow_lift
      position: absolute
      top: 20px
      left: 12px
      font-size: 20px
      color: rgb(255, 255, 255)
      z-index: 50
      margin: 4px
    .description
      margin: 18px
      .name
        font: 700 14px
        line-height: 14px
        color: rgb(7, 17, 27)
      .desc
        margin: 8px 0 18px 0
        color: rgb(147, 153, 159)
        font-size: 0
        .count
          display: inline-block
          margin-right: 12px
          font-size: 10px
          line-height: 10px
        .rating
          display: inline-block
          font-size: 10px
          line-height: 10px
      .wrapper
        position: relative
        .price
          display: inline-block
          margin-right: 12px
          font: 700 14px
          color: rgb(240, 20, 20)
          line-height: 24px
        .old-price
          display: inline-block
          font-size: 20px
          color: rgb(147, 153, 159)
          line-height: 24px
          text-decoration: line-through
        .carnumber-wrapper
          position: absolute
          right: 0
          top: 0
        .add-food-wrapper
          position: absolute
          right: 0
          top: 0
          &.disappear-enter-active, &.&.disappear-leave-active
            transition: all 0.5s
            opacity: 0
          &.disappear-enter, &.disppear-leave-active
            opacity: 1
          .add-food
            display: inline-block
            width: 74px
            height: 16px
            padding: 6px 12px
            font-size: 10px
            color: rgb(255, 255, 255)
            line-height: 16px
            text-align: center
            background: rgb(0, 160, 220)
            border-radius: 24px
    .food-info
       width: 100%
       padding: 18px
       box-sizing: border-box
       .info
          margin: 6px 8px 0 8px
          font-size: 12px
          font-weight: 200
          color: rgb(77, 85, 93)
          line-height: 24px
          text-align: left
    .food-desc
      .food-comment
        margin: 18px 18px 0 18px
    .rating-wrapper
      padding: 16px 18px 0 18px
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      .rating-item
        padding-bottom: 16px
        &.border-1px
          border-1px(rgba(7, 17, 27, 0.1))
        .user-info
          position: relative
          margin-bottom: 6px
          color: rgb(147, 153, 159)
          font-size: 0
          line-height: 12px
          .time
            display: inline-block
            font-size: 10px
          .username
            position: absolute
            right: 18px
            top: 0
            font-size: 10px
          .avatar
            position: absolute
            right: 0
            top: 0
        .rating-info
          font-size: 0
          .icon-thumb_down
            margin-right: 4px
            font-size: 12px
            color: rgb(147, 153, 159)
            line-height: 24px
          .icon-thumb_up
            margin-right: 4px
            font-size: 12px
            color: rgb(147, 153, 159)
            line-height: 24px
          .rating
            display: inline-block
            height: 24px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 24px
    .no-rating
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      padding: 18px
</style>
