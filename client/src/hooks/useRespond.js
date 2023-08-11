import { useDispatch, useSelector } from "react-redux";
import config from "../config";
import { useNavigate } from "react-router-dom";
import { RESET_RESPOND_STATE } from "../store/reducers/respondSlice";

const useRespond = () => {
  const formId = useSelector((state) => state.form.formId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const respond = async (responses) => {
    const request = await fetch(`${config.BASE_URI}/respond/${formId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        responses: [...responses],
      }),
    });
    const data = (await request.json()).data;
    const responseId = data._id
    navigate(`/report/${responseId}`, { replace: true });
    dispatch(RESET_RESPOND_STATE());

    return data;
  };

  return { respond };
};
export default useRespond;
