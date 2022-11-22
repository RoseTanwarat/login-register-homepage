// form loading animation

const form = [...document.querySelector('.form').children];

form.forEach((item, i) => {
    setInterval(() => {
        item.style.opacity = 1;
    }, i*100);
})

// form validation

const name = document.querySelector('.name') || null;
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');
const selectRole = document.querySelector('.role');


if( name == null) {
    submitBtn.addEventListener('click', () => {
        fetch('/login-user',{
            method:'post',
            // headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(data => {
            // if(data.name){
            //     alert('login successful');
            // } else{
            //     alert(data);
            // }

            validateData(data);
        })
    })

} else{
    submitBtn.addEventListener('click', () =>{
        // console.log( name.value, email.value,password.value,selectRole.value);
        fetch('/register-user',{
            method: 'post',
            // headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                password: password.value,
                selectRole: selectRole.value
            })
        })
        .then(res => res.json())
        .then(data => {
            // if(data.name){
            //     alert('register successful');
            // } else{
            //     alert(data);
            // }

            validateData(data);
        })
    })

}

const validateData = (data) => {
    if(!data.name){
        alertBox(data);
    } else{
        sessionStorage.name = data.name;
        sessionStorage.email = data.email;
        location.href = '/';
    }
}

const alertBox = (data) => {
    const alertContainer = document.querySelector('.alert-box');
    const alertMsg = document.querySelector('.alert');
    alertMsg.innerHTML = data;

    alertContainer.style.top = `5%`;
    setTimeout(() => {
        alertContainer.style.top = null;
    }, 5000);
}

window.onload = () => {
    //ตอนโหลดเว็บต้องการให้ข้อมมูล select ขึ้นโชว์เลย
fetch('/role-all')
  .then((response) => response.json())
  .then(data =>{
    // console.log(data);
    let output = "" ;
    data.forEach(role => {
        output += `<option value="${role.id}">${role.name}</option>`;
        console.log(role.name);
    })
    selectRole.innerHTML = output;
  })
  // ตอนโหลดเว็บถ้ามีการเก้บข้อมูล email ไว้ใน browser ให้ไปที่หน้า home
    if (sessionStorage.email) {
        location.href = '/';
    }
}












