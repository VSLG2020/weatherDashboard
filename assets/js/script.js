//weather api url
var urlWeather = "https://api.openweathermap.org/data/2.5/weather?q=+London+&appid=e762dc2e2097711648842fa11d60d794"
//long/lat/forecast url
var urlOneCall ="https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&daily&exclude=hourly,minutely&units=imperial&appid=e762dc2e2097711648842fa11d60d794"

// grab card container
let cardContainerEl = document.querySelector("#cardContainer")

// grab card
let cardEl = document.querySelector("#card")
 
// fetch request for the searchUserInput

function searchUserInput(){
    let searchInput = document.querySelector("#userSearch").value
    fetchRequest(searchInput);
}

// run searchUserInput on click

document.querySelector("#search-button").addEventListener('click', searchUserInput)

// fetch from open weather API and  add .then function for a response. using json

function fetchRequest(searchInput) {
fetch('https://api.openweathermap.org/data/2.5/weather?q='
    + searchInput +
    '&units=imperial&appid=e762dc2e2097711648842fa11d60d794')
  .then(function (response) {
    if (!response.ok) { // Request failed, go to catch
      throw Error(response.statusText); // Execution of the current function will stop (the statements after throw won't be executed),
    } // and control will be passed to the first catch block in the call stack
    return response.json()
  })
  
  .then(function (data) {      //data display and create list. 
    createListItem(data)
      displayName(data)
    let coordinates = {
        longitude:data.coord.lon,     //this adds the long/lat coordinates for the U.V 
        latitude:data.coord.lat
    };
    return coordinates;
    
  })
  
  // pass coordinate object along
  
  .then(function(response){
      console.log(response)
      return fetch('https://api.openweathermap.org/data/2.5/onecall?lat='
            + response.latitude + '&lon=' + response.longitude + '&daily&exclude=hourly,minutely&units=imperial&appid=e762dc2e2097711648842fa11d60d794')
  })
  // return response in JSON
  .then (function(response){  
    return response.json()
  })
  //consoloe log JSON response
  .then (function(data){
    displayRequest(data)
    displayRequestBlue(data)
    
    //createListItem(data)
  })
  .catch(function (error) {
    alert(error);
  });
}
//end of the fetchRequest(searchInput)

// fetch button for searchbutton

function searchButton(buttonEl) {
fetch('https://api.openweathermap.org/data/2.5/weather?q='
    + buttonEl +
    '&units=imperial&appid=e762dc2e2097711648842fa11d60d794')
  .then(function (response) {
    if (!response.ok) { // Request failed, go to catch
      throw Error(response.statusText); // throw will stop execution of the promise chain and jump to catch
    }
    return response.json()
  })
  
  .then(function (data) {
      displayName(data)
    let coordinates = {
        longitude:data.coord.lon,
        latitude:data.coord.lat
    };
    return coordinates;
    
  })
  // pass coordinate object along
  .then(function(response){
      console.log(response)
      return fetch('https://api.openweathermap.org/data/2.5/onecall?lat='
            + response.latitude + '&lon=' + response.longitude + '&daily&exclude=hourly,minutely&units=imperial&appid=951ac77f9019903879e8df930449019e')
  })
  // return response in JSON
  .then (function(response){  
    return response.json()
  })
  //consoloe log JSON response
  .then (function(data){
    displayRequest(data)
    displayRequestBlue(data)
    
    //createListItem(data)
  })
  .catch(function (error) {
    alert(error);
  });
}

//fetch that will list data from searchbutton

function createListItem(data){
    var buttonEl = document.createElement('button'); //this is the button
    buttonEl.setAttribute('id',data.name);//this is tht button id
    buttonEl.setAttribute('class', 'list-group-item');//bootstrap list-group-item
    buttonEl.setAttribute('onclick', `searchButton("${data.name}")`); 
    var divEl = document.querySelector('#location'); //set ul(html list tag) to the ulEl (ul element) with id=location 
    divEl.appendChild(buttonEl); //append buttonEl to ulEl
    buttonEl.textContent = data.name; //data.name is now the 'location'
}

     

// display function for the city name from current Weather url 
function displayName(data){
    let cityEl = document.createElement("h1") //cityname will be displayed
    cardEl.innerHTML=" "
    cityEl.textContent = data.name
    cardEl.append(cityEl)
}

// display oneCall/forecast api data

function displayRequest(data){
    console.log(data);

    //this is the card for the forescast

    // location/city date 
    let dateEl = document.createElement('p')
    dateEl.textContent = data.current.dt
    
    // little weather emoji/img on card
    let imgEl = document.createElement("img");
    imgEl.setAttribute('src', 'http://openweathermap.org/img/w/' + data.current.weather[0].icon + '.png')
    
    // pull the temperature end pioint
   
    let tempEl = document.createElement('p');
    tempEl.textContent = data.current.temp + " °F"
   
    // pull the humidity end point
   
    let humidityEl = document.createElement('p')
    humidityEl.textContent = data.current.humidity + "%"
    
    // pull wind speed end point
    
    let windEl = document.createElement('p')
    windEl.textContent = data.current.wind_speed + " mph"
   
    // pull uv index endpoint
    
    let uvEl = document.createElement('p')
    uvEl.textContent = data.current.uvi
    if(data.current.uvi > 5){
      uvEl.setAttribute('class', 'bg-danger'); //greater than 5 is danger zone
      }
      else if (data.current.uvi>=3){
        uvEl.setAttribute('class', 'bg-warning'); //greater than equal to 3 is warning
      } else{
        uvEl.setAttribute('class', 'bg-success'); // everything else or less than 3 is "good/green"
      }
      uvEl.setAttribute("style", "width:fit-content; padding:0px 10px 0px")
    
      
    
    cardEl.append(dateEl); //this is date append
    cardEl.append(imgEl); //this is the image ""
    cardEl.append(tempEl); //temp append
    cardEl.append(humidityEl) //humidity ""
    cardEl.append(windEl); // wind speed ""
    cardEl.append(uvEl) // uv ""
    
    
  }
   
function displayRequestBlue(data){
    console.log(data);
   
   
    // create card content
    
    
    // city and date pulled for 5 day forecast

    let date1 = document.getElementById('date1')
    date1.textContent = data.daily[0].dt
    let date2 = document.getElementById('date2')
    date2.textContent = data.daily[1].dt
    let date3 = document.getElementById('date3')
    date3.textContent = data.daily[2].dt
    let date4 = document.getElementById('date4')
    date4.textContent = data.daily[3].dt
    let date5 = document.getElementById('date5')
    date5.textContent = data.daily[4].dt
    
    
    // temperature card for 5 day forecast

    let temp1 = document.getElementById('temp1')
    temp1.textContent = data.daily[0].temp.day + "°F"
    let temp2 = document.getElementById('temp2')
    temp2.textContent = data.daily[1].temp.day + "°F"
    let temp3 = document.getElementById('temp3')
    temp3.textContent = data.daily[2].temp.day + "°F"
    let temp4 = document.getElementById('temp4')
    temp4.textContent = data.daily[3].temp.day + "°F"
    let temp5 = document.getElementById('temp5')
    temp5.textContent = data.daily[4].temp.day + "°F"
    
    // humidity card for the 5 day forecast

    let humidity1 = document.getElementById('humidity1')
    humidity1.textContent = data.daily[0].humidity + "%"
    let humidity2 = document.getElementById('humidity2')
    humidity2.textContent = data.daily[1].humidity + "%"
    let humidity3 = document.getElementById('humidity3')
    humidity3.textContent = data.daily[2].humidity + "%"
    let humidity4 = document.getElementById('humidity4')
    humidity4.textContent = data.daily[3].humidity + "%"
    let humidity5 = document.getElementById('humidity5')
    humidity5.textContent = data.daily[4].humidity + "%"
}
  