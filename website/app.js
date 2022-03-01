// create global Variables
// ======  masterUrl and apiKey Key for OpenWeatherMap API ========
// the link to retrieve weather info from API
const masterUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
// personal api key for openweathermap
const apiKey = "ec0ce39818fe5073d60503f919b944de&units=imperial";

// catch button and  Event listener to add function to existing
const generateBtn = document
  .getElementById("generate")
  .addEventListener("click", btnGenerate);

/*
<==== main function  ==== >
  <==== btnGenerate ====>
  function to get input value and call getCustomerWeather to fetch data from api 
  1- we will start building function to get Web api data
  2- and then function to post data
  3- and then function to get Project data
    
*/
function btnGenerate(e) {
  // e.preventDefault();
  let d = new Date();
  let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
  //catch zipCode user by variable => zipCodeUser
  const zipCodeUser = document.querySelector("#zip").value;
  //catch feelings user by variable => feeling
  const feeling = document.querySelector("#feelings").value;
  //Create if statement to get the complete data from the customer
  if (!zipCodeUser || !feeling) {
    alert(`
    please enter your zipCode and your feel `);
  } else {
    getCustomerWeather(zipCodeUser, apiKey)
      // call function to add data to request
      .then(function (resCustomerData) {
        setWeatherData("/add", {
          temp: resCustomerData.main.temp,
          date: newDate,
          content: feeling,
        });
      })
      .then(function () {
        // Create a code to display the data to the customer
        const retrieveData = async () => {
          const request = await fetch("/all");
          try {
            // Transform into JSON
            const allData = await request.json();
            console.log(allData);
            // Write updated data to DOM elements
            document.getElementById(`date`).innerHTML =
              "date" + " : " + allData.date;
            document.getElementById(`temp`).innerHTML =
              "temperature" +
              " : " +
              Math.round(allData.temp) +
              " " +
              "degrees";
            document.getElementById(`content`).innerHTML =
              "feeling" + " : " + allData.content;
          } catch (error) {
            console.log("error", error);
            // appropriately handle the error
          }
        };
        // Callback retrieveData function to display data to the client ..
        retrieveData();
      });
  }
}

//Function to GET Web API Data ..
const getCustomerWeather = async function (zipCodeUser, apiKey) {
  // get zipCodeUser information form api ..
  const URL = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zipCodeUser}&appid=${apiKey}`
  );
  const resCustomerData = await URL.json();
  return resCustomerData;
};

// Function to POST data ..  Store fetched API data to endpoint
const setWeatherData = async function (url = `/add`, data = {}) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    }, // body data type must match "Content-Type" header
    body: JSON.stringify({
      temp: data.temp,
      date: data.date,
      content: data.content,
    }),
  });
  const newData = await response.json();
  return newData;
};
