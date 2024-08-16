import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

import { useDispatch, useSelector } from 'react-redux';
import { addQuestions, editQuestion } from '../../store/question/questionSlice';
import InputField from './InputField';
import { getLevelThunk } from '../../store/level/levelSlice';

function AddEditQuestion({ questionId, levelId, oldQuestion, editMode }) {
  // console.log(oldQuestion);
  const layoutRef = useRef();
  const formRef = useRef();

  const [formData, setFormData] = useState({
    value_ar: oldQuestion ? oldQuestion?.value?.ar : '',
    value_en: oldQuestion ? oldQuestion?.value?.en : '',
    levelId: levelId ? levelId : '',
    wrong_ans_1_en: oldQuestion?.wrong_answers
      ? oldQuestion?.wrong_answers[0]?.en
      : '',
    wrong_ans_1_ar: oldQuestion?.wrong_answers
      ? oldQuestion?.wrong_answers[0]?.ar
      : '',
    wrong_ans_2_en: oldQuestion?.wrong_answers
      ? oldQuestion?.wrong_answers[1]?.en
      : '',
    wrong_ans_2_ar: oldQuestion?.wrong_answers
      ? oldQuestion?.wrong_answers[1]?.ar
      : '',
    wrong_ans_3_en: oldQuestion?.wrong_answers
      ? oldQuestion?.wrong_answers[2]?.en
      : '',
    wrong_ans_3_ar: oldQuestion?.wrong_answers
      ? oldQuestion?.wrong_answers[2]?.ar
      : '',
    wrong_ans_4_en: !!oldQuestion?.wrong_answers[3]
      ? oldQuestion?.wrong_answers[3]?.en
      : '',
    wrong_ans_4_ar: !!oldQuestion?.wrong_answers[3]
      ? oldQuestion?.wrong_answers[3]?.ar
      : '',
    correct_ans_en: oldQuestion?.wrong_answers
      ? oldQuestion?.correct_answer?.en
      : '',
    correct_ans_ar: oldQuestion?.wrong_answers
      ? oldQuestion?.correct_answer?.ar
      : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const isEmpty = Object.values({
      ...formData,
      wrong_ans_4_en: formData.wrong_ans_4_en
        ? formData.wrong_ans_4_en
        : 'temp',
      wrong_ans_4_ar: formData.wrong_ans_4_ar
        ? formData.wrong_ans_4_ar
        : 'temp',
    }).some((v) => !v);
    if (isEmpty) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields must be filled.',
      });
    } else {
      if (!editMode) {
        dispatch(addQuestions(formData));
      } else {
        dispatch(editQuestion({ ...formData, questionId }));
      }
      dispatch(getLevelThunk());
    }
  };
  const dispatch = useDispatch();
  const {
    levels,
    isError,
    message,
    isLoading: isLoadingLevel,
  } = useSelector((s) => s.levels);
  // const { currentQuestions, isLoading: isLoadingQuestions } = useSelector((s) => s.questions);

  const setVisable = () => {
    let layout = layoutRef.current;
    let form = formRef.current;
    layout.classList.remove('hidden');
    form.classList.remove('hidden');
    layout.classList.add('flex');
  };

  const setHidden = () => {
    let layout = layoutRef.current;
    let form = formRef.current;
    layout.classList.remove('flex');
    layout.classList.add('hidden');
    form.classList.add('hidden');
  };
  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setHidden();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <>
      {editMode ? (
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={setVisable}
        >
          Edit
        </Button>
      ) : (
        <button
          className="ml-auto mr-auto mb-10  block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={setVisable}
        >
          Add New Question
        </button>
      )}

      <div
        style={{ zIndex: 1102 }}
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        ref={layoutRef}
        className="  hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-300 bg-opacity-70"
      >
        <div
          ref={formRef}
          className=" hidden relative p-4 w-full max-w-7xl max-h-full m-auto"
        >
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editMode ? 'Edit Question' : 'Create New Question'}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
                onClick={setHidden}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 mb-4 ">
                <div className="flex flex-nowrap justify-center items-center gap-9 w-full">
                  <InputField
                    label="English Value"
                    name="value_en"
                    value={formData.value_en}
                    onChange={handleChange}
                    className="w-100"
                  />
                  <InputField
                    label="Arabic Value"
                    name="value_ar"
                    value={formData.value_ar}
                    onChange={handleChange}
                    className="w-100 "
                    inputClassName="rtl text-right"
                  />
                </div>
                <div className="flex flex-nowrap justify-center items-center gap-9 w-full">
                  <InputField
                    label="First Wrong Answer English"
                    name="wrong_ans_1_en"
                    value={formData.wrong_ans_1_en}
                    onChange={handleChange}
                    className="w-100"
                  />
                  <InputField
                    label="First Wrong Answer Arabic"
                    name="wrong_ans_1_ar"
                    value={formData.wrong_ans_1_ar}
                    onChange={handleChange}
                    className="w-100"
                    inputClassName="rtl text-right"
                  />
                </div>
                <div className="flex flex-nowrap justify-center items-center gap-9 w-full">
                  <InputField
                    label="Second Wrong Answer English"
                    name="wrong_ans_2_en"
                    value={formData.wrong_ans_2_en}
                    onChange={handleChange}
                    className="w-100"
                  />
                  <InputField
                    label="Second Wrong Answer Arabic"
                    name="wrong_ans_2_ar"
                    value={formData.wrong_ans_2_ar}
                    onChange={handleChange}
                    className="w-100"
                    inputClassName="rtl text-right"
                  />
                </div>
                <div className="flex flex-nowrap justify-center items-center gap-9 w-full">
                  <InputField
                    label="Third Wrong Answer English"
                    name="wrong_ans_3_en"
                    value={formData.wrong_ans_3_en}
                    onChange={handleChange}
                    className="w-100"
                  />
                  <InputField
                    label="Third Wrong Answer Arabic"
                    name="wrong_ans_3_ar"
                    value={formData.wrong_ans_3_ar}
                    onChange={handleChange}
                    className="w-100"
                    inputClassName="rtl text-right"
                  />
                </div>
                <div className="flex flex-nowrap justify-center items-center gap-9 w-full">
                  <InputField
                    label="Fourth Wrong Answer English"
                    name="wrong_ans_4_en"
                    value={formData.wrong_ans_4_en}
                    onChange={handleChange}
                    className="w-100"
                  />
                  <InputField
                    label="Fourth Wrong Answer Arabic"
                    name="wrong_ans_4_ar"
                    value={formData.wrong_ans_4_ar}
                    onChange={handleChange}
                    className="w-100"
                    inputClassName="rtl text-right"
                  />
                </div>
                <div className="flex flex-nowrap justify-center items-center gap-9 w-full">
                  <InputField
                    label="Correct Answer English"
                    name="correct_ans_en"
                    value={formData.correct_ans_en}
                    onChange={handleChange}
                    className="w-100"
                  />
                  <InputField
                    label="Correct Answer Arabic"
                    name="correct_ans_ar"
                    value={formData.correct_ans_ar}
                    onChange={handleChange}
                    className="w-100"
                    inputClassName="rtl text-right"
                  />
                </div>

                {!editMode && (
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="level"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Level
                    </label>
                    <select
                      name="levelId"
                      value={formData.levelId}
                      onChange={handleChange}
                      className="bg-gray-50 border w-100 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option selected="">Select Level</option>
                      {levels.map((level) => (
                        <option key={level?._id} value={level?._id}>
                          {level?.name_en}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                {editMode ? 'Edit Question' : 'Add New Question'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddEditQuestion;
