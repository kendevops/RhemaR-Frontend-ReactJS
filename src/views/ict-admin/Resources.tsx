import CardHeader from "../../components/atoms/CardHeader";
import ResourcesIcon from "../../assets/img/resourcesIcon.svg";
import SearchBar from "../../components/general/searchBar";
import UploadResourceModal from "../../components/modals/UploadResource";
import FileCard, { FileCardProps } from "../../components/molecules/FileCard";
import CardWrapper from "../../components/students/CardWrapper";
// import { resourcesData } from "../../data/Resources";
import useToggle from "../../utility/hooks/useToggle";
import useResources from "../../hooks/queries/classes/useResources";
import { Spinner } from "reactstrap";
import getFileType from "../../utils/getFileType";

export default function Resources() {
  const [isUploading, toggleUploading] = useToggle();

  const { data, isLoading } = useResources();
  const resourcesData = data?.nodes;
  // title, type, url

  return (
    <>
      {/* Card Header */}
      <CardHeader heading="resources" imgSrc={ResourcesIcon} />

      {/* Search Row */}
      <article className="d-flex gap-5 ">
        <div style={{ width: "70%" }}>
          <SearchBar />
        </div>
        <UploadResourceModal isOpen={isUploading} toggle={toggleUploading} />
        <button
          className="btn btn-blue-800 btn-lg"
          style={{ width: "30%" }}
          onClick={toggleUploading}
        >
          Upload Material
        </button>
      </article>

      {/* Resources Card */}
      <CardWrapper>
        {isLoading && <Spinner />}
        {resourcesData && (
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
        )}
      </CardWrapper>
    </>
  );
}
