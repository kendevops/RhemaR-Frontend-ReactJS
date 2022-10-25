import { ArrowLeft } from "react-feather";
import { Link } from "react-router-dom";
import colors from "../../assets/img/Colors";
import typography from "../../assets/img/Typography";
import MyCourses from "../../components/students/MyCourses";

export default function AllCourses() {
  return (
    <>
      <Link to={"/student/courses"} className="d-flex align-items-center gap-4">
        <span className="p-2  rounded-5 bg-blue-200">
          <ArrowLeft color={colors.primary} />
        </span>
        <span>Go back</span>
      </Link>

      <div className="my-5">
        <h2 style={{ fontSize: typography.h2 }} className="font-bold">
          My Courses
        </h2>
      </div>

      <MyCourses />
    </>
  );
}
