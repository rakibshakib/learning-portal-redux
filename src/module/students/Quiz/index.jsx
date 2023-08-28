import React, { useState } from "react";
import {
  useAddQuizMarkMutation,
  useGetAllQuizeMarkVideoIdQuery,
  useGetQuizzesByIdQuery,
} from "../../../features/student/studentApi";
import { useNavigate, useParams } from "react-router-dom";
import { calculateScore } from "./utils";
import { useSelector } from "react-redux";
import Loading from "../../../common/Loading";

const Quiz = () => {
  const { videoId } = useParams();
  const { id, name } = useSelector((state) => state?.profile?.user);

  const { data: prevMarks } = useGetAllQuizeMarkVideoIdQuery({
    vidId: videoId,
    student_id: id,
  });

  const { data: videoQuize } = useGetQuizzesByIdQuery(videoId);
  const [selectedArr, setSelectedArr] = useState([]);
  const [selectedOption, setselectedOption] = useState([]);
  const [saveQuize, { isLoading }] = useAddQuizMarkMutation();

  const optionHandeler = (isChecked, quiz, option) => {
    if (isChecked) {
      if (selectedArr?.length === 0) {
        const obj = {
          id: quiz.id,
          question: quiz.question,
          selected: [option],
        };
        setSelectedArr([obj]);
      } else {
        const index = selectedArr.findIndex((obj) => obj?.id === quiz?.id);
        if (index !== -1) {
          selectedArr[index] = {
            ...selectedArr[index],
            selected: [...selectedArr[index]?.selected, option],
          };
        } else {
          const obj = {
            id: quiz.id,
            question: quiz.question,
            selected: [option],
          };
          selectedArr.push(obj);
        }
      }
      setselectedOption([...selectedOption, option]);
    } else {
      const index = selectedArr.findIndex((obj) => obj?.id === quiz?.id);
      const removedOpt = selectedArr[index]?.selected.findIndex(
        (obj) => obj?.id === option?.id
      );
      selectedArr[index]?.selected.splice(removedOpt, 1);
      if (selectedArr[index]?.selected?.length === 0) {
        selectedArr.splice(index, 1);
      }
      const filter = selectedOption.filter((o) => o.id !== option.id);
      setselectedOption(filter);
    }
  };
  const onSubmitQuize = () => {
    const correctAnsQuiz = videoQuize.map((quiz) => {
      return {
        id: quiz?.id,
        question: quiz?.question,
        options: quiz.options.filter((item) => item?.isCorrect),
      };
    });

    const { correctCount, score, wrongCount } = calculateScore(
      correctAnsQuiz,
      selectedArr
    );
    const payload = {
      student_id: id,
      student_name: name,
      video_id: videoQuize?.[0]?.video_id,
      video_title: videoQuize?.[0]?.video_title,
      totalQuiz: videoQuize?.length,
      totalCorrect: correctCount,
      totalWrong: wrongCount,
      totalMark: videoQuize?.length * 5,
      mark: score,
    };
    saveQuize(payload);
  };
  const navigate = useNavigate();
  console.log(prevMarks)
  return (
    <section className="py-6 bg-primary">
      {isLoading && <Loading />}
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="mb-8 flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Quizzes for: {videoQuize?.[0]?.video_title}
            </h1>
            <p className="text-sm text-slate-200">
              Each question contains 5 Mark
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn ml-auto"
            //   className="px-5 border border-transparent text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Back
          </button>
        </div>
        {prevMarks?.[0]?.id ? (
          <div className="w-full bg-slate-900 px-5 py-3 rounded-md">
            <p className="text-xl font-semibold text-slate-200 ">
              Total Marks: {prevMarks?.[0]?.totalMark || 0}
            </p>
            <p className="text-xl font-semibold text-slate-200">
              Obtained Marks: {prevMarks?.[0]?.mark || 0}
            </p>
            <p className="text-xl font-semibold text-slate-200">
              Total Wrong: {prevMarks?.[0]?.totalWrong || 0}
            </p>
            <p className="text-xl font-semibold text-slate-200">
              Total Correct: {prevMarks?.[0]?.totalCorrect || 0}
            </p>
          </div>
        ) : (
          <div>
            <div className="space-y-8 ">
              {videoQuize?.length > 0 &&
                videoQuize.map((quiz, idx) => (
                  <div className="quiz" key={quiz?.id}>
                    <h4 className="question">
                      Quiz {idx + 1} - {quiz?.question}
                    </h4>
                    <form className="quizOptions">
                      {quiz?.options?.map((opt, i) => (
                        <label htmlFor={`option${i + 1}_q${idx}`} key={i + 1}>
                          <input
                            type="checkbox"
                            id={`option${i + 1}_q${idx}`}
                            onChange={(e) => {
                              optionHandeler(e.target.checked, quiz, opt);
                            }}
                          />
                          {opt?.option}
                        </label>
                      ))}
                    </form>
                  </div>
                ))}
            </div>

            <button
              onClick={onSubmitQuize}
              type="button"
              className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Quiz;
