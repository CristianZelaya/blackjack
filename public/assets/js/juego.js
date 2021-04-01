/*
    *2C = dos de Treboles (Clubs)
    *2D = dos de Diamante (Diaminds)
    *2H = dos de Corazones (Hearts)
    *2S = dos de Spades (Espadas)
*/
// Patron modulo es una funcion auto invocada
(() => {

    'use strict' //revisa el codigo de manera estricta

    let deck = [];

    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    // referencia html
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo'),
          divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');


    //Esta funcion inicializa el juego
    const inicializarJuego = (numJugadores = 2) =>{

        deck = crearDeck();

        puntosJugadores = [];
        for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }
        
        puntosHTML.forEach( elem => elem.innerText = 0);

        divCartasJugadores.forEach( elem => elem.innerHTML = '');

        btnDetener.disabled = false;
        btnPedir.disabled = false;

    }

    //esta funcion crea una bajara
    const crearDeck = () =>{

        deck = [];
        //crea las cartas del 2 al 10
        for(let i = 2; i <= 10; i++){
            for(let tipo of tipos){
                deck.push( i + tipo);
            }
        }

        //crea las cartas especiales
        for( let esp of especiales){
            for(let tipo of tipos){
                deck.push(esp + tipo);
            }
        }

        //barajea el deck
        return _.shuffle(deck);

    }

    // Esta funcion me permite tomar una carta
    const pedirCarta = () =>{

        if(deck.length === 0){
            throw 'Ya no hay mas cartas';
        }

        return deck.shift();

    }


    // Esta funcion da un valor a la carta
    const valorCarta = (carta) =>{

        const valor = carta.substring(0, carta.length - 1);

        return ( isNaN(valor))
                ? (valor === 'A') ? 11 : 10
                : valor * 1;
    }

    //Turno: 0 = primer jugador y el ultimo es la pc
    const acumularPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];

    }

    const crearCarta = (carta, turno) => {

        //<img class="carta" src="./assets/img/10C.png"></img>
        const imgCarta = document.createElement('img');
        imgCarta.src = `/img/${carta}.png`;
        imgCarta.classList = "carta";
        divCartasJugadores[turno].append(imgCarta);

    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosPC] = puntosJugadores;
        setTimeout(() =>{
            if (puntosMinimos === puntosPC){
                alert('Nadie Gana :(');
            } else if (puntosMinimos > 21){
                alert('Computadora Gana');
            } else if( puntosPC > 21){
                alert('Jugador Gana');
            } else{
                alert('Computadora Gana');
            }
        }, 100);

    }

    const turnoComputadora = (puntosMinimos) => {

        let puntosPC = 0;

        do{

            const carta = pedirCarta();
            
            puntosPC = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta( carta, puntosJugadores.length - 1);

            if (puntosMinimos > 21){
                break;
            }

        } while((puntosPC < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
        
    }

    // Eventos
    btnPedir.addEventListener('click', () =>{

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0);

        crearCarta( carta, 0);

        if ( puntosJugador > 21){
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if( puntosJugador === 21){
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });

    btnDetener.addEventListener('click', () => {
        
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);

    });

    btnNuevo.addEventListener('click', () =>{

        inicializarJuego();

    });
    
})();
