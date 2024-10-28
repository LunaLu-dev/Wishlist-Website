let localCurrency;

window.onload = async function(){

    if(window.localStorage.getItem("currency") == null){
        await setLocalCurrency().then(r => {
            if (r.length === 3){
                window.localStorage.setItem("currency", r);
                console.log("Currency set to: " + r);
                localCurrency = r;
            }else{
                console.log("Failed to set localCurrency");
                localCurrency = "SEK";
            }
        });
    }else{
        localCurrency = window.localStorage.getItem("currency");
    }

    setPrice('displate-1')
        .then(r => {
            const id = document.getElementById('displate-1');
            let price = parseFloat(r);
            id.innerHTML = price.toLocaleString(navigator.language, { style: 'currency', currency: localCurrency });
        });
    setPrice('displate-2')
        .then(r => {
            const id = document.getElementById('displate-2');
            let price = parseFloat(r);
            id.innerHTML = price.toLocaleString(navigator.language, { style: 'currency', currency: localCurrency });
        });
    setPrice('displate-3')
        .then(r => {
            const id = document.getElementById('displate-3');
            let price = parseFloat(r);
            id.innerHTML = price.toLocaleString(navigator.language, { style: 'currency', currency: localCurrency });
        });
}

async function setPrice(id){
    try{
        const price = document.getElementById(id).getAttribute("price");
        const currency = document.getElementById(id).getAttribute("curr");

        request_builder = "http://api-wishlist.lunalu.org//?amount=" + price + "&from_curr=" + currency + "&to_curr="+ localCurrency;

        const response = await fetch(request_builder, {
            method: 'GET'
        });
        if (!response.ok) {
            return "Error";
        }
        const data = await response.text();
        console.log(data);
        return data;
    }
    catch(error){
        console.error("An error occurred while trying to connect to server: ", error);
    }
}


async function setLocalCurrency(){
    try{
        const response = await fetch("http://ip-api.com/json/?fields=currency", {
            method: 'GET'
        });
        if (!response.ok) {
            return "Error";
        }
        const data = await response.text();
        let json = JSON.parse(data).currency;
        console.log(json);
        return json;
    }
    catch(error){
        console.error("An error occurred trying to get local localCurrency: ", error);
    }
}