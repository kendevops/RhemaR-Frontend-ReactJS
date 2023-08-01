import colors from "../../assets/img/Colors";

export default function Timeline() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <span
        style={{
          width: "1.5rem",
          height: "1.5rem",
          borderStyle: "solid",
          borderColor: colors.primary,
          borderWidth: "3px",
          borderRadius: "300px",
        }}
      ></span>
      <div
        style={{
          width: "2px",
          backgroundColor: "#D2D7E0",
          height: "100%",
        }}
      ></div>
    </div>
  );
}
