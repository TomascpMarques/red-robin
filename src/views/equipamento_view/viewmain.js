import * as api from "../../api/apiCalls.js";
import * as apiServices from "../../api/apiServices.js";

import store from "../../store/index.js";

import inpCategorie from "../../components/inp_categorie.vue";
import itemsCategoria from "../../components/items_categoria.vue";

export default {
  name: "equipamento",
  components: {
    inpCategorie,
    itemsCategoria,
  },
  store: store,
  data() {
    return {
      items: [],
      itemsCategories: {},
    };
  },
  methods: {
    getAllRepos() {
      api.callEndPoint(apiServices.hosts.gestao, {
        name: "BuscarTodosOsRegistosBD",
        params: ["equipamento", this.$store.state.usr_token.length > 1 ? this.$store.state.usr_token : "noToken"],
      }).then((obj) => {
        console.log(obj.BuscarTodosOsRegistosBD);
        if (obj.BuscarTodosOsRegistosBD[0].registos.length > 0) {
          this.items = obj.BuscarTodosOsRegistosBD[0].registos;
          this.setUpCategories();
        }
        if (obj.BuscarTodosOsRegistosBD[0].erro !== null) {
          console.log(obj.BuscarTodosOsRegistosBD[0].erro);
        }
      });
    },
    setUpCategories() {
      this.itemsCategories = {};
      this.items.forEach(element => {
        try {
          // Adiciona outro item a uma categoria existente
          this.itemsCategories[element.meta.estado].push(element);
        } catch {
          // Adiciona uma nova categoria
          this.itemsCategories[element.meta.estado] = [];
          this.itemsCategories[element.meta.estado].push(element);
        }
      });
    }
  },
  created() {
    this.getAllRepos();
  },
};
