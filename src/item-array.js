export class ItemArray {
    constructor(items) {
        this.items = items.slice(); 
    }

    getItems() {
        return this.items;
    }

    getItemById(randomItemId) { // used after item is randomly generated 
        let itemMatch;
        this.items.forEach(item => {
            if (randomItemId === item.id) {
                itemMatch = item;
            }
        });
        return itemMatch; // returns objects
    }

    //getItemAtRandom generates a random item image by generating a random number and using that number to find an item at that index in the array.
    getRandomItem() {
        const randomItemIndex = Math.floor(Math.random() * this.items.length);
        return this.items[randomItemIndex];
    }

    // increases the property 'clicks' in the item object
    increaseClicksInObject(clickedItemObject) { // randomItemId, clickedItemId
        clickedItemObject++;
        return clickedItemObject;
    }

    // increases the property 'timesShown' on the item object
    increaseTimesShownInObject(shownItem) { 
        shownItem++; 
        return shownItem; 
    }
}
