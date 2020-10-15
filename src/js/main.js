const menuNav = document.querySelector('.menu-nav');
const menuBtn = document.querySelector('.menu-btn');

let showMenu = false;
menuBtn.addEventListener('click', toggleMenu)


function toggleMenu() {
    if(!showMenu) {
        menuBtn.classList.add('close');
        menuNav.classList.add('show');
    }else{
        menuBtn.classList.remove('close');
        menuNav.classList.remove('show')
    }
}
