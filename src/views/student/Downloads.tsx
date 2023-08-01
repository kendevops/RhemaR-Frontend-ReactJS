import React, { useState } from "react";
import typography from "../../assets/img/Typography";
import Tab from "../../components/atoms/Tab";
import SearchBar from "../../components/general/searchBar";
import FileCard, { FileCardProps } from "../../components/molecules/FileCard";
import CardWrapper from "../../components/students/CardWrapper";
import CourseTimetable from "../../components/students/CourseTimetable";
import { resourcesData } from "../../data/Resources";
import getFileType from "../../utils/getFileType";
import useResources from "../../hooks/queries/classes/useResources";
import { Spinner } from "reactstrap";

const options = ["Course Timetable", "RBTC Materials"];
export default function Downloads() {
  const [tab, setTab] = useState(0);
  const currentOption = options[tab];

  const { data, isLoading } = useResources();
  const resourcesData = data?.nodes;

  return (
    <>
      {/* Card Header */}
      <div className="relative mt-3 mb-5">
        <h1
          style={{
            fontSize: typography.h1,
          }}
          className="fw-bold resources-text"
        >
          Downloads
        </h1>
        <img className="w-100" src={`/resources.png`} alt="Resources" />
      </div>

      {/* Tabs */}
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
      </Tab.Wrapper>

      {/* Search Bar */}
      {currentOption === "RBTC Materials" && (
        <article className="d-flex gap-4 mt-3 mb-5">
          <SearchBar />
        </article>
      )}

      {/* Content */}
      <CardWrapper className="mb-5">
        {/* Course Timetable */}
        {currentOption === "Course Timetable" && (
          <>
            <CourseTimetable />
          </>
        )}

        {/* RBTC Materials */}
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
      </CardWrapper>
    </>
  );
}
