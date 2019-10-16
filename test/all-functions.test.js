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
        name: 'Banana Slicer',
        image: '../assets/banana.jpg'
    };
   //Act
   // Call the function you're testing and set the result to a const
    const itemYouWantObject = items.getItemById('banana');

   //Assert
   // Make assertions about what is expected valid result
    assert.deepEqual(bananaObject, itemYouWantObject);
});

test('removes the entire item object from the array by its id', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    const items = new ItemArray(productData);
    const oneLessShark = [
        {
            id: 'bag',
            name: 'Star Wars Themed Suitcase',
            image: '../assets/bag.jpg',
        },
        {
            id: 'banana',
            name: 'Banana Slicer',
            image: '../assets/banana.jpg',
        },
        {
            id: 'bathroom',
            name: 'iPad Toilet Paper Roll Dispenser',
            image: '../assets/bathroom.jpg',
        },
        {
            id: 'boots',
            name: 'Exposed Toe Rainboots',
            image: '../assets/boots.jpg',
        },
        {
            id: 'breakfast',
            name: 'The All-in-One Breakfast Maker',
            image: '../assets/breakfast.jpg',
        },
        {
            id: 'bubblegum',
            name: 'Meatball Bubble Gum',
            image: '../assets/bubblegum.jpg',
        },
        {
            id: 'chair',
            name: 'Modern Chair',
            image: '../assets/chair.jpg',
        },
        {
            id: 'cthulhu',
            name: 'Cthulhu Action Figure',
            image: '../assets/cthulhu.jpg',
        },
        {
            id: 'dog-duck',
            name: 'Duck Beak Muzzle for Dog',
            image: '../assets/dog-duck.jpg',
        },
        {
            id: 'dragon',
            name: 'Can of Dragon Meat',
            image: '../assets/dragon.jpg',
        },
        {
            id: 'pen',
            name: 'Plastic Utencil Pen',
            image: '../assets/pen.jpg',
        },
        {
            id: 'scissors',
            name: 'Pizza Scissors',
            image: '../assets/scissors.jpg',
        },
        {
            id: 'sweep',
            name: 'Baby Sweeping Onesie',
            image: '../assets/sweep.png',
        },
        {
            id: 'tauntaun',
            name: 'Children\'s Tauntaun Sleeping Bag',
            image: '../assets/tauntaun.jpg',
        },
        {
            id: 'usb',
            name: 'Tentacle USB',
            image: '../assets/usb.gif',
        },
        {
            id: 'water-can',
            name: 'World\'s Worst Watering Can',
            image: '../assets/water-can.jpg',
        },
        {
            id: 'unicowine-glass',
            name: 'Wine Glass That Will Definitely Spill',
            image: '../assets/wine-glass.jpg',
        },
    ];
    
    //Act
    // Call the function you're testing and set the result to a const
    items.removeById('shark');
    const itemsWithSharkRemoved = items.getItems();

    //Assert
    // Make assertions about what is expected valid result
    assert.deepEqual(itemsWithSharkRemoved, oneLessShark);
});

