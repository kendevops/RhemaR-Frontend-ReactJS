import { DownloadCloud } from "react-feather";

export default function CourseTimetable() {
  function handleDownload() {}

  return (
    <>
      {/* Header */}
      <section className="d-flex border-bottom pb-3 justify-content-between">
        <div></div>

        <button
          className="d-flex gap-2 btn btn-blue-800 btn-lg"
          onClick={handleDownload}
        >
          Download <DownloadCloud />
        </button>
      </section>
    </>
  );
}
