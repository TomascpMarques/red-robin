import message from "../../components/message_popup.vue";
import repo from "../../components/repo.vue";
import repoFiles from "../../components/repo_files.vue";
import newRepo from "../../components/new_repo.vue";
import delRepo from "../../components/apagar_repo.vue";

import * as api from "../../api/apiCalls.js";
import * as apiServices from "../../api/apiServices.js";

import store from "../../store/index.js";
import router from "../../router/index.js";

export default {
  name: "Documentação & Notas",
  store: store,
  router: router,
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
      this.initRepoFetch();
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
        if (obj.BuscarUserRepos[0].repos !== null) {
          const temp = Array.from(obj.BuscarUserRepos[0].repos);
          this.$store.commit("storeUrsRepos", temp);
          this.repos = Array.from(temp);
          this.repos.push(...this.$store.state.other_usr_repos);
        }
        //  Resolve a promessa da api.callEndPoints e carrega a token para o vueX
        //  Assim evita criar cookies. Itera pelos valores recebidos, verifica que açõe tomar
        // obj.BuscarUserRepos.forEach((result) => {
        //   console.log(result);
        // //  Itera por todos as keys do objeto
        // Object.keys(result).forEach((value) => {
        //   //  Se o número de repos encontrados for maior que 0 (encontrou algo)
        //   if (value.toString() === "encontrados" && result[value] <= 0) {
        //     console.log("-> ", value, result[value]);
        //   }
        //   // Atribui o valor dos repos encontrados a uma local variable
        //   if (value.toString() === "repos") {
        //     var reps = result[value];
        //     console.log("Repos after docs create: ", this.$store.state.usr_repos, this.$store.state.other_usr_repos);
        //     this.repos = reps;
        //     this.repos.push(...(this.$store.state.other_usr_repos));
        //     this.repoFilesAnimationSetUp(this.repos);
        //     console.log("result[value] of get repos in docs: ", result[value]);
        //     this.$store.commit("storeUrsRepos", result[value]);
        //     console.log("Repos after docs setup files anim: ", this.$store.state.usr_repos, this.$store.state.other_usr_repos);
        //   }
        // });
        // });
      });
    },
    getAllRepos() {
      api.callEndPoint(apiServices.hosts.documentacao, {
        name: "BuscarTodosOsReposNotTokenUsr",
        params: [this.$store.state.usr_token.length > 1 ? this.$store.state.usr_token : "noToken"],
      }).then((obj) => {
        console.log(obj.BuscarTodosOsReposNotTokenUsr);
        if (obj.BuscarTodosOsReposNotTokenUsr[0].repos !== null) {
          this.$store.commit("storeOtherUrsRepos", obj.BuscarTodosOsReposNotTokenUsr[0].repos);
          console.log("Repos after login: ", this.$store.state.usr_repos, this.$store.state.other_usr_repos);
        }
        if (obj.BuscarTodosOsReposNotTokenUsr[0].erro !== null) {
          console.log(obj.BuscarTodosOsReposNotTokenUsr[0].erro);
        }
      });
    },
    initRepoFetch() {
      try {
        this.getAllRepos();
      } finally {
        this.getRepos();
      }
    }
  },
  created() {
    this.initRepoFetch();
  },
};
