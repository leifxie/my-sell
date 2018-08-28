<template>
  <div class="rating-select">
    <div class="rating-top border-1px">
      <span class="all" :class="{'active': selectType === 0}" @click.stop="chooseType(0)">{{desc.all}}<span class="num">{{ratings.length}}</span></span>
      <span class="positive" :class="{'active': selectType === 1}" @click.stop="chooseType(1)">{{desc.positive}}<span class="num">{{positive.length}}</span></span>
      <span class="negative" :class="{'active': selectType === 2}" @click.stop="chooseType(2)">{{desc.negative}}<span class="num">{{negative.length}}</span></span>
    </div>
    <div class="switch">
      <span class="icon-check_circle" :class="{'on': onlyContent}" @click.stop="choose"></span>
      <span class="desc" >只看有内容的评价</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const ALL = 0;
  export default {
    props: {
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      ratings: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    computed: {
      positive () {
        return this.ratings.filter((item) => {
          return item.rateType === 0;
        });
      },
      negative () {
        return this.ratings.filter((item) => {
          return item.rateType !== 0;
        });
      }
    },
    methods: {
      choose () {
        this.onlyContent = !this.onlyContent;
        // 通知父组件子组件的属性发生变化
        this.$dispatch('ratingselect_onlyContent', this.onlyContent);
      },
      chooseType (type) {
        this.selectType = type;
        this.$dispatch(('ratingselect_selectType'), type);
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
  .rating-select
    width: 100%
    padding: 18px
    box-sizing: border-box
    .rating-top
      height: 60px
      font-size: 0
      &.border-1px
        border-1px(rgba(7, 17, 27, 0.1))
      .all
        display: inline-block
        width: 50px
        height: 28px
        padding: 8px 12px
        margin-right: 8px
        text-align: center
        color: rgb(77, 85, 93)
        background: rgba(0, 160, 220, 0.2)
        border-radius: 2px
        font-size: 12px
        line-height: 28px
        &.active
          background: rgb(0, 160, 220)
          color: rgb(255, 255, 255)
        .num
          display: inline-block
          margin-left: 4px
          font-size: 8px
      .positive
        display: inline-block
        width: 50px
        height: 28px
        padding: 8px 12px
        margin-right: 8px
        text-align: center
        color: rgb(77, 85, 93)
        background: rgba(0, 160, 220, 0.2)
        border-radius: 2px
        font-size: 12px
        line-height: 28px
        &.active
          background: rgb(0, 160, 220)
          color: rgb(255, 255, 255)
        .num
          display: inline-block
          margin-left: 4px
          font-size: 8px
      .negative
        display: inline-block
        width: 50px
        height: 28px
        padding: 8px 12px
        margin-right: 8px
        text-align: center
        color: rgb(77, 85, 93)
        background: rgba(77, 85, 93, 0.2)
        border-radius: 2px
        font-size: 12px
        line-height: 28px
        &.active
          background: rgb(77, 85, 93)
          color: rgb(255, 255, 255)
        .num
          display: inline-block
          margin-left: 4px
          font-size: 8px
    .switch
      margin: 12px 0
      color: rgb(147, 153, 159)
      .icon-check_circle
        display: inline-block
        margin-left: 4px
        width: 24px
        height: 24px
        font-size: 24px
        &.on
          color: #00c850
      .desc
        display: inline-block
        height: 24px
        line-height: 24px
        vertical-align: top
</style>
