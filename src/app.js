import { productData } from './api.js';
import { ItemArray } from './item-array.js';
import { findById } from './utils.js';

const nodeListOfImageTags = document.querySelectorAll('img');
const nodeListOfRadioTags = document.querySelectorAll('input[name=item]');
const itemDisplays = document.querySelectorAll('.item');
const nextContainer = document.getElementById('next-container');
const nextButton = document.getElementById('next-button');
const trialSection = document.getElementById('trial-section');
const resultsSection = document.getElementById('results-section');
const trialCount = document.getElementById('trial-count');

const masterItemsArray = new ItemArray(productData); // storing an array object in items 
// console.log(items.getItems()); to access the array
// console.log(items, 'first item in array'); shows me that items is an array object with the key/value pair items:Array(18)

let recentlyShownItems = null; 

let live = true; 
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
}
console.log(trialDataTimesShownArray, 'times shown array');

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

const handleUserChoice = (event) => {
    console.log('in handle user choice fcn');
    if (!live) return;

    numberOfTrials++;

    const radioElement = event.target.value;

    //track number of clicks if the event listener on the radio tag has an event (i.e. user clicks)
    trackNumberOfClicks(radioElement.id);

    //show next button
    nextContainer.classList.remove('hidden');
    live = false; 
};

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


//need to iterate over radio inputs and add the same event listener to each
nodeListOfRadioTags.forEach((radioInput) => {
    radioInput.addEventListener('click', handleUserChoice); 
});


nextButton.addEventListener('click', () =>{
    console.log('in next event handler');
    if (numberOfTrials === 25) {
        displayFinalResults();
        return; 
    }
    live = true; 
    displayTrialItems();
});

console.log(trialDataClicksArray, 'trial data clicks array');


function displayFinalResults() {
    //hide trial and show result
    trialSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');

    //tell user the numbe of trials
    trialCount.textContent = numberOfTrials; 

    // set up parameters for graphs
    const data = [trialDataClicksArray.clicks];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}



const ctx = document.getElementById('chart').getContext('2d');



