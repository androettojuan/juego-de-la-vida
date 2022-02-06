import React from "react";
import "./celda.css";

const Celda = ({vivo, onClick}) => {
  let clase = "celda "
  if (vivo){
    clase += "vivo"
  }


  return <div className={clase} onClick={onClick}></div>
}

export default Celda