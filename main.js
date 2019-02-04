
const main = document.querySelector(".scroll.container"); 
const header = document.querySelector("header"); 

const db = firebase.database(); 

const prosjekter = db.ref("portfolio/prosjekter");
const intro = db.ref("portfolio/json/intro"); 


function forsideTekst(snap) {
    const info = snap.val(); 

    header.innerHTML += `
    <h1>${info.tittel}</h1>
    <p>${info.tekst}</p>
    `;
}

function forsideProsjekter(snap) {
    const pid = snap.key; 
    const prosjekt = snap.val(); 

    main.innerHTML += `
    <div class="link">
        <h2>${prosjekt.overskrift}</h2>
        <a href="prosjekt.html?pid=${pid}">
            <div style="background-image: url('${prosjekt.forsidebilde.url}')"></div>
        </a>
    </div>
    `;
}

intro.on("value", forsideTekst);
prosjekter.on("child_added", forsideProsjekter);

