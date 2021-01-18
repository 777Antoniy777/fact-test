<template>
  <section class="steps">
    <h2 class="steps__title">История просмотров</h2>

    <ul class="steps__list">
      <li class="steps__item" v-for="(_, i) in steps" :key="i">
        <button type="button" @click="handleButtonClick(i)">
          {{ i }} шаг назад
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "Steps",
  props: {
    steps: Array,
    handleButtonClick: Function
  }
};
</script>

<style lang="scss" scoped>
.steps {
  &__title {
    padding-bottom: 20px;
  }
}
</style>
