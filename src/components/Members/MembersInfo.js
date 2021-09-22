export default function MembersInfo(props) {
	return <>
		{props.activeView && <div className="members__info m-text-left">
			<h4 className="members__info-name" >Name: {props.member[0] && props.member[0].name}</h4>
			<ul className="m-text-center">
				{props.member[0] && props.member[0].bikes && "Bikes:"}
				{props.member[0] && props.member[0].bikes 
					&& props.member[0].bikes.map((bike, i) => {
						return <li key={i}>{bike}</li>
					})}
			</ul>
			
			<button 
				className="btn members__close m-btn-close"
				onClick={e => props.onHandleMemberInfoClose(e, props.member[0].id)} 
				type="button">
			</button>
		</div>}
	</>
}