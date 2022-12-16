import React from "react";
import { Spinner } from "reactstrap";
import useAllUsers from "../../../hooks/queries/useAllUsers";
import { UserDto } from "../../../types/dto";
import Table, { TableColumns } from "../../general/table/Table";
import ViewStaff from "../../modals/ViewStaff";

interface Data {
  name: string;
  phone: string;
  email: string;
  role: string;
  privilege: string;
  state: string;
}

const userManagementData: Data[] = [
  {
    name: "Toks Adejuwon",
    phone: "08030000000",
    email: "nationaldirector@gmailcom",
    role: "National Director",
    privilege: "Privilege 1",
    state: "Abuja",
  },
];

export default function UserManagementTable() {
  const { data, isLoading } = useAllUsers();
  const users = data?.users?.nodes;

  console.log({
    users,
  });

  const columns: TableColumns<any>[] = [
    {
      key: "Name",
      title: "Name",
      render: (data) => (
        <p>
          {data?.firstName} {data?.lastName}
        </p>
      ),
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
    {
      key: "Role",
      title: "Role",
      render: (data) => <p>{data?.roles[0]?.name}</p>,
    },
    {
      key: "Privilege",
      title: "Privilege",
      render: (data) => <p>{data?.roles[0]?.name}</p>,
    },
    // {
    //   key: "State",
    //   title: "State",
    //   render: (data) => <p>{data?.nationality}</p>,
    // },
    {
      key: "Action",
      title: "Action",
      render: (data) => <ViewStaff data={data} />,
    },
  ];

  return (
    <Table.Wrapper>
      {isLoading && <Spinner />}
      {users && <Table columns={columns} data={users} />}
    </Table.Wrapper>
  );
}
