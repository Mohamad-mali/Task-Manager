import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';

import { jwtDecode } from 'jwt-decode';

import Signin from './components/Signin/Signin';
import Userpanel from './components/Userpanel/Userpanel';
import Adminpanel from './components/Adminpanel/Adminpanel';

import './App.css';

function App() {
	const [isLogedIn, setIsLogedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const decoded = jwtDecode(token);
			const currentTime = Date.now() / 1000;
			if (decoded.exp < currentTime) {
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				setIsLogedIn(false);
				setIsAdmin(false);
			} else {
				const user = JSON.parse(localStorage.getItem('user'));
				setIsLogedIn(true);
				setIsAdmin(user.isAdmin);
			}
		}
	}, []);

	return (
		<>
			{!isLogedIn ? (
				<Signin setIsLogedIn={setIsLogedIn} setIsAdmin={setIsAdmin} />
			) : isAdmin ? (
				<Adminpanel setIsLogedIn={setIsLogedIn} setIsAdmin={setIsAdmin} />
			) : (
				<Userpanel setIsLogedIn={setIsLogedIn} setIsAdmin={setIsAdmin} />
			)}
		</>
	);
}

export default App;
