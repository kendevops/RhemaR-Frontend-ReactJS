import React, { useState } from "react";
import typography from "../../assets/img/Typography";
import Tab from "../../components/atoms/Tab";
import SearchBar from "../../components/general/searchBar";
import FileCard, { FileCardProps } from "../../components/molecules/FileCard";
import CardWrapper from "../../components/students/CardWrapper";
import CourseTimetable from "../../components/students/CourseTimetable";
import { resourcesData } from "../../data/Resources";

const options = ["Course Timetable", "RBTC Materials"];
export default function Downloads() {
  const [tab, setTab] = useState(1);
  const currentOption = options[tab];

  const data = resourcesData;

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
        <article className="d-flex gap-5 ">
          <SearchBar />
        </article>
      )}

      {/* Content */}
      <CardWrapper>
        {/* Course Timetable */}
        {currentOption === "Course Timetable" && (
          <>
            <CourseTimetable />
          </>
        )}

        {/* RBTC Materials */}
        {currentOption === "RBTC Materials" && (
          <section>
            <ul className="row mt-4">
              {data.map((res: FileCardProps, i: number) => {
                return (
                  <li className="col-sm-3" key={i.toString()}>
                    <FileCard {...res} />
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
