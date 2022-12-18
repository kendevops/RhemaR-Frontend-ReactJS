import { ReactNode } from "react";

export type TableColumns<T> = {
  title?: string;
  key: string;
  render: (data: T) => JSX.Element;
};

export type TableProps<T = any> = {
  columns: TableColumns<T>[];
  data: T[];
};

interface Props {
  children: ReactNode;
}

export default function Table({ columns, data }: TableProps) {
  //** Columns */
  const colHeaders = columns.map(({ title, key }) => (
    <th key={key}>{title}</th>
  ));

  //** TableBody */
  const tabData = data?.map((data, i) => {
    return (
      <tr key={`column${i}`}>
        {columns?.map(({ render }, i2) => (
          <td key={`data${i}${i2}`}>{render(data)}</td>
        ))}
      </tr>
    );
  });

  return (
    <table className="table caption-top text-nowrap">
      <thead className="bg-blue-800">
        <tr>{colHeaders}</tr>
      </thead>

      <tbody>{tabData}</tbody>
    </table>
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
