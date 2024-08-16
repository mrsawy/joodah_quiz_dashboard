import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuestionElement from './QuestionElement';
import Spinner from './../../components/Spinner';

function QuestionsGroup() {
  const { currentQuestions, isError, message, isLoading } = useSelector(
    (s) => s.questions
  );
  return (
    <div
      id="accordion-color"
      data-accordion="collapse"
      data-active-classes="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white"
    >
      {isLoading && <Spinner className="h-50" />}
      {!isLoading &&
        Array.isArray(currentQuestions) &&
        currentQuestions?.map((e, i) => (
          <QuestionElement
            // value_ar={e?.value_ar}
            // value_en={e?.value_en}
            {...e}
            key={i}
            id={i}
            index={i}
          />
        ))}
    </div>
  );
}

export default QuestionsGroup;
