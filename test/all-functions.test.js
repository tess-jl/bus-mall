// IMPORT MODULES under test here:
import { ItemArray } from '../src/item-array.js';
import { productData } from '../src/api.js';

const test = QUnit.test;


test('does function return entire array of items', function(assert) {
   //Arrange
   // Set up your parameters and expectations
    const items = new ItemArray(productData);

   //Act
   // Call the function you're testing and set the result to a const
    const itemsInArray = items.getItems();

   //Assert
   // Make assertions about what is expected valid result
    assert.deepEqual(itemsInArray, productData);
});

test('gets the entire item object from the array by its id', function(assert) {
   //Arrange
   // Set up your parameters and expectations
    const items = new ItemArray(productData);
    const bananaObject = {
        id: 'banana',
        image: '../assets/banana.jpg',
        name: 'Banana Slicer',
    };
   //Act
   // Call the function you're testing and set the result to a const
    const itemYouWantObject = items.getItemById('banana');

   //Assert
   // Make assertions about what is expected valid result
    assert.deepEqual(bananaObject, itemYouWantObject);
});


