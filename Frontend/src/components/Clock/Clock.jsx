import { useState, useEffect } from 'react';

import style from './Clock.module.css';

export default function Clock() {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className={style.container}>
			<div className={style.date}>
				{time.toLocaleDateString([], {
					year: 'numeric',
					month: 'short',
					day: 'numeric',
				})}
			</div>

			<div className={style.clock}>
				{time.toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
				})}
			</div>
		</div>
	);
}
