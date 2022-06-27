import React from 'react';
import './Memoria.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

function Memoria(props) {
    return (
        <div hidden={props.visible}>
            <div div className="memorias">
                {props.memoria.length != 0 ?
                    props.memoria.map(e =>
                        <div className='container'>
                            <div className='resultados'>
                                {e}
                            </div>
                        </div>
                    ) :
                    <div className='container'>
                        <div className='sub-tittle'>
                            Aun no hay nada en la memoria
                        </div>
                    </div>
                }

                <div class="actions">
                    {props.memoria.length != 0 ?
                        <FontAwesomeIcon icon={faTrashCan} className='icon-trash' onClick={props.vaciarMemoria} /> : ""
                    }

                </div>
            </div>
        </div>
    )

};

export default Memoria;