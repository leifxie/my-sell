<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <div class="desc">综合评分</div>
          <div class="rank-rate">高于周边商家{{rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="service-score">
            <span>服务态度</span>
            <star :size="36" :score="seller.serivceScore"></star>
          </div>
          <div class="food-score">
            <span>商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
          </div>
          <div class="delivery-time">
            <span>送达时间</span>
            <span>{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <div class="rating-wrapper">
        <ratingselect></ratingselect>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import split from '../../components/split/split';
  import ratingselect from '../../components/ratingselect/ratingselect';
  import star from '../../components/star/star';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      split,
      ratingselect,
      star
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .ratings
    position: fixed
    top: 174px
    bottom: 47px
    left: 0
    width: 100%
</style>
