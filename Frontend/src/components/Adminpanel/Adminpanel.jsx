import { useState, useEffect } from 'react';

import Clock from '../Clock/Clock';
import Usercard from '../Usercard/Usercard';

import style from './Adminpanel.module.css';

export default function Adminpanel({ setIsLogedIn, setIsAdmin }) {
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const [numbers, setNumbers] = useState({
		userNum: '',
		taskNumb: '',
	});

	const [reload, setReload] = useState(false);

	// const [email, setEmail] = useState();
	// const [userName, setUserName] = useState();
	// const [isAdmin, setIsAdmin] = useState();

	const [userData, setUserData] = useState({
		email: '',
		userName: '',
		isAdmin: '',
		userId: '',
	});

	const user = JSON.parse(localStorage.getItem('user'));
	const userId = user.userId;
	const token = localStorage.getItem('token');

	function handleLogOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setIsLogedIn(false);
		setIsAdmin(false);
	}

	function handleEdit(userId) {
		fetch('http://localhost:3030/admin/user/' + userId, {
			method: 'GET',
			headers: {
				Authorization: token,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setUserData({
					email: data.email,
					userName: data.userName,
					isAdmin: data.isAdmin,
					userId: data.userId,
				});
			})
			.catch((err) => {
				console.error('Error fetching user:', err);
			});
	}

	function handleCancel() {
		setUserData({ email: '', userName: '', isAdmin: '', userId: '' });
	}

	function handleUpdate(userId) {
		const formData = new FormData();
		formData.append('email', userData.email);
		formData.append('userName', userData.userName);
		formData.append('isAdmin', userData.isAdmin);
		fetch('http://localhost:3030/admin/upDateUser/' + userId, {
			method: 'PUT',
			headers: {
				Authorization: token,
			},
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				setReload((prev) => !prev);
				setUserData({ email: '', userName: '', isAdmin: '', userId: '' });
			})
			.catch((err) => {
				console.error('Error fetching user:', err);
			});
	}

	function handleDelete(userId) {
		fetch('http://localhost:3030/admin/deleteUser/' + userId, {
			method: 'DELETE',
			headers: { Authorization: token },
		})
			.then((res) => {
				setReload((prev) => !prev);
				return res.json();
			})
			.then((data) => {
				setUserData({ email: '', userName: '', isAdmin: '', userId: '' });
			})
			.catch();
	}

	useEffect(() => {
		fetch('http://localhost:3030/admin/users?page=' + page, {
			method: 'GET',
			headers: {
				Authorization: token,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data.users);
				setUsers(data.users);
				setTotalPages(data.totalPages);
			})
			.catch((err) => {
				console.error('Error fetching tasks:', err);
			});

		fetch('http://localhost:3030/admin/totalNumbers', {
			method: 'GET',
			headers: {
				Authorization: token,
			},
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				setNumbers({
					userNum: data.usersNum,
					taskNumb: data.taskNum,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}, [page, userId, reload]);

	return (
		<div className={style.container}>
			<div className={style.dataContainer}>
				<div className={style.whiteSpace}></div>
				<div className={style.dataPanel}>
					<Clock />
					<div className={style.data}>
						<p>Task Numbers: {numbers.taskNumb}</p>
						<p>User Numbers: {numbers.userNum}</p>
					</div>
				</div>
				<div className={style.whiteSpace}>
					<button className={style.btn} onClick={handleLogOut}>
						Logout
					</button>
				</div>
			</div>
			<div className={style.userContainer}>
				<div className={style.userListContainer}>
					<div className={style.userList}>
						{users.map((user) => (
							<Usercard
								key={user.id}
								userData={user}
								inadmin={true}
								handleEditAdmin={handleEdit}
							/>
						))}
					</div>
					<div className={style.paging}>
						<button
							className={style.btnp}
							onClick={() => setPage((p) => Math.max(p - 1, 1))}
							disabled={page === 1}
						>
							Prev
						</button>

						<span className={style.pages}>
							{' '}
							Page {page} of {totalPages}{' '}
						</span>

						<button
							className={style.btnp}
							onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
							disabled={page === totalPages}
						>
							Next
						</button>
					</div>
				</div>
				<div className={style.userEdit}>
					<div className={style.input}>
						<label>User Name</label>
						<input
							disabled={!userData.userId ? true : false}
							type="text"
							value={userData.userName}
							onChange={(e) =>
								setUserData((prev) => ({
									...prev,
									userName: e.target.value,
								}))
							}
						/>
						<label>E-mail</label>
						<input
							disabled={!userData.userId ? true : false}
							type="email"
							value={userData.email}
							onChange={(e) =>
								setUserData((prev) => ({
									...prev,
									email: e.target.value,
								}))
							}
						/>
						<label className={style.goose}>Is Admin</label>
						<input
							disabled={!userData.userId ? true : false}
							type="checkbox"
							checked={userData.isAdmin}
							onChange={(e) =>
								setUserData((prev) => ({
									...prev,
									isAdmin: e.target.value,
								}))
							}
						/>
					</div>
					<div className={style.btnControll}>
						<div className={style.btnSC}>
							<button
								className={style.btnC}
								disabled={!userData.userId ? true : false}
								onClick={handleCancel}
							>
								Cancle
							</button>
							<button
								disabled={!userData.userId ? true : false}
								className={style.btnS}
								onClick={() => handleUpdate(userData.userId)}
							>
								Save
							</button>
						</div>

						<div className={style.btnDC}>
							<button
								disabled={!userData.userId ? true : false}
								className={style.btnD}
								onClick={() => handleDelete(userData.userId)}
							>
								Delete User
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
