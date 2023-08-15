import { ReactNode } from "react";
import usePagination from "../../../utility/hooks/usePagination";
import TabSelect, { TabSelectOptionProps } from "./TabSelect";
import RightCaret, { LeftCaret } from "../../icons/caret";

export type TableColumns<T> = {
  title?: string;
  key: string;
  render: (data: T, index: number) => JSX.Element;
};

export type TableProps<T = any> = {
  columns: TableColumns<T>[];
  data: T[];
  itemsPerPage?: number;
};

interface Props {
  children: ReactNode;
}

export default function Table({ columns, data, itemsPerPage }: TableProps) {
  //** Pagination */
  const { paginatedData, page, pages, setPage } = usePagination(
    data,
    itemsPerPage ?? 9
  );

  const extraOptions: TabSelectOptionProps[] = pages
    .filter((p) => p <= 3)
    .map((p) => ({
      element: p.toString(),
      isActive: page === p,
      key: p.toString(),
      onPress: () => setPage(p),
    }));

  const moreOptions: TabSelectOptionProps[] = [];

  page >= 4
    ? moreOptions.push(
        {
          element: page.toString(),
          isActive: true,
          key: "current-page",
        },
        {
          element: <RightCaret />,
          isActive: false,
          key: "next",
          onPress: () => setPage(page + 1),
        }
      )
    : moreOptions.push({
        element: <RightCaret />,
        isActive: false,
        key: "next",
        onPress: () => setPage(page + 1),
      });

  const tabSelctOptions: TabSelectOptionProps[] = [
    {
      element: <LeftCaret />,
      isActive: false,
      key: "previous",
      onPress: () => setPage(page - 1),
    },
    ...extraOptions,
    ...moreOptions,
  ];

  //** Columns */
  const colHeaders = columns.map(({ title, key }) => (
    <th className="bg-blue-800" key={key}>
      {title}
    </th>
  ));

  //** TableBody */
  const tabData = paginatedData?.map((data, i) => {
    return (
      <tr key={`column${i}`}>
        {columns?.map(({ render }, i2) => (
          <td key={`data${i}${i2}`}>{render(data, i)}</td>
        ))}
      </tr>
    );
  });

  return (
    <section>
      <table className="table caption-top text-nowrap">
        <thead className="bg-blue-800">
          <tr>{colHeaders}</tr>
        </thead>

        <tbody>{tabData}</tbody>
      </table>
      <div
        style={{
          padding: "1rem",
        }}
      >
        <TabSelect options={tabSelctOptions} />
      </div>
    </section>
  );
}

function Wrapper({ children }: Props) {
  return (
    <div className="tab-content p-4" id="pills-tabContent">
      <div className="table-responsive rounded-2 r-card bg-white">
        {children}
      </div>
    </div>
  );
}

Table.Wrapper = Wrapper;
