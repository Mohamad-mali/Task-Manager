import { useState } from 'react';

import style from './Sidepanel.module.css';

export default function Sidepanel() {
	const [creatingTask, setCreatingTask] = useState(false);

	const createtask = () => {
		setCreatingTask((priv) => !priv);
	};

	function handleSave() {}

	return (
		<div className={style.container}>
			<div className={style.whiteSpace}></div>
			<div className={style.taskContainer}>
				<button className={style.ctBtn} onClick={createtask}>
					Create Task!
				</button>

				<div className={style.inputContainer} hidden={!creatingTask}>
					<div className={style.inputs}>
						<label>Task Title</label>
						<input type="text" />
						<label>Description</label>
						<textarea className={style.textarea}></textarea>
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
		</div>
	);
}
