import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useHistory, useParams } from "react-router-dom";
import BackButton from "../../components/molecules/BackButton";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import useAttendClass from "../../hooks/mutations/classes/useAttendClass";
import { FaRegFilePdf } from "react-icons/fa";
import { Spinner } from "reactstrap";

interface LectureParams {
  id: string;
}

export default function LectureQuizes() {
  const params = useParams<LectureParams>();
  let router = useHistory();
  const { data: userData, isLoading: userLoading } = useCurrentUser();
  const { mutate, isLoading } = useAttendClass(params?.id);
  const [data, setData] = useState<any>(null);

  const course = data?.class?.course;

  const sessions = course?.sections;

  console.log(sessions);

  useEffect(
    () => {
      if (!params?.id) router?.goBack();

      if (data) return;

      // Fetch course data

      mutate(
        {
          section: "section 1",
          watchTime: "",
        },
        {
          onSuccess: (d) => {
            console.log("Gotten class data");
            setData(d);
          },
        }
      );
    },

    //authomatically mark attendance when the user reaches this page
    [params?.id, router, mutate, sessions, data]
  );

  return (
    <div className=" ">
      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>Course Quizes</div>
        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        <div>{`${userData?.firstName} ${userData?.firstName}`}</div>
        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        <div>{`${userData?.level?.name
          ?.split("_")
          .join(" ")
          .toLowerCase()}`}</div>
        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        <div>{`${userData?.campus?.name}`}</div>
      </div>
      <BackButton />

      <div className="d-flex align-items-center gap-4 flex-wrap mt-5  ">
        {isLoading && <Spinner />}

        <h2>Quizes Here</h2>
        {/* {sessions?.map((pdf: any, i: number) => {
          console.log(pdf?.materials[0]);

          return (
            <div key={i}>
              {pdf?.materials[0]?.path && (
                <div className="text-center">
                  <a
                    href={pdf?.materials[0]?.path}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaRegFilePdf style={{ fontSize: "60px", color: "red" }} />
                  </a>
                  <p className="text-2xl my-3">{pdf?.materials[0]?.name}</p>
                </div>
              )}
            </div>
          );
        })} */}
      </div>
    </div>
  );
}
