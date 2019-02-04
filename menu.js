
const meny = document.querySelector(".link-menu"); 
const soMe = document.querySelector(".contact"); 

const sidemeny = db.ref("portfolio/json/meny"); 

function visMeny (snap) {
    const link = snap.val(); 

    meny.innerHTML = `
    <a href="index.html">${link.hjem}</a>
    <div class="link-border"></div>
    <a href="meg.html">${link.meg}</a>
    <div class="link-border om"></div>
    <a href="oversikt.html">${link.oversikt}</a>
    <div class="link-border arbeid"></div>
    `;

    soMe.innerHTML = `
    <a href="${link.mail} target="_blank">
        <img src="${link.ikoner[0]}" alt="mail">
    </a>
    <a href="${link.linkedin}" target="_blank">
        <img src="${link.ikoner[1]}" alt="linkedin">
    </a>
    <a href="${link.github}" target="_blank">
        <img src="${link.ikoner[2]}" alt="github">
    </a>
    `;
}

sidemeny.on("value", visMeny);

  

// toggle meny

var sideNav = document.querySelector(".side-nav");
var ham = document.querySelector(".ham");

function menuHandler() {

  sideNav.classList.toggle("menu-toggle");
  ham.classList.toggle("change"); 

}

ham.addEventListener("click", menuHandler);

