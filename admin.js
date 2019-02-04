
const main = document.querySelector("main");
const skjemaTekst = document.querySelector("#skjemaTekst");
const inpOverskrift = document.querySelector("#inpOverskrift");
const inpTittel = document.querySelector("#inpTittel");
const inpTema = document.querySelector("#inpTema");
const inpLink = document.querySelector("#inpLink"); 

const inpSammendrag = document.querySelector("#inpSammendrag");
const inpMålgruppe = document.querySelector("#inpMålgruppe");
const inpProsjekt = document.querySelector("#inpProsjekt");

const publiser = document.querySelector("#publiser");

// CKEditor 
let sammendragEditor; 
let prosjektEditor; 
let målgruppeEditor; 

BalloonEditor
    .create( document.querySelector( '#inpSammendrag' ) )
    .then( newEditor => {
        sammendragEditor = newEditor; 
    } )
    .catch( error => {
    console.error( error );
} );

BalloonEditor
    .create( document.querySelector( '#inpProsjekt' ) )
    .then( newEditor => {
        prosjektEditor = newEditor; 
    } )
    .catch( error => {
    console.error( error );
} );


BalloonEditor
    .create( document.querySelector( '#inpMålgruppe' ) )
    .then( newEditor => {
        målgruppeEditor = newEditor; 
    } )
    .catch( error => {
    console.error( error );
} );


// lagrer prosjektet og pusher til porteføljen 
function lagProsjekt(evt) { 
    evt.preventDefault();

    const alleBildene = document.querySelectorAll(`#bilder article`);
    const bilderSomSkalLagres = [];

    for(const bilde of alleBildene) {
        const sel = bilde.querySelector("select");
            if(sel.value) {
            const indeks = parseInt(sel.value);
            bilderSomSkalLagres[indeks] = {
                url: sel.dataset.url,
                tekst: sel.dataset.tekst
            } 
        }
    }

    let forsidebilde = bilderSomSkalLagres[0]; 
    let skissebilde = bilderSomSkalLagres[1];
    let macbilde = bilderSomSkalLagres[2];
    let iphonebilde = bilderSomSkalLagres[3];

    if(bilderSomSkalLagres.length === 4) {
       const tittel = inpOverskrift.value;
       const arr = tittel.split(" ");
       const id = arr.join("-"); 

        const nyttProsjekt = admin.child(id);
        nyttProsjekt.set({
            overskrift: inpOverskrift.value,
            tittel: inpTittel.value,
            tema: inpTema.value, 
            link: inpLink.value, 
            målgruppe: målgruppeEditor.getData(),
            sammendrag: sammendragEditor.getData(),
            prosjekt: prosjektEditor.getData(),
            bilder: bilderSomSkalLagres,
            forsidebilde: forsidebilde,
            skissebilde: skissebilde,
            macbilde : macbilde,
            iphonebilde: iphonebilde
        });

        const melding = document.createElement("section");
        melding.innerText = "Prosjektet ble lagret og pushet til porteføljen";
        main.appendChild(melding);
        } else {
            alert("Du må velge eksakt 4 bilder til prosjektet!");
        }
        
   skjemaTekst.reset(); 
   målgruppeEditor.setData("");
   sammendragEditor.setData("");
   prosjektEditor.setData("");
}

skjemaTekst.addEventListener("submit", lagProsjekt);
publiser.addEventListener("click", lagProsjekt);


// login til administrasjonssiden 
const welcomeMessage = document.querySelector("header h3");

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        welcomeMessage.innerText = "Velkommen " + user.displayName; 

    } else {
        document.location.href = "login.html";
    }
});


