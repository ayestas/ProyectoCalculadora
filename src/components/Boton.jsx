import React from "react";
import './Boton.css';

function Boton(props) {
    const esOperador = () => {
        const valor = props.children;
        return isNaN(valor) && (valor !== '.') && (valor !== '=') && (valor !== '+/₋');
    };

    const esResultado = () => {
        const valor = props.children;
        return (valor == '=');
    };

    const esMemoria = () => {
        const valor = props.children;
        return (valor == "MC") || (valor == "MR") || (valor == "M+") || (valor == "M-") || (valor == "MS") || (valor == "M▾");
    };

    return (
        <div className={`boton ${esMemoria() ? 'memoria' : '' || esOperador() ? 'operador' : '' || esResultado() ? 'resultado' : ''}`.trimEnd()}
            onClick={() => props.manejarClic(props.children)}>
            {props.children}
        </div>
    );

}

export default Boton;