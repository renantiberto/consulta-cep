function createElementResultSuccess(value) {
  const result = document.querySelector("#result");
  result.innerHTML = "";

  if(!!value.cep) {
    for(const property in value) {
      result.insertAdjacentHTML(
        "beforeend",
        `<li>${property}: ${value[property]}</li>`
      );
    }
  } else {
    createElementResultError("CEP não encontrado!");
  }
};

function createElementResultError(value) {
  const result = document.querySelector("#result");
  result.innerHTML = "";
  result.insertAdjacentHTML(
    "beforeend",
    `<h2 style="color:#f00">${value}</h2>`
  );
}

function searchCep(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      createElementResultSuccess(result);
    })
    .catch((err) => {
      createElementResultError("Cep inválido!");
    });
}

const form = document.querySelector('form');
const inputCep = document.querySelector('#cep');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const cep = inputCep.value.replace(/\D/g, "");

  if(/^[0-9]{8}$/.test(cep)) {
    searchCep(cep);
  } else {
    createElementResultError("Cep inválido!");
  }
});