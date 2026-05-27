/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd pc games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
    for (const game of games) {
        // Create a button element so it's fully clickable
        const gameCard = document.createElement("button");
        
        // Add your base styles that apply to ALL cards
        gameCard.classList.add("game-card");

        // DYNAMIC STEP: Add the individual theme class from games.js
        if (game.theme) {
            gameCard.classList.add(game.theme);
        } else {
            gameCard.classList.add("default-theme"); // Fallback look
        }

        // Set up the card internal HTML structure
        gameCard.innerHTML = `
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <img class="game-img" src="${game.img}" alt="${game.name}" />
        `;

        // Handle card click to open the link
        gameCard.addEventListener("click", () => {
            if (game.link) {
                window.location.href = game.link;
            }
        });

        // Append the styled card to your container grid
        gamesContainer.appendChild(gameCard);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
// addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// // grab the contributions card element
// const contributionsCard = document.getElementById("num-contributions");

// // use reduce() to count the number of total contributions by summing the backers
// const totalContributions = GAMES_JSON.reduce( (total, game) => {
//     return total + game.backers;
// }, 0);

// // set the inner HTML using a template literal and toLocaleString to get a number with commas
// contributionsCard.innerHTML = totalContributions.toLocaleString('en-US');

// // grab the amount raised card, then use reduce() to find the total amount raised
// const raisedCard = document.getElementById("total-raised");
// const totalRaised = GAMES_JSON.reduce( (total, game) => {
//     return total + game.pledged;
// }, 0);

// // set inner HTML using template literal
// // This converts the number to a string with commas, then puts the '$' in front
// raisedCard.innerHTML = `$${totalRaised.toLocaleString('en-US')}`;

// // grab number of games card and set its inner HTML
// const gamesCard = document.getElementById("num-games");
// gamesCard.innerHTML = GAMES_JSON.length.toLocaleString('en-US');


/*************************************************************************************
 * Challenge 5: Add functions to filter the pc and mobile games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filtermobileOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listOfmobileOnly = GAMES_JSON.filter ( (game) => {
        return game.device === "mobile";
    });

    // use the function we previously created to add the mobile games to the DOM
    addGamesToPage(listOfmobileOnly);
}

// show only games that are fully pc
function filterpcOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let listOfpcOnly = GAMES_JSON.filter ( (game) => {
        return game.device === "pc";
    });

    // use the function we previously created to add mobile games to the DOM
    addGamesToPage(listOfpcOnly);
}

// show all games
// function showAllGames() {
//     deleteChildElements(gamesContainer);

//     // add all games from the JSON data to the DOM
//     addGamesToPage(GAMES_JSON);
// }

// select each button in the "Our Games" section
const mobileBtn = document.getElementById("mobile-btn");
const pcBtn = document.getElementById("pc-btn");
// const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
mobileBtn.addEventListener("click", filtermobileOnly)
pcBtn.addEventListener("click", filterpcOnly)
// allBtn.addEventListener("click", showAllGames)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of mobile games
const mobileGames = GAMES_JSON.filter( (game) => {
    return game.pledged < game.goal;
});
console.log(); // get the length of that filtered list

// create a string that explains the number of mobile games using the ternary operator
// create the variable for the grammatical string part
const gameText = mobileGames.length === 1 
  ? '1 game remains' 
  : `${mobileGames.length} games remain`;
// assemble the final string
// const displayStr = `A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${GAMES_JSON.length} games. Currently, ${gameText} mobile. We need your help to fund these amazing games!`;

// // create a new DOM element containing the template string and append it to the description container
// const newPara = document.createElement('p');
// newPara.textContent = displayStr;
// descriptionContainer.appendChild(newPara);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

// const firstGameContainer = document.getElementById("first-game");
// const secondGameContainer = document.getElementById("second-game");

// const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
//     return item2.pledged - item1.pledged;
// });

// // use destructuring and the spread operator to grab the first and second games
// const [firstGame, secondGame, ...rest] = sortedGames;

// // create a new element to hold the name of the top pledge game, then append it to the correct element
// const firstGameName = document.createElement('h3');
// firstGameName.textContent = firstGame.name;
// firstGameContainer.appendChild(firstGameName);

// // do the same for the runner up item
// const secondGameName = document.createElement('h3');
// secondGameName.textContent = secondGame.name;
// secondGameContainer.appendChild(secondGameName);
