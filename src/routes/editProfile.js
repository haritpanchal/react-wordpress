import { useParams } from 'react-router-dom';

function EditProfile() {
  const { userId } = useParams();
  console.log(userId);
  // render the rest of the component's UI, using the userId as needed

  return (
    <div>
      Edit pofile {userId}
    </div>
  );
}

export default EditProfile;