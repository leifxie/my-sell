<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass, index) in itemClasses" :class="itemClass"
          class="star-item" :key="index"></span>
  </div>
</template>
<script type="text/ecmascript-6">
  const LENGTH = 5; // 定义星星总长度
  const CLASS_ON = 'on';
  const CLASS_HALF = 'half';
  const CLASS_OFF = 'off';
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star' + this.size;
      },
      itemClasses () {
        let itemClasses = [];// 定义最终要返回的itemClasses数组
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;// 判断是否有小数
        let interger = Math.floor(score);
        for (let i = 0; i < interger; i++) {
          itemClasses.push(CLASS_ON);
        }
        if (hasDecimal) {
          itemClasses.push(CLASS_HALF);
        }
        while (itemClasses.length < LENGTH) {
          itemClasses.push(CLASS_OFF);
        }
        return itemClasses;
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .star
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3.5px
        background-size: 10px 10px
        &.half
          bg-img('star24_half')
        &.on
          bg-img('star24_on')
        &.off
          bg-img('star24_off')
    &.star36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &.half
          bg-img('star36_half')
        &.on
          bg-img('star36_on')
        &.off
          bg-img('star36_off')
    &.star48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0px
        &.half
          bg-img('star48_half')
        &.on
          bg-img('star48_on')
        &.off
          bg-img('star48_off')
</style>
