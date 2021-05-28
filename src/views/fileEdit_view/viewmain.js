import store from "../../store/index.js";
import router from "../../router/index.js";

import * as api from "../../api/apiCalls.js";
import * as apiServices from "../../api/apiServices.js";
import * as helpers from "../../api/helperFuncs.js";

import contentBox from "../../components/content_box.vue";
import message from "../../components/message_popup.vue";
import fileCreate from "../../components/file_create.vue";

export default {
  name: "Editar Ficheiro",
  store: store,
  components: {
    contentBox,
    message,
    fileCreate,
  },
  data() {
    return {
      repo: {},
      fileStruct: {},
      editorContent: Object,
      fileEscolhido: "",
      fileEscolhidoPath: "",
      show: false,
      log_tit: "",
      log_mss: "",
      log_tip: "",
      disabledButton: true,
      pop_up: false,
      apagar: false,
    };
  },
  methods: {
    setupApagarFicheiroMeta() {
      this.apagar = !this.apagar;
    },
    apagarMetaDataFile(nome, path) {
      var file = {
        nome: nome,
        autor: this.$store.state.usr_perfil.user,
        reponome: path[1],
        path: path,
      };
      console.log("=>", file);
      api.callEndPoint(apiServices.hosts.documentacao, {
        name: "ApagarFicheiroMetaData",
        params: [file, this.$store.state.usr_token.length > 1 ? this.$store.state.usr_token : "noToken"],
      }).then((obj) => {
        if (obj.ApagarFicheiroMetaData.sucesso === true) {
          this.loginSucesso("Ficheiro apagado com sucesso");
        }
        if (obj.ApagarFicheiroMetaData.erro !== null) {
          this.loginErro(obj.ApagarFicheiroMetaData.erro);
        }
      });
      this.$router.push({
        path: "/docs",
      });
    },
    lenLessThanTwo(path) {
      return path.split("/").slice(1).length < 2;
    },
    lenGreaterOrEqualThanTwo(path) {
      return path.split("/").slice(1).length >= 2;
    },
    setUpDirName(path) {
      return path.split("/").slice(1).join("/");
    },
    setUpFileNameFromPath(path) {
      return path.split("/").slice(1).join(" / ");
    },
    log(path, nome) {
      this.fileEscolhido = nome;
      this.fileEscolhidoPath = path;
      this.editorContent = this.getFileContents(path);
    },
    getRepoFromList() {
      // Se o autor do repo em questão for diferente do user
      // Muda a lista de repos a usar
      if (this.$route.params.usr !== this.$store.state.usr_perfil.user) {
        this.repo = this.$store.state.other_usr_repos.filter((x) => {
          return x.nome === this.$route.params.valor.split("/")[
            this.$route.params.valor.split("/").length - 1
          ];
        })[0];
        return true;
      } else {
        this.repo = this.$store.state.usr_repos.filter((x) => {
          return x.nome === this.$route.params.valor.split("/")[
            this.$route.params.valor.split("/").length - 1
          ];
        })[0];
        return true;
      }
    },
    getRepoStrucFromPaths() {
      try {
        this.repo.ficheiros.forEach((ficheiro) => {
          console.log("File erro here?: ", ficheiro);
          var tempFile = ficheiro;
          var ficheiroPathNoName = tempFile.path.splice(0, tempFile.path.length - 1).join("/");
          try {
            if (this.fileStruct[ficheiroPathNoName].length > 0) {
              // Verifica se o path já foi registado
            }
          } catch {
            // Apanha o erro se não existir o path e cria o mesmo
            this.fileStruct[ficheiroPathNoName] = [];
          };
          // Adiciona o nome de ficheiro ao array
          var filePathCombo = {
            nome: ficheiro.nome,
            path: (ficheiroPathNoName + "/" + ficheiro.nome).split("/")
          };
          this.fileStruct[ficheiroPathNoName].push(filePathCombo);
        });
      } catch {
        console.log("No files in repo");
      }
    },
    getFileContents(path) {
      var file = {
        path: path
      };
      api.callEndPoint(apiServices.hosts.documentacao, {
        name: "BuscarConteudoFicheiro",
        params: [file, this.$store.state.usr_token.length > 1 ? this.$store.state.usr_token : "noToken"],
      }).then((obj) => {
        //  Resolve a promessa da api.callEndPoints e carrega a token para o vueX
        //  Assim evita criar cookies. Itera pelos valores recebidos, verifica que açõe tomar
        obj.BuscarConteudoFicheiro.forEach((result) => {
          //  Itera por todos as keys do objeto
          Object.keys(result).forEach((value) => {
            if (value.toString() === "conteudo") {
              if (result[value] !== null) {
                if (result[value].hash !== helpers.toSHA256(result[value].conteudo)) {
                  this.editorContent = "O conteudo chegou currompido. Repe-te o pedido";
                } else {
                  try {
                    this.editorContent = result[value].conteudo.replace(/%20/gm, "\n")
                      .replace(/%21/gm, "\\").replace(/%22/gm, "\"");
                  } catch {
                    console.log("Sêm conteudo");
                  }
                }
              }
            }
          });
        });
      });
    },
    loginErro(errMss) {
      this.log_tit = "Ficheiros";
      this.log_mss = errMss;
      this.show = true;
      this.log_tip = "bad";
    },
    loginSucesso(token) {
      this.$store.commit("storeJWToken", token);
      this.log_tit = "Ficheiros";
      this.log_mss =
        "O ficheiro foi atualizado";
      this.show = true;
      this.log_tip = "good";
    },
    fileWriteSucesso(mss) {
      this.log_tit = "Ficheiros";
      this.log_mss = mss;
      this.show = true;
      this.log_tip = "good";
    },
    SetupFileWrite() {
      try {
        this.refreshToken();
      } finally {
        var tempContent = this.editorContent.replace(/\n/gm, "%20")
          .replace(/\\/gm, "%21").replace(/"/gm, "%22");
        var file = {
          hash: helpers.toSHA256(tempContent),
          path: this.fileEscolhidoPath,
          nome: this.fileEscolhido,
          conteudo: tempContent
        };
        console.log(file);
        this.escreverConteudoFile(file);
      };
    },
    escreverConteudoFile(file) {
      api.callEndPoint(apiServices.hosts.documentacao, {
        name: "InserirConteudoFicheiro",
        params: [file, this.$store.state.usr_token.length > 1 ? this.$store.state.usr_token : "noToken"],
      }).then((obj) => {
        //  Resolve a promessa da api.callEndPoints e carrega a token para o vueX
        //  Assim evita criar cookies. Itera pelos valores recebidos, verifica que açõe tomar
        obj.InserirConteudoFicheiro.forEach((result) => {
          console.log("-> ", result);
          //  Itera por todos as keys do objeto
          Object.keys(result).forEach((value) => {
            console.log("result[value] -<>", result[value]);
            console.log("value -<>", value);
            if (value.toString() === "erro") {
              this.loginErro(obj.InserirConteudoFicheiro[0].erro);
            } else if (value.toString() === "sucesso") {
              this.fileWriteSucesso("O ficheiro foi atualizado");
            }
          });
        });
      });
    },
    refreshToken() {
      console.log(this.$store.state.usr_creds);
      api.callEndPoint(apiServices.hosts.autenticacao, {
        name: "Login",
        params: [this.$store.state.usr_creds.user, this.$store.state.usr_creds.pass],
      }).then((obj) => {
        //  Resolve a promessa da api.callEndPoints e carrega a token para o vueX
        //  Assim evita criar cookies. Itera pelos valores recebidos, verifica que açõe tomar
        obj.Login.forEach((x) => {
          //  Itera por todos as keys do objeto
          Object.keys(x).forEach((y) => {
            //  Se foi devolvida uma token
            if (y.toString() === "token") {
              console.log("Sucesso");
              this.$store.commit("storeJWToken", x[y]);
            } else {
              this.loginErro(obj.Login[0].erro);
            }
          });
        });
      }).catch((error) => {
        this.loginErro("Erro ao fazer login, o servidor pode estar em baixo");
        return error;
      });
    },
    reload() {
      router.push({
        path: "/docs",
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
              this.$store.commit("storeUrsRepos", result[value]);
            }
          });
        });
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
  },
  created() {
    try {
      this.getAllRepos();
    } finally {
      try {
        this.getRepoFromList();
      } finally {
        this.getRepoStrucFromPaths();
      }
    }
  }
};
