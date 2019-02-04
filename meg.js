
const main = document.querySelector("main");

const db = firebase.database(); 

const meg = db.ref("portfolio/json/meg"); 

function omMeg (snap) {
    const innhold = snap.val(); 

    main.innerHTML = `
    <div class="tekst-meg">
        <h3>${innhold.tittel}</h3>
        <p>${innhold.studie}</p>
        <p>${innhold.fulltid}</p>
        <p>${innhold.kontakt}</p>
        <form method="get" action="img/CV.pdf" target="_blank">
            <button type="submit">Last ned CV</button>
        </form>
    </div>

    <div class="bilde-meg">
        <img src="${innhold.bilde}">
    </div>
    `;
}

meg.on("value", omMeg);
