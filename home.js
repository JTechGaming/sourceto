const greeting = document.querySelector('.greeting');

window.onload = () => {
    if(sessionStorage.getItem("key") == null){
        location.href = '/index.html';
    } else{
        greeting.innerHTML = `Hello ${sessionStorage.getItem("key")}`;
    }
}

const logOut = document.querySelector('.logout');

logOut.onclick = () => {
    sessionStorage.clear();
    location.reload();
}