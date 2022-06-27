import React from 'react';
import './PantallaEmergente.css';
const PantallaEmergente = (props)=>(
    <div className='pantalla' onClick={props.manejarEmergente}>
        {props.children}
    </div>
);
export default PantallaEmergente;