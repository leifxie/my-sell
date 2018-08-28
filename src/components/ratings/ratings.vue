<template>
  <div class="ratings" v-el:ratings-wrapper>
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <div class="desc">综合评分</div>
          <div class="rank-rate">高于周边商家{{rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="wrapper-top">
            <span class="service-desc">服务态度</span>
            <star :size="36" :score="seller.serviceScore" class="service-star"></star>
            <span class="service-score">{{seller.serviceScore}}</span>
          </div>
          <div class="wrapper-middle">
            <span class="score-desc">商品评分</span>
            <star :size="36" :score="seller.foodScore" class="score-star"></star>
            <span class="food-score">{{seller.foodScore}}</span>
          </div>
          <div class="wrapper-bottom">
            <span class="delivery-desc">送达时间</span>
            <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <div class="rating-wrapper">
        <ratingselect :select-type="selectType" :rate-type="onlyContent" :ratings="ratings"></ratingselect>
      </div>
      <div class="list-wrapper">
        <ul class="list-content">
          <li class="list-item" v-for="rating in ratings" v-show="onlyContentRatings(rating.rateType, rating.text)">
            <img alt="用户头像" :src="rating.avatar" width="28" height="28" class="user-avatar"/>
            <div class="info-wrapper">
              <div class="user-info"> 
                <span class="username">{{rating.name}}</span>
                <span class="time">{{rating.rateTime | format}}</span>
                <star class="star" :size="24" :score="rating.score"></star>
                <span class="delivery-time" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <div class="rating-text">
                {{rating.text}}
              </div>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span :class="{'icon-thumb_up': !rating.rateType, 'icon-thumb_down': rating.rateType}"></span>
                <span v-for="(key, item) in rating.recommend" class="recommend-item">
                  {{item}}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import split from '../../components/split/split';
  import ratingselect from '../../components/ratingselect/ratingselect';
  import BScroll from 'better-scroll';
  import {formatDate} from '../../common/js/common';
  import star from '../../components/star/star';
  const ERR_OK = 0;
  const ALL = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        selectType: ALL,
        onlyContent: false,
        ratings: []
      };
    },
    filters: {
      format (value) {
        let time = new Date(value);
        return formatDate(time, 'yyyy-MM-dd hh:mm');
      }
    },
    created () {
      // 重新初始化一遍，确保selectType和onlyContent的值正确。
      this.selectType = ALL;
      this.onlyContent = false;
      this.$http.get('/api/ratings').then(res => {
        let response = res.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            console.log(this.$els.ratingsWrapper);
            this.ratingsWrapper = new BScroll(this.$els.ratingsWrapper, {
              click: true
            });
          });
        }
      });
    },
    methods: {
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
      }
    },
    components: {
      split,
      ratingselect,
      star
    },
    events: {
      'ratingselect_onlyContent' (onlyContent) {
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          this.ratingsWrapper.refresh();
        });
      },
      'ratingselect_selectType' (type) {
        this.selectType = type;
        // 修改了selectType之后视图高度会发生变化，所以要重新刷新一次foodWrapper.
        this.$nextTick(() => {
          this.ratingsWrapper.refresh();
        });
      }
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
    overflow: hidden
    .ratings-content
      .overview
        display: flex
        margin: 18px 18px 18px 18px
        @media only screen and (max-width: 320px)
          margin: 18px 9px 18px 9px
        .overview-left
          flex: 0 0 121px
          padding: 6px 0
          border-right: 1px solid rgba(7, 17, 27, 0.2)
          @media only screen and (max-width: 320px)
            flex: 0 0 102px
          .score
            font-size: 24px
            color: rgb(255, 153, 0)
            line-height: 28px
            text-align: center
            margin-bottom: 6px
          .desc 
            font-size: 12px
            line-height: 12px
            color: rgb(7, 17, 27)
            margin-bottom: 8px
            text-align: center
          .rank-rate
            font-size: 10px
            line-height: 10px
            color: rgb(147, 153, 159)
            text-align: center
        .overview-right
          flex: 1
          margin-left: 24px
          padding: 6px 0
          @media only screen and (max-width: 320px)
            margin-left: 12px
          .wrapper-top
            font-size: 0
            margin-bottom: 8px
            .service-desc
              display: inline-block
              margin-right: 6px
              font-size: 12px
              line-height: 18px
              color: rgb(7, 17, 27)
            .service-star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .service-score
              display: inline-block
              font-size: 12px
              color: rgb(255, 153, 0)
              line-height: 18px
          .wrapper-middle
            font-size: 0
            margin-bottom: 8px
            .score-desc
              display: inline-block
              margin-right: 6px
              font-size: 12px
              line-height: 18px
              color: rgb(7, 17, 27)
            .score-star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .food-score
              display: inline-block
              font-size: 12px
              color: rgb(255, 153, 0)
              line-height: 18px
          .wrapper-bottom
            font-size: 0px
            .delivery-desc
              display: inline-block
              margin-right: 6px
              font-size: 12px
              color: rgb(7, 17, 27)
              line-height: 18px
            .delivery-time
              display: inline-block
              font-size: 12px
              color: rgb(147, 153, 159)
              line-height: 18px
      .list-wrapper
        position: relative
        display: flex
        padding: 18px 18px 0 18px
        border-top: 1px solid rgba(7, 17, 27, 0.2)
        .user-avatar
          flex: 0 0 28px
          margin-right: 12px
          vertical-align: top
          border-radius: 50%
        .info-wrapper
          position: relative
          left: 40px
          top: -28px
          margin-right: 40px
          flex: 1
          .user-info  
            font-size: 0
            .username
              display: inline-block
              font-size: 10px
              line-height: 12px
              color: rgb(7, 17, 27)
            .star
              display: inline-block
            .time
              position: absolute
              right: 0px
              top: 0px
              line-height: 16px
              color: rgb(147, 153, 159)
              font-size: 10px
              font-weight: 200
            .delivery-time
              display: inline-block
              font-size: 10px
              font-weight: 200
              line-height: 12px
              color: rgb(147, 153, 159)
          .rating-text  
            display: inline-block
            margin: 6px 0 8px 0
            font-size: 12px
            line-height: 18px
            color: rgb(7, 17, 27)
          .recommend
            font-size: 0
            .icon-thumb_up
              display: inline-block
              margin-right: 8px
              vertical-align: top
              font-size: 12px
              line-height: 16px
              color: rgb(0, 160, 220)
            .icon-thumb_down
              display: inline-block
              margin-right: 8px
              vertical-align: top
              font-size: 12px
              line-height: 16px
              color: rgb(183, 187, 191)
            .recommend-item
              display: inline-block
              margin: 0px 8px 8px 0
              padding: 0 6px
              height: 16px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 2px
              font-size: 9px
              line-height: 16px
</style>
