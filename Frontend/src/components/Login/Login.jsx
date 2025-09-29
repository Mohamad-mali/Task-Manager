import style from './Login.module.css';

export default function Login({ accState }) {
	const createAcc = () => {
		return accState(false);
	};

	return (
		<>
			<h2 className={style.tt}>Log In</h2>

			<div className={style.input}>
				<label>Username</label>
				<input type="text" />
				<label>Password</label>
				<input type="Password" />
			</div>

			<div className={style.btnContainer}>
				<button className={style.btn}>LogIn</button>
				<a className={style.aLink} onClick={createAcc}>
					Create an account!
				</a>
			</div>
		</>
	);
}
