import React, { useRef, useState } from "react";
import { Spinner } from "reactstrap";

const Video = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [videoDuration, setVideoDuration] = useState(0);

	const videoPlayPause = () => {
		if (!videoRef.current) return;
		if (isPlaying) {
			videoRef.current?.pause();
		} else {
			videoRef.current?.play();
		}

		setIsPlaying((currentPlayStatus) => !currentPlayStatus);
	};

	const formatTime = (duration: number) => {
		const one_minute = 60;
		const minutes = Math.floor(duration / one_minute);
		const seconds = Math.floor(duration - minutes * one_minute);

		const formattedTime = `${addZero(minutes)}:${addZero(seconds)}`;

		return formattedTime;
	};

	const addZero = (time: number) => {
		if (time < 10) {
			return `0${time}`;
		}
		return time;
	};

	return (
		<div className="position-relative video-wrapper" onClick={videoPlayPause}>
			<video
				className="video-style"
				ref={videoRef}
				onCanPlayThrough={() => {
					setVideoDuration(videoRef.current?.duration || 0);
					setIsLoading(false);
				}}
				onTimeUpdate={() => {
					setCurrentTime(videoRef.current?.currentTime || 0);
				}}
				onEnded={() => {
					setIsPlaying(false);
				}}>
				<source src="https://rhema-course-uploads-bucket.s3.amazonaws.com/f347d7352b462b8f41056316ef65b414.mp4" type="video/mp4" />
			</video>

			{/* video overlay */}
			<div className="position-absolute end-0 start-0 top-0 w-100 h-100 d-flex flex-column justify-content-end">
				<div>{isLoading ? <Spinner /> : ""}</div>
				{/* progress bar */}
				<div className="progress-bar">
					<div
						className={`progress-innerbar ${currentTime !== videoDuration ? "progress-innerbar-animate" : ""}`}
						style={{
							animationPlayState: isPlaying ? "running" : "paused",
							animationDuration: isLoading ? "0s" : `${videoRef.current?.duration}s`,
						}}
					/>
				</div>

				{/* video controls */}
				<div
					className="d-flex justify-content-between"
					style={{
						width: "98%",
						marginRight: "auto",
						marginLeft: "auto",
					}}>
					<button onClick={videoPlayPause}>{isPlaying ? "Pause" : "Play"}</button>

					<span style={{ color: "white" }}>
						{formatTime(currentTime)} / {formatTime(videoDuration)}
					</span>
				</div>
			</div>
		</div>
	);
};

export default Video;
