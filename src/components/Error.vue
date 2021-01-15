<template>
  <div class="error">
    <p>Произошла ошибка</p>
  </div>
</template>

<script>
export default {
  name: "Error"
};
</script>

<style lang="scss">
.error {
  display: flex;
  justify-content: center;
  align-content: center;
  max-width: 400px;
  min-height: 100px;
  width: 100%;
  margin: auto;
  padding: 10px;
  text-align: center;
  color: #ffffff;
  background-color: #e66060;
  border-radius: 15px;

  p {
    margin: auto;
  }
}
</style>
