import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { AiFillFilePdf } from "react-icons/ai";
// import Video from "../../components/molecules/Video";

const Event = () => {
	return (
		<>
			<div className="container">
				<Link to={`/ict-admin/events/`} className="d-flex justify-content-start align-items-center mb-5">
					<HiArrowLeft className="events-back-arrow rounded-circle" />
					<p className="fs-4 fw-light mt-1">Go back</p>
				</Link>

				{/* Video wrapper */}
				{/* <Video /> */}
				<div className="video-wrapper">
					<video className="video-style" controls>
						<source src="https://rhema-course-uploads-bucket.s3.amazonaws.com/f347d7352b462b8f41056316ef65b414.mp4" type="video/mp4" />
					</video>
				</div>

				<div className="d-flex px-3 gap-5">
					<div className="card about-event">
						<h3>About Event</h3>
						<hr />
						<h2 className="event-topic">Mauris sit cursus sed sit in sem tellus nisi tellus.</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porttitor nunc at nunc ut adipiscing amet, lacus, faucibus phasellus. Nascetur neque,
							arcu nisi adipiscing. Morbi vestibulum euismod gravida nibh at fusce. At gravida placerat viverra tempus, morbi. Tincidunt molestie proin
							consectetur tempus, pulvinar pellentesque et netus. Id eu pretium at venenatis vitae dignissim magna laoreet. Nunc id risus orci.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porttitor nunc at nunc ut adipiscing amet, lacus, faucibus phasellus. Nascetur neque,
							arcu nisi adipiscing. Morbi vestibulum euismod gravida nibh at fusce. At gravida placerat viverra tempus, morbi. Tincidunt molestie proin
							consectetur tempus, pulvinar pellentesque et netus. Id eu pretium at venenatis vitae dignissim magna laoreet. Nunc id risus orci.
						</p>
					</div>

					<div className="card about-event event-resources">
						<h3>Event Resources</h3>
						<hr />
						<ul>
							<li className="d-flex gap-1 justify-content-start align-items-center">
								<AiFillFilePdf size={20} color="red" />
								<p className="mt-3">Event resource.pdf</p>
							</li>
							<li className="d-flex gap-1 justify-content-start align-items-center">
								<AiFillFilePdf size={20} color='lightGray' />
								<p className="mt-3">Event resource.pdf</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default Event;
