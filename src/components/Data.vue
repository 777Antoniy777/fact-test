<template>
  <section class="data">
    <form class="data__form">
      <button type="reset">Сбросить</button>
    </form>

    <!-- Data -->
    <DataPresentation />
  </section>
</template>

<script>
import DataPresentation from "@/components/DataPresentation.vue";

export default {
  name: "Data",
  components: {
    DataPresentation
  },
  props: {
    data: Array
  },
  data() {
    return {
      choosenData: []
    };
  }
};
</script>

<style lang="scss" scoped>
.data {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  &__form {
    margin-right: 20px;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    margin: 0 auto;
    padding: 5px 10px;
    text-align: center;
    color: white;
    background-color: orange;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
