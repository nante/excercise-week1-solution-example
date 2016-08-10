
class Item {
    constructor (data) {
        this.tags = data.tags;
        this.template = 
        `<li class="item">
            <a href="#">
                <figure class="img-wrapper">
                    <img src="${data.src}" alt="#">
                    <figcaption>#${data.tags.join(', #')}</figcaption>
                </figure>
            </a>
        </li>`;
    }

}

class Items {
    constructor (config) {
        const itemsPromise = this.items;

        this.$container = document.querySelector(config.container || 'body');

        this.children = [];
        this.itemsNo = 0;

        itemsPromise.then((d) => { 
            this.itemsNo = d.length;
            d.forEach((item, index) => this.addNewItem(item, index))
        });
    }

    get items () { 
        return new Promise((resolve, reject) => {
          const req = new XMLHttpRequest();
          req.open('GET', 'items.json', false);
          req.onload = () => {
            if (req.status == 200) { resolve(JSON.parse(req.response)); }
            else { reject(Error(req.statusText)); }
          };
          req.send();
        });
    }

    addNewItem (item, index) {
        this.children.push(new Item(item));
        
        if (index + 1 === this.itemsNo) {
            this.renderItems();
        }
    }

    renderItems (filter) {
        this.$container.innerHTML = '';

        let filteredItems = this.children.filter((item) => filter ? item.tags.includes(filter) : true );
        filteredItems.forEach((item) => this.$container.innerHTML += item.template);
    }

}

const dupa = new Items({
    container: '.portfolio__rcolumn__box'
});

let filterThisShit = function (target, filter) {
    let siblings = target.parentNode.parentNode.children;
    // manipulowanie domem w vanilla 1/14
    for (let i = 0; i < siblings.length; i++) {
        siblings[i].children[0].classList = '';
    }
    target.classList = 'active';
    dupa.renderItems(filter);
}


