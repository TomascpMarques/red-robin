import store from "../../store/index.js";

import * as api from "../../api/apiCalls.js";
import * as apiServices from "../../api/apiServices.js";
import * as helpers from "../../api/helperFuncs.js";

import contentBox from "../../components/content_box.vue";
import message from "../../components/message_popup.vue";

export default {
  name: "Editar Ficheiro",
  store: store,
  components: {
    contentBox,
    message,
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
      disabledButton: true
    };
  },
  methods: {
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
      console.log(path);
      this.fileEscolhido = nome;
      this.fileEscolhidoPath = path;
      this.editorContent = this.getFileContents(path);
    },
    getRepoFromList() {
      this.repo = this.$store.state.usr_repos.filter((x) => {
        return x.nome === this.$route.params.valor.split("/")[
          this.$route.params.valor.split("/").length - 1
        ];
      })[0];
    },
    getRepoStrucFromPaths() {
      this.repo.ficheiros.forEach(ficheiro => {
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
              if (!(result[value] === null)) {
                if (result[value].hash !== helpers.toSHA256(result[value].conteudo)) {
                  this.editorContent = "O conteudo chegou currompido";
                } else {
                  this.editorContent = result[value].conteudo;
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
    SetupFileWrite() {
      try {
        this.refreshToken();
      } finally {
        var file = {
          hash: helpers.toSHA256(this.editorContent),
          path: this.fileEscolhidoPath,
          nome: this.fileEscolhido,
          conteudo: this.editorContent
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
          //  Itera por todos as keys do objeto
          Object.keys(result).forEach((value) => {
            console.log(result[value]);
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
              this.loginSucesso(obj.Login[0].token);
              console.log("Sucesso");
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
      this.getRepos();
      this.disabledButton = !this.disabledButton;
      this.getRepos();
      setTimeout(() => {
        this.disabledButton = !this.disabledButton;
      }, 5000);
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
    }
  },
  created() {
    try {
      this.getRepoFromList();
    } finally {
      this.getRepoStrucFromPaths();
    }
  }
};
