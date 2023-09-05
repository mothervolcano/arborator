import ModeSelector from './modeSelector';



const TileGridMenu = ({

	options,
	onSelect

}) => {

	function handleValueChange( e ) {

		const _options = options.slice();
		_options.map( (item) => { 
			
			if ( item.option === e.target.value ) { 

				item.checked = true;

			} else {

				item.checked = false;
			} 

			return item;
		});
		
		onSelect( _options );
	};


	function Label({
		
		text

	}) {

		return (

			<p className={`text-sm text-slate-900 m-2`}>
		        {text}
		    </p>
		)
	};

	return (<div className={'grid grid-rows-3 grid-cols-3'}>
		
		{ options.map( (item) => {


			return (
			        	<div>

				        	<ModeSelector 

				        		option={item.option}
				        		icon={item.icon}
				        		label={item.label}
				        		onDefaultChecked={item.default}
				        		onValueChangeHandler={handleValueChange}

				        	/>

				        	<Label 

				        		text={item.label}
				        	/>

			        	</div>

			        )
		})}

	</div>)
};


export default TileGridMenu;