import { Icon } from "@iconify/react";
import PmrTable from "../../components/tables/admin-tables/PmrTable";

export default function Pmrs() {
  return (
    <>
      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>PMRs</div>
      </div>
      <PmrTable />
    </>
  );
}
