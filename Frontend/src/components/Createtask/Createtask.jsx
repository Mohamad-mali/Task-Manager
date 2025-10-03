import { useState } from 'react';

import style from './Createtask.module.css';

export default function createtask({ setReload }) {
	const [creatingTask, setCreatingTask] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const createtask = () => {
		setCreatingTask((priv) => !priv);
	};

	function handleSave() {
		const user = JSON.parse(localStorage.getItem('user'));
		const userId = user.userId;
		const token = localStorage.getItem('token');

		fetch('http://localhost:3030/createTask', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify({ title, description, userId }),
		})
			.then((res) => res.json())
			.then((data) => {
				setReload((prev) => !prev);
				setTitle('');
				setDescription('');
				setCreatingTask(false);
			})
			.catch((err) => {
				console.log('Error creating task:', err);
			});
	}
	return (
		<div className={style.taskContainer}>
			<button className={style.ctBtn} onClick={createtask}>
				Create Task!
			</button>

			<div className={style.inputContainer} hidden={!creatingTask}>
				<div className={style.inputs}>
					<label>Task Title</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<label>Description</label>
					<textarea
						className={style.textarea}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></textarea>
				</div>

				<div className={style.btnContainer}>
					<button onClick={createtask} className={style.btn}>
						Cancel
					</button>
					<button onClick={handleSave} className={style.btn}>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}
