import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Swal from 'sweetalert2';
import { deleteQuestion } from '../../store/question/questionSlice';
import { getLevelThunk } from '../../store/level/levelSlice';
import AddEditQuestion from './AddEditQuestion';

export default function QuestionElement({
  _id,
  correct_answer,
  wrong_answers,
  value,
  id,
  index,
}) {
  const dispatch = useDispatch();
  const { currentQuestions, currentLevel, isLoading } = useSelector(
    (state) => state.questions
  );
  const handleDelete = () => {
    Swal.fire({
      icon: 'question',
      title: `Are you sure ?`,
      iconHtml: '؟',
      confirmButtonText: 'yes',
      cancelButtonText: 'no',
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          deleteQuestion({ questionId: _id, levelId: currentLevel?._id })
        );
        dispatch(getLevelThunk());
      }
    });
  };
  const handleEdit = () => {};
  return (
    <>
      <h2 id={`accordion-color-heading-${id}-${index}`}>
        <button
          type="button"
          class="flex flex-wrap items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3"
          data-accordion-target={`#accordion-color-body-${id}-${index}`}
          aria-expanded="false"
          aria-controls={`accordion-color-body-${id}-${index}`}
          onClick={() => {
            const wantedElement = document.querySelector(
              `#accordion-color-body-${id}-${index}`
            );

            document.querySelectorAll('.question-body').forEach((ele) => {
              ele.style.display = 'none';
              ele.classList.remove('hidden');
            });

            const currentDisplay = window
              .getComputedStyle(wantedElement)
              .getPropertyValue('display');
            wantedElement.style.display =
              currentDisplay === 'block' ? 'none' : 'block';
          }}
        >
          <span
            style={{
              maxWidth: `97%`,
              display: `inline-block`,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: `nowrap`,
            }}
          >
            <span className=" me-3">
              {index + 1} {')'}
            </span>
            {value?.en}
          </span>
          <div className="flex flex-row items-center gap-8">
            <div className="flex flex-row items-center gap-5">
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                color="error"
                onClick={handleDelete}
              >
                Delete
              </Button>
              {/* <Button variant="contained" startIcon={<EditIcon />} onClick={handleEdit}>
                Edit
              </Button> */}
              <AddEditQuestion
                editMode={true}
                levelId={currentLevel?._id}
                questionId={_id}
                oldQuestion={{
                  _id,
                  value,
                  correct_answer,
                  wrong_answers,
                }}
              />
            </div>

            <svg
              data-accordion-icon
              class="w-3 h-3 rotate-180 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </div>
        </button>
      </h2>
      <div
        id={`accordion-color-body-${id}-${index}`}
        class="hidden question-body"
        aria-labelledby={`accordion-color-heading-${id}-${index}`}
      >
        <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <h3 className="text-xl">Question in Arabic</h3>
          <span className="text-right rtl">{value?.ar}</span>
          <br></br>
          <h3 className="text-xl">Wrong answers (English) </h3>
          <ul>
            {wrong_answers?.map((wrong_answer) => (
              <li>- {wrong_answer?.en}</li>
            ))}
          </ul>
          <h3 className="text-xl">Wrong answers (Arabic) </h3>
          <ul>
            {wrong_answers?.map((wrong_answer) => (
              <li>- {wrong_answer?.ar}</li>
            ))}
          </ul>
          <br></br>
          <h3 className="text-xl">Correct answers (English) </h3>-{' '}
          <span className="text-lg text-green-400">{correct_answer?.en}</span>
          <br></br>
          <h3 className="text-xl">Correct answers (Arabic) </h3>-{' '}
          <span className="text-lg text-green-400">{correct_answer?.ar}</span>
        </div>
      </div>
    </>
  );
}
