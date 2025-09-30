import style from './Usercard.module.css';

import userIcon from '../../assets/userIcon.jpg';

export default function Usercard() {
	return (
		<div className={style.container}>
			<div className={style.userInfo}>
				<img src={userIcon} alt="usericon" className={style.userIcon} />
				<h3>Mali</h3>
			</div>
			<i>Edit</i>
		</div>
	);
}
