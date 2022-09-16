const selectsDom = document.querySelectorAll("select");
const btnDom = document.querySelector("button");
const fromCurrency = document.getElementById("from");
const toCurrency = document.getElementById("to");
const sonucDom = document.querySelector(".sonuc");
const dovizIconDom = document.querySelector(".dovizIcon");

for (let i = 0; i < selectsDom.length; i++) {
  // ülke para birimleri kodlarını döndürdük
  for (currency_code in currency_list) {
    let selected;
    if (i == 0) {
      selected = currency_code == "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = currency_code == "TRY" ? "selected" : "";
    }
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}-${currency_list[currency_code]}</option>`;
    selectsDom[i].insertAdjacentHTML("beforeend", optionTag);
  }
}

btnDom.addEventListener("click", (e) => {
  e.preventDefault();
  getExchange();
});

window.addEventListener("load", ()=>{
    getExchange();
})

function getExchange() {
  const amountDom = document.querySelector("input");
  let amountVal = amountDom.value;
  if (amountVal == "" || amountVal == "0") {
    amountDom.value = 1;
    amountVal = 1;
  }

  let url = `https://v6.exchangerate-api.com/v6/d92cde8695592fa2c1d08b48/latest/${fromCurrency.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => {
      let kurOranlari = result.conversion_rates[toCurrency.value];
      let toplamHesap = (amountVal * kurOranlari).toFixed(2);
      sonucDom.textContent = `${amountVal} ${fromCurrency.value} = ${toplamHesap} ${toCurrency.value}`;
    }).catch(() =>{
        sonucDom.textContent="Ters giden bir şeyler var";
    })
}

dovizIconDom.addEventListener("click", dovizDegistir);
function dovizDegistir() {
  var fromKur =fromCurrency.value ;
  var toKur = toCurrency.value;
  toCurrency.value = fromKur;
  fromCurrency.value = toKur;
  getExchange();
}
