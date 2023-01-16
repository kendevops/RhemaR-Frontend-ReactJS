import FileTypeIcon from "../atoms/FIleTypeIcon";
import Table from "../general/table/Table";

type CourseMaterialsProps = {
  data: {
    size: number;
    path: string;
    name: string;
    type: string;
    section: string;
  }[];
};

export default function CourseMaterials({ data }: CourseMaterialsProps) {
  return (
    <>
      <Table.Wrapper>
        <Table
          {...{
            data,
            columns: [
              {
                key: "Name",
                title: "Name",
                render: (d) => {
                  return (
                    <div className="d-flex gap-3">
                      <FileTypeIcon
                        {...{ path: d?.path, name: d?.name, type: d?.type }}
                      />
                      <p>{d?.name}</p>
                    </div>
                  );
                },
              },
              {
                key: "Section",
                title: "Section",
                render: (d) => {
                  return <p>{d?.section}</p>;
                },
              },
              {
                key: "Action",
                title: "Action",
                render: (d) => {
                  return (
                    <a href={d?.path}>
                      <u>View</u>
                    </a>
                  );
                },
              },
            ],
          }}
        />
      </Table.Wrapper>
    </>
  );
}
