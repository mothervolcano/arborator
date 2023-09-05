import Button from '../ui/button'

const SettingsModal = ({

	show,
	init,
	buttonLabel,
	onSubmit,
	onClose,
	children

}) => {

	if ( !show ) {

		return null;
	}

	return (

	    <div className="absolute top-0 left-0 w-full h-full bg-slate-100">
		    
		    {  	!init && (

					    	<div className="absolute top-0 right-0 m-2">
						    	<Button 
						    		labelText="close"
						    		onClickEventHandler={onClose}
						    	/>
					    	</div>

		    	          )
		    }

			
	    	<div className="w-full h-full flex flex-col justify-center items-center">

	    		{children}

	    		<div className={``}>

		    		<Button

		    			labelText={buttonLabel}
		    			onClickEventHandler={onSubmit}

		    		/>

	    		</div>

	    	</div>

		</div>
	)
};


export default SettingsModal;