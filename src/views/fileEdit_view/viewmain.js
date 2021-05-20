import store from "../../store/index.js";

import contentBox from "../../components/content_box.vue";

export default {
  name: "Editar Ficheiro",
  store: store,
  components: {
    contentBox,
  },
  data() {
    return {
      repo: {},
      fileStruct: {},
      editorContent: Object,
      fileEscolhido: ""
    };
  },
  methods: {
    log(str, nome) {
      this.fileEscolhido = nome;
      this.editorContent = str;
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
    }
  },
  created() {
    console.log(this.$route.params);
    this.getRepoFromList();
    this.getRepoStrucFromPaths();
  }
};
