import { useState } from 'react';

import Sidepanle from '../Sidepanel/Sidepanel.jsx';
import Taskpanel from '../Taskpanel/Taskpanel.jsx';

import style from './Userpanel.module.css';

export default function Userpanel({ setIsLogedIn, setIsAdmin }) {
	const [reload, setReload] = useState(false);
	return (
		<div className={style.container}>
			<Sidepanle setReload={setReload} reload={reload} />
			<Taskpanel
				setIsLogedIn={setIsLogedIn}
				setIsAdmin={setIsAdmin}
				setReload={setReload}
				reload={reload}
			/>
		</div>
	);
}
