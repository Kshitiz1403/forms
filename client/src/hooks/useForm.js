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
    try {
      const response = await fetch(`${config.BASE_URI}/forms/${formId}`);
      if (!response.ok) throw await response.json();
      const data = (await response.json()).data;
      const { components, isLive, _id } = data;
      dispatch(LOAD_FORM({ components, isLive, formId: _id }));
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

  const previewForm = async (formId) => {
    try {
      const response = await fetch(
        `${config.BASE_URI}/forms/${formId}/preview`
      );
      if (!response.ok) throw await response.json();
      const data = (await response.json()).data;
      const { components, isLive, _id } = data;
      dispatch(LOAD_FORM({ components, isLive, formId: _id }));
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

  const createForm = async () => {
    const response = await fetch(`${config.BASE_URI}/forms`, {
      method: "POST",
    });
    const data = (await response.json()).data;
    const formId = data._id;
    dispatch(CREATE_FORM(formId));

    navigate(`/form/${formId}`);
  };

  const publish = async (formId) => {
    const response = await fetch(`${config.BASE_URI}/forms/publish/${formId}`, {
      method: "POST",
    });
    const data = (await response.json()).data;
    const { _id, components, isLive } = data;
    dispatch(LOAD_FORM({ formId: _id, isLive }));
    dispatch(
      SHOW_SNACKBAR({
        severity: "success",
        message: "Form Published!",
        autoHideDuration: 2000,
      })
    );
  };

  const unpublish = async (formId) => {
    const response = await fetch(
      `${config.BASE_URI}/forms/unpublish/${formId}`,
      {
        method: "POST",
      }
    );
    const data = (await response.json()).data;
    const { _id, components, isLive } = data;
    dispatch(LOAD_FORM({ formId: _id, isLive }));
    dispatch(
      SHOW_SNACKBAR({
        severity: "success",
        message: "Form Unpublished!",
        autoHideDuration: 2000,
      })
    );
  };

  return { getForm, previewForm, createForm, publish, unpublish };
};
export default useForm;
