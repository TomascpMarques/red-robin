export function login(usr, psswd) {
  var action = "action:\n\t\"Login\":\n\t\t\"" + usr + "\",\n\t\t\"" + psswd + "\",";
  var url = "http://localhost:8081/auth";

  fetch(url, {
    method: "post",
    mode: "cors",
    body: action,
    headers: { "content-type": "text/plain" }
  }).then((response) => {
    console.log(response.json());
  });
  return true;
};
