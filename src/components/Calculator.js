import { useState } from 'react';
import Button from './Button'

const Calculator = () => {
  const [ result, setResult ] = useState(false);
  const [ operations, setOperations ] = useState([]);
  const [ display, setDisplay ] = useState('0');
  const [ newNum, setNewNum ] = useState(true);
  const buttons = [
   {value: 'CE', type: 'clear', id: 'clear'},
   {value: '/', type: 'operation', id: 'divide'},
   {value: 'x', type: 'operation', id: 'multiply' },
   {value: '7', type: 'number', id: 'seven'},
   {value: '8', type: 'number', id: 'eight'},
   {value: '9', type: 'number', id: 'nine'},
   {value: '-', type: 'minus', id: 'subtract'},
   {value: '4', type: 'number', id: 'four'},
   {value: '5', type: 'number', id: 'five'},
   {value: '6', type: 'number', id: 'six'},
   {value: '+', type: 'operation', id: 'add'},
   {value: '1', type: 'number', id: 'one'},
   {value: '2', type: 'number', id: 'two'},
   {value: '3', type: 'number', id: 'three'},
   {value: '0', type: 'number', id: 'zero'},
   {value: '.', type: 'decimal', id: 'decimal'},
   {value: '=', type: 'equals', id: 'equals'},
  ];


  const restartOperations = () => {
    // Reset the operations case user want to make more calculations with result
    setResult(() => false);
    setOperations(() => [])
  }

  const clear = () => {
    console.log('clear')
    setResult(() => false);
    setOperations(() => []);
    setDisplay(() => '0');
    setNewNum(() => true);
  }
  
  const equals = () => {
    console.log('equals');
    const calculation = eval([...operations, display].join(' ').replaceAll('x', '*'));
    console.log(calculation);
    
    setResult(() => true)
    setOperations(prevValue => [...prevValue, display, '=', calculation])
    setDisplay(() => String(calculation));
  }

  const operation = (value) => {
    console.log('operation');
    if(result) {
      restartOperations();
    }

    if(operations.length === 0 && display === '0') {
      return
    }

    if(isNaN(display)) {
      setOperations(prevValue => [...prevValue.slice(0,-1),value]);
      setDisplay(() => value);
    } else {
      setOperations(prevValue => [...prevValue, display, value]);
      setDisplay(() => value);
    }

    setNewNum(() => true);
  }

  const number = (value) => {
    console.log('number', newNum);
    if(result) {
      restartOperations();
      setDisplay(() => '');
    }
    
    if(newNum) {
      setDisplay(() => value);
    } else {
      if(display === '-0') {
        setDisplay(prevValue => prevValue[0] + value);
      } else if(display === '0') {
        setDisplay(() => value);
      } else {
        setDisplay(prevValue => prevValue + value);
      }
    } 
    setNewNum(() => false);
  }

  const decimal = (value) => {
    console.log('decimal');
    if(!isNaN(display) && display.indexOf(value) < 0) {
      setDisplay(prevValue => prevValue + value);
    }
  }

  const minus = (value) => {
    console.log('minus');
    if(result) {
      restartOperations();
    }

    if(!isNaN(display)) {
      setOperations(prevValue => [...prevValue, display, value]);
      setDisplay(() => value);
      setNewNum(() => true);
    } else if(isNaN(operations[-1]) && !newNum) {
      setOperations(prevValue => [...prevValue.slice(0,-1),value]);
      setDisplay(() => value);
      setNewNum(() => true);
    } else {
      setDisplay(() => value);
      setNewNum(() => false);
    }
  }

  const handlerPicker = (type) => {
    switch(type) {
      case 'clear':
        return clear;

      case 'number':
        return number;

      case 'operation':
        return operation;

      case 'decimal':
        return decimal;

      case 'equals':
        return equals;

      case 'minus':
        return minus
    }
  }

  return (
    <div id="calculator">
      <div id="panel">
        <div id='operations'>{operations.join(" ") ? operations.join(" "): <br/>}</div>
        <div id='display'>{display}</div>
      </div>
      <div id='keys'>
        {buttons.map((btn, index) => {
          return <Button
            key={index}
            value={btn.value}
            id={btn.id}
            type={btn.type}
            handleClick={handlerPicker(btn.type)}
          />
        })}
      </div>
    </div>
        
    ); 
}

export default Calculator;