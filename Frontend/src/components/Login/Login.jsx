import style from './Login.module.css';
import { useState } from 'react';

export default function Login({ accState, setIsLogedIn, setIsAdmin }) {
	const [password, setPassword] = useState('');
	const [userName, setUserName] = useState('');

	const createAcc = () => {
		return accState(false);
	};

	const handleLogin = () => {
		fetch('http://localhost:3030/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ password, userName }),
		})
			.then((res) => {
				if (res.status !== 200) {
					throw new Error();
				} else {
					return res.json();
				}
			})
			.then((data) => {
				localStorage.setItem('token', data.token);
				localStorage.setItem('user', JSON.stringify(data.user));
				setIsLogedIn(true);
				setIsAdmin(data.user.isAdmin);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<h2 className={style.tt}>Log In</h2>
			<div className={style.input}>
				<label>Username</label>
				<input
					type="text"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
				<label>Password</label>
				<input
					type="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			<div className={style.btnContainer}>
				<button onClick={handleLogin} className={style.btn}>
					LogIn
				</button>
				<a className={style.aLink} onClick={createAcc}>
					Create an account!
				</a>
			</div>
		</>
	);
}
