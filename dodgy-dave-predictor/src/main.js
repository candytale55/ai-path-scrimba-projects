import { dates } from "./utils/dates.js"


// Test dates.js 
// (Start date 3 days ago, End date yesterday) 
// console.log(" ----- dates.js ------");
// console.log('Start Date:', dates.startDate);
// console.log('End Date:', dates.endDate);


const tickersArr = [];


const generateReportBtn = document.querySelector(".generate-report-btn");

generateReportBtn.addEventListener("click", () => {
  console.log("Generate-report button clicked!");
  console.log("fetchStockData() is going to be called");
  console.log(fetchStockData());
});

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
    label.textContent = "You must add at least one ticker. A ticker is a 3 letter or more code for a stock. E.g META, GOOG, MSFT, TSLA, APPL"
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

// Test tickersArr
// console.log(tickersArr);

const loadingArea = document.querySelector(".loading-panel");
const apiMessage = document.getElementById("api-message");

// This will be async in the future
function fetchStockData() { 
  document.querySelector(".action-panel").style.display = "none";
  loadingArea.style.display = 'flex'

  try {
    const connectionWentWell = true;
    let stockData = "";
    if (connectionWentWell) {
      apiMessage.innerText = "Creating report ..."
      console.log("fetchStockData connects to get the ticker information from the last three days from polygon.io")
      console.log("Yay, fetchStockData got data");
      stockData = tickersArr;  
    } else {
      loadingArea.innerText = 'There was an error fetching stock data.'
      console.log("Nope, fetchStockData got no data")
    }
    const fetchReportData = stockData.join(" ");
    fetchReport(fetchReportData);
  }
  catch (error) {
    loadingArea.innerText = "There was an error fetching stock data. ";
    console.log("Error: ", error);
  }
}

// This will be async in the future
function fetchReport(data) {
  console.log("fetchReport got called and got its data, it is: ", data)
  renderReport(data)
}


function renderReport(output) {
  console.log("renderReport got called");
  loadingArea.display = "none";
  const outputArea = document.querySelector(".output-panel");
  const report = document.createElement("p");
  outputArea.appendChild(report); 
  report.textContent = output; 
  outputArea.display = "flex";
}
