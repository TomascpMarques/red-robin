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
      showcustom: false,
      disp: false,
      items: [],
      itemsCategories: {},
      itemsCategoriesCustom: {
        registos: {
          PC: [
            {
              estado: "EM USO",
              nome: "teste",
              quantidade: 0,
              tipo: "PC",
              wow: {
                que: "fixe"
              }
            },
            {
              estado: "EM USO",
              nome: "wwww",
              quantidade: 1,
              tipo: "PC",
              wwwww: {
                wwww: "wwww"
              }
            }
          ]
        }
      },
      showColecoes: {},
      showEditors: false,
      showEditorText: false,
      mss: "",
      queryInp: {
        colecao: "",
        data: {
          campos: {},
          extrair: [[]]
        },
      },
    };
  },
  methods: {
    initProcura() {
      this.mss = "";
      console.log(this.queryInp);
      this.apiGetQueryCustom();
      this.showcustom = !this.showcustom;
    },
    apiGetQueryCustom() {
      api.callEndPoint(apiServices.hosts.equipamento, {
        name: "QueryRegistoJSON",
        params: [this.queryInp.data, this.queryInp.colecao, this.$store.state.usr_token.length > 1 ? this.$store.state.usr_token : "noToken"],
      }).then((obj) => {
        if (Object.keys(obj.QueryRegistoJSON[0].registos).length > 0) {
          this.itemsCategoriesCustom = obj.QueryRegistoJSON[0];
          console.log(obj.QueryRegistoJSON[0].registos);
          this.mss = "Registo(s) encontrados!";
        } else {
          this.mss = "Nenhum registo encontrado...";
        }
      });
    },
    getColecao(cont) {
      this.queryInp.colecao = cont.cont.toString().toUpperCase();
    },
    getFiltro(cont) {
      const mainKey = Object.keys(cont.cont)[0];
      Object.keys(cont.cont[mainKey]).forEach(key => {
        if (["estado", "tipo", "quantidade"].indexOf(key) !== -1) {
          if (key === "quantidade") {
            this.queryInp.data.campos["meta." + key] = Number(cont.cont[mainKey][key]);
          } else {
            this.queryInp.data.campos["meta." + key] = (cont.cont[mainKey][key]).toUpperCase();
          }
        } else {
          this.queryInp.data.campos["body." + key] = cont.cont[mainKey][key];
        }
      });
    },
    dropProp(cont) {
      if (["estado", "tipo", "quantidade"].indexOf(cont.key.toString()) !== -1) {
        delete this.queryInp.data.campos["meta." + cont.key];
      } else {
        delete this.queryInp.data.campos["body." + cont.key];
      }
    },
    apagarFiltros(cont) {
      console.log(cont);
      this.queryInp.data.campos = {};
    },
    getCampos(cont) {
      var temp = cont.cont.map(x => x.trim()).map(x => x.split(/\s/gm));
      this.queryInp.data.extrair = temp;
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
