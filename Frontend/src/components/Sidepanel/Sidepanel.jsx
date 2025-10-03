import { useState, useEffect } from 'react';

import Usercard from '../Usercard/Usercard';
import Createtask from '../Createtask/Createtask.jsx';

import style from './Sidepanel.module.css';
import Dashboard from '../Dashboard/Dashboard.jsx';

export default function Sidepanel({ setReload, reload }) {
	const [isDashboard, setIsDashboard] = useState(false);
	const [userData, setUserData] = useState({
		image: '',
		email: '',
		userName: '',
		newPassword: '',
	});
	const user = JSON.parse(localStorage.getItem('user'));
	const userId = user.userId;
	const token = localStorage.getItem('token');

	function handleSave() {
		setIsDashboard(false);
		const formData = new FormData();
		formData.append('email', userData.email);
		formData.append('image', userData.image);
		formData.append('newPassword', userData.newPassword);
		fetch('http://localhost:3030/updateUserData/' + userId, {
			method: 'PUT',
			headers: { Authorization: token },
			body: formData,
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setReload((prev) => !prev);
			})
			.catch();
	}

	useEffect(() => {
		fetch('http://localhost:3030/userInfo/' + userId, {
			method: 'get',
			headers: { 'Content-Type': 'application/json', Authorization: token },
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setUserData({
					image: data.image,
					email: data.email,
					userName: data.userName,
					newPassword: '',
				});
			})
			.catch();
	}, [userId, token, reload]);

	return (
		<div className={style.container}>
			<div className={style.whiteSpace}></div>
			<div className={style.controllContainer}>
				{isDashboard ? (
					<Dashboard userData={userData} setUserData={setUserData} />
				) : (
					<Createtask setReload={setReload} />
				)}
				<div>
					<Usercard
						setIsEditing={setIsDashboard}
						isEditing={isDashboard}
						handleSave={handleSave}
						userData={userData}
					/>
				</div>
			</div>
		</div>
	);
}
