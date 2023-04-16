let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
//  let inputValue = document.querySelector("#input-el"); // I can get value by using this method as well
const ulEl = document.getElementById("ul-el");
const deletBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")); 

//This will give the truthy value and if there will be empty string then this will give it the falsy value.
if(leadsFromLocalStorage){
  myLeads = leadsFromLocalStorage
  render(myLeads);
}


tabBtn.addEventListener("click", function(){

//Using chrome API for the sake of getting current tab from the chrome's current window.
  chrome.tabs.query({active : true, currentWindow: true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  })
  
})

inputBtn.addEventListener("click", function () {
  console.log(myLeads);
  myLeads.push(inputEl.value);
  inputEl.value = ""

  localStorage.setItem("myLeads",JSON.stringify(myLeads))
  render(myLeads);
});


//On double click this button will delete all the input values
deletBtn.addEventListener("dblclick", function(){
  localStorage.clear();
  myLeads = [];
  render(myLeads);
})

function render(leads) {
  let listItem = "";
  for (let i = 0; i < leads.length; i++) {
    // console.log(myLeads[i]);
    listItem += `<li><a href="${leads[i]}"> ${leads[i]} </a></li>`;
    // ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"

    //we can use li by using the document.creatElement() method which is mentioned below
    // const li = document.createElement("li")
    // li.textContent = myLeads[i]
    // ulEl.append(li)
  }
  ulEl.innerHTML = listItem;
}
