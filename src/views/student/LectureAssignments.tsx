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

export default function LectureAssignments() {
  const params = useParams<LectureParams>();
  let router = useHistory();
  const { data: userData, isLoading: userLoading } = useCurrentUser();
  const { mutate, isLoading } = useAttendClass(params?.id);
  const [data, setData] = useState<any>(null);

  const course = data?.class?.course;

  const sessions = course?.sections;

  console.log(sessions);

  return (
    <div className=" ">
      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>Course Assignments</div>
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
        {sessions?.map((assgmts: any, i: number) => {
          console.log(assgmts?.assignments);
          return assgmts?.assignments?.map((ass: any, i: number) => {
            return (
              <div key={i}>
                {ass?.path && (
                  <div className="text-center">
                    <a href={ass?.path} target="_blank">
                      {/* <FaRegFileass style={{ fontSize: "60px", color: "red" }} />
                       */}

                      <img src={ass?.path} alt="Assingment" />
                    </a>
                    <p className="text-2xl my-3">{ass?.name}</p>
                  </div>
                )}
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}
