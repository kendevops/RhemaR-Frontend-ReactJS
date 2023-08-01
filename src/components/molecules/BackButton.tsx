import { CSSProperties } from "react";
import { ArrowLeft } from "react-feather";
import { Link, useHistory } from "react-router-dom";
import colors from "../../assets/img/Colors";

type BackButtonProps = {
  prevUrl?: string;
};

export default function BackButton({ prevUrl: to }: BackButtonProps) {
  const router = useHistory();
  const style: CSSProperties = {
    cursor: "pointer",
  };

  function onClick() {
    router?.goBack();
  }

  const children = (
    <>
      <span className="p-2  rounded-5 bg-blue-200">
        <ArrowLeft color={colors.primary} />
      </span>
      <span>Go back</span>
    </>
  );

  const className = "d-flex align-items-center gap-4";

  return to ? (
    <Link {...{ className, to }}>{children}</Link>
  ) : (
    <div {...{ className, style, onClick }}>{children}</div>
  );
}
