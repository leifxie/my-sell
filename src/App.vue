<template>
  <div>
    <v-header :seller="seller"></v-header>
    <v-tab ></v-tab>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import header from './components/header/header';
  import tab from './components/tab/tab';
  import {urlParse} from 'common/js/common';
  const ERR_OK = 0;
  export default {
    data () {
      return {
        seller: {
          id: (() => {
            let urlParam = urlParse();
            return urlParam.id;
          })()
        }
      };
    },
    created () {
      this.$http.get('/api/seller?id=' + this.seller.id).then(res => {
        let response = res.body;
        if (response.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, response.data);
        };
      });
    },
    components: {
      'v-header': header,
      'v-tab': tab
    }
  };
</script>
<style>
</style>
