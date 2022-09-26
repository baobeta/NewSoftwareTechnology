<template>
  <div class="mx-3 my-auto font-sans">
    {{ nameButton }}
  </div>
</template>
<script>

export default {
  name: 'ButtonHeader',
  props: {
    nameButton: String,
  },
};
</script>
