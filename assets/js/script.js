// app per gestire i proprio esercizi quando si va in palestra 
//un bottone per la darkmode
// ha un input per inserire gli esercizi un numero di serie e il numero di ripetizioni
//una barra di ricerca che ti permette di cercare l esercizi inseriti e 
// una select che filtra per preferiti e completati
// una select che mette in ordine gli esercizi !non ancora funzionante
//barra di progresso che aumenta con esercizi completati e diminuisce se vengono eliminati !non funzionante
//un bottone che ti permette di eliminare i vari esercizi
//un campo nel footer per cercare le strutture nella zona !non funzionante

const btnInvia = document.querySelector('#btnInvia')
const InputExercise = document.querySelector('#InputExercise')
const numberSerie = document.querySelector('#numberSerie')
const numberTutoring = document.querySelector('#numberTutoring')
const lista = document.querySelector('#Lista')
const LightMode = document.querySelector('#LightMode')
const barRicerca = document.querySelector('#barRicerca')
const filterExescise = document.querySelector('#filterExescise')
const form = document.querySelector('form')


const myExercise = [
  {
    nameExercise: "Panca Piana Bilanciere",
    numSeries: "4",
    numTutoring: 7,
  },
  {
    nameExercise: "Squat con Bilanciere",
    numSeries: "4",
    numTutoring: 4,
  },
  {
    nameExercise: "Trazioni alla Sbarra",
    numSeries: 3,
    numTutoring: 5,
  },
  {
    nameExercise: "Military Press",
    numSeries: 4,
    numTutoring: 6,
  },
  {
    nameExercise: "Stacco da Terra (Deadlift)",
    numSeries: 3,
    numTutoring: 6,
  },
  {
    nameExercise: "Affondi Manubri",
    numSeries: 3,
    numTutoring: 5,
  },
  {
    nameExercise: "Lat Machine Avanti",
    numSeries: 4,
    numTutoring: 7,
  },
  {
    nameExercise: "Curl Manubri su Panca Inclinata",
    numSeries: 3,
    numTutoring: 4,
  },
  {
    nameExercise: "Pushdown Tricipiti Cavo",
    numSeries: 3,
    numTutoring: 7,
  }
];
const MyPreferit = []
const myComplet = []

//AGGIUNGI ESERCIZIO
btnInvia.addEventListener('click', () => {
  if (InputExercise.value !== '') {
    lista.textContent = ''
    const nuovoOggettoTask = {
      nameExercise: InputExercise.value,
      numSeries: numberSerie.value,
      numTutoring: numberTutoring.value
    };
    myExercise.push(nuovoOggettoTask)
    // InputExercise.value = '';
    aggiungiTask();
  contatore()
  form.reset()
  }
})

function aggiungiTask(arrayDaStampare = myExercise) {
  lista.textContent = ''
//controllo se la dark mode e attiva
const darkModeAttiva = document.querySelector('body').classList.contains('darkMode');
  
  arrayDaStampare.forEach((task, index) => {

    
    const newLi = document.createElement('li');
    newLi.classList.add('liLista');
    
//BOTTONE MODIFICA 
    const btnModifica = document.createElement('button');
    btnModifica.textContent = '📝';
    btnModifica.setAttribute('type', 'button');
    btnModifica.setAttribute('id', `modifica-${index + 1}`);   
    btnModifica.setAttribute('title', 'modifica il tuo esercizio')
    btnModifica.classList.add('btnLi');
    btnModifica.classList.add('btnModifica');
    newLi.appendChild(btnModifica);

//TESTO ESERCIZIO
    const textExercise = document.createElement('span');
    textExercise.textContent = task.nameExercise;
    newLi.appendChild(textExercise);

    //SERIE E RIPETIZIONI
    const taskSeries = document.createElement('span');
    taskSeries.classList.add('taskSeries');
    taskSeries.textContent = ` ${task.numSeries} serie da ${task.numTutoring} ripetizioni`;
    newLi.appendChild(taskSeries);

//BOTTONE PER AGGIUGERE AI PREFERITI
    const aggiungiAPreferiti = document.createElement('button');
    aggiungiAPreferiti.setAttribute('type', 'button');
    aggiungiAPreferiti.setAttribute('id', `aggiungi-${index + 1}`);
    aggiungiAPreferiti.setAttribute('title', 'aggiungi ai preferiti');
    aggiungiAPreferiti.classList.add('btnAggiungi' , 'btnLi');
   const isPreferito = MyPreferit.some(t => t.nameExercise === task.nameExercise);  //usiamo some per ottenere un valore booleano 
   aggiungiAPreferiti.textContent = !isPreferito ? '☆' : '⭐';  
   newLi.appendChild(aggiungiAPreferiti);
    
//BTN PER AGGIUNGERE AI COMPLETATI
    const btnCompletato = document.createElement('button');
    btnCompletato.textContent = 'Completato';
    btnCompletato.setAttribute('type', 'button');
    btnCompletato.setAttribute('id', `completato-${index + 1}`);
    btnCompletato.classList.add('btnLi', 'btnCompletato');
    newLi.appendChild(btnCompletato);


//BTN PER ELIMINARE
    const elimina = document.createElement('button');
    elimina.textContent = 'X';
    elimina.setAttribute('type', 'button');
    elimina.setAttribute('id', index + 1);
    elimina.classList.add('btnElimina', 'btnLi');
    newLi.appendChild(elimina);

//assegniamo di nuovo la classe prima di creare gli elementi per evitare che esca dalla darkmode 
// si attiva solo se il body ha la classe dark mode attiva
    
if(darkModeAttiva) {
      newLi.classList.add('ListaDarkMode');
    elimina.classList.toggle('btnDarkMode');
    btnCompletato.classList.toggle('btnDarkMode');
    btnModifica.classList.toggle('btnDarkMode');
    aggiungiAPreferiti.classList.toggle('btnDarkMode');
    btnInvia.classList.toggle('btnDarkMode')
    }

    lista.appendChild(newLi);


  });
}
aggiungiTask(myExercise);
contatore()


//gestione btn nei li tramite classi aggiunte con js
lista.addEventListener('click', (e) => {
  e.preventDefault();
  // A OGNI CLICK TROVIAMO L INDICE CHE CORRISPONDE AL BTNPREMUTO
  if (e.target.classList.contains('btnElimina')) {
    const indiceDaEliminare = Number(e.target.id) - 1; //traformiamo il valore ritornato in numero e gli togliamo -1 per far combaciare gli id
    console.log(`Hai premuto il tasto Elimina con ID: ${e.target.id}`);
    //controlliamo la select dei filtri e stampiamo l array giusto per ogni option
    if(filterExescise.value === 'preferiti') {
      MyPreferit.splice(indiceDaEliminare, 1);
      aggiungiTask(MyPreferit);
      contatore()
    }
    if(filterExescise.value === 'completati') {
      myComplet.splice(indiceDaEliminare, 1);
      aggiungiTask(myComplet);
    contatore()
    }
    if(filterExescise.value === 'tutti') {
      myExercise.splice(indiceDaEliminare, 1);
      aggiungiTask(myExercise);
      contatore()
    }
    alert('hai eliminato l\'esercizio');
  }

  if (e.target.classList.contains('btnAggiungi')) {
    console.log(`Hai premuto aggiungiPreferiti con id: ${e.target.id}`);
    const indexId = Number(e.target.id.replace('aggiungi-', '')) - 1;  //facciamo combaciare gli indici con gli id  
    const esercizioSelezionato = myExercise[indexId];
    MyPreferit.push(esercizioSelezionato);
    console.log(MyPreferit);
    contatore()
    alert('Hai aggiunto l\'esercizio ai preferiti');
   
  }

  if (e.target.classList.contains('btnCompletato')) {
    console.log(`Hai premuto btnCompletato con id: ${e.target.id}`);
    const indexId = Number(e.target.id.replace('completato-', '')) - 1;
    const esercizioCompletato = myExercise[indexId];
    myComplet.push(esercizioCompletato);
    console.log(myComplet);
    contatore()
    alert('Hai completato l\'esercizio');
  }

  if (e.target.classList.contains('btnModifica') || e.target.closest('.btnModifica')) {
    const targetBtn = e.target.closest('.btnModifica');
    console.log(`Hai premuto btnModifica con id: ${targetBtn.id}`);
    const indexId = Number(targetBtn.id.replace('modifica-', '')) - 1;
    const liElement = targetBtn.closest('li');
    
    const isEditing = targetBtn.classList.contains('inModifica');   // controlliamo s contiene la classe

    if (!isEditing) {
      // Attiva la modalità modifica trasformando il testo in input
      targetBtn.classList.add('in-modifica');
      targetBtn.textContent = '💾';
      targetBtn.setAttribute('title', 'Salva le modifiche');

      const esercizio = myExercise[indexId];
      liElement.textContent = '';
      const btnModifica = document.createElement('button');
    btnModifica.type = 'button';
    btnModifica.id = `modifica-${indexId + 1}`;
    btnModifica.className = 'btnLi btnModifica inModifica inputNumber';
    btnModifica.title = 'Salva le modifiche';
    btnModifica.textContent = '💾';
    liElement.appendChild(btnModifica);

const inputNome = document.createElement('input');
    inputNome.type = 'text';
    inputNome.className = 'esercizioName';
    inputNome.value = esercizio.nameExercise;
    liElement.appendChild(inputNome);

    const labelSerie = document.createElement('label');
    labelSerie.textContent = 'Serie:'
    liElement.appendChild(labelSerie);

    const inputSerie = document.createElement('input');
    inputSerie.type = 'text';
    inputSerie.className = 'eserciozSeries inputNumber';
    inputSerie.value = esercizio.numSeries;
    liElement.appendChild(inputSerie);

const labelRipetizioni = document.createElement('label');
labelRipetizioni.textContent = 'ripetizioni:'
    liElement.appendChild(labelRipetizioni);

    const inputRipetizioni = document.createElement('input');
    inputRipetizioni.type = 'text';
    inputRipetizioni.className = 'edit-tutoring inputNumber';
    inputRipetizioni.value = esercizio.numTutoring;
    liElement.appendChild(inputRipetizioni);

    } else {
      //  estraiamo valore esatto scritto dall'utente negli input in questo momento
      const nuovoNome = liElement.querySelector('.esercizioName').value;
      const nuoveSerie = liElement.querySelector('.eserciozSeries').value;
      const nuoveRipetizioni = liElement.querySelector('.edit-tutoring').value;


      //  ricrea l'elemento nell'array principale usando i nuovi valori
      if (nuovoNome.trim() !== '') {
        myExercise[indexId] = {
          nameExercise: nuovoNome,
          numSeries: nuoveSerie,
          numTutoring: nuoveRipetizioni
        };

      }
      
      
      aggiungiTask();
      contatore()
    }
  }
    })

//DARK MODE

LightMode.addEventListener('click', () => {
  
  LightMode.classList.toggle('darkModeBtn')
  const isDarkMode = document.querySelector('body').classList.toggle('darkMode');

  
  LightMode.textContent = isDarkMode ? '🌞' : '🌙';

  const containerExercise = document.querySelector('#containerExercise');
  containerExercise.classList.toggle('containerExerciseDarkMode');
  const formInterno = document.querySelectorAll('.formInterno');
  formInterno.forEach((task) => {

    task.classList.toggle('containerExerciseDarkMode');
  })


  const liDark = document.querySelectorAll('.liLista')
  liDark.forEach(task => {
    task.classList.toggle('ListaDarkMode');
  });
  const btnLi = document.querySelectorAll('.btnLi');
  btnLi.forEach(btn => {
    btn.classList.toggle('btnDarkMode');
  })
  btnInvia.classList.toggle('btnDarkMode');

})


//funzione per ricerca live

barRicerca.addEventListener('input', (e) => {
  const cercaEsercizio = e.target.value.trim();
  const filtroArray = myExercise.filter(task =>
    task.nameExercise.toLowerCase().includes(cercaEsercizio));
  aggiungiTask(filtroArray);
  contatore()
})


//FUNZIONE FILTRO

filterExescise.addEventListener('change', (e) => {
  const selettoreScelto = e.target.value;
  if (selettoreScelto === 'preferiti') {
    aggiungiTask(MyPreferit)
    contatore()
  } 

  if (selettoreScelto === 'completati') {
    aggiungiTask(myComplet)
    contatore()
  }
  if (selettoreScelto === 'tutti') {
    aggiungiTask(myExercise)
    contatore()
  }
})

//funzione modifica esercizio 


function contatore() {
const contoTotale = document.querySelector('#contatoreTutti')
const contoPreferiti = document.querySelector('#contatorePreferiti')

const contoCompletati = document.querySelector('#contatoreCompletati')
  contoTotale.textContent = myExercise.length
  contoPreferiti.textContent = MyPreferit.length
  contoCompletati.textContent = myComplet.length
}