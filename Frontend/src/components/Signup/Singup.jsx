import style from '../Login/Login.module.css';

export default function Login({ accState }) {
	const createAcc = () => {
		return accState(true);
	};
	return (
		<>
			<h2 className={style.tt}>Sign Up</h2>

			<div className={style.input}>
				<label>Username</label>
				<input type="text" />
				<label>E-mail</label>
				<input type="email" />
				<label>Phone Number</label>
				<input type="tel" />
				<label>Password</label>
				<input type="Password" />
			</div>
			<div className={style.btnContainer}>
				<button className={style.btn}>SignUp</button>
				<a className={style.aLink} onClick={createAcc}>
					Have an account?
				</a>
			</div>
		</>
	);
}
