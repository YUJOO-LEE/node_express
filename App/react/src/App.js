import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import GlobalStyle from './GlobalStyle';
import Header from './common/Header';
import Main from './common/Main';
import List from './community/List';
import Create from './community/Create';
import Detail from './community/Detail';
import Edit from './community/Edit';
import Login from './user/Login';
import Join from './user/Join';
import firebase from './firebase';
import { loginUser, logoutUser } from './redux/userSlice';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from './theme/themeProvider';


function App() {

	const dispatch = useDispatch();

	useEffect(()=>{
		// firebase로부터 현재 auth 상태 변화를 감지해서 파라미터로 해당 상태값 전달
		firebase.auth().onAuthStateChanged((userInfo)=>{
			//console.log(userInfo);
			if (!userInfo) {
				dispatch(logoutUser());
			} else {
				dispatch(loginUser(userInfo.multiFactor.user));
			}
		});
	}, []);

	return (
		<>
			<GlobalStyle />

      <ThemeProvider>
				<Header />

				<Routes>
						<Route path='/' element={<Main />} />
						<Route path='/list' element={<List />} />
						<Route path='/write' element={<Create />} />
						<Route path='/detail/:num' element={<Detail />} />
						<Route path='/edit/:num' element={<Edit />} />
						<Route path='/join' element={<Join />} />
						<Route path='/login' element={<Login />} />
					</Routes>
      </ThemeProvider>
		</>
	);
}

export default App;