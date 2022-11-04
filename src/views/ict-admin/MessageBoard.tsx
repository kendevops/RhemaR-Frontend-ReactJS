import { useState } from "react";
import typography from "../../assets/img/Typography";
import Row from "../../components/layouts/Row";
import NewAnnouncementModal from "../../components/modals/NewAnnouncement";
import Announcement from "../../components/molecules/Announcement";
import CardWrapper from "../../components/students/CardWrapper";
import ColWrapper from "../../components/students/ColWrapper";
import useToggle from "../../utility/hooks/useToggle";
import getTimeString from "../../utils/getTimeString";

interface announcement {
  title: string;
  message: string;
  date: Date;
}

const announcements: announcement[] = [
  {
    date: new Date(),
    message:
      "This is to inform you that there will be a Taster Session on Christ the Healer at Abuja Campus from 07 08 January 2022 at the RBTC HQ in Abuja. Please invite others",
    title: "Taster Session on Believer’s Authority 1",
  },
  {
    date: new Date(),
    message:
      "This is to inform you that there will be a Taster Session on Christ the Healer at Abuja Campus from 07 08 January 2022 at the RBTC HQ in Abuja. Please invite others",
    title: "Taster Session on Christ the Healer",
  },
  {
    date: new Date(),
    message:
      "This is to inform you that there will be a Taster Session on Christ the Healer at Abuja Campus from 07 08 January 2022 at the RBTC HQ in Abuja. Please invite others",
    title: "Taster Session on Biblical Prosperity",
  },
  {
    date: new Date(),
    message:
      "This is to inform you that there will be a Taster Session on Christ the Healer at Abuja Campus from 07 08 January 2022 at the RBTC HQ in Abuja. Please invite others",
    title: "Taster Session on Biblical Prosperity",
  },
];

export default function MessageBoard() {
  const [visibility, toggle] = useToggle();

  const [selected, setSelected] = useState(1);
  const data = announcements;

  const checkValidIndex = (index: number) => {
    return data?.length >= index;
  };

  return (
    <Row style={{ marginTop: "3rem" }}>
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
        <CardWrapper className="mt-5">
          <h2 className="text-xl font-bold text-blue-600 mb-3">Announcement</h2>
          <ul className="no-padding-left">
            {data.map((others, i) => {
              const isSelected = i === selected;

              function onPressDelete() {}
              function onPress() {
                setSelected(i);
              }

              const props = {
                ...others,
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
      </ColWrapper>

      {/* Selected Announcements */}
      <ColWrapper lg="7">
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
                    {data[selected]?.date.toDateString()} •{" "}
                    {getTimeString({ date: data[selected]?.date })}{" "}
                  </time>
                </div>

                <p
                  className="mt-4"
                  style={{
                    lineHeight: "2rem",
                  }}
                >
                  {data[selected]?.message}
                </p>
              </>
            )}
          </div>
        </CardWrapper>
      </ColWrapper>
    </Row>
  );
}
