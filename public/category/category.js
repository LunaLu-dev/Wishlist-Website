//Read Data
async function GetItems(){
  fetch('http://127.0.0.1:7002/?get=items&category=displate')
      .then(response => response.json())
      .then(data => {
        data.forEach((item) => {
          const product= document.createElement('div');
          product.setAttribute("onclick", "window.location.href='"+item.url+"'");

          const title = document.createElement('h1');
          title.innerText = item.title;

          const price = document.createElement('h3');
          price.innerText = item.price + " kr";


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

        })
      })
      .catch(error => console.error('Error:', error));
}

GetItems();

/*
<div id=root-folder-bundle-div>
  <div>
      <div class="tn-container">
        <img src=$imgsrc class="folder-tn">
      </div>
      <h1>$name</h1>
  </div>
</div>

*/
