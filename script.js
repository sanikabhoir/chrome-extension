const inputBtn = document.getElementById("input-btn");
const input = document.getElementById("input-el");
const outputList = document.getElementById("output-list");
const tabBtn = document.getElementById("tab-btn");
let myleads = [];
let i = 0;

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myleads"));
if (leadsFromLocalStorage) {
  myleads = leadsFromLocalStorage;
  renderLeads();
}
inputBtn.addEventListener("click", function () {
  myleads.push(input.value);
  localStorage.setItem("myleads", JSON.stringify(myleads));
  input.value = " ";
  renderLeads();
});
function renderLeads() {
  for (let j = i; j < myleads.length; j++) {
    //method 1 to add html inside JS
    //outputList.innerHTML += "<li><a href='"+myleads[j]+"' target='_blank'>" + myleads[j] + "</a></li>"
    outputList.innerHTML += `
    <li>
        <a target ='_blank' href='${myleads[j]}'> ${myleads[j]}</a>
    </li>
    `;
    //method 2 to add html inside JS
    const li = document.createElement("li");
    li.textContent = myleads[j];
    outputList.append(li);
  }
  i = myleads.length;
}

const deleteBtn = document.getElementById("delete-btn");
deleteBtn.addEventListener("dblclick", function () {
  //dblclick = double click
  localStorage.clear();
  myleads = [];
  outputList.innerHTML = " ";
  i = 0;
});


tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    myleads.push(tabs[0].url);
    localStorage.setItem("myleads", JSON.stringify(myleads));
    input.value = " ";
    renderLeads();
  });
});
