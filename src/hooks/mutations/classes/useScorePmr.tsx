import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../../../queryKeys";
import api from "../../../api";

type Data = {
  teamWork: any;
  workEthic: any;
  respToAuthority: any;
  followInstructions: any;
};

export default function useScorePmr(studentId: string) {
  const q = useQueryClient();

  const { pmr } = queryKeys;

  return useMutation(
    (data: Data) =>
      api.patch(`/pmrs/${studentId}/score`, { studentAttScore: data }),
    {
      onSuccess: () => q.invalidateQueries([pmr, studentId]),
    }
  );
}
