import { useMutation, useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { employeeDetailsState } from "../atoms";
import { NotificationManager } from "react-notifications";
import {
  getUserQuery,
  loginUserMutation,
  updateUserMutation,
} from "./mutations.def";

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

  return useQuery(updateUserMutation, {
    onCompleted: (data) => {
      console.log(data, "data mutation");
      setEmployeeState(data.data);
    },
    onError: (err) => {
      console.error(err, "errrrr");
    },
  });
};

const useGetUserQuery = () => {
  const { isLoading, data } = useQuery("get-user", () => {
    getUserQuery();
  });
  return data;
};

export { useLoginUserMutation, useUpdateUserDataMutation, useGetUserQuery };
