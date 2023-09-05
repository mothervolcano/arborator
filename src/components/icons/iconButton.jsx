import '../../../styles/ui.css';



export default function IconButton( { icon } ) {

	return (

	 	<div className="ui-button">

	 		{ icon() }

	 	</div>

	 )
}