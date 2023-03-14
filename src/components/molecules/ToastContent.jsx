import { AlertTriangle, CheckCircle } from "react-feather";
import Avatar from "../avatar";
import { Slide, toast } from "react-toastify";

const ToastContent = ({ heading, message, type }) => (
  <>
    <div className="toastify-header">
      <div className="title-wrapper">
        {type === "danger" && (
          <Avatar size="sm" color="error" icon={<AlertTriangle size={20} />} />
        )}
        {type === "success" && (
          <Avatar size="sm" color="success" icon={<CheckCircle size={20} />} />
        )}
        <h3 className="toast-title fw-bold">{heading}</h3>
      </div>
    </div>
    <div className="toastify-body fs-">
      <span>{message}</span>
    </div>
  </>
);

ToastContent.Config = {
  icon: false,
  transition: Slide,
  hideProgressBar: false,
  autoClose: 20000,
  position: toast.POSITION.BOTTOM_RIGHT,
};

export default ToastContent;
