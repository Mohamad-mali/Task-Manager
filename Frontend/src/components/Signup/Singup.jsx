import { useState } from 'react';

import style from '../Login/Login.module.css';

export default function Login({ accState }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [userName, setUserName] = useState('');

	const createAcc = () => {
		return accState(true);
	};
	const handleSignUp = () => {
		fetch('http://localhost:3030/signUp', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password, userName }),
		})
			.then((res) => {
				if (res.status === 201) {
					accState(true);
				}
				return res.json();
			})
			.then((data) => {})
			.catch();
	};
	return (
		<>
			<h2 className={style.tt}>Sign Up</h2>

			<div className={style.input}>
				<label>Username</label>
				<input
					type="text"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
				<label>E-mail</label>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label>Password</label>
				<input
					type="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div className={style.btnContainer}>
				<button onClick={handleSignUp} className={style.btn}>
					SignUp
				</button>
				<a className={style.aLink} onClick={createAcc}>
					Have an account?
				</a>
			</div>
		</>
	);
}
