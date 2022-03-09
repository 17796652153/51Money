<template>
  <view>
    <web-view :src="url"></web-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        url:'',
      }
    },
    onLoad(options) {
      console.log(options)
      if(options.id==1){
        console.log(1231)
        this.url='https://oa.zhigoukeji.com/h5/user/regdel'
      }else{
        this.url='https://oa.zhigoukeji.com/h5/user/yinsidel'
      }
    },
    methods: {
      
    }
  }
</script>

<style>

</style>
