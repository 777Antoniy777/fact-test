<template>
  <div class="data__list-wrapper">
    <ul class="data__list" v-if="values">
      <li class="data__item" v-for="value in values" :key="value">{{ value }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DataList",
  props: {
    values: Array
  }
};
</script>

<style lang="scss" scoped>
.data {
  &__list-wrapper {
    max-width: 300px;
    width: 100%;
    padding: 10px;
    background-color: #f3dfcd;
    border-radius: 15px;
    box-shadow: 0 3px 6px 0 #000000;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
