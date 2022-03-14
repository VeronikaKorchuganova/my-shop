function setHidden(element, hidden) {
    if (hidden) {
        element.classList.add('hidden');
    } else {
        element.classList.remove('hidden');
    }
}

function createGoodNode({name, description}) {
    const node = document.createElement('div');
    node.className = 'good_container good_size';

    const figure = document.createElement('figure');

    const img = document.createElement('img');
    img.src = 'image.png';

    const figcaption = document.createElement('figcaption');

    const p = document.createElement('p');
    p.innerHTML = name;

    const span = document.createElement('span');
    span.innerHTML = description;

    figcaption.appendChild(p);
    figcaption.appendChild(span);

    figure.appendChild(img);
    figure.appendChild(figcaption);

    node.appendChild(figure);
    return node;
}

function drawGoods(goods) {
    goods.forEach(item => goodsContainerElement.appendChild(createGoodNode(item)));
}

function fetchGoods(count) {
    return new Promise(resolve => {
        const goods = [];

        for (let i = 0; i < count; i++) {
            goods.push({
                name: `Tovar ${i}`,
                description: `Opisanie ${i}`
            })
        }

        setTimeout(resolve, 10000, goods);
    })
}

function render() {
    setHidden(loaderContainerElement, !loadingGoods);
    setHidden(goodsContainerElement, loadingGoods);
}

const loaderContainerElement = document.getElementsByClassName('loader')[0];
const goodsContainerElement = document.getElementsByClassName('goods_container')[0];

let loadingGoods = true;
render();

fetchGoods(10)
    .then(goods => drawGoods(goods))
    .finally(() => {
        loadingGoods = false;
        render();
    });


