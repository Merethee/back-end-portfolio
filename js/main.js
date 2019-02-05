
const main = document.querySelector(".scroll.container"); 
const header = document.querySelector("header"); 
const footer = document.querySelector("footer"); 

const db = firebase.database(); 

const prosjekter = db.ref("portfolio/prosjekter");
const intro = db.ref("portfolio/json/intro"); 


function forsideTekst(snap) {
    const info = snap.val(); 

    header.innerHTML += `
    <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000"  data-aos-delay="300">
        <h1>${info.tittel}</h1>
        <p>${info.tekst}</p>
    </div>
        <p class="skroll-ned">skroll nedover for å bla i prosjektene
        <span class="line"></span>
        </p>
    `;

    footer.innerHTML += `
    <p class="copyright">Copyright &#169; 2019 - Merethe Ølstøren</p>
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

