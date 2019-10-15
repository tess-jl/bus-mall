export class ItemArray {
    constructor(items) {
        this.items = items.slice(); 
    }

    getItems() {
        return this.items;
    }

    // gets the spefiic image out of the ItemArray by id; takes id and returns image
    getImageById(someId) { // renaming
        this.items.forEach(item => {
            if (someId === item.id) {
                return this.items.image(); // ??
            }
        });
    }

    getItemById(someId) { // do we need this? 
        let itemMatch;
        this.items.forEach(item => {
            if (someId === item.id) {
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
    increaseClick(someId) {
        const itemObject = this.getItemById(someId);
        const increasedClicks = itemObject.clicks + 1; 
        return increasedClicks; 
    }

    // increases the property 'timesShown' on the item object
    increaseTimesShown(someId) {
        const itemObject = this.getItemById(someId);
        const increasedTimesShown = itemObject.timesShown + 1; 
        return increasedTimesShown; 
    }
}
