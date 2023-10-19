const listOfAssets = [];
const templateElem = document.getElementById('asset-card');

async function fetchAssets() {
    await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd').then(res => res.json()).then(data => listOfAssets.push(...data));
    renderUI();
}

// async function updateFetch() {
//     setInterval(() => {
//         fetchAssets();
//         console.log('updated')
//     }, 5000)
// }

function renderUI() {
    for (const asset of listOfAssets) {
        const wall = document.querySelector('.cards-wall');
        const assetCard = document.createElement('div');
        assetCard.classList.add('asset-card');

        const tickerElem = document.querySelector('.ticker');
        const assetTicker = document.createElement('p');

        assetCard.innerHTML = `
        <div class="asset-title">
            <img src="${asset.image}" class="asset-img">
            <div class="asset-name-sym">
                <p class="asset-name">${asset.name}</p>
                <p class="asset-sym"><strong>${asset.symbol.toUpperCase()}</strong></p>
            </div>
            <p class="asset-rank">${asset.market_cap_rank}</p>
        </div>

        <div class="asset-currentPerf">
            <p class="asset-price mono">${_.round(asset.current_price, 6)}</p>
            <p class="asset-price-chg mono">${_.round(asset.price_change_24h, 5)}</p>
            <p class="asset-price-chgPer mono">${_.round(asset.price_change_percentage_24h * 100, 2)}%</p>
        </div>
        `;

        assetTicker.innerText = `${asset.symbol.toUpperCase()} ${_.round(asset.price_change_percentage_24h * 100, 2)}`;

        wall.append(assetCard);
        tickerElem.append(assetTicker);
    }
    renderPerfUI();
}

function renderPerfUI() {
    const perfPrice = document.querySelectorAll('.asset-price-chg');

    perfPrice.forEach(price => {
        const change = price.innerText;

        if (_.startsWith(change, '-')) {
            price.classList.add('short');
            price.nextElementSibling.classList.add('short');
        } else {
            const posPrice = '+' + price.innerText;
            const posPricePer = '+' + price.innerText;

            price.classList.add('long');
            price.nextElementSibling.classList.add('long');

            price.innerText = posPrice;
            price.nextElementSibling.innerText = posPricePer;
        }
    })
    vanillaTiltInit('.asset-card');
}

// function renderTicker() {
//     const tickerElem = document.querySelector('.ticker');
//     const assetTicker = document.createElement('p');

//     for (const asset of listOfAssets) {
//         console.log(asset);
//         assetTicker.innerText = `${asset.symbol.toUpperCase()} ${_.round(asset.price_change_percentage_24h * 100, 2)}`;
//         tickerElem.append(assetTicker);
//     }

//     // listOfAssets.forEach(asset => {
//     //     assetTicker.innerText = `${asset.symbol.toUpperCase()} ${_.round(asset.price_change_percentage_24h * 100, 2)}`;
//     //     tickerElem.append(assetTicker);
//     // })
// }

const appInit = () => {
    fetchAssets();
    renderUI();
}

appInit();

// VANILLA TILT 

function vanillaTiltInit(selector) {
    // VanillaTilt.init(document.querySelector(selector), {
    // 	max: 25,
    // 	speed: 400
    // });

    //It also supports NodeList
    VanillaTilt.init(document.querySelectorAll(selector), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.15
    });
}

// GLOBAL EVENT LISTENER

function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, (e) => {
        if (e.target.matches(selector)) {
            callback(e);
        }
    });
}

addGlobalEventListener("click", ".asset-card", (e) => {
    console.log(this);
});
