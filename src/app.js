import { productData } from './api.js';
import { ItemArray } from './item-array.js';
import { findById } from './utils.js';

const nodeListOfImageTags = document.querySelectorAll('img');
const nodeListOfRadioTags = document.querySelectorAll('input[name=item]');
// const itemDisplays = document.querySelectorAll('.item');
const nextContainer = document.getElementById('next-container');
const nextButton = document.getElementById('next-button');
const trialSection = document.getElementById('trial-section');
const resultsSection = document.getElementById('results');
const trialCount = document.getElementById('trial-count');
const itemData = document.getElementById('item-data');

const masterItemsArray = new ItemArray(productData); // storing an array object in items 
// console.log(items.getItems()); to access the array
// console.log(items, 'first item in array'); shows me that items is an array object with the key/value pair items:Array(18)

// let recentlyShownItems = null; 

let live = true; 
let numberOfTrials = 0;

let trialDataClicksArray = []; 
let trialDataTimesShownArray = [];
// let itemsJustShown = [];

displayTrialItems(); 

function displayTrialItems() {
    // gets the source data of the items 
    let itemsAllowedToDisplay = masterItemsArray;

    numberOfTrials++;
    console.log(numberOfTrials, 'num of trials'); 

    // if (numberOfTrials > 1) { // don't change the itemsAllowedTDisplay for first trial only 
    //     //change the itemsAllowedToDisplay array to exclude the three items previously displayed 

    //     //get items previously displayed
    //     console.log(itemsJustShown, 'items previously displayed to be used for getting the random items'); 
    //     const previousItem1 = itemsJustShown[0];
    //     const previousItem2 = itemsJustShown[1];
    //     const previousItem3 = itemsJustShown[2];
    //     debugger;

    //     itemsAllowedToDisplay.forEach(item => {
    //         removeById()
    //     });
    // }



    //gets some random items to display
    const itemToDisplay1 = itemsAllowedToDisplay.getRandomItem();
    let itemToDisplay2 = itemsAllowedToDisplay.getRandomItem();
    let itemToDisplay3 = itemsAllowedToDisplay.getRandomItem();

    //checks that random items are different from one another
    while (itemToDisplay1.id === itemToDisplay2.id) {
        itemToDisplay2 = itemsAllowedToDisplay.getRandomItem();
    }
    while (itemToDisplay1.id === itemToDisplay3.id || itemToDisplay2.id === itemToDisplay3.id) {
        itemToDisplay3 = itemsAllowedToDisplay.getRandomItem();
    }

    // store the data for timesShown for these three different items in trialDataTimesShownArray
    trackNumberOfTimesShown(itemToDisplay1.id);
    trackNumberOfTimesShown(itemToDisplay2.id);
    trackNumberOfTimesShown(itemToDisplay3.id);

    // populateItemsJustShown(itemToDisplay1.id);
    // populateItemsJustShown(itemToDisplay2.id);
    // populateItemsJustShown(itemToDisplay3.id);
    // console.log(itemsJustShown, 'items just shown to track for next trial');
    // console.log(trialDataTimesShownArray, 'times shown array'); // working

    //show three random item images
    nodeListOfImageTags.forEach((imageTag, index) => { 
        if (index === 0) {
            imageTag.src = itemToDisplay1.image;
        } else if (index === 1) {
            imageTag.src = itemToDisplay2.image; 
        } else if (index === 2) {
            imageTag.src = itemToDisplay3.image; 
        }
    });
    // render each random item at the three radio elements 
    nodeListOfRadioTags.forEach((radioTag, index) => {
        if (index === 0) {
            radioTag.value = itemToDisplay1.id;
        } else if (index === 1) {
            radioTag.value = itemToDisplay2.id;
        } else if (index === 2) {
            radioTag.value = itemToDisplay3.id;
        }
    });  

    // itemsJustShown.splice(0, 3);
    // console.log(itemsJustShown, 'array should be empty now');

//     console.log(trialDataTimesShownArray, 'times shown array at end of display trial items');
}

// function populateItemsJustShown(itemId) {
//     //POPULATE itemsJustShownArray?
//     const nextTrialsPreviouslyShownItem = { id: itemId };
//     itemsJustShown.push(nextTrialsPreviouslyShownItem);
// }


function trackNumberOfTimesShown(itemId) {
    const shownBefore = findById(trialDataTimesShownArray, itemId);
    if (shownBefore) {
        //update number of times shown for the trialDataTimesShownArray
        shownBefore.timesShown++;
        return; // breaks out of jail b/c it's iterated now
    }
    // if not already in array then create a new object and push it 
    const newTrialDataObject = { id: itemId, timesShown: 1 };
    trialDataTimesShownArray.push(newTrialDataObject);
}

const handleUserChoice = (event) => {
    if (!live) return; // makes sure user only votes 1x/trial 

    const radioElement = event.target.value; //will be the string id of whatever was clicked

    //track number of clicks if the event listener on the radio tag has an event (i.e. user clicks)
    trackNumberOfClicks(radioElement);

    //show next button
    nextContainer.classList.remove('hidden');
    live = false; 
};

function trackNumberOfClicks(itemId) { // as Array
    const found = findById(trialDataClicksArray, itemId);
    if (found) {
        found.clicks++;
        return; // breaks out of jail b/c it's iterated now
    }
    // if not already in array then create a new object and push it 
    const newTrialDataObject = { id: itemId, clicks: 1 };
    trialDataClicksArray.push(newTrialDataObject);
    console.log(trialDataClicksArray, 'trial data clicks array in track number of clicks');
}




//need to iterate over radio inputs and add the same event listener to each
nodeListOfRadioTags.forEach((radioInput) => {
    radioInput.addEventListener('click', handleUserChoice); 
});


nextButton.addEventListener('click', () =>{
    console.log('in next event handler');

    if (numberOfTrials === 3) {
        displayFinalResults();
        return; 
    }
    live = true; 
    displayTrialItems();
});




function displayFinalResults() {
    //hide trial and show result
    trialSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');

    //tell user the numbe of trials
    trialCount.textContent = numberOfTrials; 

    createShownListItem(trialDataTimesShownArray); 


    // set up parameters for graphs
    // const data = [trialDataClicksArray.clicks];

}

function createShownListItem(trialDataTimesShownArray) {
    //document.get get ul 
    const shownList = document.getElementById('shown-list');
    //for each thing the array loop through 
    trialDataTimesShownArray.forEach(item => {

        const shownListItem = document.createElement('li');
        shownListItem.textContent = `you were shown ${item.id}, and you clicked it ${item.timesShown} times`;
        shownList.appendChild(shownListItem);

    });

}

