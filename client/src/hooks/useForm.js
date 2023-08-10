import { useNavigate } from "react-router-dom";
import config from "../config";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_FORM, LOAD_FORM } from "../store/reducers/formSlice";
import { SHOW_SNACKBAR } from "../store/reducers/snackbarSlice";

const useForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formId = useSelector((state) => state.form.formId);

  const getForm = async (formId) => {
    const response = await fetch(`${config.BASE_URI}/forms/${formId}`);
    const data = (await response.json()).data;
    const { components, isLive, _id } = data;
    dispatch(LOAD_FORM({ components, isLive, formId: _id }));
  };

  const createForm = async () => {
    const response = await fetch(`${config.BASE_URI}/forms`, {
      method: "POST",
    });
    const data = (await response.json()).data;
    const formId = data._id;
    console.log(data);
    dispatch(CREATE_FORM(formId));

    navigate(`/form/${formId}`);
  };

  const publish = async () => {
    const response = await fetch(`${config.BASE_URI}/forms/publish/${formId}`, {
      method: "POST",
    });
    const data = (await response.json()).data;
    const { _id, components, isLive } = data;
    dispatch(LOAD_FORM({ formId: _id, components, isLive }));
    dispatch(
      SHOW_SNACKBAR({
        severity: "success",
        message: "Form Published!",
        autoHideDuration: 2000,
      })
    );
  };

  return { getForm, createForm, publish };
};
export default useForm;
