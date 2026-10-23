// app per gestire i proprio esercizi quando si va in palestra 
//un bottone per la darkmode
// ha un input per inserire gli esercizi un numero di serie e il numero di ripetizioni
//una barra di ricerca che ti permette di cercare l esercizi inseriti e 
// una select che filtra per preferiti e completati
// una select che mette in ordine gli esercizi !non ancora funzionante
//un bottone che ti permette di eliminare i vari esercizi
//un campo nel footer per cercare le strutture nella zona !non funzionante

const btnInvia = document.querySelector('#btnInvia')
const InputExercise = document.querySelector('#InputExercise')
const numberSerie = document.querySelector('#numberSerie')
const numberTutoring = document.querySelector('#numberTutoring')
const lista = document.querySelector('#Lista')
const Lightmode = document.querySelector('#Lightmode')
const barRicerca = document.querySelector('#barRicerca')
const filterExescise = document.querySelector('#filterExescise')

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
if(InputExercise.value !== ''){
	lista.textContent = ''		//ripuliamo la lista altrimenti stampa sempre tutto l'array
	const nuovoOggettoTask = {     //creiamo l oggetto da inserire e gli assegniamo i valori estratti dall input
           nameExercise: InputExercise.value,
           numSeries: numberSerie.value,
           numTutoring: numberTutoring.value
	};
	myExercise.push(nuovoOggettoTask)	//pushiamo l oggetto creato nell'array
	InputExercise.value = ''			//ripuliamo il campo di input dopo il click
	aggiungiTask();					//richiamiamo la funzione per aggiungere a schermo avendo ripulito il contenuto dell array stampa solo l oggetto creato
				//aggiorniamo il contatore dopo aver aaggiunto l oggetto
} 
})

function aggiungiTask(arrayDaStampare = myExercise) {
    lista.textContent = ''	
	arrayDaStampare.forEach((task, index) => {
		const newLi = document.createElement('li');
    newLi.classList.add('liLista')
		
		const textExercise = document.createElement('span');
		textExercise.textContent = task.nameExercise;
		newLi.appendChild(textExercise);

        // const singoloTutoring = task.numTutoring
		const taskSeries = document.createElement('span');
		 taskSeries.classList.add('taskSeries')
		taskSeries.textContent = ` ${task.numSeries} serie da ${task.numTutoring} ripetizioni`
		newLi.appendChild(taskSeries);

    
        const aggiungiAPreferiti = document.createElement('button');
		aggiungiAPreferiti.textContent = 'Aggiungi a preferiti';
		aggiungiAPreferiti.setAttribute('type', 'button')
		aggiungiAPreferiti.setAttribute('id', `aggiungi-${index + 1}`)
        aggiungiAPreferiti.classList.add('btnAggiungi')
        aggiungiAPreferiti.classList.add('btnLi')
		newLi.appendChild(aggiungiAPreferiti);
        
    
    const btnCompletato = document.createElement('button');
		btnCompletato.textContent = 'Completato';
		btnCompletato.setAttribute('type', 'button')
		btnCompletato.setAttribute('id', `modifica-${index + 1}`)
    btnCompletato.classList.add('btnLi')
        btnCompletato.classList.add('btnCompletato')
		newLi.appendChild(btnCompletato);
		


        const elimina = document.createElement('button');
		elimina.textContent = 'X';
		elimina.setAttribute('type', 'button')
		elimina.setAttribute('id', index + 1)
        elimina.classList.add('btnElimina')
        elimina.classList.add('btnLi')
		newLi.appendChild(elimina);
		
        
		lista.appendChild(newLi);
    
    
	});
}
aggiungiTask(myExercise);

//gestione btn nei li tramite classi aggiunte con js
lista.addEventListener('click', (e) => {
    e.preventDefault()
    if(e.target.classList.contains('btnElimina')) {
        const indiceDaEliminare = Number(e.target.id) - 1;
        console.log(`Hai premuto il tasto Elimina con ID: ${e.target.id}`);
        myExercise.splice(indiceDaEliminare, 1);
        aggiungiTask();
        alert('hai eliminato l\'esercizio')
      }
        
      if (e.target.classList.contains('btnAggiungi')) {
          console.log(`Hai premuto aggiungiPreferiti con id: ${e.target.id}`);
         const indexId = Number(e.target.id.replace('aggiungi-', '')) - 1;
          const esercizioSelezionato = myExercise[indexId];   
          MyPreferit.push(esercizioSelezionato)
          console.log(MyPreferit)
          alert('Hai aggiunto l\'esercizio ai preferiti')
      }
      
      if (e.target.classList.contains('btnCompletato')) {
          console.log(`Hai premuto btnCompletato con id: ${e.target.id}`);
         const indexId = Number(e.target.id.replace('modifica-', '')) - 1;
          const esercizioCompletato = myExercise[indexId];
          myComplet.push(esercizioCompletato)
          console.log(myComplet)
          
      }

})

//DARK MODE

Lightmode.addEventListener('click', () => {
  document.querySelector('body').classList.toggle('darkMode');
  
 const liDark = document.querySelectorAll('.liLista')
  liDark.forEach(task => {
  task.classList.toggle('ListaDarkMode');
    });
    const btnLi = document.querySelectorAll('.btnLi');
    btnLi.forEach( btn => {
      btn.classList.toggle('btnDarkMode')
    })
  })
      
      
//funzione per ricerca live

barRicerca.addEventListener('input', (e) => {
  const cercaEsercizio = e.target.value.trim();
  const filtroArray = myExercise.filter( task => 
    task.nameExercise.toLowerCase().includes(cercaEsercizio)
  );
  aggiungiTask(filtroArray)
})


//FUNZIONE FILTRO

filterExescise.addEventListener('change', (e) => {
  const selettoreScelto = e.target.value;
  if(selettoreScelto === 'preferiti'){
    aggiungiTask(MyPreferit)
  } else if( MyPreferit.length === 0) {

    
   let oggettoVuoto = {
      nameExercise: "inserisci esercizio ai preferiti",
    numSeries: 'insisci' ,
    numTutoring: 'inseri',
    }
    MyPreferit.push(oggettoVuoto)
    aggiungiTask(MyPreferit)
  } 
  
  if(selettoreScelto === 'completati') {
    aggiungiTask(myComplet)
  } 
  if(selettoreScelto === 'tutti') {
    aggiungiTask(myExercise)
  }
})


