import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Input } from "reactstrap";
import { useForm, Controller } from "react-hook-form";

type NewEventProps = {
	toggle: VoidFunction;
	visibility: boolean;
};

export default function AddEvent({ toggle, visibility }: NewEventProps) {
	const defaultValues = {
		title: "",
		startDate: new Date().toDateString(),
		endDate: new Date().toDateString(),
		time: "",
	};

	const { control, handleSubmit, formState } = useForm({
		defaultValues,
		mode: "onChange",
	});

	function onSubmit() {}

	return (
		<div>
			<Modal centered isOpen={visibility} toggle={toggle} id="newAnnouncementModal">
				<ModalHeader toggle={toggle}>New Announcement</ModalHeader>
				<ModalBody>
					<form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
						<div className="form-group">
							<label htmlFor="title">Title</label>
							<Controller
								control={control}
								name="title"
								render={({ field }) => (
									<Input autoFocus type="text" placeholder="Academic Session" className="form-control" invalid={formState.errors.title && true} {...field} />
								)}
								rules={{ required: true }}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="startDate">Start Date</label>
							<Controller
								control={control}
								name="startDate"
								render={({ field }) => (
									<Input
										autoFocus
										type="date"
										placeholder="Event Start Date"
										className="form-control"
										invalid={formState.errors.startDate && true}
										{...field}
									/>
								)}
								rules={{ required: true }}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="endDate">End Date</label>
							<Controller
								control={control}
								name="endDate"
								render={({ field }) => (
									<Input autoFocus type="date" placeholder="Event End Date" className="form-control" invalid={formState.errors.endDate && true} {...field} />
								)}
								rules={{ required: true }}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="time">Time</label>
							<Controller
								control={control}
								name="time"
								render={({ field }) => (
									<Input autoFocus type="textarea" placeholder="Event time" className="form-control" invalid={formState.errors.time && true} {...field} />
								)}
								rules={{ required: true }}
							/>
						</div>
						<button className="btn btn-blue-800 btn-lg w-100 my-5" type="submit" disabled={!formState.isValid}>
							Host Event
						</button>
					</form>
				</ModalBody>
			</Modal>
		</div>
	);
}
