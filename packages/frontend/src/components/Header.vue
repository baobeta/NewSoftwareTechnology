<template>
  <nav class="flex justify-between w-full h-12 drop-shadow-2xl ">
    <div class="flex-none w-12 h-12">
      <img
        class="w-10 h-10 ml-1 mt-1"
        src="https://fit.hcmute.edu.vn/Resources/Images/SubDomain/fit/logo-cntt2021.png"
        alt=""
      >
    </div>
    <div class="flex">
      <ButtonHeader name-button="Tin Tức" />
      <ButtonHeader name-button="Đào tạo" />
      <ButtonHeader name-button="Bộ môn" />
      <ButtonHeader name-button="Sinh viên" />
      <ButtonHeader name-button="Nghiên cứu" />
      <ButtonHeader name-button="Tư vấn" />
      <ButtonHeader name-button="TT-TIn học" />
      <ButtonHeader name-button="Giới thiệu" />
      <button class="mx-3 my-auto py-1 px-1 bg-blue-500 text-white rounded">
        Đăng nhập
      </button>
    </div>
  </nav>
</template>

<script>
import ButtonHeader from './ButtonHeader.vue';

export default {
  name: 'HeaderMain',
  components: {
    ButtonHeader,
},
  data () {
    return {
      showToolTip: false,
    };
  },
  methods: {
    mouseOver () {
      this.showToolTip = true;
    },
    mouseLeave () {
      this.showToolTip = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
