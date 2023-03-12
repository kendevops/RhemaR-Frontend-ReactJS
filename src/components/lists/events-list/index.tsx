import React, { useEffect, useState } from "react";

interface IList {
  id: string;
  header: string;
}

interface Props {
  ListData: IList[];
  onSelect?: (selected: string) => void;
}

const EventsList = ({ ListData, onSelect }: Props) => {
  const [active, setActive] = useState("1");

  const handleClick = (id: any) => {
    setActive(id);
    onSelect && onSelect(ListData?.find((v) => v?.id === id)?.header ?? "None");
  };

  // automatically select the firtst category on render
  useEffect(() => {
    if (!ListData) return;

    if (active === "1") {
      setActive(ListData[0]?.id);
    }
  }, [ListData, active]);

  return (
    <ul className="nav nav-pills mb-3 px-4" id="pills-tab" role="tablist">
      {ListData.map(({ id, header }) => (
        <li key={id} className="nav-item" role="presentation">
          <button
            onClick={() => handleClick(id)}
            className={`nav-link text-capitalize fw-normal ${
              active === id ? "active" : ""
            }`}
            id="pills-UpcomingEvents-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-UpcomingEvents"
            type="button"
            role="tab"
            aria-controls="pills-UpcomingEvents"
            aria-selected={active === id ? "true" : "false"}
          >
            {header}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default EventsList;
