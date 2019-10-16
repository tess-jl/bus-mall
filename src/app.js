import { productData } from './api.js';
import { ItemArray } from './item-array.js';
import { findById } from './utils.js';

const nodeListOfImageTags = document.querySelectorAll('img');
const nodeListOfRadioTags = document.querySelectorAll('input');
const itemDisplays = document.querySelectorAll('.item');

const masterItemsArray = new ItemArray(productData); // storing an array object in items 
// console.log(items.getItems()); to access the array
// console.log(items, 'first item in array'); shows me that items is an array object with the key/value pair items:Array(18)

let recentlyShownItems = null; 


let numberOfTrials = 0;

let trialDataClicksArray = []; 
let trialDataTimesShownArray = [];

displayTrialItems(); 

function displayTrialItems() {
    // gets the source data of the items 
    let itemsAllowedToDisplay = masterItemsArray;

    //don't re-run the three items most-recently shown 
    // if (recentlyShownItems && masterItemsArray.items.length > 17); // 
    //     itemsAllowedToDisplay.remove(recentlyShownItems.id);


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


}














function trackNumberOfClicks(itemId) {
    const found = findById(trialDataClicksArray, itemId);
    if (found) {
        found.clicks++;
        return; // breaks out of jail b/c it's iterated now
    }
    // if not already in array then create a new object and push it 
    const newTrialDataObject = { id: itemId, clicks: 1 };
    trialDataClicksArray.push(newTrialDataObject);
}

function trackNumberOfTimesShown(itemId) {
    const shownBefore = findById(trialDataTimesShownArray, itemId);
    if (shownBefore) {
        shownBefore.timesShown++;
        return; // breaks out of jail b/c it's iterated now
    }
    // if not already in array then create a new object and push it 
    const newTrialDataObject = { id: itemId, timesShown: 1 };
    trialDataTimesShownArray.push(newTrialDataObject);
}

//GOAL: update number of trials and number of clicks 
// function trackTrialDataForArray(itemId) {   
//     trackNumberOfTimesShown();
//     trackNumberOfClicks();
// }

//need to iterate over radio tags and add the same event listener to each
// nodeListOfRadioTags.forEach((radioTag) => {

//     numberOfTrials = 1;
//     // let itemShown; // initialize object itemShown
//     console.log(radioTag, 'radio tag');

//     radioTag.addEventListener('click', (event) => {
//         console.log(radioTag, 'in event listener');
        
//         if (event.target.value === radioTag.id) {
//             numberOfClicks++;
//             trialDataArray.push()
//             console.log(numberOfClicks);
//         }
//     });
// });





// if (numberOfTrials > 25) {
//     //disable images
//     //display list of products with times viewed and votes received (don't display products not viewed)
// }

// document.querySelector('button').addEventListener('click', initializeNewTrial);

// initializeNewTrial(); 



