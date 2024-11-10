let localCurrency;

window.onload = async function(){

    if(window.localStorage.getItem("currency") == null){
        await setLocalCurrency().then(r => {
            if (r != null){
                window.localStorage.setItem("currency", r);
                localCurrency = r;
            }else{
                console.error("Failed to set localCurrency");
                localCurrency = "SEK";
            }
        });
    }else{
        localCurrency = window.localStorage.getItem("currency");
    }

    const elements = document.getElementsByClassName("prices");

    for (let i = 0; i < elements.length; i++){
        setPrice(elements[i])
            .then(r => {
                let price = parseFloat(r);
                elements[i].innerHTML = price.toLocaleString(navigator.language, { style: 'currency', currency: localCurrency });
            });
    }
}

async function setPrice(element){
    try{
        const price = element.getAttribute("price");
        const currency = element.getAttribute("curr");

        let request_builder = "https://api-wishlist.lunalu.org//?amount=" + price + "&from_curr=" + currency + "&to_curr="+ localCurrency;

        const response = await fetch(request_builder, {
            method: 'GET'
        });
        if (!response.ok) {
            return "Error";
        }
        return await response.text();
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
        return JSON.parse(data).currency;
    }
    catch(error){
        console.error("An error occurred trying to get local localCurrency: ", error);
    }
}