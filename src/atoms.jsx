import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const usePersist = (key) => {
  const { persistAtom } = recoilPersist({
    key,
    storage: localStorage,
  });
  return [persistAtom];
};

export default usePersist;
const employeeDetailsState = atom({
  key: "employeeDetails",
  default: {},
  // eslint-disable-next-line react-hooks/rules-of-hooks
  effects_UNSTABLE: usePersist("employeeDetails"),
});

export { employeeDetailsState };
