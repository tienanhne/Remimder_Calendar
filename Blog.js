const api = 'http://localhost:3000/Remimder'
function start() {
    getNote(render);
}
start();
function getNote(cb) {
    fetch(api)
        .then(response => response.json())
        .then(cb)

}

function render(notes) {
    const listNote = document.querySelector('.row')
    let RenderHtml = notes.map((note) => {
        return `
            <div class="col c-3 box-note">
                <div class="boxBlog">
                <div class="IdBlog"><span>${note.id}</span> <p class = "Edit" style="color:red;cursor: pointer;">Edit</p></div>
                <h1>${note.Title}</h1>
                <p>${note.Describe}</p>
                <p>${note.Content}</p>
                </div>
            </div>`
    }).join('')
    listNote.innerHTML = RenderHtml;
}