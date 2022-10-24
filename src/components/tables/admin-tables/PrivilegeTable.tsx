import React from "react";
import Table from "../../general/table/Table";
import UpdatePrivilege from "../../modals/UpdatePrivilege";

const data = ["Privilege 1", "Privilege 2", "Privilege 3"];

export default function PrivilegeTable() {
  return (
    <Table
      columns={[
        {
          key: "Privilege",
          render: (data) => <p>{data}</p>,
          title: "Privilege",
        },
        {
          key: "Action",
          render: (data) => <UpdatePrivilege data={data} />,
          title: "Action",
        },
      ]}
      data={data}
    />
  );
}
