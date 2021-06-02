import * as api from "../../api/apiCalls.js";
import * as apiServices from "../../api/apiServices.js";

import store from "../../store/index.js";

import inpCategorie from "../../components/inp_categorie.vue";
import itemsCategoria from "../../components/items_categoria.vue";
import delItemID from "../../components/del_reg_equip.vue";
import inpLista from "../../components/inp_val_list.vue";
import inpOBJ from "../../components/inp_val_obj.vue";
import inpSimples from "../../components/inp_val_simples.vue";

export default {
  name: "equipamento",
  components: {
    inpCategorie,
    itemsCategoria,
    delItemID,
    inpLista,
    inpSimples,
    inpOBJ,
  },
  store: store,
  data() {
    return {
      disp: false,
      items: [],
      itemsCategories: {},
      showColecoes: {},
      showEditors: false,
      showEditorText: false,
      queryInp: {
        colecao: "PC",
        campos: {
          "meta.tipo": "PC"
        },
        extrair: []
      },
      querytotext: "",
      // "{\"campos\": {\"meta.tipo\": \"PC\"}, \"extrair\": [[\"estado\", \"quantidade\"]]}"
    };
  },
  methods: {
    initProcura() {
      this.querytotext = this.formatText();
    },
    getColecao(cont) {
      this.queryInp.colecao = cont.cont;
      this.formatText();
    },
    getFiltro(cont) {
      this.queryInp.campos = cont.cont[Object.keys(cont.cont)[0]];
      this.formatText();
    },
    getCampos(cont) {
      this.queryInp.extrair = cont.cont.map(x => x.split(",").map(y => y.trim()).map(i => i.split(" ")));
      console.log(this.queryInp.extrair);
    },
    formatText() {
      return JSON.stringify(this.queryInp, null, 3);
    },
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
