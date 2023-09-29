import * as React from "react";
import { StarIcon } from "@heroicons/react/solid";
import { FlexCol, FlexRow } from "./utils";

export function Ratings(props) {
  return (
    <FlexRow
      style={{
        justifyContent: "flex-start",
        paddingBottom: 5,
        ...props.style,
      }}
    >
      {Array.from({ length: props.rating ?? 1 }).map((_, i) => {
        return <StarIcon style={{ width: 20, color: "orange" }} />;
      })}
    </FlexRow>
  );
}

export var GridCard = (props) => {
  return (
    <FlexCol
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        // flex: 1,
        boxShadow: "0px 2px 4px rgb(0, 0, 0, 0.12)",
        paddingBottom: 5,
        overflow: "hidden",
        height: "325px",
        ...props.style,
      }}
    >
      <div
        style={{
          flex: 1,
          backgroundImage: `url(${props.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          flexBasis: 190,
          marginBottom: 8,
        }}
      />
      <div
        style={{
          position: "relative",
          paddingLeft: 8,
          paddingBottom: 4,
          fontSize: "18px",
          fontWeight: 700,
          fontStyle: "normal",
        }}
      >
        {props.name}
      </div>
      <div
        style={{
          position: "relative",
          paddingLeft: 8,
          color: "rgb(0, 0, 0, 0.5)",
          fontFamily: "ITC Garamond Std",
          fontStyle: "italic",
        }}
      >
        {props.country}
      </div>
      <Ratings rating={props.rating} style={{ paddingLeft: 5 }} />
    </FlexCol>
  );
};
