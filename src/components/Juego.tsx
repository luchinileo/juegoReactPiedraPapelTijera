import React, { useEffect, useState } from 'react'
import{FaRegHandRock,
    FaRegHandPaper,
    FaRegHandScissors,
} from 'react-icons/fa'

interface Puntaje{
  "jugador1":number,
  "jugador2":number
}


export const Juego = () => {
  /* 0-tijera, 1-papel, 2-piedra */
  const[numeroJ1, setNumeroJ1] = useState<number>(0)
  const[numeroJ2, setNumeroJ2] = useState<number>(0)
  const[puntajeJ1, setPuntajeJ1] = useState<number>(0)
  const[puntajeJ2, setPuntajeJ2] = useState<number>(0)
  const [puntajes, setPuntajes] = useState<Puntaje[]>([])
  const[jugadorGanador, setJugadorGanador] = useState<string>('')
  /*  const[puntajes, setPuntajes] = useState({
      'jugador1': 0,
      'jugador2':0
    }) */
    
  

  const [primeraEjecucucion, setPrimeraEjecucion] = useState<boolean>(true)
  const play = () =>{
    setNumeroJ1(Math.floor(Math.random() *3))
    setNumeroJ2(Math.floor(Math.random() *3))
    setPrimeraEjecucion(false)

    //al ser el useState asincrono al ejecutarlo  el resultado el valor no llega a actualizar
    

   // ejecutarResultado()

  }
  const reset =()=>{
    setNumeroJ1(0)
    setNumeroJ2(0)
    setPuntajeJ1(0)
    setPuntajeJ2(0)
    setPrimeraEjecucion(true)
    setPuntajes([])
    setJugadorGanador('')
    

  }
  //useEfect se ejecuta siempre en la primer carga de la vista (render)y se puede volver a ejecutar si tiene dependencia que cabies
//las dependencias son las que van entre corchetes [] al final del useEfect  
//es decir si uno de esos valores cambia se puede volver a ejecutar

//creamos una condicion que es un booleano y su primer estado es true
//validamos que su estado sea false, y si se cumple de esa unica manera ejecutamos la funcion ejecutarResultado

useEffect(()=> {
  //condicion para evitar el primer uso,
  if(primeraEjecucucion ===false){
    ejecutarResultado()
  }
},[numeroJ1, numeroJ2])

useEffect(()=>{
  if(primeraEjecucucion === false){
    //aca ejecutamos lo que queremos hacer
    //... puntaje
    setPuntajes([...puntajes,{"jugador1":puntajeJ1, "jugador2":puntajeJ2}])

    if(puntajeJ1 >= 10){
        setJugadorGanador('Gano el jugador 1')
        }else if (puntajeJ2 >= 10){
          setJugadorGanador('Gano el jugador 2')
        }
    
  }
},[puntajeJ1,puntajeJ2])


const ejecutarResultado=() =>{
  
      const opciones: {[clave: number]: string} = {
      0 : 'tijera',
      1 : 'papel',
      2 : 'piedra',
    }

    const posibilidades: {[clave: string]: string} =  {
      'tijera': 'papel',
      'papel': 'piedra',
      'piedra': 'tijera'
    }

    const iconoJ1 = opciones[numeroJ1]
    const iconoJ2 = opciones[numeroJ2]

    if(iconoJ1 !== iconoJ2){
    if(posibilidades[iconoJ1] === iconoJ2){
    setPuntajeJ1(prev=>prev +2)
    }else{
      setPuntajeJ2(prev=>prev +2)
    }
    }else {
      setPuntajeJ1(prev=>prev +1)
      setPuntajeJ2(prev=>prev +1) 
  }
  
}
  return (
    <>
        <h1>Piedra, Papel o Tijera</h1>
        <div className='contenedor_app'>
        {/* contenedor - Incluye iconos y botones*/}
        <div className='contenedor_principal'>
          <div className='contenedor_juego'>
                  {/*contenedor de los iconos y del vs  */}
            <div className='circulo'>1
              {/* cuando sea 0 mostrame tijera si numero===1 mostrame papel y si no mostrame piedra */}
                {numeroJ1 === 0 ? <FaRegHandScissors size={80}/> : numeroJ1 ===  1 ?<FaRegHandPaper size={80}/>: <FaRegHandRock size={80}/>}
            </div>
            <h2 className='texto_vs'>VS</h2>
            <div className='circulo'>2
            {numeroJ2 === 0 ? <FaRegHandScissors size={80}/> : numeroJ2 ===  1 ?<FaRegHandPaper size={80}/>: <FaRegHandRock size={80}/>}
            </div>
        </div>
        {/* contenedor del boton play */}
          <div className='contenedor_btn'>
            <button
             className='btn_play'
              onClick={play}
              disabled={jugadorGanador.length >0}
              >
              Play
              </button>
              <button
             className='btn_play'
              onClick={reset}
              
              >
              Reiniciar juego
              </button>
              </div>
          </div>
          <div className='contenedor_puntajes'>
              <table>
                <thead>
                  <tr>
                    <th> Jugador 1</th>
                    <th> Jugador 2</th>
                  </tr>
                </thead>
            {puntajes.map((puntaje,index)=>
                <tbody key ={index} style={{textAlign: 'center'}}>
                  <tr>
                    <td>{puntaje.jugador1}</td>
                    <td>{puntaje.jugador2}</td>
                  </tr>
                </tbody>
            )}
            </table>
          </div>
          </div>
          <h1>{jugadorGanador}</h1>
    </>
  )
}
            
            
            

                








