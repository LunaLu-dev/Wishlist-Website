//Read Data
async function GetCategories() {
    fetch('https://db-api-wishlist.lunalu.org/?get=categories')
        .then(response => response.json())
        .then(data => {
            data.forEach((item) => {

                const category = document.createElement('div');

                if (item.external_state === true) {
                    category.setAttribute("onclick", "window.location.href='" + item.external_url + "'");
                } else {
                    category.setAttribute("onclick", "window.location.href='category?get=items&category=" + item.code_name + "'");
                }


                const title = document.createElement('h1');
                title.innerText = item.title;

                console.log("adding category: ", item.title)

                const container = document.createElement('div');
                container.classList.add("tn-container");

                const img = document.createElement('img');
                img.src = item.img_url;
                img.classList.add("folder-tn");

                container.appendChild(img);
                category.appendChild(container);
                category.appendChild(title);
                document.getElementById('root-folder-bundle-div').appendChild(category);

            })
        })
        .catch(error => console.error('Error:', error));
}

void GetCategories();
