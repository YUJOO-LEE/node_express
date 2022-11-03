import axios from 'axios';
import { useEffect } from 'react';

function App() {
	const item = {
		name: 'yujoo'
	}

	useEffect(()=>{
		axios.post('/api/send', item).then(response=>{
			console.log(response);
		})
		.catch(err=>{
			console.log(err);
		})
	}, []);

	
	return (
		<h1>Hello2</h1>
	);
}

export default App;
