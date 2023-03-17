import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useCourse from "../../hooks/queries/classes/useCourse";
import { Spinner } from "reactstrap";
import BackButton from "../../components/molecules/BackButton";
import typography from "../../assets/img/Typography";
import Row from "../../components/layouts/Row";
import ColWrapper from "../../components/students/ColWrapper";
import useToggle from "../../utility/hooks/useToggle";
import CardWrapper from "../../components/students/CardWrapper";
import Table from "../../components/general/table/Table";
import CourseMaterials from "../../components/molecules/CourseMaterials";
import useFileReader from "../../utility/hooks/useFileReader";

interface Params {
  id: string;
}

export default function Course() {
  const { id } = useParams<Params>();
  const history = useHistory();
  const { img, onChangeFile, status } = useFileReader();
  const [isAddingSection, toggleAddSection] = useToggle();

  useEffect(() => {
    if (!id) history.push("/");
  }, [id, history]);

  const { data, isLoading } = useCourse(id);
  const sectionsData = data?.sections;
  const [courseMaterials, setCourseMaterials] = useState<any[]>([]);
  const [courseAssignments, setCourseAssignments] = useState<any[]>([]);

  useEffect(() => {
    if (!sectionsData) return;
    let courseMaterialsData: any[] = [];
    let courseAssignmentsData: any[] = [];

    sectionsData.forEach((s: any) => {
      courseMaterialsData?.push(
        ...s?.materials?.map((mat: any) => ({ ...mat, section: s?.name }))
      );

      courseAssignmentsData?.push(
        ...s?.assignments?.map((mat: any) => ({ ...mat, section: s?.name }))
      );
    });
    setCourseMaterials(courseMaterialsData);
    setCourseAssignments(courseAssignmentsData);
  }, [sectionsData]);

  return (
    <>
      {isLoading && <Spinner />}

      <section className="px-4 my-5">
        <BackButton />

        {data && (
          <>
            <div className="d-flex justify-content-between mb-3">
              <h2
                style={{ fontSize: typography.h2 }}
                className="font-bold mt-3"
              >
                {data?.title}
              </h2>

              <div className="d-flex gap-5">
                <div>
                  <label htmlFor="banner">
                    <u>Change Banner</u>
                  </label>
                  <input
                    onChange={onChangeFile}
                    id="banner"
                    type={"file"}
                    accept="*/image"
                    hidden
                  />
                </div>
                <u>Edit Course Name</u>
              </div>
            </div>

            <div
              className="overflow-hidden"
              style={{
                maxHeight: "200px",
              }}
            >
              <img
                style={{
                  width: "100%",
                }}
                src={data?.bannerUrl}
                alt={`${data?.title}`}
              />
            </div>
          </>
        )}
      </section>

      {/* Tables */}
      <Row style={{ marginTop: "3rem" }}>
        {/* Left */}
        <ColWrapper lg="7">
          <CardWrapper className="h-100">
            <div className="d-flex justify-content-between align-items-center">
              <h1>Sections</h1>

              <button
                className="btn btn-lg btn-blue-800 w-25"
                onClick={toggleAddSection}
              >
                Add
              </button>
            </div>

            <Table.Wrapper>
              <Table
                data={sectionsData}
                columns={[
                  {
                    key: "Name",
                    title: "Name",
                    render: (d) => <p>{d?.name}</p>,
                  },
                  {
                    key: "Materials",
                    title: "Materials",
                    render: (d) => <p>{d?.materials?.length}</p>,
                  },
                  {
                    key: "Action",
                    title: "Action",
                    render: (d) => {
                      return (
                        <div className="d-flex gap-4">
                          <u>Edit</u>
                          <u>Delete</u>
                        </div>
                      );
                    },
                  },
                ]}
              />
            </Table.Wrapper>
          </CardWrapper>
        </ColWrapper>

        {/* Right */}
        <ColWrapper lg="5">
          <CardWrapper className="mb-5">
            <h1 className="mb-4">
              Course Materials ({courseMaterials?.length?.toString()})
            </h1>
            <CourseMaterials data={courseMaterials} />
          </CardWrapper>

          <CardWrapper>
            <h1 className="mb-4">
              Course Assignments ({courseAssignments?.length?.toString()})
            </h1>
            <CourseMaterials data={courseAssignments} />
          </CardWrapper>
        </ColWrapper>
      </Row>
    </>
  );
}
