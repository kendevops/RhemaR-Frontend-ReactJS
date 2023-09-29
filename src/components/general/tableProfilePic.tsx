import imgU from "../../assets/img/avatars/female-small.png";

type TableProfilePictureProps = {
  src?: string;
};

export default function TableProfilePicture({ src }: TableProfilePictureProps) {
  return (
    <div className="" style={{ width: "23px", borderRadius: "50%" }}>
      <img
        className=""
        src={imgU}
        alt="Profile"
        style={{ width: "23px", borderRadius: "50%" }}
      />
    </div>
  );
}
