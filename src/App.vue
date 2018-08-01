<template>
  <div>
    <v-header :seller="seller"></v-header>
    <v-tab ></v-tab>
    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header/header';
  import tab from './components/tab/tab';
  const ERR_OK = 0;
  export default {
    data () {
      return {
        seller: {}
      };
    },
    created () {
      this.$http.get('/api/seller').then(res => {
        let response = res.body;
        if (response.errno === ERR_OK) {
          this.seller = response.data;
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
