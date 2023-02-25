const api = 'http://localhost:3000/Remimder'
function start() {
    getNote(render);

}

const menutoggle = document.querySelector(".menutoggle"),
    navigation = document.querySelector(".navigation"),
    listMenu = document.querySelectorAll(".listMenu");
menutoggle.onclick = function () {
    navigation.classList.toggle("openMenu")
}
function activeList() {
    listMenu.forEach((item) => (
        item.classList.remove('actives')))
    this.classList.add('actives')
}
listMenu.forEach((item) => item.addEventListener('click', activeList))
var ObJBlog = {};
start();
function getNote(cb) {
    fetch(api)
        .then(response => response.json())
        .then(cb)
}
let ids;
const arrayMonth = ["January",
    "February",
    "March",
    "April",
    "May ",
    "June ",
    "July",
    "August ",
    "September",
    "October ",
    "November",
    "December"]


function sortUp(arrNotify){
    for(let i = 0; i < arrNotify.length; i++){
        for(let j = i + 1; j < arrNotify.length; j++){
            let timeNow = new Date(`${arrNotify[i].day} ${arrayMonth[arrNotify[i].month]} ${arrNotify[i].year}`).getTime()
            let timeSkip = new Date(`${arrNotify[j].day} ${arrayMonth[arrNotify[j].month]} ${arrNotify[j].year}`).getTime()
            if(timeNow > timeSkip){
                let temp = arrNotify[i];
                arrNotify[i] = arrNotify[j];
                arrNotify[j] = temp;
            }
        }
    }
    return arrNotify;
}

function render(notes) {
    let SortArray = sortUp(notes)
    ObJBlog = notes;
    ids = ObJBlog.map((note) => { return note.id })
    const listNote = document.querySelector('.row')
    let RenderHtml = SortArray.map((note) => {
        return `
            <div class="col c-3 box-note">
                <div class="boxBlog">
                <p class="date_modal">Ngày ${note.day} Tháng ${note.month + 1} Năm ${note.year}</p>
                <div class="IdBlog"><div><i  data-id="${note.id}"  class='bx bx-edit' onclick = edit(${note.id},${note.day},${note.month},${note.year})></i> <i data-id="${note.id}" class='bx bxs-tag-x' onclick= handeldelete(${note.id})></i></div></div>
                <h1>${note.Title}</h1>
                <p>${note.Describe}</p>
                <p class="fitcontent">${note.Content}</p>
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
function edit(id, day, month, year) {
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

function handeldelete(id) {
    var confirms = "ban chac chan muon xoa id thu: " + id;
    if (confirm(confirms) == false) {
        return;
    } else {
        let DelData = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow'
        };
        fetch("http://localhost:3000/Remimder/" + id, DelData)
            .then(response => response.text())
            .then(result => console.log(result)

            )
            .catch(error => console.log('error', error));
    }



}