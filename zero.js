const NO_TAX_AMOUNT = 30;

const TAX_PANINI = 0.10;
const TAX_BIBITE = 0.15;

const PRICE_HAMBURGER = 10;
const PRICE_COCACOLA = 3;


//name used as id
Item = function(name, price, taxRate){

    name = name.toLowerCase();

    this.name = name;
    this.taxRate = taxRate;
    this.priceEscTax = price;
    this.priceIncTax = Math.round(this.priceEscTax * ( 1 + this.taxRate) * 100) / 100;
    this.taxAmount = Math.round((this.priceIncTax - this.priceEscTax) * 100) / 100;

};

//ItemsInRow contain information on products of the same type in a cart
ItemsInRow = function() {
    this.quantity = 0;
    this.totalIncTax = 0;
    this.totalEscTax = 0;
    this.totalTax = 0;
};

Catalog = function() {
    this.listItem = [];
};

Catalog.prototype.addItemToCatalog = function(item) {

    this.listItem.push(item);

};

Catalog.prototype.showItems = function() {

    this.listItem.forEach(
        element => console.log('- ',element.name,' ',element.priceEscTax,' ',element.priceIncTax,' ',element.taxRate,'\n'));
};

Catalog.prototype.searchItem = function(itemName) {
    return this.listItem.find(
        element => element.name === itemName);
};

Cart = function(numberName){

    this.numberName = numberName;
    this.listItem = {};
    this.totalIncTax = 0;
    this.totalEscTax = 0;
    this.totalTax = 0;
    this.discount = false;
};

Cart.prototype.applyDiscount = function() {
    if (this.totalIncTax > NO_TAX_AMOUNT) {
        this.totalIncTax = this.totalEscTax;
        this.totalTax = 0;
        this.discount = true;
    }
};


Cart.prototype.addItemToCart = function(itemName, quantity) {

    if (this.listItem[itemName] !== undefined){
        this.listItem[itemName].quantity += quantity;
    }
    else{
        this.listItem[itemName] = new ItemsInRow();
        this.listItem[itemName].quantity = quantity;
    }
};

Cart.prototype.calculateCartTotals = function(catalog) {
    Object.keys(this.listItem).forEach( (itemName) => {

        item = catalog.searchItem(itemName);

        //calculate row total
        this.listItem[itemName].totalIncTax += item.priceIncTax * this.listItem[itemName].quantity;
        this.listItem[itemName].totalEscTax += item.priceEscTax * this.listItem[itemName].quantity;
        this.listItem[itemName].totalTax += item.taxAmount * this.listItem[itemName].quantity;

        //calculate cart total
        this.totalIncTax += item.priceIncTax * this.listItem[itemName].quantity;
        this.totalEscTax += item.priceEscTax * this.listItem[itemName].quantity;
        this.totalTax += item.taxAmount * this.listItem[itemName].quantity;
        }
    )
    this.applyDiscount();
};


Cart.prototype.printReceipt = function(catalog) {
    this.calculateCartTotals(catalog);
    console.log('——————————————————————————————————————————————————————————————————————————————————————————');
    console.log('Cestino #' + this.numberName);
    console.log('——————————————————————————————————————————————————————————————————————————————————————————');
    Object.keys(this.listItem).forEach( (itemName, index) => {
        item = catalog.searchItem(itemName);
        console.log('\nArticolo #' + (index + 1));
        console.log(item.name.toUpperCase());
        console.log('X' + this.listItem[itemName].quantity);
        console.log('Prezzo unitario (Iva Incl.):',item.priceIncTax + '€');
        console.log('');
        console.log('Totale (Iva Escl.):', this.listItem[itemName].totalEscTax + '€');
        console.log('Iva:', this.listItem[itemName].totalTax + '€');
        console.log('Totale (Iva Incl.):', this.listItem[itemName].totalIncTax + '€');
        console.log('\n');
        }
    )
    console.log('———————————————————————————————————————\n');
    if (this.discount) console.log('Complimenti, su questo totale è stato applicato lo sconto\n');
    console.log('Totale (Iva Escl.):',this.totalEscTax + '€');
    console.log('Iva:',this.totalTax + '€');
    console.log('Totale (Iva Incl.):',this.totalIncTax + '€\n\n\n');
};





console.log('\n-----------------------------------\n\n');

console.log('Item hamburger\n');

hamburger = new Item('hamburger', PRICE_HAMBURGER, TAX_PANINI);

console.log('nome item =>',hamburger.name);
console.log('prezzoEscTax item',hamburger.name, '=>',hamburger.priceEscTax);
console.log('prezzoIncTax item',hamburger.name, '=>',hamburger.priceIncTax);
console.log('TaxAmount',hamburger.name, '=>',hamburger.taxAmount);


console.log('\n\n');


console.log('Item Cocacola\n');

cocacola = new Item('cocacola', PRICE_COCACOLA, TAX_BIBITE);

console.log('nome item =>',cocacola.name);
console.log('prezzoEscTax item',cocacola.name, '=>',cocacola.priceEscTax);
console.log('prezzoIncTax item',cocacola.name, '=>',cocacola.priceIncTax);
console.log('TaxAmount',cocacola.name, '=>',cocacola.taxAmount);

console.log('\n-----------------------------------\n\n');

catalogo = new Catalog();

catalogo.addItemToCatalog(hamburger);
catalogo.addItemToCatalog(cocacola);

catalogo.showItems();

cart1 = new Cart('1');
cart2 = new Cart('2');
cart3 = new Cart('3');
cart4 = new Cart('4');

cart1.addItemToCart('hamburger', 1);
cart1.addItemToCart('cocacola', 4);


cart2.addItemToCart('hamburger', 12);


cart3.addItemToCart('cocacola', 2);
cart3.addItemToCart('hamburger', 1);


cart4.addItemToCart('cocacola', 10);
cart4.addItemToCart('hamburger', 1);

console.log('\n');

cart1.printReceipt(catalogo);
cart2.printReceipt(catalogo);
cart3.printReceipt(catalogo);
cart4.printReceipt(catalogo);
