const base_url = "https://api.frankfurter.app/latest";

const selects = document.querySelectorAll(".select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of selects) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }  else  if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.appendChild(newOption);
    }

    select.addEventListener ("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
      let currCode = element.value;
      let countryCode = countryList[currCode];
      let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
      let img = element.parentElement.querySelector("img");
      img.src = newSrc;
}

btn.addEventListener ( "click", async (evt) => {
    evt.preventDefault();
    let amount= document.querySelector("form input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal <1 ) {
        amtVal = 1;
        amount.value = "1";
    }

    const from = fromCurr.value;
    const to = toCurr.value;
    const url = `${base_url}?amount=${amtVal}&from=${from}&to=${to}`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data.rates[to];

    let finalAmount = rate;
    msg.innerText = `${amtVal} ${from} = ${finalAmount.toFixed(2)} ${to}`;
});