import { Spinner } from "reactstrap";
import Table from "../../general/table/Table";
import useAllCampuses from "../../../hooks/queries/classes/useAllCampuses";
import useToggle from "../../../utility/hooks/useToggle";
import AddCampusModal from "../../modals/AddCampusModal";

interface EditCampusProps {
  id: string;
  data: any;
}

function EditCampus({ data, id }: EditCampusProps) {
  const [isOpen, toggle] = useToggle();

  const defaultValues = {
    ...data,
  };

  return (
    <div>
      {/* <AddCampusModal {...{ isOpen, toggle, defaultValues, id }} /> */}
      <u className="cursor-pointer" onClick={toggle}>
        Edit
      </u>
    </div>
  );
}

export default function CampusesTable() {
  const { isLoading, data } = useAllCampuses();
  const campusesData = data?.nodes;

  // Breakdown students on campuses

  return (
    <Table.Wrapper>
      {isLoading && <Spinner />}
      {campusesData && (
        <Table
          columns={[
            {
              key: "Name",
              title: "Name",
              render: (d) => <p>{d?.name}</p>,
            },
            {
              key: "Students",
              title: "Students",
              render: (d) => <p>{d?._count?.students}</p>,
            },
            {
              key: "Applications",
              title: "Applications",
              render: (d) => <p>{d?._count?.applications}</p>,
            },
            {
              key: "Tuitions",
              title: "Tuitions",
              render: (d) => (
                <div>
                  <ul className="no-padding-left">
                    {d?.tuitions?.map((t: any, i: number) => {
                      const data = {
                        level: t?.level?.name,
                        campus: d?.name,
                        total: t?.total,
                        dueDate: t?.dueDate,
                        discount: t?.discount,
                        feePayment: t?.feePayment,
                        initialPayment: t?.initialPayment,
                        installmentMinimum: t?.installmentMinimum,
                      };
                      const id = t?.id;

                      return (
                        <li className="d-flex justify-content-between mb-2">
                          <p>{t?.level?.name}</p>

                          <EditCampus {...{ data, id }} />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ),
            },
          ]}
          data={campusesData}
        />
      )}
    </Table.Wrapper>
  );
}
