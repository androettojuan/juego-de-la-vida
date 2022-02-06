import { useState } from "react";
import "./App.css";
import Celda from "./Componentes/Celda/celda";
import Fila from "./Componentes/fila/fila";

function App() {
  const [dato, setDato] = useState([
    [false, true, true, false, false, true],
    [false, false, true, false, false, true],
    [false, true, true, true, false, true],
    [false, true, false, false, false, false],
    [false, false, true, false, false, true],
    [false, true, true, true, false, false],
  ]);

  const datosTransformados = dato.map((fila) => (
    <Fila>
      {fila.map((celda) => (
        <Celda vivo={celda}></Celda>
      ))}
    </Fila>
  ));

  const corregirNumero = (numero) => {
    let n = numero;
    if (n < 0){
      n += 6;
    }
    return n % 6;
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
    const nuevoDato = [...datoActual]

    //hacemos cosas
    for (const numFila in datoActual) {
        const fila = datoActual[numFila];
        for (const numColumna in fila) {          
            const celda = fila[numColumna];   
            const cantVecinos = calcVecinos(datoActual, numFila, numColumna)       
            if (celda && (cantVecinos < 2 || cantVecinos >3)){
              nuevoDato[numFila][numColumna] = false
            }else if(!celda && cantVecinos === 3){
              nuevoDato[numFila][numColumna] = true
            }
        }
    }

    return nuevoDato;
  }

  return <div>
    {datosTransformados}
    <button onClick={()=> setDato(siguiente(dato))}>siguiente</button>
  </div>;
}

export default App;
