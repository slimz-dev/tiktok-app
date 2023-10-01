import { useParams, Navigate } from 'react-router-dom';

function Profile() {
	const id = useParams();
	if (!id.user.startsWith('@')) return <Navigate to="/404" />;
	return <div>profile</div>;
}

export default Profile;
