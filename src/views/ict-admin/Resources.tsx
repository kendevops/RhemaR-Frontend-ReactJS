import React from "react";
//import backgroundImg from "../../../public/resources.png"; Solomon this resources does not exist
import SearchBar from "../../components/general/searchBar";
import UploadResourceModal from "../../components/modals/UploadResource";
import FileCard, { FileCardProps } from "../../components/molecules/FileCard";
import CardWrapper from "../../components/students/CardWrapper";
import { resourcesData } from "../../data/Resources";
import useToggle from "../../utility/hooks/useToggle";

export default function Resources() {
  const [isUploading, toggleUploading] = useToggle();

  const data = resourcesData;

  return (
    <>
      {/* Card Header */}
      <div className="relative mt-3 mb-5">
        <h1 className="fw-bold resources-text">Resources</h1>
        {/* <img src={backgroundImg} alt="Resources" /> */}
      </div>

      {/* Search Row */}
      <article className="d-flex gap-5 m-5">
        <div style={{ width: "70%" }}>
          <SearchBar />
        </div>
        <UploadResourceModal isOpen={isUploading} toggle={toggleUploading} />
        <button
          className="btn btn-blue-800 btn-lg "
          style={{ width: "30%" }}
          onClick={toggleUploading}
        >
          Upload Material
        </button>
      </article>

      {/* Resources Card */}
      <CardWrapper>
        <ul className="row">
          {data.map((res: FileCardProps, i: number) => {
            return (
              <li className="col-sm-3" key={i.toString()}>
                <FileCard {...res} />
              </li>
            );
          })}
        </ul>
      </CardWrapper>
    </>
  );
}
