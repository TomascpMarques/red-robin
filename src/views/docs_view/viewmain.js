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
