window.onload = () => {
    if(sessionStorage.getItem("key") == null){
        location.href = '/index.html';
    }
}

const logOut = document.querySelector('.logout');

logOut.onclick = () => {
    sessionStorage.clear();
    location.reload();
}