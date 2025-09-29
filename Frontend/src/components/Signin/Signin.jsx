import { useState } from 'react';

import Clock from '../Clock/Clock.jsx';
import Login from '../Login/Login.jsx';
import Signup from '../Signup/Singup.jsx';

import style from './Signin.module.css';

export default function Signin() {
	const [haveAccount, setHaveAccount] = useState(true);

	return (
		<>
			<div className={style.container}>
				<div className={style.info}>
					<div className={style.head}>
						<h1>Task Manager</h1>
					</div>

					<div className={style.body}>
						<h3>Don't have an account?</h3>
						<p>
							You can register now to access all the features and services.{' '}
							<br /> Manage all of your tasks and thought in one place. It's
							Free!
						</p>
					</div>
				</div>

				<div className={style.sign}>
					<div className={style.date}>
						{' '}
						<Clock />
					</div>
					<div className={style.signCard}>
						{haveAccount ? (
							<Login accState={setHaveAccount} />
						) : (
							<Signup accState={setHaveAccount} />
						)}
					</div>
				</div>
			</div>
		</>
	);
}
