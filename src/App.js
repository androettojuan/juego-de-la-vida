import { useState } from "react";
import "./App.css";
import Celda from "./Componentes/Celda/celda";
import Fila from "./Componentes/fila/fila";

const GRANDE = 35;


const crearDato = () => {
  let nuevoDato = [];
  for (let i = 0; i < GRANDE; i++) {
    nuevoDato[i] = new Array(GRANDE).fill(false)
  }
  return nuevoDato;
}


function App() {
  const [dato, setDato] = useState(crearDato());

  const invertir = (numFila, numColumna) => {
    // ver el valor de la celda
    const valor = dato[numFila][numColumna];
    // guardar el valor contrario
    const nuevoDato = [...dato];
    nuevoDato[numFila][numColumna] = !valor;
    setDato(nuevoDato)
  }

  const datosTransformados = dato.map((fila,numFila) => (
    <Fila key={numFila}>
      {fila.map((celda,numColumna) => (
        <Celda key={numColumna} vivo={celda} onClick={() => invertir(numFila,numColumna)}></Celda>
      ))}
    </Fila>
  ));

  const corregirNumero = (numero) => {
    let n = numero;
    if (n < 0){
      n += GRANDE;
    }
    return n % GRANDE;
  }
  
  const calcVecinos = (datoActual, numFila, numColumna) => {
    const v1 = datoActual[corregirNumero(numFila-1)][corregirNumero(numColumna-1)] ? 1 : 0;
    const v2 = datoActual[corregirNumero(numFila-1)][corregirNumero(numColumna)] ? 1 : 0;
    const v3 = datoActual[corregirNumero(numFila-1)][corregirNumero(numColumna +1)] ? 1 : 0;
    const v4 = datoActual[corregirNumero(numFila)][corregirNumero(numColumna +1)] ? 1 : 0;
    const v5 = datoActual[corregirNumero(numFila+1)][corregirNumero(numColumna+1)] ? 1 : 0;
    const v6 = datoActual[corregirNumero(numFila+1)][corregirNumero(numColumna)] ? 1 : 0;
    const v7 = datoActual[corregirNumero(numFila+1)][corregirNumero(numColumna-1)] ? 1 : 0;
    const v8 = datoActual[corregirNumero(numFila)][corregirNumero(numColumna-1)] ? 1 : 0;
    return v1+v2+v3+v4+v5+v6+v7+v8
  }

  const siguiente = (datoActual) => {
    const nuevoDato = crearDato()

    //hacemos cosas
    for (const numFilaStr in datoActual) {
        const numFila = parseInt(numFilaStr)
        const fila = datoActual[numFila];
        for (const numColumnaStr in fila) {
            const numColumna = parseInt(numColumnaStr)
            const celda = fila[numColumna];   
            const cantVecinos = calcVecinos(datoActual, numFila, numColumna)       

            if (celda && (cantVecinos < 2 || cantVecinos >3)){
              nuevoDato[numFila][numColumna] = false
            }else if(!celda && cantVecinos === 3){
              nuevoDato[numFila][numColumna] = true
            }else{
              nuevoDato[numFila][numColumna] = datoActual[numFila][numColumna]
            }
        }
    }

    return nuevoDato;
  }

  return <div>
    {datosTransformados}
    <button onClick={()=> {

      setInterval(()=>{
        setDato((dato) => siguiente(dato))
      },50)

    }}>siguiente</button>
  </div>;
}

export default App;
