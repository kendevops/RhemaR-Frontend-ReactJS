import React from "react";
import { Spinner } from "reactstrap";
import useRoles from "../../../hooks/queries/useRoles";
import Table from "../../general/table/Table";
import UpdatePrivilege from "../../modals/UpdatePrivilege";

export default function PrivilegeTable() {
  const { data: query, isLoading } = useRoles();

  const data = query?.roles;

  return (
    <Table.Wrapper>
      {isLoading && <Spinner />}
      {data && (
        <Table
          columns={[
            {
              key: "Privilege",
              render: (data) => <p>{data?.name}</p>,
              title: "Privilege",
            },
            {
              key: "Action",
              render: (data) => <UpdatePrivilege data={data?.name} />,
              title: "Action",
            },
          ]}
          data={data}
        />
      )}
    </Table.Wrapper>
  );
}
