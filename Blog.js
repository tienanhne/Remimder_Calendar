LoadData();

function LoadData() {
    fetch("http://localhost:3050/Remimder")
        .then(function (response) {
            return response.json();
        })
        .then(function (Gets) {
            console.log(Gets);
            let RenderHtml = Gets.map((item) => {
                return `
                    <div class="Col c-2-4">
                        <div class="boxBlog">
                        <h1>${item.Id} ${item.Title}</h1>
                        <p>${item.Describe}</p>
                        <p>${item.Content}</p>
                        </div>
                </div>
                `
            })
            var htmls = RenderHtml.join("");
          
             document.querySelector('.Row').innerHTML = htmls;
        })

}