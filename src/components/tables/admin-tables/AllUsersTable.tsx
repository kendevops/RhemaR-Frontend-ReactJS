import React, { useState } from "react";
import { Spinner } from "reactstrap";
import useAllUsers from "../../../hooks/queries/useAllUsers";
import { UserDto } from "../../../types/dto";
import Table, { TableColumns } from "../../general/table/Table";
import ViewStaff from "../../modals/ViewStaff";
import FilterModal, { FilterProps } from "../../modals/FilterModal";
import useRoles from "../../../hooks/queries/useRoles";
import useAllCampuses from "../../../hooks/queries/classes/useAllCampuses";
// import userRoles from "../../../utility/userRoles";

interface Data {
  name: string;
  phone: string;
  email: string;
  role: string;
  privilege: string;
  state: string;
}

type AllUserTableProps = {
  isOpen?: boolean;
  toggle: VoidFunction;
  setFilters?: any;
  filters?: any;
  setFiltering?: any;
};

export default function AllUserTable({
  isOpen,
  toggle,
  setFilters,
  setFiltering,
  filters,
}: AllUserTableProps) {
  // const [filters, setFilters] = useState<FiltersProps>({});
  const { data: userData, isLoading, refetch } = useAllUsers(filters);

  const users = userData?.users?.nodes;
  const { data: rolesData } = useRoles();

  const roleOptions = rolesData?.roles?.map((d: any) => ({
    children: d?.name,
  }));

  const { data: campusesData } = useAllCampuses();

  const campusOptions = campusesData?.nodes?.map((d: any) => ({
    children: d?.name,
  }));

  const allUserssData = users
    ? users?.map((user: any) => {
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
    // {
    //   key: "Role",
    //   title: "Role",
    //   render: (data) => {
    //     const roles = data?.role?.map((r: any) => r?.name.toString());
    //     return <p>{roles}</p>;
    //   },
    // },
    {
      key: "Role",
      title: "Role",
      render: (data) => {
        const roles = data?.role?.map(
          (r: any, index: number) =>
            `${r?.name.toString()}${index === data.role.length - 1 ? "" : ", "}`
        );
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
      render: (data) => <div></div>,
      //    <ViewStaff data={data}

      //    />,
    },
  ];

  const filterProps: FilterProps = {
    params: [
      {
        inputType: "Dropdown",
        inputProps: {
          options: roleOptions,
        },
        id: "role",
        name: "Role",
      },
      {
        inputType: "Dropdown",
        inputProps: {
          options: campusOptions,
        },
        id: "campus",
        name: "Campus",
      },

      {
        inputType: "Text",
        inputProps: {
          type: "text",
        },
        id: "name",
        name: "Name",
      },

      {
        inputType: "Dropdown",
        inputProps: {
          options: [
            { children: "LEVEL_1" },
            { children: "LEVEL_2" },
            { children: "LEVEL_3" },
            { children: "LEVEL_4" },
          ],
        },
        id: "level",
        name: "Level",
      },
    ],
    isOpen: isOpen,
    onFilter: (params: any) => {
      setFilters(
        Object.fromEntries(
          Object.entries({
            campus: params?.campus,
            level: params?.level,
            role: params?.role,
            name: params?.name,
          }).filter(([, value]) => value !== null && value !== "")
        )
      );
      console.log(params);

      refetch();
      setFiltering(true);
      // console.log(data);
      toggle();
    },
    toggle: toggle,
  };

  return (
    <>
      {/* {isLoading && <Spinner />} */}
      <FilterModal {...filterProps} />

      <Table.Wrapper>
        {isLoading && <Spinner />}
        {allUserssData && <Table columns={columns} data={allUserssData} />}
      </Table.Wrapper>
    </>
  );
}
