const fromText = document.querySelector(".box-text-of");
const selectTag = document.querySelectorAll("select");
toText = document.querySelector(".box-text-to");
exchangeIcon = document.querySelector(".controls-exchange");
translateButton = document.querySelector("button");
icons = document.querySelectorAll(".row i");
// icons = rows;

// const rows = [
//     document.querySelectorAll(".row-from i"),
//     document.querySelectorAll(".row-to i")
// ]

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        //Mostrando as siglas dos idiomas
        //console.log(country_code);

        //Mostrando os respectivos nomes de cada idioma
        //console.log(countries[country_code]);

        //Selecionando as linguagens pt e en como as default da aplicação
        let selected;
        if(id == 0 && country_code == "pt-PT"){
            selected = "selected";
        }else if(id == 1 && country_code == "en-GB"){
            selected = "selected";
        }

        //Criando tags options dentro do select a partir do template string
        //que pega os códigos e nome de cada idioma de forma dinâmica
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

//Criando evento de click que realiza a troca de lado dos textos e linguagem
exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value,
    tempLang = selectTag[0].value;

    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;

    toText.value = tempText;
    selectTag[1].value = tempLang;
});

translateButton.addEventListener("click", () => {
    let text = fromText.value;

    //Pegando o valor do primeiro select
    translateFrom = selectTag[0].value, 

    //Pegando o valor do segundo select
    translateTo = selectTag[1].value; 

    //Verificando se os valores foram selecionados corretamente
    //console.log(text, translateTransform, translateTo);

    if(!text) return;
    toText.setAttribute("placeholder", "Traduzindo...");

    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;

    //Realizando um fetch para a api para ver sua resposta e retorno em json e qualquer obj recebido através desse método
    fetch(apiUrl).then(res => res.json()).then(data => {
        //console.log(data);
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder", "Tradução");
    });
});

icons.forEach(icon =>{
    icon.addEventListener("click", ({target}) =>{
        //console.log(target)
        if(target.classList.contains("fa-copy")){
            //Copiando ambos os textos para a área de transferência
            target.id == "from"?
            navigator.clipboard.writeText(fromText.value) :navigator.clipboard.writeText(toText.value)
        }else{
            let utterance;
            if(target.id == "from"){
                //Emitindo som...
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else{
                //Emitindo som...
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
})