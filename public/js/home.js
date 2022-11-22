
// หน้า home
const greeting = document.querySelector('.greeting');
//const email = document.querySelector('.email');

window.onload = () => {
    if(!sessionStorage.email){
        location.href = '/login';
    } else {
      //greeting.innerHTML = `hello ${sessionStorage.email}`;
      
      //------------------------- filter ---------------------
        fetch('/user-all')
        .then((response) => response.json())
        .then(data =>{
        //console.log(data);
        const result = data.filter((userData) => {
          //console.log(userData);
            return userData.email === sessionStorage.email
          })
          console.log(result[0])
          greeting.innerHTML = `name: ${result[0].name} <br> role: ${result[0].role.name} <br> 
                                email: ${result[0].email}`;
        //   greeting.innerHTML = result[0].email+","+result[0].name;
      })
      
    }
}

//ปุ่ม logout
const logOut = document.querySelector('.logout');
 
logOut.onclick = () => {
    sessionStorage.clear();
    location.reload();
 }


