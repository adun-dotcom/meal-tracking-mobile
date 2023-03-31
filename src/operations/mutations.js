import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { employeeDetailsState } from "../atoms";
import { loginUserMutation, updateUserMutation } from "./mutations.def";

const useLoginUserMutation = () => {
  const [, setEmployeeState] = useRecoilState(employeeDetailsState);

  return useMutation(loginUserMutation, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setEmployeeState(data.data);
    },
  });
};

const useUpdateUserDataMutation = () => {
  const [, setEmployeeState] = useRecoilState(employeeDetailsState);

  return useMutation(updateUserMutation, {
    onSuccess: (data) => {
      setEmployeeState(data.data);
    },
  });
};

export { useLoginUserMutation, useUpdateUserDataMutation };
