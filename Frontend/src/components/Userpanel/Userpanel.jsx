import Sidepanle from '../Sidepanel/Sidepanel.jsx';
import Taskpanel from '../Taskpanel/Taskpanel.jsx';

import style from './Userpanel.module.css';

export default function Userpanel() {
	return (
		<div className={style.container}>
			<Sidepanle />
			<Taskpanel />
		</div>
	);
}
