import Taskcard from '../Taskcard/Taskcard';
import style from './Taskpanel.module.css';

export default function Taskpanel() {
	return (
		<div className={style.container}>
			<div className={style.whiteSpace}></div>
			<div className={style.taskContainer}>
				<Taskcard />
				<Taskcard />
				<Taskcard />
				<Taskcard />
				<Taskcard />
				<Taskcard />
			</div>
			<div className={style.pagination}></div>
		</div>
	);
}
