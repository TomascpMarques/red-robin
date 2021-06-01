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
      showColecoes: {}
    };
  },
  methods: {
    getAllRepos() {
      api.callEndPoint(apiServices.hosts.equipamento, {
        name: "BuscarTodosRegistosBD",
        params: [this.$store.state.usr_token.length > 1 ? this.$store.state.usr_token : "noToken"],
      }).then((obj) => {
        // console.log(obj.BuscarTodosRegistosBD);
        if (Object.keys(obj.BuscarTodosRegistosBD[0].registos).length > 0) {
          this.items = obj.BuscarTodosRegistosBD[0].registos;
          this.setUpCategories();
        }
        if (obj.BuscarTodosRegistosBD[0].erro !== null) {
          console.log(obj.BuscarTodosRegistosBD[0].erro);
        }
      });
    },
    setUpCategories() {
      this.itemsCategories = {};
      Object.keys(this.items).forEach(x => {
        this.itemsCategories[x] = {};
        this.showColecoes[x] = false;
        this.items[x].forEach(y => {
          try {
            // tenta adicionar o item à coleção e estado correto se existir
            this.itemsCategories[x][y.meta.estado].push(y);
          } catch {
            // Cria o estado do item. para se poder adicionar o mesmo
            this.itemsCategories[x][y.meta.estado] = [];
            this.itemsCategories[x][y.meta.estado].push(y);
          }
        });
      });
    }
  },
  created() {
    this.getAllRepos();
  },
};
