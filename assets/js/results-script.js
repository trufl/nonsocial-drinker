let savedJokes = [];
let savedDrinks = [];
const $buttonSection = document.querySelector("#jokes-refresh"); // not sure if we need
const $refreshJokes = document.getElementById("jokes-refresh");
const $refresh = document.getElementById("drinks-refresh");
const $refreshExcuses = document.getElementById("excuses-refresh");
let savedExcuses = [];

function init() {
    const alcholType = localStorage.getItem('alcholType');
    const wantJoke = JSON.parse(localStorage.getItem('wantJoke'));
    const wantExcuse = JSON.parse(localStorage.getItem('wantExcuse'));

    getCocktail(alcholType);
    if (wantJoke) {
        getJoke();
    } else {
        generateJokeBtn();
    }
    if (wantExcuse) {
        displayExcuseInformation();
    } else {
        generateExcuseBtn();
    }

}
$refreshJokes.addEventListener("click", function (event) {
    const $jokeDisplay = document.getElementById("jokes-list");
    //   const $jokeStuff = event.target.getAttribute("data-name");
    refreshDisplay($jokeDisplay);
   
    // refreshDisplay($refreshJokes);
    getJokes();
    //displayJokeInformation();
  });

$refresh.addEventListener("click", function (event) {
  const $drinkDisplay = document.getElementById("generated-drinks-list");
  console.log($drinkDisplay);
  // const $drinkStuff = event.target.getAttribute("data-name");
  refreshDisplay($drinkDisplay);

//   refreshDisplay($refresh);
  getCocktail();
  console.log(getCocktail);
  
});

$refreshExcuses.addEventListener("click", function (event) {
  const $excuseDisplay = document.getElementById("excuses-list");
//   const $excuseStuff = event.target.getAttribute("data-name");
  refreshDisplay($excuseDisplay);
  displayExcuseInformation();
  console.log(getExcuse);
});



function displayDrinkInformation(drinkData, ingredient) {


  // Unordered list for each category
  const $drinkList = document.querySelector("#generated-drinks-list");

  // Refresh button
//   const $button1 = document.createElement("button");

  const prevDisplayedDrinks = [];

  // Assign text value for header and appends to content section
  $drinkHeader.textContent = `Here are some great cocktails with ${ingredient}:`;

  // Assigns text value and attributes buttons and appends to section
  $button1.textContent = "Regenerate";
  $button1.setAttribute("type", "click");
  $button1.setAttribute("class", "w3-margin");
  $button1.setAttribute("data-name", ingredient);
  $button1.setAttribute("value", "click");
  $buttonSection.append($button1);

//   Uses for loops to iterate through drinkData array to get drink names and assigns them as text value for list item
//   List items are then appended to the drinks list
//   TODO: connect the drinks data properly
  for (let i = 0; i < 3; i++) {
    const $contentItem = document.createElement("li");
    const $itemText = document.createElement("p");
    const $saveButton = document.createElement("button");

    $saveButton.textContent = "Save Drink";
    $saveButton.setAttribute("type", "click");
    $saveButton.setAttribute("class", "w3-margin w3-right");
    $saveButton.setAttribute("value", "click");

    const drinkName = getRandomDrink(drinkData, prevDisplayedDrinks);

    $saveButton.setAttribute("data-name", drinkName);

    prevDisplayedDrinks.push(drinkName);

    $itemText.textContent = drinkName;
    $contentItem.append($itemText);
    $contentItem.append($saveButton);

    $drinkList.append($contentItem);
  }
  saveFavoriteDrink();
}

function displayJokeInformation(jokesArr) {
   const jokesArray = jokesArr;

  // Section for buttons
    const $buttonSection = document.querySelector("#jokes-refresh");

  // Headings for each category
  const $jokeHeader = document.querySelector("#joke-header");

    // Unordered list for each category
    const $jokeList = document.querySelector('#jokes-list');

  // Assign text value for header and appends to content section
  $jokeHeader.textContent = "Your Jokes:";

    // Assign text value for header and appends to content section

    // Assigns text value and attributes for buttons and appends them to their section
    $button1.textContent = "Regenerate";
    $button1.setAttribute('class', 'w3-right w3-col s12 l2 w3-margin-bottom');
    $button1.setAttribute('data-name', 'regenerate');
    $button1.setAttribute('value', 'click');
    $buttonSection.append($button1);

    $saveButton.textContent = "Save Joke";
    $saveButton.setAttribute("type", "click");
    $saveButton.setAttribute("value", "click");

     $itemText.textContent = jokesArray[i].joke;
    $saveButton.setAttribute("data-name", jokesArray[i].joke);

    $contentItem.append($itemText);
    $contentItem.append($saveButton);

    $jokeList.append($contentItem);
  
  saveFavoritejokes();
}

function displayExcuseInformation() {
  let excuseArray = [];
  const $excuseButtonSection = document.querySelector("#excuses-refresh");

  const $excusesList = document.querySelector("#excuses-list");

  const $button2 = document.createElement("button");

  $button2.textContent = "Regenerate";
  $button2.setAttribute("type", "click");
  $button2.setAttribute("data-name", "regenerate");
  $button2.setAttribute("value", "click");
  $excuseButtonSection.append($button2);


    $button2.textContent = "Regenerate";
    $button2.setAttribute('class', ' w3-right w3-col s12 l2 w3-margin-bottom');
    $button2.setAttribute('data-name', 'regenerate');
    $button2.setAttribute('value', 'click');
    $excuseButtonSection.append($button2);

    while (excuseArray.length < 3) {
        let excuseAr = getExcuse();
        if (!excuseArray.includes(excuseAr)) {
            excuseArray.push(excuseAr)
        }
    }
  
  

  for (let i = 0; i < 3; i++) {
    const $contentItem = document.createElement("li");
    const $itemText = document.createElement("p");
    const $saveButton = document.createElement("button");

    $saveButton.textContent = "Save Excuse";
    $saveButton.setAttribute("type", "click");
    $saveButton.setAttribute("value", "click");

    $itemText.textContent = excuseArray[i];
    $saveButton.setAttribute("data-name", excuseArray[i]);
    $contentItem.append($itemText);
    $contentItem.append($saveButton);
    $excusesList.append($contentItem);
  
  saveFavoriteExcuses();
}}

function displayTopFavorites() {

    //* ID NAMES HERE
    const idName = ["last-drink-list", "last-joke-list", "last-excuse-list"];

  const favListsArray = [];
  const listsExistArray = [];

    if (localStorage.getItem("gotoDrinkList") !== null) {
        const topDrinksArray = JSON.parse(localStorage.getItem("topFavDrinksArr"));
        favListsArray.push(topDrinksArray);
        listsExistArray.push(true);
    } else {
        favListsArray.push("fill");
        listsExistArray.push(false);
    }

    if (localStorage.getItem("gotoJokeList") !== null) {
        const topJokesArray = JSON.parse(localStorage.getItem("topFavDrinksArr"));
        favListsArray.push(topJokesArray);
        listsExistArray.push(true);
    } else {
        favListsArray.push("fill");
        listsExistArray.push(false);
    }

    if (localStorage.getItem("gotoExcuseList") !== null) {
        const topExcusesArray = JSON.parse(localStorage.getItem("topFavDrinksArr"));
        favListsArray.push(topExcusesArray);
        listsExistArray.push(true);
    } else {
        favListsArray.push("fill");
        listsExistArray.push(false);
    }



    for (let i = 0; i < elementArray.length; i++) {
        const list = document.querySelector(idName[i]);


        if (listsExistArray[i]) {

            for (let y = 0; y < favListsArray[i].length; y++) {
                const $favItem = document.createElement('li');
                const $favText = document.createElement('p');
                const $removeButton = document.createElement('button');

                $removeButton.textContent = "Add to Favorites";
                $removeButton.setAttribute('type', 'click');
                $removeButton.setAttribute('value', 'click');

                $removeButton.setAttribute('data-name', favListsArray[i][y]);
                $favText.textContent = favListsArray[i][y];

                $favItem.append($favText);
                $favItem.append($removeButton);

                list.append($favItem)
            }

        }

    }

}

function getRandomDrink(drinkData, prevDisplayedDrinks) {
  const drinkName =
    drinkData[Math.floor(Math.random() * drinkData.length) + 0].name;

  if (!prevDisplayedDrinks.includes(drinkName)) {
    return drinkName;
  } else {
     getRandomDrink(drinkData, prevDisplayedDrinks);
  }
}

function createJokeArray(jokeData, jokeArr) {
  let tempJArray;

  if (jokeArr === undefined) {
    tempJArray = [];
  } else {
    tempJArray = jokeArr;
  }

  if (!tempJArray.includes(jokeData)) {
    tempJArray.push(jokeData);
  }

  if (tempJArray.length === 3) {
    displayJokeInformation(tempJArray);
  } else {
    getJoke(tempJArray);
  }
}
//added joke filter
function getJoke(jokeArr) {
  const requestUrl = `https://v2.jokeapi.dev/joke/Misc?type=single&blacklistFlags=nsfw,religious,political,racist,sexist,explicit`;
  fetch(requestUrl).then(function (response) {
    console.log(jokeArr);
    if (response.ok) {
      response.json().then(function (data) {
        let jokeResponse = data.joke;
        console.log(jokeResponse);
        createJokeArray(jokeResponse, jokeArr);
      });
    }
  });
}

function getJokes() {
  const requestUrl = `https://v2.jokeapi.dev/joke/Misc?type=single&blacklistFlags=nsfw,religious,political,racist,sexist,explicit&amount=3`;
  fetch(requestUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        displayJokeInformation(data.jokes);
      });
    }

    if (!tempJArray.includes(jokeData)) {
        tempJArray.push(jokeData);
    }


    if (tempJArray.length === 3) {
        displayJokeInformation(tempJArray);
    } else {
        getJoke(tempJArray);
    }

})}

function getJoke(jokeArr) {

    const requestUrl = `https://v2.jokeapi.dev/joke/Misc?type=single`
    fetch(requestUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        let jokeResponse = data.joke;
                        console.log(jokeResponse);
                        createJokeArray(jokeResponse, jokeArr);
                    })
            }
        });

}

function getCocktail(userIngredient) {
  let ingredients = userIngredient;
  let $url = `https://api.api-ninjas.com/v1/cocktail?ingredients=${ingredients}`;

  fetch($url, {
    method: "GET",
    headers: { "X-Api-Key": "OuLOQXkRIPUQZ/oPSLdQaA==newehym4gENucVSM" },
  }).then(function (response) {
    console.log(response);
    if (response.ok) {
      response
        .json()

   }})
        .then(function (response) {
            if (response.ok) {
                response.json()

                    .then(function (data) {
                        console.log(data);
                        displayDrinkInformation(data, ingredients);
                    })
            }
        })
}

function getExcuse() {
  let person = ["mom", "dad", "grandma", "grandpa", "sister", "brother"];
  let action = ["broke", "snapped", "lost", "chased"];
  let event = ["computer", "project", "report", "dog", "cat", "goose"];

  let who = person[Math.floor(Math.random() * person.length) + 0];
  let did = action[Math.floor(Math.random() * action.length) + 0];
  let what = event[Math.floor(Math.random() * event.length) + 0];

  return `My ${who} ${did} my ${what}.`;
}

 init();

function saveFavoritejokes() {
  const $listOfJokes = document.getElementById("jokes-list");
  $listOfJokes.addEventListener("click", function (event) {
    let $jokeOptions = event.target.getAttribute("data-name");
    console.log($jokeOptions);
    if (!savedJokes.includes($jokeOptions)) {
      savedJokes.push($jokeOptions);
      localStorage.setItem("likedJokes", JSON.stringify(savedJokes));
    }
  });
}

function saveFavoriteDrink() {
  const $refresh = document.getElementById("drinks-refresh");
  $refresh.addEventListener("click", function (event) {
    const $drinkDisplay = document.getElementById("genertated-drinks-list");
    const $drinkStuff = event.target.getAttribute("data-name");
    refreshDisplay($drinkDisplay);
    getCocktail($drinkStuff);
    console.log("drinks-refresh");
  });

  const $listOfDrinks = document.getElementById("generated-drinks-list");
  $listOfDrinks.addEventListener("click", function (event) {
    let $drinkOptions = event.target.getAttribute("data-name");
    if (!savedDrinks.includes($drinkOptions)) {
      savedDrinks.push($drinkOptions);
      localStorage.setItem("likedDrinks", JSON.stringify(savedDrinks));
      console.log($drinkOptions);
    }
    console.log($drinkOptions);
  });
}

function saveFavoriteExcuses() {

  const $listOfExcuses = document.getElementById("excuses-list");
  $listOfExcuses.addEventListener("click", function (event) {
    let $excuseOptions = event.target.getAttribute("data-name");
    if (!savedExcuses.includes($excuseOptions)) {
      savedExcuses.push($excuseOptions);
      localStorage.setItem("likedExcuses", JSON.stringify(savedExcuses));
    }
  });
}

// getExcuse();
// getCocktail();
// getJokes();
function generateExcuseBtn() {
    const $genExcuseBtn = document.createElement('button');
    const $buttonSection = document.querySelector('#excuse-refresh');

    $genExcuseBtn.setAttribute('type', 'submit');
    $genExcuseBtn.setAttribute('value', 'Get An Excuse');
    $genExcuseBtn.textContent = "Get An Excuse!"


    $buttonSection.append($genExcuseBtn)

    $genExcuseBtn.addEventListener('click', function () {
        $genExcuseBtn.style.display = 'none'
        displayExcuseInformation()
    });
}


function generateJokeBtn() {
    const $genJokeBtn = document.createElement('button');
    const $buttonSection = document.querySelector('#jokes-refresh');

    $genJokeBtn.setAttribute('type', 'submit');
    $genJokeBtn.setAttribute('value', 'Get An Joke');
    $genJokeBtn.textContent = "Get A Joke!"


    $buttonSection.append($genJokeBtn)

    $genJokeBtn.addEventListener('click', function () {
        $genJokeBtn.style.display = 'none'
        getJoke()
    });
}

init();
