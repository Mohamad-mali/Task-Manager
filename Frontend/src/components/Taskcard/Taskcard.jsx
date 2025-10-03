import style from './Taskcard.module.css';

export default function Taskcard({
	title,
	decription,
	createdAt,
	handleDelete,
	taskId,
}) {
	return (
		<div className={style.container}>
			<div id="title" className={style.head}>
				<h3>{title}</h3>
				<p onClick={() => handleDelete(taskId)} className={style.delete}>
					X
				</p>
			</div>
			<div id="body" className={style.body}>
				<p>{decription}</p>
			</div>
			<div id="date" className={style.date}>
				{createdAt}
			</div>
		</div>
	);
}
