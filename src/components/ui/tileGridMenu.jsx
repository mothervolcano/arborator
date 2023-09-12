import ModeSelector from './modeSelector';



const TileGridMenu = ({

	options,
	onSelect

}) => {

	function handleValueChange( e ) {

		const _options = options.map( (item) => { 
			
			if ( item.option === e.target.value ) { 

				return { ...item, checked: true };

			} else {

				return { ...item, checked: false };
			} 
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
			        	<div key={item.option}>

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