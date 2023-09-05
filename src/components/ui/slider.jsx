

const Slider = ({

	name="defaultBasicSlider", 
	id="none", 
	label=null, 
	max=1, 
	min=0, 
	step=0.01, 
	value, 
	defaultValue ,
	onValueChangeHandler

}) =>

{

	function Label( { labelText } ) {

		return labelText && <span className="text-xs text-slate-900">{labelText}</span>
	}


	function handleValueChange( e ) {

		const value = parseFloat(e.target.value);

		onValueChangeHandler( value, e.target.id );

	};


	return(

		<label className="relative w-full h-full flex flex-col items-start">

			{ label && ( <Label labelText={label} /> )}

			<input className="appearance-none cursor-pointer w-full h-px bg-black"

				type="range"
				name={name}
				id={id}
		        min={min}
		        max={max}
		        step={step}
		        value={value}
		        defaultValue={defaultValue}
		        onChange={handleValueChange}
			/>

		</label>
	)
}


export default Slider;