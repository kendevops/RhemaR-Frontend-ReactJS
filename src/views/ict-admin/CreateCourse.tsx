import { FormEvent, useState } from "react";
import BackButton from "../../components/molecules/BackButton";
import typography from "../../assets/img/Typography";
import Tab from "../../components/atoms/Tab";
import useForm from "../../utility/hooks/useForm";
import FormInput from "../../components/molecules/FormInput";
import useFileReader from "../../utility/hooks/useFileReader";
import CardWrapper from "../../components/students/CardWrapper";
import Table from "../../components/general/table/Table";
import useToggle from "../../utility/hooks/useToggle";
import CreateSectionModal from "../../components/modals/CreateSectionModal";

const initialBasicInfo = {
  code: "",
  desc: "",
  level: "",
  title: "",
  bannerUrl: "",
};

export default function CreateCourse() {
  const Options = ["Basic Information", "Sections"];
  const [option, setOption] = useState(0);
  const currentOption = Options[option];
  const [isAddingSection, toggleAddSection] = useToggle();
  const [isEditingSection, toggleEditSection] = useToggle();
  const { onChangeFile } = useFileReader();

  const [sectionsData, setSectionsData] = useState<any[]>([]);

  const {
    formData: basicInfoData,
    updateForm: updateBasicInfo,
    formIsValid: basicInfoIsValid,
  } = useForm({
    initialState: initialBasicInfo,
  });

  function onDeleteSection(name: string) {
    setSectionsData((p) => {
      const toBeDeleted = p?.findIndex((v) => v?.name === name);
      return p?.filter((_, i) => i !== toBeDeleted);
    });
  }

  function onEditSection(index: number, data: any) {
    setSectionsData((p) => {
      p[index] = data;
      return p;
    });
  }

  function onCreateSection(data: any) {
    setSectionsData((p) => [...p, data]);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const data = {
      ...basicInfoData,
      sections: sectionsData,
    };

    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <section className="px-4 my-5">
        <BackButton />

        <h2 style={{ fontSize: typography.h2 }} className="font-bold mt-3">
          Create Course
        </h2>

        <div className="d-flex justify-content-between">
          {/* Tabs */}
          <Tab.Wrapper>
            {Options.map((o, i) => {
              const isSelected = i === option;
              function onClick() {
                setOption(i);
              }
              return (
                <Tab tabColor="#289483" key={o} {...{ onClick, isSelected }}>
                  {o}
                </Tab>
              );
            })}
          </Tab.Wrapper>

          <button type="submit" className="btn btn-lg btn-blue-800 w-25">
            Complete course creation
          </button>
        </div>
      </section>

      {/* Basic Information */}
      {currentOption === Options[0] && (
        <CardWrapper>
          <FormInput
            label="Course code"
            placeholder="Course code e.g COS104"
            onChange={(e) => updateBasicInfo("code", e?.target?.value)}
            required
          />
          <FormInput
            label="Title"
            placeholder="Title of the course e.g Pneumatology 1"
            onChange={(e) => updateBasicInfo("title", e?.target?.value)}
            required
          />
          <FormInput
            label="Level"
            placeholder="Enter level"
            onChange={(e) => updateBasicInfo("level", e?.target?.value)}
            required
          />
          <FormInput
            label="Banner Url (1200px by 200px)"
            type={"file"}
            onChange={onChangeFile}
          />
        </CardWrapper>
      )}

      {/* Sections */}
      {currentOption === Options[1] && (
        <CardWrapper>
          <div className="d-flex justify-content-between align-items-center">
            <h1>Sections ({sectionsData?.length?.toString()})</h1>

            <CreateSectionModal
              toggle={toggleAddSection}
              isOpen={isAddingSection}
              onCreate={onCreateSection}
            />

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
                  render: (d, i) => {
                    console.log(i);
                    return (
                      <div className="d-flex gap-4">
                        <section>
                          <u onClick={toggleEditSection}>Edit</u>
                          <CreateSectionModal
                            defaultValues={d}
                            isOpen={isEditingSection}
                            onCreate={(data) => {
                              onEditSection(
                                sectionsData?.findIndex(
                                  (v) => v?.name === d?.name
                                ),
                                data
                              );
                            }}
                            toggle={toggleEditSection}
                          />
                        </section>
                        <u
                          onClick={() => {
                            onDeleteSection(d?.name);
                          }}
                        >
                          Delete
                        </u>
                      </div>
                    );
                  },
                },
              ]}
            />
          </Table.Wrapper>
        </CardWrapper>
      )}
    </form>
  );
}
