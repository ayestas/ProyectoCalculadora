import React from "react";
import './Operacion.css';

const Operacion = props => {
    var { input, result } = props;

    var valuesInputs = this.props.input.config.map(function (value, i) {
        return (
            {value}
        );
    });

    var valuesResults = this.props.result.config.map(function (value, i) {
        return (
            {value}
        );
    });

    return (
        <div>
            <div className="operaciones">
                {input}
            </div>
            <div className="resultados">
                {result}
            </div>
        </div>
    );
};

export default Operacion;