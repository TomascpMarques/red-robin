import store from "../../store/index.js";
import message from "../../components/message_popup.vue";
import repo from "../../components/repo.vue";
import repoFiles from "../../components/repo_files.vue";
import newRepo from "../../components/new_repo.vue";
import delRepo from "../../components/apagar_repo.vue";

import * as api from "../../api/apiCalls.js";
import * as apiServices from "../../api/apiServices.js";

export default {
  name: "Documentação & Notas",
  store: store,
  components: {
    repoFiles,
    message,
    repo,
    newRepo,
    delRepo
  },
  data() {
    return {
      repos: Array,
      reposShowOBJ: {},
      disabledButton: true
    };
  },
  methods: {
    repoShowChange(repoNome) {
      this.reposShowOBJ[repoNome] = !this.reposShowOBJ[repoNome];
    },
    reload() {
      this.disabledButton = !this.disabledButton;
      this.getRepos();
      setTimeout(() => {
        this.disabledButton = !this.disabledButton;
      }, 5000);
    },
    repoFilesAnimationSetUp(repo) {
      repo.forEach((x) => {
        this.reposShowOBJ[x.nome] = false;
      });
    },
    setUpUsrRepos() {
      this.repos.forEach((repo) => {
        this.$store.commit("storeUrsRepos", repo);
      });
    },
    getRepos() {
      api.callEndPoint(apiServices.hosts.documentacao, {
        name: "BuscarUserRepos",
        params: [this.$store.state.usr_perfil.user, this.$store.state.usr_token.length > 1 ? this.$store.state.usr_token : "noToken"],
      }).then((obj) => {
        //  Resolve a promessa da api.callEndPoints e carrega a token para o vueX
        //  Assim evita criar cookies. Itera pelos valores recebidos, verifica que açõe tomar
        obj.BuscarUserRepos.forEach((result) => {
          console.log(result);
          //  Itera por todos as keys do objeto
          Object.keys(result).forEach((value) => {
            //  Se o número de repos encontrados for maior que 0 (encontrou algo)
            if (value.toString() === "encontrados" && result[value] <= 0) {
              console.log("-> ", value, result[value]);
            }
            // Atribui o valor dos repos encontrados a uma local variable
            if (value.toString() === "repos") {
              console.log(this.repos);
              this.repos = result[value];
              this.repoFilesAnimationSetUp(result[value]);
              this.$store.commit("storeUrsRepos", result[value]);
            }
          });
        });
      });
    }
  },
  created() {
    this.getRepos();
  },
};
