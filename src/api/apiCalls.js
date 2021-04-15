import * as helper from "./helperFuncs.js";
/**
 * @param {strin} url URL do serviço a usar i.e: localhos:8080 -> servicoequipamento
 * @param {object} functions Vetor com os objetos das funções a chamar
 * @returns Retorna uma promessa do request feito ao serviço especificado no url
 * @dependencies Depende do Dynamic Queires Go a qual a func faz a chamada, correr a v1.3.3
 */
export function callEndPoint(url, func) {
  return fetch(url, {
    method: "post",
    mode: "cors",
    body: helper.gerarAction(func),
    headers: { "content-type": "text/plain" }
  }).then((response) => {
    return response.json();
  }).then((obj) => {
    return obj;
  }).catch(console.error);
};
