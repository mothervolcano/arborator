
const NumberInput = ({ 

	name="DefaultNumberInput", 
	id="none", 
	min=1, 
	max=10, 
	step=1, 
	value, 
	defaultValue, 
	disabled=false, 
	onValueChangeHandler 

}) => {


	function handleValueChange( event ) {

		const value = event.target.value;
		onValueChangeHandler( value );
	}
	

	return (

		<label className="appearance-none w-full h-full">

			<input
				className="appearance-none w-full h-full text-[2rem] leading-none text-slate-900 text-center align-bottom"
				type="number"
				name={name}
				id={id}
				min={min}
				max={max}
				step={step}
				value={value}
				defaultValue={defaultValue}
				disabled={disabled}
				onChange={handleValueChange}

			/>
			
		</label>
	);

};


export default NumberInput;