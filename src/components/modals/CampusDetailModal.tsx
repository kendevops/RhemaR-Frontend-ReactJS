import useToggle from "../../utility/hooks/useToggle";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Input } from "reactstrap";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import useForm from "../../utility/hooks/useForm";
import FormInput from "../molecules/FormInput";

interface CampusDetailProps {
  data: any;
  toggle: VoidFunction;
  visibility: boolean;
}

const demoData = [
  {
    title: "Campus Full Name",
    body: "Federal University of Technology Owerri",
  },
  { title: "Campus Short Name", body: "Futo Owerri" },
  { title: "Campus Abbr", body: "FUTO" },
  { title: "Level", body: "1 & 2" },
  { title: "Start Date", body: "20 Dec 10000" },
  { title: "Campus Cordinator", body: "Federal University" },
  {
    title: "Address",
    body: "Federal University of Technology Owerri Federal University of Technology Owerri",
  },
];

export default function CampusDetailModal({
  data,
  toggle,
  visibility,
}: CampusDetailProps) {
  //   const [visibility, toggle] = useToggle();

  function onSubmit() {}

  return (
    <div>
      {/* Modal */}
      <Modal centered isOpen={visibility} toggle={toggle} id="studentModal">
        <ModalHeader toggle={toggle}>Campus Details</ModalHeader>
        <ModalBody>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {demoData.map((s, i) => {
              return (
                <div style={{ background: "#f0f0f0", padding: "10px 15px" }}>
                  <p>{s.title}</p>
                  <p style={{ fontWeight: 800 }}>{s.body}</p>
                </div>
              );
            })}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
