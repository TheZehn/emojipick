import React from 'react';
import { Typography, Tooltip, TextField, Box } from '@material-ui/core';
import data from './emoji.json';

function App() {
	const [searchTerm, setSearchTerm] = React.useState("");
	const [results, setResults] = React.useState([]);

	const handleChange = event => {
		let searchTerm = event.target.value.toLowerCase();
		setSearchTerm(searchTerm);
		let filtered = data.filter( (em) => {
				let emName = em.name.toLowerCase();
				let emCat = em.category.toLowerCase();

				return (emCat.includes(searchTerm) || emName.includes(searchTerm)) && searchTerm !== "";
			});
		setResults(groupBy(filtered,"group"));
	};

	const groupBy = (array, key) => {  
	  return array.reduce((result, currentValue) => {
	        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
	        return result;
	  }, {});
	};


  return (
    <div className="App">
		<Box display="flex">	
			<Box m="auto"	>
	      <header className="App-header">
					<TextField id="peruse" placeholder="Emoji Search" value={searchTerm} onChange={handleChange} />
	      </header>
			</Box>
		</Box>
			<Box display="flex" m={3}>
				<Box m="auto">
				{  Object.entries(results).map( cat => {
						return <EmojiCat key={cat[0]} data={cat}/>
				})}
				
				</Box>
			</Box>
    </div>
  );

}


function EmojiCat(props){
	let catName = props.data[0];
	let emojis = props.data[1];

	return (
		<React.Fragment>
			<Typography variant="h5">{catName}</Typography>
		 { emojis.map( emoji =>  {
				return <Emoji key={emoji.codes} em={emoji} />
			})}	
		</React.Fragment>
		)

}


function Emoji(props){

	let em = props.em;

	return (
	 <Tooltip title={em.name} >
			<Typography style={{display: 'inline-block'}} variant='h4'> {em.char} </Typography>
	</Tooltip>
	)
}

export default App;
