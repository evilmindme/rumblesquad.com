import MembersInfo from './MembersInfo';

export default function MembersList(props) {
	const {id, name} = props.member;

	return <>
		<div 
			className={`members__profile m-id${id} ${props.profileView.active[id] ? 'active' : ''}`} 
			onClick={e => props.onHandleProfileClick(e, id)}
			key={id}
			title="Click to see more info"
			data-profileview={props.profileView.active[id]}
		>
			<h4 className="members__name" >{name}</h4>
			{props.currentMember && props.profileView.active[id] && props.profileActive && <MembersInfo 
				member={props.currentMember}
				activeView={props.profileActive}
				onHandleMemberInfoClose={props.onHandleMemberInfoClose}
			/>}
		</div>
	</>
}
