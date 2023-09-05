import { useState } from 'react';

import TileGridMenu from "../ui/tileGridMenu";
import Button from '../ui/button';

interface Props {

	initialized: boolean;
	options: any[];
	onGenerate: Function;
	onClose: Function;
}

const ModelSelectionModal = ( props: Props ) => {

	const { initialized, options, onGenerate, onClose } = props;


	const [ selectedArchetype, setSelectedArchetype ] = useState(null);



	// --------------------------------------------------
	// HANDLERS
	
	function handleSelectionInput( updatedOptions: Array<any> ) {

		const _selectedOption = updatedOptions.find( (item) => item.checked === true );

		setSelectedArchetype( _selectedOption );
	};


	function handleGenerateAction( e: any ) { // TODO: I could pass the action value of the button for extra safety

		selectedArchetype && onGenerate( selectedArchetype );
	}


	return (
		
		<div className='w-full h-full flex flex-col justify-center items-center bg-white'>

			{  	
				initialized && (

			    	<div className="absolute top-0 right-0 m-2">
				    	<Button 
				    		labelText="close"
				    		onClickEventHandler={onClose}
				    	/>
			    	</div>
		    	)
		    }

			<TileGridMenu 

				options={options}
				onSelect={handleSelectionInput}
			/>

			<Button	
						
				labelText="Generate"
				onClickEventHandler={ handleGenerateAction }
			/>
			
		</div>


	)
}


export default ModelSelectionModal;


