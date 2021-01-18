<template>
  <section class="steps">
    <h2 class="steps__title">История просмотров</h2>

    <ul class="steps__list">
      <li class="steps__item" v-for="(_, i) in steps" :key="i">
        <button type="button" @click="handleButtonClick(i)">
          Вернуться на шаг {{ i }}
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
    margin: 0;
    padding-bottom: 20px;
    font-size: 22px;
    line-height: 24px;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    margin-bottom: 10px;

    button {
      width: 150px;
      min-height: 40px;
      cursor: pointer;
    }
  }
}
</style>
