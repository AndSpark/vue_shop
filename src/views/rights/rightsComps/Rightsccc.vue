<template>
  <div>
    <slot name="header" :user="user">{{user.a}}</slot>
    <slot name="main" :user="user">{{user.b}}</slot>
    <slot name="footer" :user="user">{{user.c}}</slot>
    <button @click="$emit('update:asd',123456)">{{asd}}</button>
  </div>
</template>

<script>
export default {
  name: "Rightsccc",
  data() {
    return {
      user: {
        a: 123,
        b: 234,
        c: 345,
      },
    };
  },
  components: {},
  props: {
    asd: {
      default: "45641",
    },
  },
};
</script>

<style lang='scss' scoped>
</style>