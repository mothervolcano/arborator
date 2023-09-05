
import NumberInput from './numberInput';
import Icon from './icon';

import { useState } from 'react';


const NumberStepper = ({ 

	context, 
	id, 
	defaultValue=1, 
	min=1, 
	max=10, 
	step=1, 
	onValueChangeHandler 

}) => {

	const _min = min;
	const _max = max;
	const _step = step;
	const _defaultValue = defaultValue;


	const [ inputValue, setInputValue ] = useState(_defaultValue);


	// function handleValueChange( _value ) {

	// 	const value = _value;
	// 	onValueChangeHandler( value );
	// }


	function handleButtonClickEvent( e ) {

		// console.log(`---> clicked! ${Object.keys(e.button)}`)
		console.log(`---> clicked! ${ e.target.value }`)

		const value = e.target.value;

		if ( value === "increase" ) {

			console.log('@STEPPER: increase!')

			const _value = ( (inputValue + _step) <= _max ) ? ( inputValue + _step ) : inputValue;

			setInputValue( _value);

			onValueChangeHandler( _value, e.target.id );
		}

		if ( value === "decrease" ) {

			console.log('@STEPPER: decrease!')

			const _value =  ( (inputValue - _step) >= _min ) ? ( inputValue - _step ) : inputValue;

			setInputValue( _value );

			onValueChangeHandler( _value, e.target.id );
		}

	};


	return (

		<div className="h-full flex flex-row">

			<NumberInput
				
				name={context}
				id={id}
				value={inputValue}
				min={_min}
				max={_max}
				step={_step}
				// onValueChangeHandler={handleValueChange}
			>

			</NumberInput>


			<div className="">

				<button

		    		className=	"group block relative overflow-hidden text-center border-l border-slate-900 hover:bg-slate-700"
		    		id={id}
					type="button"
					value="increase"
					disabled={false}
					onClick={handleButtonClickEvent}
				>
					<Icon
						name="TEST"
						style="stroke-slate-800 h-6 p-1"
						hoverStyle="group-hover:stroke-white"
					/>
			 	
				</button>


				<button

		    		className=	"group block relative overflow-hidden text-center border-t border-l border-slate-900 hover:bg-slate-700"
		    		id={id}
					type="button"
					value="decrease"
					disabled={false}
					onClick={handleButtonClickEvent}
				>
					<Icon
						name="TEST"
						style="stroke-slate-800 h-6 p-1"
						hoverStyle="group-hover:stroke-white"
					/>
			 	
				</button>

			</div>

		
		</div>

	)
};

export default NumberStepper;


