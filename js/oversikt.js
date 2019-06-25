
const main = document.querySelector("main"); 

const db = firebase.database(); 

const prosjekter = db.ref("portfolio/prosjekter"); 

function visProsjekt(snap) {
    const pid = snap.key; 
    const prosjekt = snap.val();

    main.innerHTML += `
    <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000"  data-aos-delay="300">
        <article style="background-image: url('${prosjekt.forsidebilde.url}')">
            <a href="prosjekt.html?pid=${pid}">
            <h1>${prosjekt.overskrift}</h1>
            <p>${prosjekt.tittel}</p>
            </a>
        </article>
    </div>
    `;
}

prosjekter.on("child_added", visProsjekt);

