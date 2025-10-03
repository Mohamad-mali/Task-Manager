import style from './Usercard.module.css';

import userIcon from '../../assets/userIcon.jpg';

export default function Usercard({
	setIsEditing = () => {},
	isEditing = false,
	handleSave = () => {},
	inadmin = false,
	userData,
	handleEditAdmin = () => {},
}) {
	function handleEdit() {
		setIsEditing(true);
	}

	return (
		<div className={style.container}>
			<div className={style.userInfo}>
				<img
					src={`http://localhost:3030${userData.image}`}
					alt="usericon"
					className={style.userIcon}
				/>
				<h3 className={style.user}>{userData.userName}</h3>
			</div>
			{inadmin ? (
				<button
					className={style.btnA}
					onClick={() => handleEditAdmin(userData.id)}
				>
					Edit
				</button>
			) : isEditing ? (
				<button className={style.btn} onClick={handleSave}>
					Save
				</button>
			) : (
				<button className={style.btn} onClick={handleEdit}>
					Edit
				</button>
			)}
		</div>
	);
}
