import style from '../Login/Login.module.css';
import styles from '../Usercard/Usercard.module.css';
import styless from './Dashboard.module.css';

export default function Dashboard({ userData, setUserData }) {
	return (
		<div className={style.input}>
			<input
				type="file"
				accept="image/*"
				onChange={(e) =>
					setUserData((prev) => ({
						...prev,
						image: e.target.files[0],
					}))
				}
			/>

			<label>Username</label>
			<input type="text" value={userData.userName} disabled={true} />
			<label>E-mail</label>
			<input
				type="email"
				value={userData.email}
				onChange={(e) =>
					setUserData((prev) => ({
						...prev,
						email: e.target.value,
					}))
				}
			/>
			<label>Set new Password</label>
			<input
				type="Password"
				value={userData.newPassword}
				onChange={(e) =>
					setUserData((prev) => ({
						...prev,
						newPassword: e.target.value,
					}))
				}
			/>
		</div>
	);
}
