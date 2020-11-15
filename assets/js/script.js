var url = "https://api.openweathermap.org/data/2.5/weather?q=+London+&appid=e762dc2e2097711648842fa11d60d794"

// sends user and fetch request
function searchUserInput() {
  let searchInput = document.querySelector("#userSearch").value
  fetchRequest(searchInput);
}

  //create list items in search card
  function createListItem(data) {
    //set id var
    var idCounter = 0;
    //create a button when function is called
    var aEl = document.createElement('button');
    //give created button an id of idCounter
    aEl.setAttribute('id', data.name);
    //give button a bootstrap class of list-group-item
    aEl.setAttribute('class', 'list-group-item');
    //set ulEl to the ul with id of #location from index.html
    var ulEl = document.querySelector('#location');
    //append aEl to ulEl
    ulEl.appendChild(aEl);
    //set text content of aEl to be the name of the location
    aEl.textContent = data.name;
    //add 1 to the id
    idCounter++;
  }

//runs searchUserInput Api
document.querySelector("#search-button").addEventListener('click', searchUserInput);

function fetchRequest(searchInput){
  fetch('https://api.openweathermap.org/data/2.5/weather?q='
    + searchInput +
    '&appid=e762dc2e2097711648842fa11d60d794')
    .then(function (response) {
      if (!response.ok) { // Request failed, go to catch
        throw Error(response.statusText); // throw will stop execution of the promise chain and jump to catch
      }
      return response.json()
    })
    .then(function (data) {
      console.log(data);
      createListItem(data);
      displayRequest(data);
    })
    .catch(function (error) {
      alert(error);
    });
  }



  function displayRequest(data) {
    console.log(data);


    var cardContainerEl = document.querySelector("#cardContainer")
    // clear old content
    cardContainerEl.innerHTML = "";
    // create card 
    var cardEl = document.createElement("div");
    cardEl.classList = "card-body"
    // create card content 



    var h1El = document.createElement('h1');
    h1El.textContent = data.name

    // weather icon
    let imgEl = document.createElement("img");
    imgEl.setAttribute('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png')
    //temperature
    let tempEl = document.createElement('p');
    tempEl.textContent = data.main.temp + "°"
    //humidity
    let humidityEl = document.createElement('p')
    humidityEl.textContent.data.main.humidity
    // append content to card
    cardEl.append(h1El);
    cardEl.append(imgEl);
    cardEl.append(tempEl);
    cardEl.append(humidityEl)


    // append card to container
    cardContainerEl.appendChild(cardEl);
  }


  function nameData() {
    if (typeof(Storage) !== "undefined") {
      if (sessionStorage.clickcount) {
        sessionStorage.clickcount = Number(sessionStorage.clickcount)+1;
      } else {
        sessionStorage.clickcount = 1;
      }
      document.getElementById("result").innerHTML = "You have clicked the button " + sessionStorage.clickcount + " time(s) in this session.";
    } else {
      document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
  }