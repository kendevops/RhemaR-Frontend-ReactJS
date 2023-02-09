import { useState } from "react";
import typography from "../../assets/img/Typography";
import Row from "../../components/layouts/Row";
import NewAnnouncementModal from "../../components/modals/NewAnnouncement";
import Announcement from "../../components/molecules/Announcement";
import CardWrapper from "../../components/students/CardWrapper";
import ColWrapper from "../../components/students/ColWrapper";
import useToggle from "../../utility/hooks/useToggle";
import getTimeString from "../../utils/getTimeString";
import useNotifications from "../../hooks/queries/notifications/useNotifications";
import { Spinner } from "reactstrap";

export interface announcement {
  id: string;
  type: "important";
  title: string;
  content: string;
  createdAt: string;
  publisher: {
    id: string;
    email: string;
    lastName: string;
    firstName: string;
  };
}

export default function MessageBoard() {
  const [visibility, toggle] = useToggle();

  const [selected, setSelected] = useState(0);
  const { data: notificationsData, isLoading } = useNotifications();

  const data = notificationsData?.nodes as announcement[];

  const checkValidIndex = (index: number) => {
    return data?.length >= index;
  };

  return (
    <Row style={{ marginTop: "3rem" }}>
      {isLoading && <Spinner />}
      {/* Announcements */}
      <ColWrapper lg="5">
        {/* New Announcement */}
        <div>
          <button onClick={toggle} className="btn btn-blue-800 btn-lg ">
            New Announcement
          </button>
          <NewAnnouncementModal {...{ toggle, visibility }} />
        </div>

        {/* Announcements */}
        {data && (
          <CardWrapper className="mt-5">
            <h2 className="text-xl font-bold text-blue-600 mb-3">
              Announcement
            </h2>
            <ul className="no-padding-left">
              {data.map((others, i) => {
                const isSelected = i === selected;

                function onPressDelete() {}
                function onPress() {
                  setSelected(i);
                }

                const props = {
                  title: others?.title,
                  message: others?.content,
                  date: new Date(others?.createdAt),
                  isSelected,
                  onPress,
                  onPressDelete,
                };

                return (
                  <li key={i}>
                    <Announcement {...props} />
                  </li>
                );
              })}
            </ul>
          </CardWrapper>
        )}
      </ColWrapper>

      {/* Selected Announcements */}
      <ColWrapper lg="7">
        {data && (
          <CardWrapper className="h-100">
            <div>
              {checkValidIndex(selected) && (
                <>
                  <div className="py-3 border-bottom">
                    <h2
                      style={{
                        fontSize: typography.h2,
                      }}
                      className="text-xl font-bold text-blue-800 mb-3"
                    >
                      {data[selected]?.title}
                    </h2>
                    <time>
                      {new Date(data[selected]?.createdAt).toDateString()} •{" "}
                      {getTimeString({
                        date: new Date(data[selected]?.createdAt),
                      })}{" "}
                    </time>
                  </div>

                  <p
                    className="mt-4"
                    style={{
                      lineHeight: "2rem",
                    }}
                  >
                    {data[selected]?.content}
                  </p>
                </>
              )}
            </div>
          </CardWrapper>
        )}
      </ColWrapper>
    </Row>
  );
}
