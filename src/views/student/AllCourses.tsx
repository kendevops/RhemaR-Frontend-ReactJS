import typography from "../../assets/img/Typography";
import BackButton from "../../components/molecules/BackButton";
import MyCourses from "../../components/students/MyCourses";

export default function AllCourses() {
  return (
    <>
      <BackButton prevUrl={"/student/courses"} />

      <div className="my-5">
        <h2 style={{ fontSize: typography.h2 }} className="font-bold">
          My Courses
        </h2>
      </div>

      <MyCourses />
    </>
  );
}
