<template>
  <div class="food" v-show="isShow">
    <div class="food-image">
      <img :src="food.image" alt="食品头图" class="img"/>
    </div>
    <div class="description">
      <div class="name">{{food.name}}</div>
      <div class="desc">
        <span class="count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
      </div>
      <div class="wrapper">
        <span class="price">{{food.price}}</span>
        <div class="carnumber-wrapper" v-show=" food.num > 0">
          <carnumber :food="food"></carnumber>
        </div>
        <div class="addFood-wrapper" @click="_addFoodToCart" v-show="food.num === 0 && !food.num">
          <span class="addFood">加入购物车</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import carnumber from '../../components/carnumber/carnumber';
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        isShow: false
      };
    },
    methods: {
      show () {
        this.isShow = true;
      },
      _addFoodToCart () {
        if (!this.food.num) {
          Vue.set(this.food, 'num', 1);
        }
      }
    },
    components: {
      carnumber
    }
  };
</script>
<style lang="stylus">
  .food
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #fff
    z-index: 15
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
          font-size: 10px
          line-height: 10px
        .rating
          display: inline-block
          font-size: 10px
          line-height: 10px
</style>