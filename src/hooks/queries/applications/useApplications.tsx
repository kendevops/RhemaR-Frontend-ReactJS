import { useQuery } from "@tanstack/react-query";
import api from "../../../api";

import queryKeys from "../../../queryKeys";

export default function useApplications(filterParams = {}) {
  console.log(filterParams);

  return useQuery([queryKeys.applications, filterParams], () =>
    api
      .get(`/applications/LEVEL_1`, { params: filterParams })
      .then((r) => r?.data?.data?.applications)
  );
}
