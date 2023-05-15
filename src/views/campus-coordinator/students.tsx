import React, { useState, useRef, useEffect } from "react";
import StudentsList from "../../components/lists/students-list/index";
import StudentsTable from "../../components/tables/students-table/index";
import userRoles from "../../utility/userRoles";
import Tab from "../../components/atoms/Tab";
import useAllUsers from "../../hooks/queries/useAllUsers";
import Table, { TableColumns } from "../../components/general/table/Table";
import { Spinner } from "reactstrap";

const Options = [
  {
    title: "All",
  },
  {
    title: "Prospective students",
    role: userRoles.PROSPECTIVE_STUDENT,
  },
  {
    title: "Level 1 students",
    role: `${userRoles.STUDENT}`,
    level: "LEVEL_1",
  },
  {
    title: "Level 2 students",
    role: `${userRoles.STUDENT}`,
    level: "LEVEL_1",
  },
];

const CampusCoordinatorStudents = () => {
  const [params, setParams] = useState<any>(null);
  const [option, setOption] = useState(0);

  const { data: userData, isLoading } = useAllUsers(params);
  const data = userData?.users?.nodes;

  const columns: TableColumns<any>[] = [
    {
      key: "Name",
      title: "Name",
      render: (data) => <p>{data?.firstName + " " + data?.lastName}</p>,
    },
    {
      key: "Phone Number",
      title: "Phone Number",
      render: (data) => <p>{data?.phoneNumber}</p>,
    },
    {
      key: "Email",
      title: "Email",
      render: (data) => <p>{data?.email}</p>,
    },
  ];

  return (
    <>
      {/* Header */}
      <div role={"tabpanel"} className="d-flex px-2 gap-3 border-bottom ">
        {Options.map(({ title, ...others }, i) => {
          const isSelected = i === option;
          function handleSelect() {
            setOption(i);

            setParams({ ...others });
          }

          return (
            <Tab
              tabColor="#289483"
              key={title}
              onClick={handleSelect}
              isSelected={isSelected}
            >
              {title}
            </Tab>
          );
        })}
      </div>

      {/* Table */}
      <Table.Wrapper>
        {isLoading && <Spinner />}
        {data && <Table columns={columns} data={data} />}
      </Table.Wrapper>
    </>
  );
};

export default CampusCoordinatorStudents;
