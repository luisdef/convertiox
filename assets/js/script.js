// Mudança de tema;
// Se dará pela presença ou não da classe 'dark';

const body = document.querySelector("body");

const changeThemeButton = document.getElementById("lamp");

function toggleTheme() {
  body.classList.toggle("dark");
  changeThemeButton.classList.toggle("dark");

  localStorage["bodyTheme"] = body.className;
  localStorage["buttonTheme"] = changeThemeButton.className;
}

if (localStorage["bodyTheme"] == "dark") {
  toggleTheme();
} else {
  localStorage["bodyTheme"] = body.className;

  localStorage["buttonTheme"] = changeThemeButton.className;
}

changeThemeButton.onclick = function () {
  toggleTheme();
};

// COOKIES;
function createCookie(cookieName, cookieValue, expirationDays) {
  const date = new Date();
  date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
  
  let expiresText = "expires=" + date.toUTCString();
  
  document.cookie = 
    cookieName + "=" + cookieValue + ";" + expiresText + ";path=/";
}

function getCookie() {
  let decodedCookie = decodeURIComponent(document.cookie);
  console.log(decodedCookie);
}

getCookie();

function insertNewHistory() {
}

// Exemplo da URL de conversão de moeda da Coin API:
// https://rest.coinapi.io/v1/exchangerate/ETH/BRL?apikey=????

const baseUrlCoinApi = "https://rest.coinapi.io";
const allImagesCoinApi = "/v1/assets/icons/18?apikey=";
let ldbw = '31C67320';
let xapl = '5F39';
let qwpo = '499A';
let lkgh = '87E3';
let wmzp = 'BEFCB3272316';
const lkpyunsmrrqpaalzzweci = `${ldbw}-${xapl}-${qwpo}-${lkgh}-${wmzp}`;

// Para fazer:
//      - Adicionar mais opções de conversão com a Free Currency API;
//      - Se uma API estiver caída ou entrar em time out, ter a opção de utilizar outra.
const freeCurrencyApiUrl = "https://free.currconv.com/";

// As moedas suportadas (por agora) estão armazenadas em support.json;
fetch("./assets/js/support.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    const support = data["supportedCurrencies"];

    const selDe = document.querySelector("#de");
    const selPara = document.querySelector("#para");

    support.forEach((obj) => {
      let optDe = document.createElement("option");
      optDe.value = obj["id"];
      optDe.setAttribute("id", obj["id"]);
      optDe.innerText = obj["id"] + " - " + obj["name"];

      selDe.appendChild(optDe);

      let optPara = document.createElement("option");
      optPara.value = obj["id"];
      optPara.setAttribute("id", obj["id"] + "para");
      optPara.innerText = obj["id"] + " - " + obj["name"];

      selPara.appendChild(optPara);
    });
  })
  .catch((err) => {
    console.info(err);
    alert(
      "Erro ao carregar\n\nConteúdo bloqueado pela política de acesso do CORS.\n\nTente usar um servidor ou acesse:\nconvertiox.vercel.app"
    );
  });

// Adição da função convert() para ser acionada por mais de uma forma,
// no caso, pela tecla Enter no input da quantia a ser convertida e
// também pelo botão converter.
function convert() {
  let de = document.querySelector("#de").value;
  let para = document.querySelector("#para").value;
  let quantia = document.querySelector("#quantia").value;

  if (de == "" || para == "" || quantia == "") {
    alert(
      "Preencha corretamente todos os campos antes de converter as moedas."
    );
    return false;
  } else {
    fetch(
      baseUrlCoinApi + `/v1/exchangerate/${de}/${para}?apikey=${lkpyunsmrrqpaalzzweci}`
    )
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        if (data.error) {
          alert(
            "Infelizmente ocorreu um erro na requisição da API. Tente novamente mais tarde..."
          );

          return data.error;
        } else {
          let valorUnit = data["rate"];

          let valorConvertido = valorUnit * quantia;

          let elementoValor = document.querySelector(".valor");

          let BRLcurrency = new Intl.NumberFormat("pt-BR", {
            style: 'currency',
            currency: 'BRL'
          });

          let valorFormatado =
            BRLcurrency
            .format(valorConvertido)
            .toString().slice(3);

          elementoValor.innerHTML = valorFormatado;

          const register = {
            de: de,
            para: para,
            quantia: quantia
          }
          
          console.log(JSON.stringify(register));
          console.log(JSON.parse(JSON.stringify(register)));
        }
      })

      .catch((err) => {
        console.info(err);
      });
  }
}

const buttonConvert = document.querySelector("button#converter");

buttonConvert.addEventListener("click", (e) => {
  try {
    convert();
  } catch (error) {
    console.info(error);
  }

  console.log("Botão converter pressionado.");
});

const qtdeInput = document.querySelector("#quantia");

qtdeInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    try {
      convert();
    } catch (error) {
      console.info(error);
    }

    console.log("Tecla Enter pressionada.");
  }
});
