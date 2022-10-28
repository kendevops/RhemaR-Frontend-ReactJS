import React from "react";
import Table from "../../general/table/Table";
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
  return (
    <Table
      columns={[
        {
          key: "Name",
          title: "Name",
          render: (data: Data) => <p>{data?.name}</p>,
        },
        {
          key: "Phone Number",
          title: "Phone Number",
          render: (data: Data) => <p>{data?.phone}</p>,
        },
        {
          key: "Email",
          title: "Email",
          render: (data: Data) => <p>{data?.email}</p>,
        },
        {
          key: "Role",
          title: "Role",
          render: (data: Data) => <p>{data?.role}</p>,
        },
        {
          key: "Privilege",
          title: "Privilege",
          render: (data: Data) => <p>{data?.privilege}</p>,
        },
        {
          key: "State",
          title: "State",
          render: (data: Data) => <p>{data?.state}</p>,
        },
        {
          key: "Action",
          title: "Action",
          render: (data: Data) => <ViewStaff data={data} />,
        },
      ]}
      data={userManagementData}
    />
  );
}
