import { useState } from 'react';

import Usercard from '../Usercard/Usercard';
import Createtask from '../Createtask/Createtask.jsx';

import style from './Sidepanel.module.css';
import Dashboard from '../Dashboard/Dashboard.jsx';

export default function Sidepanel() {
	const [isDashboard, SetIsDashboard] = useState(false);

	return (
		<div className={style.container}>
			<div className={style.whiteSpace}></div>
			<div className={style.controllContainer}>
				{isDashboard ? <Dashboard /> : <Createtask />}
				<div>
					<Usercard />
				</div>
			</div>
		</div>
	);
}
