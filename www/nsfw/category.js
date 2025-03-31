let localCurrency;

window.onload = async function () {

    if (window.localStorage.getItem("currency") == null) {
        void await setLocalCurrency();

    } else {
        localCurrency = window.localStorage.getItem("currency");
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
                        console.log(data.code);
                        localCurrency = data.code;
                        window.localStorage.setItem("currency", data.code);
                        console.log("Set localCurrency to: " + data.code);
                        localCurrency = data.code;
                    })
            })

    } catch (error) {
        localCurrency = null;
    }
}


async function GetItems() {

    try {
        const response = await fetch('https://db-api-wishlist.lunalu.org/?get=items&category=nsfw');
        const data_nsfw = await response.json();

        for (const item of data_nsfw) {
            const product = document.createElement('div');
            product.setAttribute("onclick", "window.location.href='" + item.url + "'");

            const title = document.createElement('h1');
            title.innerText = item.title;

            const price = document.createElement('h3');

            if (item.currency === localCurrency || localCurrency == null) {
                price.innerText = item.price + " " + item.currency;
            } else {
                let convertedPrice = await convertPrice(item.price, item.currency, localCurrency);
                if (convertedPrice === "Error") {
                    price.innerText = item.price + " " + item.currency;
                }
                price.innerText = convertedPrice + " " + localCurrency;
            }

            const container = document.createElement('div');
            container.classList.add("tn-container");

            const img = document.createElement('img');
            img.src = item.img_url;
            img.classList.add("folder-tn");

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