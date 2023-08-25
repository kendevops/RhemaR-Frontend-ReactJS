import React, { useState } from "react";
import Tab from "../../components/atoms/Tab";
import useResources from "../../hooks/queries/classes/useResources";
import useCourses from "../../hooks/queries/classes/useCourses";
import { Icon } from "@iconify/react";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import { FaRegFilePdf } from "react-icons/fa";
import { ImFilePicture } from "react-icons/im";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

// const options = ["Course Timetable", "RBTC Materials"];
export default function Downloads() {
  const [level, setLevel] = useState(0);

  let levelTabs = ["Level 1", "Level 2"];

  const currentLevel = levelTabs[level];

  const { data: userData, isLoading: userLoading } = useCurrentUser();

  const { data: coursesData, isLoading: coursesLoading } = useCourses();
  const courses = coursesData?.courses;

  const { data, isLoading } = useResources();

  const resourcesData = data?.nodes;

  console.log(courses);

  return (
    <>
      <div className="container my-5">
        <div
          className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
          style={{ color: "white", fontWeight: 700 }}
        >
          <Icon
            icon="mdi:note-text"
            style={{ width: "20px", height: "20px" }}
          />
          <div>Downloads</div>

          <div
            className=" bg-white "
            style={{ width: "2px", height: "20px" }}
          ></div>
          <div>{`${userData?.campus?.name}`}</div>
        </div>
        <div>
          <Tab.Wrapper className="d-flex gap-3 ">
            {levelTabs?.map((t, i) => {
              return (
                <Tab
                  key={t}
                  tabColor="#289483"
                  isSelected={currentLevel === t}
                  onClick={() => {
                    setLevel(i);
                  }}
                >
                  {t}
                </Tab>
              );
            })}
          </Tab.Wrapper>
        </div>

        <div className="my-4">
          <form
            action=""
            onSubmit={() => {}}
            className="d-flex gap-4 align-items-center my-3"
          >
            <select name="" id="" className="px-4 py-3">
              <option value="">Select By Course/Category</option>
              <option value="">Select By File Type</option>
            </select>

            <select name="" id="" className="px-4 py-3">
              <option value="">Select By File Type</option>
              <option value="">Select By Course/Category</option>
            </select>

            <button
              type="submit"
              className="btn btn-blue-800 py-3 px-5 text-xl"
            >
              Search
            </button>
          </form>

          <hr className="" />
        </div>

        <div className="my-5">
          <div className="d-flex align-items-center flex-wrap justify-content-between">
            {courses?.map((cs: any, ix: number) => {
              return cs?.sections.map((c: any, i: number) => {
                console.log(c?.materials[0]);
                // const props = {
                //   ...c,
                //   type: getFileType(c?.materials[0]?.type),
                //   url: c?.materials[0]?.path,
                // };

                return (
                  <div key={i} className="col-6 px-3 my-3">
                    <a
                      // href={pdf?.materials[0]?.path}
                      href={c?.materials[0]?.path}
                      className="d-flex align-items-center gap-4 shadow p-4 rounded-4 col-12  "
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {c?.materials[0]?.path.includes(".pdf") ? (
                        <FaRegFilePdf
                          style={{ fontSize: "60px", color: "red" }}
                        />
                      ) : (
                        <ImFilePicture
                          style={{ fontSize: "60px", color: "red" }}
                        />
                      )}

                      <div>
                        <h2 className="fw-semibold ">
                          Faith Foundation Syllabus (299kb)
                        </h2>
                        <p>For Faith Foundation Course</p>
                      </div>
                    </a>
                  </div>
                );
              });
            })}
          </div>

          <div className="d-flex align-items-center justify-content-between my-5 text-4xl">
            <h2>page 1 0f 12</h2>
            <div className="d-flex align-items-center gap-5">
              <h2>
                <AiOutlineDoubleLeft className="" /> Previous
              </h2>
              <h2>
                Next <AiOutlineDoubleRight />
              </h2>
            </div>
          </div>
        </div>
      </div>
      {/* Card Header */}
      {/* <div className="relative mt-3 mb-5">
        <h1
          style={{
            fontSize: typography.h1,
          }}
          className="fw-bold resources-text"
        >
          Downloads
        </h1>
        <img className="w-100" src={`/resources.png`} alt="Resources" />
      </div> */}

      {/* Tabs
      <Tab.Wrapper>
        {options.map((o, i) => {
          return (
            <Tab
              tabColor="#289483"
              onClick={() => setTab(i)}
              isSelected={tab === i}
              key={o}
            >
              {o}
            </Tab>
          );
        })}
      </Tab.Wrapper> */}

      {/* Search Bar */}
      {/* {currentOption === "RBTC Materials" && (
        <article className="d-flex gap-4 mt-3 mb-5">
          <SearchBar />
        </article>
      )} */}

      {/* Content */}
      {/* <CardWrapper className="mb-5">
        {currentOption === "Course Timetable" && (
          <>
            <CourseTimetable />
          </>
        )}

        {currentOption === "RBTC Materials" && (
          <section>
            {isLoading && <Spinner />}
            <ul className="row mt-4">
              {resourcesData.map((res: any, i: number) => {
                const props = {
                  ...res,
                  type: getFileType(res?.material?.type),
                  url: res?.material?.path,
                };
                return (
                  <li className="col-sm-3" key={i.toString()}>
                    <FileCard {...props} />
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </CardWrapper> */}
    </>
  );
}
