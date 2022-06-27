import { IonApp, setupIonicReact, IonContent, IonHeader, IonPage, IonTitle, IonFooter, IonToolbar } from '@ionic/react';
import './App.css';
import Pantalla from './components/Pantalla';
import PantallaSecundaria from './components/PantallaSecundaria';
import Boton from './components/Boton';
import BotonClear from './components/BotonClear';
import Operacion from './components/Operacion';
import { memo, useState } from 'react';
import { evaluate, sqrt, string } from 'mathjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faHistory } from '@fortawesome/free-solid-svg-icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import React from 'react';
import PantallaEmergente from './components/PantallaEmergente';
import AcercaDe from './components/AcercaDe';
import Historial from './components/Historial';
import { info } from 'console';
import { getAllByRole } from '@testing-library/react';
import Memoria from './components/Memoria';
setupIonicReact();

const App: React.FC = () => {
  //Constantes para el input, resultado y confirmacion de resultado
  const [input, setInput] = useState('');
  const [result, setResult] = useState('0');
  const [solved, setSolved] = useState(false);

  //Constantes para verificar que las pestallas de informacion, historial
  //memoria estan visibles u ocultas.
  const [aboutVisible, setAboutVisible] = useState(true);
  const [historialVisible, setHistorialVisible] = useState(true);
  const [memoriaVisible, setMemoriaVisible] = useState(true);
 

  //Constantes de tipo Array que contiene el historial y la memoria de la calculadora
  const [historial, setHistorial] = useState(new Array);
  const [memoria, setMemoria] = useState(new Array);
  


  //Funciones que permiten cambiar los estados de visible y no visible de las pestanas
  const iterateInfo = () => {
    setAboutVisible(!aboutVisible);
  };

  const iterateHistorial = () => {
    setHistorialVisible(!historialVisible);
  };

  const iterateMemoria = () => {
    setMemoriaVisible(!memoriaVisible);
  };




  //Funcion para borrar el historial
  const borrarHistorial = () => {
    setHistorial([]);
  }



  const esOperador = (valor: number) => {
    return isNaN(valor);
  };

  const agregarInput = (val: string) => {
    if (val == "÷")
      val = "/";

    if (val == "×")
      val = "*";

    if (esOperador(parseInt(val))) {
      var _val = "";
      if (solved == true) {
        _val = input + val;
      } else
        _val = input + result + val

      setInput(_val);
      setResult("");
      setSolved(false);
    }
    else {
      if (result == "0" && solved == false) {
        setResult(formatedResult(val));
        setSolved(false);
      } if (solved == true) {
        setResult(formatedResult(val));
        setInput("");
        setSolved(false);
      } else {
        var _result = "";
        if(result != "0")
          _result = result + val;
        else
          _result = val;

        setResult((_result));
      }
    }
  };



  //Funciones para calculo de Resultados
  const calcularResultado = () => {

    if (input && !solved) {
      const _val = input + result;
      set(_val);
    } else if (input && solved) {
      var _operador = "";
      var _input = "";
      for (var i = 0; i < input.length; i++) {
        if (esOperador(parseInt(input[i]))) {
          _operador = input[i];

          for (var j = i; j < input.length; j++)
            _input += input[j];

          break;
        }
      }

      const _val = result + _input;
      set(_val);
    }
  }

  const calcularInverso = () => {
    if ((input || result) && !solved) {
      calcularResultado();
      const _val = input + '+ (1' + '/' + result + ")";
      set(_val);
    }
  }

  const calcularCuadrado = () => {
    if (result && !solved) {
      calcularResultado();
      var _cuadrado = Math.pow(parseInt(result), 2);
      const _val = input + _cuadrado;
      set(_val);
    }
  }

  const calcularRaiz = () => {
    if (result && !solved) {
      calcularResultado();
      var _raiz = sqrt(parseInt(result));
      const _val = input + _raiz;
      set(_val);
    }
  }

  const calcularPorcentaje = () => {
    if (result && !solved) {
      calcularResultado();
      const _val = input + "(" + result + "/100)";
      set(_val);
    }
  }

  const calcularNegate = () => {
    setResult(evaluate("-1 *" + result));
  }

  const set = (_val: string) => {
    setInput(_val);
    var _resultado = formatedResult(evaluate(_val));
    setResult(_resultado);
    setSolved(true);

    let expresion = {
      operacion: _val + '=',
      resultado: _resultado
    }

    let _historial = historial
    _historial.unshift(expresion);
    setHistorial(_historial);
  }

  const clearC = () => {
    setInput("");
    setResult("0");
  }

  const clearCE = () => {
    if (solved)
      clearC();
    else {
      setResult("0");
    }
  }

  const clearBackS = () => {
    if (solved)
      setInput("");
    else {
      setResult(result.substring(0, result.length - 1));
    }
  }

  const formatedResult = (result: any) => {
    const internationalNumberFormat = new Intl.NumberFormat('en-US')
    return internationalNumberFormat.format(result);
  }


  //Funciones de Memoria

  const borrarMemoria = () => {
    setMemoria([]);
  }

  const sumarMemoria = (value: number) => {
    var _memoria = memoria;
    _memoria[0] == undefined ? _memoria[0] = value : _memoria[0] += value;
    setMemoria(_memoria);
  }
  const restarMemoria = (value: number) => {
    var _memoria = memoria;
    _memoria[0] == undefined ? _memoria[0] = value : _memoria[0] -= value;
    setMemoria(_memoria);
  }

  const guardarMemoria = () => {
    var _memoria = memoria;
    _memoria.unshift(parseInt(result));
    setMemoria(_memoria);
  }

  const restaurarMemoria = () => {
    setResult(memoria[0]);
  }


  return (
    <html>
      <IonApp>
        <IonPage>
          <IonContent fullscreen>
            <head>
              <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"></link>
            </head>
            <body>

              <div className='App'>
                <div className="calculadora">

                  <AcercaDe visible={aboutVisible} iterate={iterateInfo}></AcercaDe>

                  <PantallaEmergente manejarEmergente={iterateInfo}>
                    <FontAwesomeIcon icon={faBars} className='icon-info' />
                  </PantallaEmergente>
                  <div className='tittleP'>
                    Estándar
                  </div>

                  <Historial visible={historialVisible} iterate={iterateHistorial} historial={historial} vacialHistorial={borrarHistorial}></Historial>
                  <Memoria visible={memoriaVisible} iterate={iterateMemoria} memoria={memoria} vaciarMemoria={borrarMemoria}></Memoria>
                  

                  <PantallaEmergente manejarEmergente={iterateHistorial}>
                    <FontAwesomeIcon icon={faHistory} className='icon-historial' />
                  </PantallaEmergente>

                  <Pantalla input={input} />

                  <PantallaSecundaria result={result} />

                  <div className='filaM'>
                    <Boton manejarClic={borrarMemoria}>MC</Boton>
                    <Boton manejarClic={restaurarMemoria}>MR</Boton>
                    <Boton manejarClic={() => sumarMemoria(parseInt(input))}>M+</Boton>
                    <Boton manejarClic={() => restarMemoria(parseInt(input))}>M-</Boton>
                    <Boton manejarClic={guardarMemoria}>MS</Boton>
                    <Boton manejarClic={iterateMemoria}>M▾</Boton>
                  </div>

                  <div className='fila'>
                    <Boton manejarClic={calcularPorcentaje}>%</Boton>
                    <BotonClear manejarClear={() => clearCE()}>CE</BotonClear>
                    <BotonClear manejarClear={() => clearC()}>C</BotonClear>
                    <BotonClear manejarClear={() => clearBackS()}>
                      <a href="#">
                        <FontAwesomeIcon icon={faDeleteLeft} className='icono' />
                      </a>
                    </BotonClear>
                  </div>

                  <div className='fila'>
                    <Boton manejarClic={calcularInverso}>¹/x</Boton>
                    <Boton manejarClic={calcularCuadrado}>x²</Boton>
                    <Boton manejarClic={calcularRaiz}>²√x</Boton>
                    <Boton manejarClic={agregarInput}>÷</Boton>
                  </div>

                  <div className='fila'>
                    <Boton manejarClic={agregarInput}>7</Boton>
                    <Boton manejarClic={agregarInput}>8</Boton>
                    <Boton manejarClic={agregarInput}>9</Boton>
                    <Boton manejarClic={agregarInput}>×</Boton>
                  </div>

                  <div className='fila'>
                    <Boton manejarClic={agregarInput}>4</Boton>
                    <Boton manejarClic={agregarInput}>5</Boton>
                    <Boton manejarClic={agregarInput}>6</Boton>
                    <Boton manejarClic={agregarInput}>-</Boton>
                  </div>

                  <div className='fila'>
                    <Boton manejarClic={agregarInput}>1</Boton>
                    <Boton manejarClic={agregarInput}>2</Boton>
                    <Boton manejarClic={agregarInput}>3</Boton>
                    <Boton manejarClic={agregarInput}>+</Boton>
                  </div>

                  <div className='fila'>
                    <Boton manejarClic={calcularNegate}>+/₋</Boton>
                    <Boton manejarClic={agregarInput}>0</Boton>
                    <Boton manejarClic={agregarInput}>.</Boton>
                    <Boton manejarClic={calcularResultado}>=</Boton>
                  </div>
                </div>
              </div>
            </body>
          </IonContent>
        </IonPage>
      </IonApp>
    </html>

  )


};

export default App;
