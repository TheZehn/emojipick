import React from 'react';
import { Typography, Tooltip, TextField, Box } from '@material-ui/core';
import data from './emoji.json';

function App() {
	const [searchTerm, setSearchTerm] = React.useState("");

	const handleChange = event => {
		setSearchTerm(event.target.value.toLowerCase());
	};

  return (
    <div className="App">
		<Box display="flex">	
			<Box m="auto"	>
	      <header className="App-header">
					<TextField id="peruse" placeholder="Search" value={searchTerm} onChange={handleChange} />
	      </header>
			</Box></Box>
			<Box display="flex" m={3}>
			<Box m="auto">
				{ data.filter((p) => {
						let emojiName = p.name.toLowerCase();
						return emojiName.includes(searchTerm) && searchTerm !== "";
					})
					.map((p) => {
						return (
							<Emoji em={p} />
							);
						})
				}
			</Box>
		</Box>
    </div>
  );
}


function Emoji(props){

	let em = props.em;

	return (
	 <Tooltip title={em.name} >
			<Typography style={{display: 'inline-block'}} variant='h4' >{em.char} </Typography>
	</Tooltip>
	)
}

export default App;
