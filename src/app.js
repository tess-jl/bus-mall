import { productData } from './api.js';
import { ItemArray } from './item-array.js';

const nodeListOfImageTags = document.querySelectorAll('img');
const nodeListOfRadioTags = document.querySelectorAll('input');

const items = new ItemArray(productData); // storing an array object in items 
// console.log(items.getItems()); to access the array
// console.log(items, 'first item in array'); shows me that items is an array object with the key/value pair items:Array(18)

// let itemShown;

let numberOfTrials = 0;
let numberOfClicks = 0; 
 


//need to iterate over radio tags and add the same event listener to each
nodeListOfRadioTags.forEach((radioTag) => {
    // let itemShown; // initialize object itemShown
    console.log(radioTag);

    radioTag.addEventListener('click', (event) => {
        console.log(radioTag, 'in event listener');
        
        if (event.target.value === radioTag.id) {
            items.increaseClicksInObject(radioTag); // returns an object with the number of clicks increased by 1
            console.log(radioTag);
        }
    });
});


const initializeNewTrial = () => {
    numberOfTrials++; 

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

    //show three random item images
    nodeListOfImageTags.forEach((imageTag, index) => { 
        if (index === 0) {
            imageTag.src = randomItem1.image;
        } else if (index === 1) {
            imageTag.src = randomItem2.image; 
        } else if (index === 2) {
            imageTag.src = randomItem3.image; 
        }
    });
    // render each random item at the three radio elements 
    nodeListOfRadioTags.forEach((radioTag, index) => {
        if (index === 0) {
            radioTag.value = randomItem1.id;
            // items.increaseTimesShownInObject(randomItem1); // returns object with updated timesShown property 
        } else if (index === 1) {
            radioTag.value = randomItem2.id;
            // items.increaseTimesShownInObject(randomItem2);
        } else if (index === 2) {
            radioTag.value = randomItem3.id;
            // items.increaseTimesShownInObject(randomItem3);
        }
    });  

}; 

// if (numberOfTrials > 25) {
//     //disable images
//     //display list of products with times viewed and votes received (don't display products not viewed)
// }

document.querySelector('button').addEventListener('click', initializeNewTrial);

initializeNewTrial(); 



