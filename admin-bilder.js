
const skjemaBilder = document.querySelector("#skjemaBilder"); 
const bilder = document.querySelector("#bilder"); 
const inpTekst = document.querySelector("#inpTekst"); 
const inpFil = document.querySelector("#inpFil"); 

const db = firebase.database();

const admin = db.ref("portfolio/prosjekter"); 

const storage = firebase.storage(); 

const bildearkiv = db.ref("bilder"); 

function lastOppBilde(evt) {
    evt.preventDefault(); 
    overlay.style.display = "flex"; 

    const tekst = inpTekst.value;
    const bilde = inpFil.files[0]; 
    const filnavn = bilde.name; 
    
    const storageRef = storage.ref("prosjektbilder/" + (+new Date()) + filnavn);

    storageRef.put(bilde)
        .then(bildeData => bildeData.ref.getDownloadURL())
        .then(url => {
            bildearkiv.push({
                url: url,
                tekst: tekst
            });
            overlay.style.display = "none"; 
            skjemaBilder.reset(); 
        });       
}

function visBilde(snap) {
    const data = snap.val(); 
   
    bilder.innerHTML += `
        <article id="${snap.key}">
            <span onclick="fjernBilde('${snap.key}')">X</span>
            <p style="font-weight: 400;">${data.tekst}</p>
            <img src="${data.url}" alt="bilde">
            <select data-url="${data.url}" data-tekst="${data.tekst}">
                <option value="">Hvordan skal bildet brukes</option>
                <option value="0">Forsidebilde</option>
                <option value="1">Prosjekt skisser</option>
                <option value="2">Prosjekt Mockup mac</option>
                <option value="3">Prosjekt Mockup iphone</option>
            </select>
        </article>
    `;
}

function fjernBilde(key) {     
    const bildesomskalfjernes = bildearkiv.child(key);
    bildesomskalfjernes.remove();

    const kryss = document.querySelector(`#${key}`);
    bilder.removeChild(kryss);
}

skjemaBilder.addEventListener("submit", lastOppBilde);
bildearkiv.on("child_added", visBilde); 
