const btnTask = document.querySelector(".btn_Task button")
var overplay = document.querySelector(".overplay"),
    reminderDate = document.querySelector(".dateView"),
    modalshow = document.querySelector(".modalBox"),
    Close = document.getElementById('close'),
    EditData = document.getElementById("Submit");

function hideModal() {
    overplay.style.display = "none";
}
overplay.addEventListener('click', hideModal)
modalshow.addEventListener('click', function (event) {
    event.stopPropagation()
})
Close.addEventListener("click", () => {
    document.querySelector(".overplay").style.display = "none";
})
btnTask.addEventListener("click", () => {
    document.querySelector(".overplay").style.display = "block";
})

function saveTask() {
    let tieude = document.getElementById("tieude").value,
        mota = document.getElementById("mota").value,
        noidung = document.getElementById("noidung").value;
    if (tieude && mota && noidung) {
        let ListTask = localStorage.getItem('listTask') ? JSON.parse(localStorage.getItem('listTask')) : [];
        ListTask.push(
            {
                title: tieude,
                Describe: mota,
                content: noidung,
            }
    );
        localStorage.setItem('listTask', JSON.stringify(ListTask));
        this.renderTask();
        this.resetList()
        document.querySelector(".overplay").style.display = "none";
    }
}
function resetList() {
    tieude = document.getElementById("tieude").value = '',
        mota = document.getElementById("mota").value = '',
        noidung = document.getElementById("noidung").value = '';
    document.getElementById('index').value = index;
}
renderTask();
function renderTask() {
    let htmls;
    let ListTask = localStorage.getItem('listTask') ? JSON.parse(localStorage.getItem('listTask')) : [];
    if (ListTask.length === 0) return false;
    const listNote = document.querySelector('.row')
    let RenderHtml = ListTask.map((task,index) => {
        let TaskID = index;
        index++;
        return `
        <div class="col c-3 box-note">
        <div class="boxBlog">
            <div class="IdBlog"> <span>${index}</span> <div><i class='bx bx-edit' onclick=EditTask(${TaskID})></i> <i class='bx bxs-tag-x' onclick=DelTask(${TaskID})></i></div></div>
            <h1>${task.title}</h1>
            <p>${task.Describe}</p>
            <p class="fitcontent">${task.content}</p>
        </div>
        </div>`
    }).join('')
    listNote.innerHTML = RenderHtml;

}
function DelTask(id) {
    let ListTask = localStorage.getItem('listTask') ? JSON.parse(localStorage.getItem('listTask')) : [];
    ListTask.splice(id, 1);
    localStorage.setItem('listTask', JSON.stringify(ListTask));
    renderTask();
}
function EditTask(id) {
    document.querySelector(".overplay").style.display = "block";
    let ListTask = localStorage.getItem('listTask') ? JSON.parse(localStorage.getItem('listTask')) : [];
    document.getElementById("tieude").value = ListTask[id].title,
        document.getElementById("mota").value = ListTask[id].Describe,
        document.getElementById("noidung").value = ListTask[id].content;
    document.getElementById('index').value = id;
    document.getElementById('save').style.display = "none"
    document.getElementById('btn-click').style.display = "inline-block"
}
function Upload() {
    let ListTask = localStorage.getItem('listTask') ? JSON.parse(localStorage.getItem('listTask')) : [];
    let index = document.getElementById('index').value,
        tieude = document.getElementById("tieude").value,
        mota = document.getElementById("mota").value,
        noidung = document.getElementById("noidung").value
    ListTask[index] = {
        title: tieude,
        Describe: mota,
        content: noidung,
    }
    localStorage.setItem('listTask', JSON.stringify(ListTask));
    renderTask()
    resetList()
    document.getElementById('btn-click').style.display = "none"
    document.getElementById('save').style.display = "inline-block"
    document.querySelector(".overplay").style.display = "none";
}