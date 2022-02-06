import React from "react";
import "./celda.css";

const Celda = ({vivo}) => {
  let clase = "celda "
  if (vivo){
    clase += "vivo"
  }


  return <div className={clase}></div>
}

export default Celda