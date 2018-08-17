<template>
  <div class="carnumber">
    <span class="icon-add_circle" @click="incNum()"></span>
    <div class="foodNum" v-show="num >= 1" transition="slide-fade">
      <span class="inner icon-remove_circle_outline" @click="decNum()"></span>
      <span class="num">{{num}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        num: 0
      };
    },
    methods: {
      incNum () {
        this.num++;
      },
      decNum () {
        if (this.num <= 0) {
          this.num = 0;
        } else {
          this.num--;
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
    &.slide-fade-transition
      transition: all 0.5s linear
      opacity: 1
    &.slide-fade-enter, &.slide-fade-leave
      opacity: 0
      .inner
        transform: rotate(180deg)
    .inner
      transform: rotate(0)
      transition: all 0.5s linear
    .icon-remove_circle_outline
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