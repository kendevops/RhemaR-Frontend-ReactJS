import React from "react";
import { Spinner } from "reactstrap";
import useAllUsers from "../../../hooks/queries/useAllUsers";
import { UserDto } from "../../../types/dto";
import Table, { TableColumns } from "../../general/table/Table";
import ViewStaff from "../../modals/ViewStaff";
import userRoles from "../../../utility/userRoles";

interface Data {
  name: string;
  phone: string;
  email: string;
  role: string;
  privilege: string;
  state: string;
}

export default function UserManagementTable() {
  const { data: userData, isLoading } = useAllUsers();

  const users = userData?.users?.nodes;

  const staffsData = users
    ? users
        ?.filter((user: any) => user?.roles[0]?.name !== userRoles.STUDENT)
        .map((user: any) => {
          return {
            name: user?.firstName + " " + user?.lastName,
            rating: 56,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
            role: user?.roles,
          };
        })
    : [];

  const columns: TableColumns<any>[] = [
    {
      key: "Name",
      title: "Name",
      render: (data) => <p>{data?.name}</p>,
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
      render: (data) => {
        const roles = data?.role?.map((r: any) => r?.name.toString());
        return <p>{roles}</p>;
      },
    },
    {
      key: "Privilege",
      title: "Privilege",
      render: (data) => {
        const roles = data?.role?.map((r: any) => r?.name.toString());
        return <p>{roles}</p>;
      },
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
      {staffsData && <Table columns={columns} data={staffsData} />}
    </Table.Wrapper>
  );
}
