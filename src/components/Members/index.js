import {useContext, useState} from 'react';
import  { FirebaseContext } from '../../firebase';
import Loader from '../../components/Loader';
import MembersList from './MembersList';

// import { Carousel } from 'react-responsive-carousel';

export default function Members() {
	const [isLoading, setIsLoading] = useState(true);
	const [profileView, setProfileView] = useState({ "active": {id: false}, "stateActive": false}); 
	const [currentMember, setCurrentMember] = useState(false);
	const membersInfo = useContext(FirebaseContext);
	const membersRef = membersInfo.database.ref('members/profile/');

	// const carouselConfig = () => ({
	// 	// showIndicators: false,
	// 	showStatus: false,
	// 	centerMode: true,
	// 	centerSlidePercentage: 20,
	// })

	const [members, setMembers] = useState(() => {
		if (membersRef) {
			membersRef.once('value', (snapshot) => {
				const data = snapshot.val();
				setMembers(data);
				setIsLoading(false);
			});
		} else {
			return []
		}
	}); 

	function handleMemberInfoClose(e, id) {
		e.preventDefault();
		e.stopPropagation();

		setCurrentMember(false);
		setProfileView({
			"active": { [id]: false },
			"stateActive": false
		});
		
	}

	function handleMemberInfoClick(e, id) {
		e.preventDefault();
		setProfileView({
			"active": { [id]: true },
			"stateActive": true
		});

		setCurrentMember(members.filter(member => member.id === id));
	}
	return <>
		<section 
			className="members__container" 
			data-profileview={profileView.stateActive} 
		>
			<h1 className="members__title m-uppercase">Club members</h1>
			{isLoading && <Loader />}
			{!isLoading && <div className="members__list">
				{/* <Carousel width="100%" {...carouselConfig()}> */}
					{members.map(member => {
						return <MembersList 
							member={member}
							currentMember={currentMember}
							key={member.id}
							onHandleProfileClick={handleMemberInfoClick}
							profileView={profileView}
							profileActive={profileView.stateActive}
							onHandleMemberInfoClose={handleMemberInfoClose}
							
						/>
					})}
				{/* </Carousel> */}
			</div>}
		</section>
	</>
}
