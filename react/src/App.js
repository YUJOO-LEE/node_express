import { Routes, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Header from './common/Header';
import Main from './common/Main';
import List from './community/List';
import Create from './community/Create';
import Detail from './community/Detail';

function App() {
	return (
		<>
			<GlobalStyle />
			<Header />

			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/list' element={<List />} />
				<Route path='/create' element={<Create />} />
				<Route path='/detail/:num' element={<Detail />} />
			</Routes>
		</>
	);
}

export default App;