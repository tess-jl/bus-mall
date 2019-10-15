import { productData } from './api.js';
import { ItemArray } from './item-array.js';

const itemImageTags = document.querySelectorAll('img');
const itemRadioTags = document.querySelectorAll('input');

const items = new ItemArray(productData);

let itemShown;

let numberOfTrials = 0;
let numberOfClicks = 0; 
let numberOfTimesShown = 0; 


//need to iterate over radio tags and add the same event listener to each
itemRadioTags.forEach((radioTag) => {
    radioTag.addEventListener('click', (event) => {
        if (event.target.value === itemShown.id) {
            numberOfClicks++;
            numberOfTimesShown++;
            items.increaseClick(itemShown.id); // do we need this line? 
            items.increaseTimesShown(itemShown.id); // do we need this line? 
        }
    });
});

const initializeNewItemButtons = () => {

    //get the three random item objects from the items array
    const randomItem1 = items.getRandomItem();
    let randomItem2 = items.getRandomItem();
    let randomItem3 = items.getRandomItem();

    while (randomItem1.id === randomItem2.id) {
        randomItem2 = items.getRandomItem();
    }
    while (randomItem1.id === randomItem3.id || randomItem2.id === randomItem3.id) {
        randomItem3 = items.getRandomItem();
    }
}; 

if (numberOfTrials > 25) {
    //disable images
    //display list of products with times viewed and votes received (don't display products not viewed)
}

document.querySelector('button').addEventListener('click', initializeNewItemButtons);

initializeNewItemButtons(); 



