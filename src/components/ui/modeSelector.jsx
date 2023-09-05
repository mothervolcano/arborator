import Icon from './icon';


const ModeSelector = ({

	name="defaultUniSelectionButton", 
	id="none", 
	option="selected", 
	onValueChangeHandler, 
	defaultChecked, 
	icon,
	iconColor


}) => {


	function handleValueChange( e ) {

		onValueChangeHandler( e );		
	}


	return (

	   	<label className="flex flex-row items-center place-content-center w-8 h-8"
	   	>

	   		<input className="peer appearance-none"
	   			
	   			type="radio"
	   			name={name}
	   			id={id}
	   			value={option}
	   			defaultChecked={defaultChecked}
	   			onChange={handleValueChange}

	   		/>

	   		<div className="rounded-lg border border-black w-full h-full bg-white peer-checked:bg-slate-900 peer-hover:bg-slate-300"
	   		>
	   		
	   		</div>

	   		<Icon
	   			name={icon}
	   			style={"absolute w-7 h-7 p-1 stroke-slate-900"}
	   			selectedStyle={"peer-checked:stroke-white"}
	   			hoverStyle={"peer-hover:stroke-1 peer-hover:w-6 peer-hover:h-6"}
	   		/>
	   			
	   	</label>
	);
};


export default ModeSelector;


