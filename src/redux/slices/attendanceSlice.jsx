import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useEffect, useRef, memo, Fragment } from "react";

import { toast } from "react-toastify";
import { Check } from "react-feather";

const ToastComponent = ({ title, icon, color, fullname }) => (
  <Fragment>
    <div className="toastify-header pb-0">
      <div className="title-wrapper">
        {/* <Avatar size="sm" color={color} icon={icon} /> */}
        <h6 className="toast-title">{title}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <ul className="list-unstyled mb-0">
        <li>
          <strong>Name</strong>: {fullname}
        </li>
      </ul>
    </div>
  </Fragment>
);

export const getAllAttendance = createAsyncThunk(
  "attendance/getAllAttendance",
  async () => {}
);

export const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {},
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllAttendance.fulfilled, (state, action) => {
      state.allAttendance = action.payload.attendance;
    });
  },
});

export default attendanceSlice.reducer;
