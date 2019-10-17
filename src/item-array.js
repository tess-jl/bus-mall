export class ItemArray {
    constructor(items) {
        this.items = items.slice(); 
    }

    getItems() {
        return this.items;
    }

    getItemById(randomItemId) { 
        let itemMatch;
        this.items.forEach(item => {
            if (randomItemId === item.id) {
                itemMatch = item;
            }
        });
        return itemMatch;
    }


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
