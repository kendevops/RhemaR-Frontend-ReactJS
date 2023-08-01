import EditIcon from "../icons/Edit";
import UserIcon from "../icons/User";

interface StudentAvatarProps {
  imgUrl?: string;
}

export default function StudentAvatar({ imgUrl }: StudentAvatarProps) {
  const hasImg = imgUrl && imgUrl > "";

  function handleEdit() {}

  return (
    <figure className="student-avatar-wrapper">
      <div role={"img"} className="student-avatar">
        {hasImg ? <img alt="User Avatar" src={imgUrl} /> : <UserIcon />}
      </div>

      <button
        onClick={handleEdit}
        type="button"
        className="btn student-avatar-button"
      >
        <EditIcon />
      </button>
    </figure>
  );
}
