import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useHistory, useParams } from "react-router-dom";
import BackButton from "../../components/molecules/BackButton";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import useAttendClass from "../../hooks/mutations/classes/useAttendClass";
import { FaRegFilePdf } from "react-icons/fa";
import { Spinner } from "reactstrap";
import Tab from "../../components/atoms/Tab";
import CourseVideo from "./courseVideo";
import CourseAudio from "./courseAudio";
import CoursePDF from "./coursePDF";
import CreateSectionModal from "../../components/modals/CreateSectionModal";
import useToggle from "../../utility/hooks/useToggle";
import useCourse from "../../hooks/queries/classes/useCourse";
import useCreateCourseSection from "../../hooks/mutations/classes/useCreateCourseSection";
import { toast } from "react-toastify";
import ToastContent from "../../components/molecules/ToastContent";
import handleError from "../../utils/handleError";

interface LectureParams {
  id: string;
}

export default function LectureMaterial() {
  const params = useParams<LectureParams>();
  let router = useHistory();
  const { data: userData, isLoading: userLoading } = useCurrentUser();
  const [isAddingSection, toggleAddSection] = useToggle();

  // const { mutate, isLoading } = useAttendClass(params?.id);
  const { data, isLoading, refetch } = useCourse(params?.id);
  const { mutate, isLoading: createSectionLoading } = useCreateCourseSection(
    params?.id
  );

  // const [data, setData] = useState<any>(null);
  const [tab, setTab] = useState(0);

  let Tabs = ["Course Videos", "Course Audios", "Course PDFs"];

  const currentTab = Tabs[tab];

  const course = data?.class?.course;

  const sessions = data?.sections;

  console.log(data);
  console.log(sessions);

  function onCreateSection(data: any) {
    // setSectionsData((p) => [...p, data]);

    console.log(data);

    // mutate(data, {
    //   onSuccess: () => {
    //     toast.success(
    //       <ToastContent
    //         heading={"Section created successfully"}
    //         type={"success"}
    //         message={`Section has been created successfully`}
    //       />,
    //       ToastContent.Config
    //     );
    //   },

    //   onError: (e: any) => {
    //     handleError(e);
    //   },
    // });
  }

  //   useEffect(
  //     () => {
  //       if (!params?.id) router?.goBack();

  //       if (data) return;

  //       // Fetch course data

  //       mutate(
  //         {
  //           section: "section 1",
  //           watchTime: "",
  //         },
  //         {
  //           onSuccess: (d) => {
  //             console.log("Gotten class data");
  //             setData(d);
  //           },
  //         }
  //       );
  //     },

  //     //authomatically mark attendance when the user reaches this page
  //     [params?.id, router, mutate, sessions, data]
  //   );

  return (
    <div className=" ">
      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>Course Name Here</div>
        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        <div>ELearnig Course Materials</div>
      </div>
      <BackButton />

      <>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="my-4">
              <Tab.Wrapper className="d-flex gap-3 ">
                {Tabs?.map((t, i) => {
                  return (
                    <Tab
                      key={t}
                      tabColor="#203864"
                      isSelected={currentTab === t}
                      onClick={() => {
                        setTab(i);
                      }}
                    >
                      {t}
                    </Tab>
                  );
                })}
              </Tab.Wrapper>

              <div className="my-5">
                {currentTab === "Course Audios" && (
                  <CourseAudio data={sessions} />
                )}
                {currentTab === "Course Videos" && (
                  <CourseVideo data={sessions} />
                )}
                {currentTab === "Course PDFs" && <CoursePDF />}
              </div>
            </div>

            <div className="d-flex align-items-center gap-4 flex-wrap mt-5  ">
              <CreateSectionModal
                toggle={toggleAddSection}
                isOpen={isAddingSection}
                onCreate={onCreateSection}
              />

              <div
                className="py-2 px-5 my-4 fw-bold mt-5 "
                style={{
                  background: "#203864",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => toggleAddSection()}
              >
                + Add Session
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
}
