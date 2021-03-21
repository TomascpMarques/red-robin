import md5 from "crypto-js/md5";

// Converte valores para MD5
export function toMD5(valor) {
  return md5(valor).toString();
};
