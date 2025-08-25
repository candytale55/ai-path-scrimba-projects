import { dates } from "./utils/dates.js"


// Test dates.js 
// (Start date 3 days ago, End date yesterday) 
// console.log(" ----- dates.js ------");
// console.log('Start Date:', dates.startDate);
// console.log('End Date:', dates.endDate);


const tickersArr = [];


const generateReportBtn = document.querySelector(".generate-report-btn");

document.getElementById("ticker-input-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const tickerInput = document.getElementById("ticker-input");
  if (tickerInput.value.length > 2) {
    generateReportBtn.disabled = false;
    const newTickerStr = tickerInput.value;
    tickersArr.push(newTickerStr.toUpperCase());
    tickerInput.value = "";
    renderTickers();
  }
  else {
    const label = document.getElementsByTagName("label")[0];
    label.style.color = "red";
    label.textContent = "You must add at least one ticker. A ticker is a 3 letter or more code for a stock. E.g META, GOOG, MSFT, TSLA"
  }
});

function renderTickers() { 
  const tickersDiv = document.querySelector(".ticker-choice-display");
  tickersDiv.innerHTML = "";
  tickersArr.forEach((ticker) => { 
    const newTickerSpan = document.createElement("span");
    newTickerSpan.textContent = ticker; 
    newTickerSpan.classList.add("ticker");
    tickersDiv.appendChild(newTickerSpan); 
   });
}

console.log(tickersArr);
