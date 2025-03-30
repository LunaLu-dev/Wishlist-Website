//Read Data
async function GetCategories(){
    fetch('http://127.0.0.1:7002/?get=categories')
        .then(response => response.json())
        .then(data => {
            data.forEach((item) => {

                const category = document.createElement('div');
                category.setAttribute("onclick", "window.location.href='category?category="+item.code_name+"'");

                const title = document.createElement('h1');
                title.innerText = item.title;

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

GetCategories();
