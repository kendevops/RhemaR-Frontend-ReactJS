import React from 'react';

const EventsList = () => {
    return (

        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
                <button
                    className="nav-link active"
                    id="pills-UpcomingEvents-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-UpcomingEvents"
                    type="button"
                    role="tab"
                    aria-controls="pills-UpcomingEvents"
                    aria-selected="true"
                >
                    Upcoming Events
                </button>
            </li>
            <li className="nav-item" role="presentation">
                <button
                    className="nav-link"
                    id="pills-PastEvents-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-PastEvents"
                    type="button"
                    role="tab"
                    aria-controls="pills-PastEvents"
                    aria-selected="false"
                >
                    Past Events
                </button>
            </li>
        </ul>

    )
}

export default EventsList;