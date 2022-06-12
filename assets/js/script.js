// Change theme
const body = document.querySelector('body');

const changeThemeButton = document.getElementById('lamp');

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

changeThemeButton.onclick = function() {
    toggleTheme();
}



// conversion example
// https://rest.coinapi.io/v1/exchangerate/ETH/BRL?apikey=????

const baseUrlCoinApi = "https://rest.coinapi.io";
const allImagesCoinApi = "/v1/assets/icons/18?apikey=";
const coinApiKey = "31C67320-5F39-499A-87E3-BEFCB3272316";

const freeCurrencyApiUrl = "https://free.currconv.com/";

fetch("./assets/js/support.json")
    .then(res => {
        return res.json();
    }).then(data => {
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
            optPara.setAttribute("id", obj["id"]+"para");
            optPara.innerText = obj["id"] + " - " + obj["name"];
            
            selPara.appendChild(optPara);
        })

    })
.catch(err => {
    console.info(err);
});



function convert() {

    let de = document.querySelector("#de").value;
    let para = document.querySelector("#para").value;  
    let quantia = document.querySelector("#quantia").value;
    
    if (de == "" || para == "" || quantia == "")
    {
        alert("Preencha corretamente todos os campos antes de converter as moedas.");
        return false;
    }
    
    else
    {
        fetch(baseUrlCoinApi+`/v1/exchangerate/${de}/${para}?apikey=${coinApiKey}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                
                if (data.error) {
                    alert("Infelizmente ocorreu um erro na requisição da API. Provavelmente ela ainda não possui suporte à moeda solicitada.");
                    
                    return data.error;

                }
                else {
                    let valorUnit = data["rate"];
    
                    let valorConvertido = valorUnit * quantia;
    
                    let elementoValor = document.querySelector(".valor");
    
                    let valorFormatado = new Intl.NumberFormat(
                        'pt-BR',
                        { maximumSignificantDigits: 3 }
                    ).format(valorConvertido);
    
                    elementoValor.innerHTML = valorFormatado;
                }
            })
        .catch(err => {
            console.info(err);
        });
    }

}


const buttonConvert = document.querySelector("button#converter");

buttonConvert.addEventListener('click', (e) => {
    
    try {
        convert();
    } catch (error) {
        console.info(error);
    }

    console.log("Botão converter pressionado.");

});


const qtdeInput = document.querySelector("#quantia");

qtdeInput.addEventListener('keypress', (e) => {

    if (e.key === "Enter") {

        try {
            convert();
        } catch (error) {
            console.info(error);
        }

        console.log("Tecla Enter pressionada.");
    }

});
