import React from 'react';
import './Historial.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

function Historial(props) {
    return (
        <div hidden={props.visible}>
            <div div className="historial">
                {props.historial.length != 0 ?
                    props.historial.map(e =>
                        <div className='container'>
                            <div className='operaciones'>
                                {e.operacion}
                            </div>
                            <div className='resultados'>
                                {e.resultado}
                            </div>
                        </div>
                    ) :
                    <div className='container'>
                        <div className='sub-tittle'>
                            Aun no hay historial
                        </div>
                    </div>
                }

                <div class="actions">
                    {props.historial.length != 0 ?
                        <FontAwesomeIcon icon={faTrashCan} className='icon-trash' onClick={props.vacialHistorial} /> : ""
                    }

                </div>
            </div>
        </div>
    )

};

export default Historial;