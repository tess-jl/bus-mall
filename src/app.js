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

nodeListOfRadioTags.forEach((radioInput) => {
    radioInput.addEventListener('click', handleUserChoice); 
});

nextButton.addEventListener('click', () =>{
    if (numberOfTrials === 25) {
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

    const timesShownIdLabels = prepareIdsArray(trialDataTimesShownArray, idOnlyArray);
    const timesShownChartData = prepareTimesShownArray(trialDataTimesShownArray, timesShownOnlyArray); 

    const clicksIdLabels = prepareIdsArray(trialDataClicksArray, idOnlyArray);
    const clicksChartData = prepareClicksArray(trialDataClicksArray, clicksShownOnlyArray);

    renderChart(timesShownIdLabels, timesShownChartData, ctx1, 'number of times shown');
    renderChart(clicksIdLabels, clicksChartData, ctx2, 'number of times clicked');
}

function renderChart(labels, data, ctx, string) {
    const labelColors = ['red', 'blue', 'yellow', 'green', 'purple', 'orange', 'magenta', 'lightblue', 'red', 'blue', 'yellow', 'green', 'purple', 'orange', 'magenta', 'lightblue', 'red', 'blue', 'yellow', 'green', 'purple', 'orange', 'magenta', 'lightblue', 'red', 'orange'];
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: string,
                data: data,
                backgroundColor: labelColors
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    return myChart;
}

function prepareIdsArray(templateArray, idOnlyArray) {
    templateArray.forEach(object => {
        const idData = object.id; 
        idOnlyArray.push(idData);
    });
    return idOnlyArray; 
}

function prepareTimesShownArray(trialDataTimesShownArray, timesShownOnlyArray) {
    trialDataTimesShownArray.forEach(object => {
        const timesShownData = object.timesShown; 
        timesShownOnlyArray.push(timesShownData);
    });
    return timesShownOnlyArray; 
}

function prepareClicksArray(trialDataClicksArray, clicksShownOnlyArray) {
    trialDataClicksArray.forEach(object => {
        const clicksData = object.clicks; 
        clicksShownOnlyArray.push(clicksData);
    });
    return clicksShownOnlyArray; 
}

const ctx1 = document.getElementById('chart1').getContext('2d');
const ctx2 = document.getElementById('chart2').getContext('2d');