chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let taburl = tabs[0].url;

    var img = "";

    if(taburl.includes("https://www.inet.se")){
        // Match the regular expression against the URL.
        var match = taburl.match(/(\d+)/);

        // Get the matched string.
        var productId = match[0];

        img = "https://cdn.inet.se/product/688x386/" + productId + "_0.png";
    }
    else if(taburl.includes("https://www.webhallen.com")){
        // Match the regular expression against the URL.
        var match = taburl.match(/(\d+)/);

        // Get the matched string.
        var productId = match[0];

        img = "https://cdn.webhallen.com/images/product/" + productId;
    }



    // Get the ID of the tab that contains the iframe.
    chrome.tabs.query({url: "https://wishlist.aiboteri.net/"}, function(tabs) {
    var tabId = tabs[0].id;
  
    chrome.scripting.executeScript({
      target: {tabId},
      func: function(taburl, img) {
          localStorage.setItem("img", img);
          localStorage.setItem("link", taburl);
        },
        args: [
            taburl,
            img
        ]
    });

  });
});


