import style from './Signin.module.css';

export default function Signin() {
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

				<div className={style.sign}></div>
			</div>
		</>
	);
}
