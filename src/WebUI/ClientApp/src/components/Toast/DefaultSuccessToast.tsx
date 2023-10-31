import { toast } from "react-toastify";


const SuccessToast = async (message: string) => {
    return toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}


export default SuccessToast;

