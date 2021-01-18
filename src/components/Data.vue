<template>
  <section class="data">
    <form class="data__form">
      <multiselect
        class="data__select"
        v-for="(array, i) in data"
        :key="i"
        v-model="selectValues[i]"
        :options="array"
        :multiple="true"
        :taggable="false"
        :searchable="false"
        :close-on-select="false"
        placeholder="Choose a value"
      >
        <template slot="selection" slot-scope="{ values, search, isOpen }"
          ><span
            class="multiselect__single"
            v-if="values.length &amp;&amp; !isOpen"
            >{{ values.length }} options selected</span
          ></template
        >
      </multiselect>

      <button
        type="reset"
        @click="
          selectValues = [null, null];
          listValues = [];
        "
      >
        Сбросить
      </button>
    </form>

    <!-- Data -->
    <DataList :values="listValues" />
  </section>
</template>

<script>
import Multiselect from "vue-multiselect";
import DataList from "@/components/DataList.vue";

export default {
  name: "Data",
  components: {
    Multiselect,
    DataList
  },
  props: {
    data: Array,
    getState: Function,
    state: Array,
    number: Number
  },
  data() {
    return {
      selectValues: this.state[this.number].selectValues,
      listValues: this.state[this.number].listValues
    };
  },
  beforeUpdate() {
    const result = [];

    this.flatValues(this.selectValues, result);
    this.listValues = result;
    this.getState(this.$data);
  },
  watch: {
    number() {
      this.selectValues = this.state[this.number].selectValues;
      this.listValues = this.state[this.number].listValues;
    }
  },
  methods: {
    flatValues(data, result) {
      const toString = Object.prototype.toString;

      for (let i = 0; i < data.length; i++) {
        const elem = data[i];
        const type = toString.call(elem);

        if (elem) {
          if (type === "[object Array]") {
            this.flatValues(elem, result);
          } else {
            result.push(elem);
          }
        }
      }
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
.data {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  &__form {
    margin-right: 20px;
  }

  &__select {
    width: 200px;
    height: 44px;
    margin-bottom: 20px;
    font-size: 14px;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    min-height: 36px;
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

// multiselect styles
.multiselect,
.multiselect__input,
.multiselect__single {
  font-size: 14px;
  line-height: 27px;
}

.multiselect__tags {
  height: 44px;
  padding-top: 8px;
  font-size: 14px;
}

.multiselect__input {
  padding: 0;

  &::placeholder {
    font-size: 14px;
  }
}

.multiselect__placeholder {
  display: inline;
}
</style>
