<template>
  <main class="main">
    <div class="site-wrapper">
      <!-- Loader -->
      <Loader v-if="isLoading" />

      <!-- Error message -->
      <Error v-if="status === 404" />

      <!-- Time loading -->
      <p class="main__time" v-if="data.length">Время загрузки: {{ time }} с</p>

      <div class="main__inner-wrapper" v-if="data.length">
        <Data
          :data="data"
          :getState="getState"
          :state="prevStates"
          :number="stateNumber"
        />
        <Steps :steps="prevStates" :handleButtonClick="handleButtonClick" />
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
      prevStates: [
        {
          selectValues: [null, null],
          listValues: []
        }
      ],
      stateNumber: 0
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
    handleButtonClick(index) {
      this.stateNumber = index;
    },
    getState(state) {
      const obj = {
        selectValues: [],
        listValues: []
      };
      const toString = Object.prototype.toString;

      for (let key in state) {
        const objectValue = state[key];
        const objectValueType = toString.call(objectValue);
        const isArray = "[object Array]";

        if (objectValueType === isArray) {
          for (let i = 0; i < objectValue.length; i++) {
            const elem = objectValue[i];

            if (elem && typeof elem === "object") {
              obj[key].push([...elem]);
            } else {
              obj[key].push(elem);
            }
          }
        }
      }

      this.prevStates.push(obj);
    },
    flatArr(data, result) {
      const toString = Object.prototype.toString;

      for (let i = 0; i < data.length; i++) {
        const elem = data[i];
        const type = toString.call(elem);
        const isArray = "[object Array]";

        if (type === isArray) {
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
}
</style>
