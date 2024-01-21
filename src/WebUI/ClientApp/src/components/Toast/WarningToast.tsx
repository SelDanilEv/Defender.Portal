import { toast } from "react-toastify";

const WarningToast = async (message: string) => {
  return toast.warning(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export default WarningToast;
