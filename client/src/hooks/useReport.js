import { useDispatch } from "react-redux";
import config from "../config";
import { SHOW_SNACKBAR } from "../store/reducers/snackbarSlice";

const useReport = () => {
  const dispatch = useDispatch();

  const getReport = async (reportId) => {
    try {
      const response = await fetch(`${config.BASE_URI}/report?id=${reportId}`);
      if (!response.ok) throw await response.json();
      const data = (await response.json()).data;
      return data;
    } catch (error) {
      dispatch(
        SHOW_SNACKBAR({
          severity: "error",
          message: error.data.toString(),
          autoHideDuration: 2000,
        })
      );
    }
  };

  return { getReport };
};
export default useReport;
