var currency_list2 = ["AUD","CAD","DKK","EUR","JPY","RUB","SAR","SEK","TRY"]
 

function getExchange2() {
    var sayac=-1;
  for (let currency_code2 of currency_list2) {
    console.log(currency_code2);
   
    let url = `https://v6.exchangerate-api.com/v6/d92cde8695592fa2c1d08b48/latest/USD`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        sayac++;
        let kurOranlari2 = result.conversion_rates[currency_code2];
        var tbodyRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
        console.log(`${currency_code2} - ${kurOranlari2}`);
        var newRow = tbodyRef.insertRow();
        var newCell = newRow.insertCell();
        var img = document.createElement('img');
        img.src = "js/flag.jpg";
        newCell.appendChild(img );
        img.insertAdjacentHTML("afterend", "<span>ABD Doları</span>");
        var newCell2 = newRow.insertCell();
        var newText = document.createTextNode(`${kurOranlari2}  ${currency_code2}`);
        newCell2.appendChild(newText);
      });
  }
}

getExchange2();
