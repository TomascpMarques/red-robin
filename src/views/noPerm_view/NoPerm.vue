<template>
  <div>
    <h1>
      Não tens permissões sufecientes para aceder a esta página. <br /><br />
      A redirecionar...
    </h1>
  </div>
</template>

<script>
import router from "../../router/index.js";
export default {
  name: "No Perms",
  created() {
    setTimeout(function () {
      router.push("/");
    }, 4000);
  },
};
</script>

<style scoped>
h1 {
  font-style: italic;
  text-align: center;
  color: #d8d8d8;
  letter-spacing: 2px;
  text-decoration: underline;
  margin-top: 10%;
}
</style>
