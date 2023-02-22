const currentDate = document.querySelector(".current_date"),
    daysTag = document.querySelector(".days"),
    leftorright = document.querySelectorAll(".icons span"),
    Node = document.getElementById('tagname'),
    Close = document.getElementById('close'),
    menutoggle = document.querySelector(".menutoggle"),
    navigation = document.querySelector(".navigation"),
    listMenu = document.querySelectorAll(".listMenu");

let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

// sidebar JS 
menutoggle.onclick = function () {
    navigation.classList.toggle("openMenu")
}
function activeList() {
    listMenu.forEach((item) => (
        item.classList.remove('actives')))
    this.classList.add('actives')
}
listMenu.forEach((item) => item.addEventListener('click', activeList))



// window.addEventListener("load", function () {
//     setTimeout(function open(event) {
//         document.querySelector(".container").style.display = "block";
//         document.querySelector(".lds-hourglass").style.display = "none";
//     }, 2500)
// })

// const arrayMonth = ["January",
//     "February",
//     "March",
//     "April",
//     "May ",
//     "June ",
//     "July",
//     "August ",
//     "September",
//     "October ",
//     "November",
//     "December"]

function renderCalendar(data){
    console.log(data);
    let firstDay = new Date(currYear, currMonth, 1).getDay(),
        lastDate = new Date(currYear, currMonth + 1, 0).getDate(), // xem ngày cuối cùng của tháng
        lastdatofmonth = new Date(currYear, currMonth, lastDate).getDay(),
        lastDateof = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";
    for (let i = firstDay; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateof - i + 1}</li>`
    }
    for (let i = 1; i <= lastDate; i++) {
        let today = i === date.getDate() && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear() ? "active" : "";
        
            let isToday 
        if(data){
            data.forEach(data =>
                {
                    if(i === data.day && currMonth === data.month && currYear === data.year){

                        
                          isToday  = "isToday"
                          return isToday
                    }
                    console.log(isToday);
                   
                })
            
        }
        // console.log(isToday);
        liTag += `<li onclick="clickNode(${i},${currMonth},${currYear})" class="${today} ${isToday}">${i}</li>`

        //onsole.log(i);
    }
    for (let i = lastdatofmonth; i < 6; i++) {
        liTag += `<li onclick="clickNode()" class="inactive">${i - lastdatofmonth + 1}</li>`
    }
    currentDate.innerHTML = `Tháng ${currMonth + 1} ${currYear}`
    if (daysTag) {
        daysTag.innerHTML = liTag;
    } else {
        console.log('element not found');
    }
    
}
const api = 'http://localhost:3000/Remimder'
function getNote() {
    fetch(api)
        .then(response => response.json())
        .then(renderCalendar)

}
getNote()
leftorright.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "left" ? currMonth - 1 : currMonth + 1;
        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date()
        }
        getNote();
    })
})
var overplay = document.querySelector(".overplay"),
    reminderDate = document.querySelector(".dateView"),
    modalshow = document.querySelector(".modalBox");
let Button_Submit = document.getElementById("Submit");
function hideModal() {
    overplay.style.display = "none";
}
overplay.addEventListener('click', hideModal)
modalshow.addEventListener('click', function (event) {
    event.stopPropagation()
})
function clickNode(day,month,year) {
    overplay.style.display = "block";
    reminderDate.innerText = `Ngày ${day} Tháng ${currMonth + 1} Năm ${currYear}`
    openModal(day,month,year)
}

Close.addEventListener("click", () => {
    document.querySelector(".overplay").style.display = "none";
})

function CreateBlog(data, callback) {
    console.log(data);
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch("http://localhost:3000/Remimder", options)
        .then(function (response) { response.json() })
        .then((data) => console.log(data))
        .catch(error => console.log('error', error));
}
function openModal(day,month,year){
    console.log(day,month,year);
const Form = document.getElementById("Form")
    Form.addEventListener('submit', function (e) {
        e.preventDefault();
        var tieude = document.getElementById("tieude").value,
            mota = document.getElementById("mota").value,
            noidung = document.getElementById("noidung").value;
        var FormData = {
            Title: tieude,
            Describe: mota,
            Content: noidung,
            day,
            month,
            year
        }
        CreateBlog(FormData)
        console.log(FormData)
        document.querySelector(".overplay").style.display = "none";
    })
}
// Blog
function addNote(data){
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
    }
    fetch(api,option)
        .then(response => response.json())
}

function DeleteData() {
    let DelData = {
        method: 'DELETE',
        redirect: 'follow'
    };
    fetch("http://localhost:3050/Remimder", DelData)
        .then(response => response.text())
        .then(result => console.log(result)

        )
        .catch(error => console.log('error', error));
}
function EditData() {
    let PutData = {
        method: 'PUT',
        redirect: 'follow'
    };

    fetch("http://localhost:3050/Remimder", PutData)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
