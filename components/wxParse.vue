<template name="wxParse">
  <block v-for="(item, index) in wxParseData" :key="index">
    <template is="wxParse0" :data="item"></template>
  </block>
</template>