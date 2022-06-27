import React from 'react';
import './AcercaDe.css';

function AcercaDe(props) {
    return (
        <div hidden={props.visible}>
            <div className='emergente'>
                <div className='container'>
                    <div className='tittle'>Acerca de la Calculadora</div>
                </div>

                <div className='container'>
                    <div className='sub-tittle'>Informacion de los Autores:</div>
                    <div className='text'>Bernardo Jose Martinez Vallecillo</div>
                    <div className='email-account'>21951056</div>
                    <div className='email-account'>bernardo.martinez@unitec.edu</div>

                    <div className='text'>Karol Mitchelle Ayestas Aleman</div>
                    <div className='email-account'>21911210</div>
                    <div className='email-account'>ayestaskaroll@unitec.edu</div>
                </div>

                <div className='container'>
                    <div className='sub-tittle'>Asignatura:</div>
                    <div className='text'>CCC307 Experiencia de Usuario</div>
                    <div className='email-account'>Martin Nelbren Cuellar Guardiola</div>
                </div>

                <div className='container'>
                    <div className='sub-tittle'>Fecha:</div>
                    <div className='text'>26 de Febrero de 2022</div>
                </div>
            </div >
        </div>
    )

};

export default AcercaDe;