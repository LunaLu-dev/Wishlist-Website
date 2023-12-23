chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let taburl = tabs[0].url;
    console.log(taburl);

    var img = "";



    // Get the ID of the tab that contains the iframe.
    chrome.tabs.query({url: "https://wishlist.aiboteri.net/*"}, function(tabs) {
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


