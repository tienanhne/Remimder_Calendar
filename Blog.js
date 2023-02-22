const api = 'http://localhost:3000/Remimder'
function start() {
    getNote(render);
    
}
var ObJBlog = {};
start();
function getNote(cb) {
    fetch(api)
        .then(response => response.json())
        .then(cb)
}
let ids, days, month, year; 
function render(notes) {
    ObJBlog = notes;
    ids = ObJBlog.map((note) => {return note.id})
    const listNote = document.querySelector('.row')
    let RenderHtml = notes.map((note) => {
        return `
            <div class="col c-3 box-note">
                <div class="boxBlog">
                <p class="date_modal">Ngày ${note.day} Tháng ${note.month + 1} Năm ${note.year}</p>
                <div class="IdBlog"><span>${note.id}</span><i  data-id="${note.id}"  class='bx bx-edit' onclick = edit(${note.id},${note.day},${note.month},${note.year})></i> </div>
                <h1>${note.Title}</h1>
                <p>${note.Describe}</p>
                <p>${note.Content}</p>
                </div>
            </div>`
    }).join('')
    listNote.innerHTML = RenderHtml;
}
function hideModal() {
    overplay.style.display = "none";
}
var overplay = document.querySelector(".overplay"),
    reminderDate = document.querySelector(".dateView"),
    modalshow = document.querySelector(".modalBox"),
    Close = document.getElementById('close'),
    EditData = document.getElementById("Submit");
overplay.addEventListener('click', hideModal)
modalshow.addEventListener('click', function (event) {
    event.stopPropagation()
})
Close.addEventListener("click", () => {
    document.querySelector(".overplay").style.display = "none";
})
var tieude = document.getElementById("tieude"),
    mota = document.getElementById("mota"),
    noidung = document.getElementById("noidung"),
    IDs = document.getElementById("Id");
function edit(id,day,month,year) {
    ObJBlog.map((note) => {
        if (note.id == id) {
            IDs.value = note.id
            tieude.value = note.Title
            mota.value = note.Describe
            noidung.value = note.Content
            document.querySelector(".overplay").style.display = "block";
        } else {
            console.log("Lỗi")
        }

    }) 
   EditData.addEventListener("click", () => {
    var id = IDs.value
    console.log(id)
    let SetData = {
        day: day,
        month: month,
        year: year,
        Title: tieude.value,
        Describe: mota.value,
        Content: noidung.value,  
    }
    var requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(SetData)
    };

    fetch("http://localhost:3000/Remimder/" + id, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}) 
}