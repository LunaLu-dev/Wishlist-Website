let localCurrency;
let localCurrencySymbol;
let specialCase = [
    "SEK",
    "DKK",
    "NOK",
    "CZK",
    "PLN",
    "HUF",
    "RON",
    "ISK",
    "RUB",
    "UAH",
    "BYN",
    "KZT",
    "AMD",
    "GEL",
    "VND",
    "CVE",
    "EEK",
    "FIM",
    "LVL",
    "HRK"
]

window.onload = async function () {

    if (window.localStorage.getItem("currency") == null || window.localStorage.getItem("currency-symbol") == null) {
        void await setLocalCurrency();
    } else {
        localCurrency = window.localStorage.getItem("currency");
        localCurrencySymbol = window.localStorage.getItem("currency-symbol");
    }
    void GetItems();
}

async function setLocalCurrency() {
    try {
        await fetch("https://api.ipify.org?format=json")
            .then(response => response.json())
            .then(async data => {
                console.log(data.ip);
                await fetch("https://api.ipdata.co/" + data.ip + "/currency?api-key=f5da3069cd55c8abd5a67d09e622858c568caa8dde787ccd29e7f8d8")
                    .then(response => response.json())
                    .then(data => {
                        localCurrency = data.code;
                        window.localStorage.setItem("currency", data.code);
                        window.localStorage.setItem("currency-symbol", data.symbol);


                        localCurrency = data.code;
                        localCurrencySymbol = data.symbol;


                    })
            })

    } catch (error) {
        localCurrency = null;
    }
}


async function GetItems() {
    const urlParams = new URLSearchParams(window.location.search);

    // Get a specific parameter
    const category = urlParams.get('category');

    try {
        const response = await fetch('https://db-api-wishlist.lunalu.org/?get=items&category=' + category);
        const data = await response.json();

        for (const item of data) {
            const product = document.createElement('div');
            product.setAttribute("onclick", "window.location.href='" + item.url + "'");
            product.classList.add("product-container");

            const title = document.createElement('h1');

            if(item.title.length > 20)
                title.innerText = item.title.substring(0, 19) + "...";
            else
                title.innerText = item.title;

            const price = document.createElement('h3');

            if(specialCase.includes(localCurrency)){

            }else{

            }

            if (item.currency === localCurrency || localCurrency == null)
                if(specialCase.includes(localCurrency)){
                    price.innerText = item.price + " " + localCurrencySymbol;
                }else{
                    price.innerText = localCurrencySymbol + item.price;
                }

            else {
                let convertedPrice = await convertPrice(item.price, item.currency, localCurrency);
                if (convertedPrice === "Error") {
                    price.innerText = item.price + " " + item.currency;
                }
                if(specialCase.includes(localCurrency)){
                    price.innerText = convertedPrice + " " + localCurrencySymbol;
                }else{
                    price.innerText = localCurrencySymbol + convertedPrice;
                }

            }

            const container = document.createElement('div');
            container.classList.add("tn-container");

            const img = document.createElement('img');
            img.src = item.img_url;
            img.classList.add("cover-tn");

            container.appendChild(img);
            product.appendChild(container);
            product.appendChild(title);
            product.appendChild(price);
            document.getElementById('root-folder-bundle-div').appendChild(product);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function convertPrice(price, fromCurr, toCurr) {
    try {

        let request_builder = "https://api-wishlist.lunalu.org?amount=" + price + "&from_curr=" + fromCurr + "&to_curr=" + toCurr;

        const response = await fetch(request_builder, {
            method: 'GET'
        });
        if (!response.ok) {
            return "Error";
        }
        return await response.text();
    } catch (error) {
        console.error("An error occurred while trying to connect to server: ", error);
    }
}


/*
<div onclick="window.location.href='https://www.lttstore.com/products/precision-multi-bit-screwdriver-bundle'">
    <div class="tn-container">
        <img src="img/5.webp" class="cover-tn">
    </div>
    <h1>Precision Bit Kit</h1>
    <h3>628.53 SEK</h3>
</div>
*
* */