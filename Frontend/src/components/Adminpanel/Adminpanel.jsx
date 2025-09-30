import Clock from '../Clock/Clock';
import Usercard from '../Usercard/Usercard';

import style from './Adminpanel.module.css';

export default function Adminpanel() {
	return (
		<div className={style.container}>
			<div className={style.dataContainer}>
				<div className={style.whiteSpace}></div>
				<div className={style.dataPanel}>
					<Clock />
					<div className={style.data}>
						<p>Task</p>
						<p>Users</p>
					</div>
				</div>
				<div className={style.whiteSpace}></div>
			</div>
			<div className={style.userContainer}>
				<div className={style.userListContainer}>
					<div className={style.userList}>
						<Usercard />
						<Usercard />
						<Usercard />
						<Usercard />
						<Usercard />
						<Usercard />
						<Usercard />
					</div>
					<div className={style.paging}>{/* page */}</div>
				</div>
				<div className={style.userEdit}>
					<h4>Check back soon..</h4>
				</div>
			</div>
		</div>
	);
}
