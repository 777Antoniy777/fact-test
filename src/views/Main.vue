<template>
  <main class="main">
    <div class="site-wrapper">
      <!-- Loader -->
      <Loader v-if="isLoading" />

      <!-- Error message -->
      <Error v-if="status === 404" />

      <!-- Time loading -->
      <p class="main__time" v-if="data.length">Время загрузки: {{ time }} с</p>

      <!-- <pre v-if="data.length">{{ data }}</pre> -->
      <div class="main__inner-wrapper" v-if="data.length">
        <Data :data="data" :getState="getState" />
        <Steps />
      </div>
    </div>
  </main>
</template>

<script>
import createAPI from "@/api";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";
import Data from "@/components/Data.vue";
import Steps from "@/components/Steps.vue";

const api = createAPI();

export default {
  name: "Main",
  components: {
    Loader,
    Error,
    Data,
    Steps
  },
  data() {
    return {
      data: [],
      status: null,
      isLoading: true,
      time: Date.now(),
      prevStates: []
    };
  },
  mounted() {
    setTimeout(() => {
      api
        .get()
        .then(response => {
          let result = [];
          let data = response.data.testArr;

          this.flatArr(data, result);
          result = this.filterArr(result);

          this.data = result;
          this.status = response.status;
          this.isLoading = false;
          this.time = ((Date.now() - this.time) / 1000).toFixed(1);
        })
        .catch(error => {
          this.status = 404;
          this.isLoading = false;

          throw new Error(error);
        });
    }, 1500);
  },
  methods: {
    getState(state) {
      const obj = {};

      for (let key in state) {
        const value = state[key];

        if (typeof value === "object") {
          const arr = [...value];

          // for (let i = 0; i < value.length; i++) {
          //   arr.push(value[i]);
          // }
        }
      }

      this.prevStates.push(obj);
    },
    flatArr(data, result) {
      const toString = Object.prototype.toString;

      for (let i = 0; i < data.length; i++) {
        const elem = data[i];
        const type = toString.call(elem);

        if (type === "[object Array]") {
          this.flatArr(elem, result);
        } else {
          result.push(elem);
        }
      }
    },
    filterArr(data) {
      const map = new Map();
      const result = [];
      const toString = Object.prototype.toString;

      for (let i = 0; i < data.length; i++) {
        const elem = data[i];
        const type = toString.call(elem);
        let simpleNameOfType = type.split(" ")[1].toLowerCase();
        simpleNameOfType = simpleNameOfType.slice(
          0,
          simpleNameOfType.length - 1
        );

        if (simpleNameOfType !== "null" && simpleNameOfType !== "underfined") {
          switch (simpleNameOfType) {
            case "object":
              if (Object.keys(elem).length) {
                this.fillMap(map, simpleNameOfType, elem);
              }
              break;

            case "string":
              if (elem.trim().length) {
                this.fillMap(map, simpleNameOfType, elem);
              }
              break;

            default:
              this.fillMap(map, simpleNameOfType, elem);
              break;
          }
        }
      }

      for (let value of map.values()) {
        result.push(value);
      }

      return result;
    },
    fillMap(map, type, elem) {
      if (map.get(type)) {
        const array = map.get(type);
        map.set(type, [...array, elem]);
      } else {
        map.set(type, [elem]);
      }
    }
  }
};
</script>

<style lang="scss">
.main {
  &__time {
    font-weight: 700;
  }

  &__inner-wrapper {
    // display: flex;
  }
}
</style>
