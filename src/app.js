import { productData } from './api.js';
import { ItemArray } from './item-array.js';
import { findById } from './utils.js';

const nodeListOfImageTags = document.querySelectorAll('img');
const nodeListOfRadioTags = document.querySelectorAll('input[name=item]');
const nextContainer = document.getElementById('next-container');
const nextButton = document.getElementById('next-button');
const trialSection = document.getElementById('trial-section');
const resultsSection = document.getElementById('results');
const trialCount = document.getElementById('trial-count');

const masterItemsArray = new ItemArray(productData); 

let live = true; 
let numberOfTrials = 0;

let trialDataClicksArray = []; 
let trialDataTimesShownArray = [];

let timesShownOnlyArray = [];
let clicksShownOnlyArray = []; 
let idOnlyArray = []; 


displayTrialItems(); 

function displayTrialItems() {
    let itemsAllowedToDisplay = masterItemsArray;

    numberOfTrials++;

    const itemToDisplay1 = itemsAllowedToDisplay.getRandomItem();
    let itemToDisplay2 = itemsAllowedToDisplay.getRandomItem();
    let itemToDisplay3 = itemsAllowedToDisplay.getRandomItem();

    while (itemToDisplay1.id === itemToDisplay2.id) {
        itemToDisplay2 = itemsAllowedToDisplay.getRandomItem();
    }
    while (itemToDisplay1.id === itemToDisplay3.id || itemToDisplay2.id === itemToDisplay3.id) {
        itemToDisplay3 = itemsAllowedToDisplay.getRandomItem();
    }

    trackNumberOfTimesShown(itemToDisplay1.id);
    trackNumberOfTimesShown(itemToDisplay2.id);
    trackNumberOfTimesShown(itemToDisplay3.id);


    nodeListOfImageTags.forEach((imageTag, index) => { 
        if (index === 0) {
            imageTag.src = itemToDisplay1.image;
        } else if (index === 1) {
            imageTag.src = itemToDisplay2.image; 
        } else if (index === 2) {
            imageTag.src = itemToDisplay3.image; 
        }
    });
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


function trackNumberOfTimesShown(itemId) {
    const shownBefore = findById(trialDataTimesShownArray, itemId);
    if (shownBefore) {
        shownBefore.timesShown++;
        return; 
    } 
    const newTrialDataObject = { id: itemId, timesShown: 1 };
    trialDataTimesShownArray.push(newTrialDataObject);
}

const handleUserChoice = (event) => {
    if (!live) return; 

    const radioElement = event.target.value; 

    trackNumberOfClicks(radioElement);

    nextContainer.classList.remove('hidden');
    live = false; 
};

function trackNumberOfClicks(itemId) { 
    const found = findById(trialDataClicksArray, itemId);
    if (found) {
        found.clicks++;
        return; 
    }

    const newTrialDataObject = { id: itemId, clicks: 1 };
    trialDataClicksArray.push(newTrialDataObject);
}


// console.log(trialDataClicksArray, 'trial data clicks array in track number of clicks');


nodeListOfRadioTags.forEach((radioInput) => {
    radioInput.addEventListener('click', handleUserChoice); 
});


nextButton.addEventListener('click', () =>{

    if (numberOfTrials === 2) {
        displayFinalResults();
        return; 
    }
    live = true; 
    displayTrialItems();
});


function displayFinalResults() {
    trialSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');

    trialCount.textContent = numberOfTrials; 

    prepareIdsArray(trialDataTimesShownArray, idOnlyArray);
    prepareTimesShownArray(trialDataTimesShownArray, timesShownOnlyArray); 

    prepareIdsArray(trialDataClicksArray, idOnlyArray);
    prepareClicksArray(trialDataClicksArray, clicksShownOnlyArray);

}



function prepareIdsArray(templateArray, idOnlyArray) {
    templateArray.forEach(object => {
        const idData = object.id; 
        idOnlyArray.push(idData);
    });
    console.log(idOnlyArray, 'id shown only array');
    return idOnlyArray; 
}

function prepareTimesShownArray(trialDataTimesShownArray, timesShownOnlyArray) {
    trialDataTimesShownArray.forEach(object => {
        const timesShownData = object.timesShown; 
        timesShownOnlyArray.push(timesShownData);
    });
    console.log(timesShownOnlyArray, 'times shown only array');
    return timesShownOnlyArray; 
}

function prepareClicksArray(trialDataClicksArray, clicksShownOnlyArray) {
    trialDataClicksArray.forEach(object => {
        const clicksData = object.clicks; 
        clicksShownOnlyArray.push(clicksData);
    });
    console.log(clicksShownOnlyArray, 'clicks shown only array');
    return clicksShownOnlyArray; 
}


