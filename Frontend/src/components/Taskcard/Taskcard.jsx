import style from './Taskcard.module.css';

export default function Taskcard() {
	return (
		<div className={style.container}>
			<div id="title" className={style.head}>
				<h3>Tst</h3>
			</div>
			<div id="body" className={style.body}>
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel
					exercitationem magnam accusamus similique earum corrupti, in hic ipsa,
					sint nam, nihil soluta omnis porro cupiditate dignissimos dicta nemo
					totam ea.
				</p>
			</div>
			<div id="date" className={style.date}>
				date
			</div>
		</div>
	);
}
