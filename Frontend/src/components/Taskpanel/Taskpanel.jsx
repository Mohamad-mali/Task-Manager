import { useEffect, useState } from 'react';

import Taskcard from '../Taskcard/Taskcard';
import style from './Taskpanel.module.css';

export default function Taskpanel({
	setIsLogedIn,
	setIsAdmin,
	setReload,
	reload,
}) {
	const [tasks, setTasks] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const user = JSON.parse(localStorage.getItem('user'));
	const userId = user.userId;
	const token = localStorage.getItem('token');

	function handleDelete(taskId) {
		fetch('http://localhost:3030/deleteTask/' + taskId, {
			method: 'DELETE',
			headers: { Authorization: token },
		})
			.then((res) => {
				setReload((prev) => !prev);
				return res.json();
			})
			.then((data) => {})
			.catch();
	}

	useEffect(() => {
		fetch('http://localhost:3030/userTask?page=' + page, {
			headers: {
				Authorization: token,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setTasks(data.tasks);
				setTotalPages(data.totalPages);
			})
			.catch((err) => {
				console.error('Error fetching tasks:', err);
			});
	}, [page, userId, reload]);

	function handleLogOut() {
		console.log(user);
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setIsLogedIn(false);
		setIsAdmin(false);
	}

	return (
		<div className={style.container}>
			<div className={style.whiteSpace}>
				<button className={style.btn} onClick={handleLogOut}>
					Logout
				</button>
			</div>
			<div className={style.taskContainer}>
				{tasks.map((item) => (
					<Taskcard
						key={item.id}
						title={item.title}
						decription={item.decription}
						createdAt={item.createdAt}
						taskId={item.id}
						handleDelete={handleDelete}
					/>
				))}
			</div>
			<div className={style.pagination}>
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
	);
}
