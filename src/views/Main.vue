<template>
  <main class="main">
    <!-- Loader -->
    <Loader v-if="isLoading" />

    <!-- Error message -->
    <Error v-if="status === 404" />

    <!-- Time loading -->
    <p class="main__time" v-if="data.length">Время загрузки: {{ time }} с</p>

    <pre v-if="data.length">{{ data }}</pre>
  </main>
</template>

<script>
import createAPI from "@/api";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";

const api = createAPI();

export default {
  name: "Main",
  components: {
    Loader,
    Error
  },
  mounted() {
    setTimeout(() => {
      api
        .get()
        .then(response => {
          let data = response.data.testArr;
          console.log(data);
          data = this.flatArr(data);
          console.log(data);
          data = this.sortArr(data);

          this.data = data;
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
  data() {
    return {
      data: [],
      status: null,
      isLoading: true,
      time: Date.now()
    };
  },
  methods: {
    flatArr(arr) {
      const result = [];
      const toString = Object.prototype.toString;

      const func = function() {
        for (let i = 0; i < arr.length; i++) {
          const elem = arr[i];
          const type = toString.call(elem);

          if (type === "[object Array]") {
            // console.log(22);
            func(elem);
          } else {
            result.push(elem);
          }
        }
      };

      console.log(func);

      // for (let i = 0; i < arr.length; i++) {
      //   const elem = arr[i];
      //   const type = toString.call(elem);

      //   if (type === "[object Array]") {
      //     // console.log(22);
      //     this.flatArr(elem);
      //   } else {
      //     result.push(elem);
      //   }
      // }

      console.log(result);
      return result;
    },
    sortArr(arr) {
      const map = new Map();
      const result = [];
      const toString = Object.prototype.toString;

      for (let i = 0; i < arr.length; i++) {
        const elem = arr[i];
        const type = toString.call(elem);
        let simpleValueOfType = type.split(" ")[1].toLowerCase();
        simpleValueOfType = simpleValueOfType.slice(
          0,
          simpleValueOfType.length - 1
        );

        if (map.get(simpleValueOfType)) {
          const array = map.get(simpleValueOfType);
          map.set(simpleValueOfType, [...array, elem]);
        } else {
          map.set(simpleValueOfType, [elem]);
        }

        // if (
        //   ((simpleValueOfType === "object" && Object.keys(elem).length) ||
        //     (simpleValueOfType === "string" && elem.trim().length)) &&
        //   simpleValueOfType !== "null" &&
        //   simpleValueOfType !== "underfined"
        // ) {
        //   if (map.get(simpleValueOfType)) {
        //     const array = map.get(simpleValueOfType);
        //     map.set(simpleValueOfType, [...array, elem]);
        //   } else {
        //     map.set(simpleValueOfType, [elem]);
        //   }
        // }
      }

      for (let value of map.values()) {
        result.push(value);
      }

      // console.log(map);
      // console.log(result);
      return result;
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
