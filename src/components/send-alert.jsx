import { Notyf } from "notyf";
import "notyf/notyf.min.css";
const useSendAlert = () => {
  const notyf = new Notyf({
    duration: 10000,
    position: {
      x: "right",
      y: "top",
    },
    types: [
      {
        type: "warning",
        background: "orange",
        icon: {
          className: "material-icons",
          tagName: "i",
        },
      },
    ],
  });
  return (message, type = "success") => {
    if (type === "success") {
      notyf.success({ message, dismissible: false });
    } else if (type === "error") {
      notyf.error(message);
    } else {
      notyf.open({
        type: "warning",
        message,
      });
    }
  };
};

export { useSendAlert };
