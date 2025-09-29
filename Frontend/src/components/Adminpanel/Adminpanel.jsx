import Usercard from '../Usercard/Usercard';

import style from './Adminpanel.module.css';

export default function Adminpanel() {
	return (
		<div className={style.container}>
			<div className={style.dataContainer}>
				<div className={style.whiteSpace}></div>
				<div className={style.dataPanel}></div>
				<div className={style.whiteSpace}></div>
			</div>
			<div className={style.userContainer}>
				<div className={style.userList}>
					<Usercard />
					<Usercard />
					<Usercard />
					<Usercard />
					<Usercard />
					<Usercard />
					<Usercard />
					<Usercard />
					<Usercard />
					<Usercard />
					<Usercard />
					<Usercard />
					<Usercard />
					<Usercard />
					<Usercard />
					<Usercard />
					<Usercard />
				</div>
				<div className={style.userEdit}></div>
			</div>
		</div>
	);
}
