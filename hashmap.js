class Hashmap {
    capacity;
    current_size;
    load_factor;
    array;

    constructor() {
        this.capacity = 16;
        this.current_size = 0;
        this.load_factor = 0.75;
        this.array = new Array(this.capacity);
    }

    length() {
        return this.current_size;
    }

    hash(value) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < value.length; i++) {
            hashCode =
                (primeNumber * hashCode + value.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    has(key) {
        let index = this.hash(key);
        if (index < 0 || index >= this.array.length) {
            throw new Error("Trying to access index out of bound");
        }
        return this.array[index] !== undefined;
    }

    set(key, value) {
        if (!this.has(key)) {
            this.current_size++;
            this.array[this.hash(key)] = { key, value };
            if (this.current_size / this.capacity >= this.load_factor) {
                let newArray = new Array(this.capacity * 2);
                this.capacity = this.capacity * 2;
                for (let i = 0; i < newArray.length; i++) {
                    if (this.array[i] !== undefined) {
                        let index = this.hash(this.array[i].key);
                        newArray[index] = this.array[i];
                    }
                }
                this.array = newArray;
            }
        } else {
            this.array[this.hash(key)].value = value;
        }
    }

    get(key) {
        if (this.has(key)) {
            return this.array[this.hash(key)].value;
        }
        return null;
    }

    remove(key) {
        if (this.has(key)) {
            this.array[this.hash(key)] = undefined;
            this.current_size--;
            return true;
        }
        return false;
    }

    clear() {
        for (let i = 0; i < this.array.length; i++) {
            this.array[i] = undefined;
        }
        this.current_size = 0;
    }

    keys() {
        let arrKeys = [];
        let k = 0;
        for (let i = 0; i < this.array.length; i++) {
            if (this.array[i] !== undefined) {
                arrKeys[k++] = this.array[i].key;
            }
        }
        return arrKeys;
    }

    values() {
        let arrValues = [];
        let k = 0;
        for (let i = 0; i < this.array.length; i++) {
            if (this.array[i] !== undefined) {
                arrValues[k++] = this.array[i].value;
            }
        }
        return arrValues;
    }

    entries() {
        let arrEntries = [];
        let k = 0;
        for (let i = 0; i < this.array.length; i++) {
            if (this.array[i] !== undefined) {
                arrEntries[k++] = [this.array[i].key, this.array[i].value];
            }
        }
        return arrEntries;
    }
}

let myHashmap = new Hashmap();
console.log("Control");
console.log(myHashmap.length());
console.log(myHashmap.keys());
console.log(myHashmap.values());
console.log(myHashmap.entries());
console.log(myHashmap.hash("david"));
console.log(myHashmap.get("david"));
myHashmap.set("name", "david");
console.log("Setting name, david");
console.log(myHashmap.length());
console.log(myHashmap.keys());
console.log(myHashmap.values());
console.log(myHashmap.entries());
console.log(myHashmap.get("name"));
console.log("Setting age, 28");
myHashmap.set("age", 28);
console.log(myHashmap.length());
console.log(myHashmap.keys());
console.log(myHashmap.values());
console.log(myHashmap.entries());
console.log(myHashmap.get("age"));
console.log(myHashmap.remove("name"));
console.log("Removing name");
console.log("Clearing");
myHashmap.clear();
console.log(myHashmap.length());
console.log(myHashmap.keys());
console.log(myHashmap.values());
console.log(myHashmap.entries());
console.log(myHashmap.get("name"));
console.log(myHashmap.get("age"));
console.log("Setting > 16 items");
for (let i = 0; i < 30; i++) {
    myHashmap.set(`index${i}`, i);
}
console.log(myHashmap.length());
console.log(myHashmap.capacity);
console.log(myHashmap.keys());
console.log(myHashmap.values());
console.log(myHashmap.entries());
console.log(myHashmap.get("index0"));
console.log(myHashmap.get("index9"));
console.log(myHashmap.get("index17"));
