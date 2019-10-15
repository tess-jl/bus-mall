# Technical Plan

## Major Goals:

1. Display 3 random item options per page load with radio buttons for each item.
2. Do not display an item twice on one page or display an item that was in the previous "test".
3. Store which item is chosen.
4. Calculate how many times each item was clicked.
5. Calculate how many times each item was shown.
6. Calculate times clicked/times shown for each item and display on results page.
7. Allow the user 25 trials and then display results of the above 3 calculations.

## Pages Needed:

1. api.js - list of all of our items
2. item-array.js - blueprint of our class including methods
3. index.html - our page with our radio buttons to be rendered
4. style.css - styling
5. tests.js - test file to be run
6. example.test.js - tests to be imported into test file
7. app.js - has our rendering and event listeners

## Things to do:

1. Make api.js of products.
2. Define the class for the products, including methods.
3. Create html page to be rendered with js.

## Class - ItemArray will have the following key value pairs:
1. id
2. name
3. image
4. clicks
5. timeShown

## Vairables Needed:
* randomItem1
* randomItem2
* randomItem3
* numberOfTrials
* variables to hold the query selector info, maybe itemImageTag and itemRadioTag?

## Methods that will live on our class:

1. getItems - simplifies our initial this. statement
2. getItemsById - gets the specific image from the id we want from the array to display to the page.
3. getItemAtRandom - generates a random number and uses that number to find an item at that index in the array.
4. increaseClick - increases the property "click" in the item object.
5. increaseTimesShown - increases the property 'timesShown" on our item object.