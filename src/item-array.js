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

    removeById(itemId) {
        this.items.forEach((item, i) => {
            if (item.id === itemId) {
                this.items.splice(i, 1);
            }
        });
    }

}
