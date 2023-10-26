import { MouseEventHandler } from "react";
import { Delete } from "react-feather";
import getTimeString from "../../utils/getTimeString";
import { ConfirmDeleteModal } from "../modals/ConfirmDeleteModal";
import useToggle from "../../utility/hooks/useToggle";
import useDeleteNotification from "../../hooks/queries/notifications/useDeleteNotification";
import { toast } from "react-toastify";
import ToastContent from "./ToastContent";
import handleError from "../../utils/handleError";
import NewAnnouncementModal from "../modals/NewAnnouncement";

type AnnouncementProps = {
  title: string;
  message: string;
  date: Date;
  onPress?: MouseEventHandler;
  isSelected?: boolean;
  refetch?: any;
  id?: string;
  data?: any;
};

type DeleteAnnouncentprops = {
  id?: any;
  refetch: any;
  data?: any;
};

function DeleteAnnouncent({ id, refetch, data }: DeleteAnnouncentprops) {
  const [isEditing, toggleEditing] = useToggle();
  const [visibilityDeleteModal, toggleDeleteModal] = useToggle();

  // const id = data?.id;

  const deleteIt = useDeleteNotification(id);

  const isDeleteLoading = deleteIt?.isLoading;

  const handleDelete = async () => {
    deleteIt.mutate(undefined, {
      onSuccess: () => {
        toast.success(
          <ToastContent
            type={"success"}
            heading={"Success"}
            message={`Announcent deleted successfully`}
          />,
          ToastContent.Config
        );
        refetch();

        toggleDeleteModal();
      },
      onError: (e: any) => {
        handleError(e);
        toggleDeleteModal();
      },
    });
  };

  return (
    <>
      {/* <FaEdit
        onClick={toggleEditing}
        style={{ cursor: "pointer", fontSize: "23px" }}
      /> */}
      <ConfirmDeleteModal
        visibility={visibilityDeleteModal}
        toggle={toggleDeleteModal}
        onDelete={() => handleDelete()}
        isLoading={isDeleteLoading}
      />
    </>
  );
}

export default function Announcement({
  date,
  message,
  title,
  onPress,
  isSelected,
  id,
  refetch,
  data,
}: AnnouncementProps) {
  return (
    <article
      className={`py-3 px-1 border-bottom ${
        isSelected ? "bg-blue-200" : "bg-white"
      }`}
    >
      {/* Header */}
      <div>
        <div className="d-flex justify-content-between gap-2">
          <h2
            style={{
              cursor: "pointer",
            }}
            onClick={onPress ? onPress : console.log}
            className="text-xl font-bold text-blue-800 mb-2 hover"
          >
            {title}
          </h2>
          {/* {onPressDelete && (
            <Delete
              style={{
                cursor: "pointer",
              }}
              onClick={onPressDelete}
            />
          )} */}

          <DeleteAnnouncent id={id} refetch={refetch} data={data} />
        </div>
        <p className="text-sm text-start">
          {date.toDateString()} • {getTimeString({ date })}
        </p>
      </div>

      <p
        className="mt-3 text-start"
        style={{
          lineHeight: "2rem",
        }}
      >
        {message}
      </p>
    </article>
  );
}
