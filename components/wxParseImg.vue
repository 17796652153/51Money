<template name="wxParseImg">
  <image :class="item.classStr + ' wxParse-' + item.tag" :data-from="item.from" :data-src="item.attr.src" :data-idx="item.imgIndex" :src="item.attr.src" @load="wxParseImgLoad" @tap="wxParseImgTap" mode="widthFix"></image>
</template>