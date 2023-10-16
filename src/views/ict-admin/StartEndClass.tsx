import React from "react";
import useStartClass from "../../hooks/mutations/courses/useStartClass";
import useEndClass from "../../hooks/mutations/courses/useEndClass";
import { toast } from "react-toastify";
import ToastContent from "../../components/molecules/ToastContent";
import handleError from "../../utils/handleError";

type StartEndClassProps = {
  sectionId: string;
  refetch: any;
};

const StartEndOnlineClass = ({ sectionId, refetch }: StartEndClassProps) => {
  const startClass = useStartClass(sectionId);
  const endClass = useEndClass(sectionId);

  const isStartLoading = startClass.isLoading;
  const isEndLoading = endClass.isLoading;

  function handleStartEndClass(type: string) {
    if (type === "start") {
      startClass.mutate(
        { online: true },
        {
          onSuccess: (e) => {
            //   console.log(e);
            toast.success(
              <ToastContent
                type={"success"}
                heading={"Success"}
                message={`Onsite Class started Successfully`}
              />,
              ToastContent.Config
            );
            refetch();
          },
          onError: (e: any) => {
            handleError(e);
          },
        }
      );
    }

    if (type === "end") {
      endClass.mutate(
        { online: true },
        {
          onSuccess: () => {
            toast.success(
              <ToastContent
                type={"success"}
                heading={"Success"}
                message={`Onsite Class ended Successfully`}
              />,
              ToastContent.Config
            );
            refetch();
          },
          onError: (e: any) => {
            handleError(e);
          },
        }
      );
    }
  }
  return (
    <div className="d-flex gap-3 align-items-center">
      <p
        style={{
          cursor: "pointer",
          color: "white",
          background: "green",
          padding: "6px",
          textAlign: "center",
          borderRadius: "4px",
        }}
        onClick={() => handleStartEndClass("start")}
      >
        {isStartLoading ? "starting..." : "start"}
      </p>
      <p
        style={{
          cursor: "pointer",
          color: "white",
          background: "red",
          padding: "6px",
          textAlign: "center",
          borderRadius: "4px",
        }}
        onClick={() => handleStartEndClass("end")}
      >
        {isEndLoading ? "ending..." : "end"}
      </p>
    </div>
  );
};

const StartEndOnsiteClass = ({ sectionId, refetch }: StartEndClassProps) => {
  const startClass = useStartClass(sectionId);
  const endClass = useEndClass(sectionId);

  const isStartLoading = startClass.isLoading;
  const isEndLoading = endClass.isLoading;

  function handleStartEndClass(type: string) {
    if (type === "start") {
      startClass.mutate(
        { onsite: true },
        {
          onSuccess: (e) => {
            //   console.log(e);
            toast.success(
              <ToastContent
                type={"success"}
                heading={"Success"}
                message={`Onsite Class started Successfully`}
              />,
              ToastContent.Config
            );
            refetch();
          },
          onError: (e: any) => {
            handleError(e);
          },
        }
      );
    }

    if (type === "end") {
      endClass.mutate(
        { onsite: true },
        {
          onSuccess: () => {
            toast.success(
              <ToastContent
                type={"success"}
                heading={"Success"}
                message={`Onsite Class ended was Successfully`}
              />,
              ToastContent.Config
            );
            refetch();
          },
          onError: (e: any) => {
            handleError(e);
          },
        }
      );
    }
  }
  return (
    <div className="d-flex gap-3 align-items-center">
      <p
        style={{
          cursor: "pointer",
          color: "white",
          background: "green",
          padding: "6px",
          textAlign: "center",
          borderRadius: "4px",
        }}
        onClick={() => handleStartEndClass("start")}
      >
        {isStartLoading ? "starting..." : "start"}
      </p>
      <p
        style={{
          cursor: "pointer",
          color: "white",
          background: "red",
          padding: "6px",
          textAlign: "center",
          borderRadius: "4px",
        }}
        onClick={() => handleStartEndClass("end")}
      >
        {isEndLoading ? "ending..." : "end"}
      </p>
    </div>
  );
};

export { StartEndOnlineClass, StartEndOnsiteClass };
