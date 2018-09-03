<template>
  <div class="carnumber">
    <span class="icon-add_circle" @click.stop="incNum"></span>
    <transition name="slide-fade">
      <div class="foodNum" v-show="food.num >= 1">
        <span class="inner icon-remove_circle_outline" @click.stop="decNum"></span>
        <span class="num">{{food.num}}</span>
      </div>
    </transition>
  </div>
</template>
<script>
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      incNum (event) {
        if (!this.food.num) {
          Vue.set(this.food, 'num', 1);
        } else {
          this.food.num++;
        }
        console.log(this.food.num);
        this.$emit('add', event.target); /* 通知父组件, 触发小球动画 */
      },
      decNum () {
        if (this.food.num <= 0) {
          this.food.num = 0;
        } else {
          this.food.num--;
        }
      }
    }
  };
</script>
<style lang="stylus">
  .foodNum
    display: inline-block
    height: 24px
    float: right
    font-size: 0
    color: rgb(147, 153, 159)
    &.slide-fade-enter-active, &.slide-fade-leave-active
      transform: translate3d(0, 0, 0)
      transition: all 0.5s linear
      opacity: 1
      .inner
        transform: rotate(180deg)
        transition: all 0.5s linear
    &.slide-fade-enter, &.slide-fade-leave-active
      transform: translate3d(24px, 0, 0)
      opacity: 0
      .inner
        transform: rotate(0deg)
    .icon-remove_circle_outline
      display: inline-block
      width: 24px
      height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
    .num
      display: inline-block
      position: relative
      top: -4px
      width: 24px
      height: 24px
      text-align: center
      line-height: 24px
      font-size: 16px
  .icon-add_circle
    float: right
    font-size: 24px
    color: rgb(0, 160, 220)
</style>
