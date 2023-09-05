import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../../common/Loading";
import { useGetVideosQuery } from "../../../features/admin/adminApi";
import {
  useAddQuizzessMutation,
  useEditQuizzessByIdMutation,
  useGetQuizzessByIdQuery,
} from "../../../features/admin/quizzesApi";

const QuizzesForm = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const { data: videosDDL } = useGetVideosQuery();
  const [isReq, setIsReq] = useState(true);
  const { data: quizze } = useGetQuizzessByIdQuery(id, {
    skip: isReq,
  });
  const [save, { isLoading: saving, isSuccess: addSuccess }] =
    useAddQuizzessMutation();
  const [edit, { isLoading: editing, isSuccess: editSuccess }] =
    useEditQuizzessByIdMutation();

  const [quizzeState, setQuizzeState] = useState({
    id: null,
    question: "",
    video_id: null,
    video_title: "",
  });
  const [options, setOptions] = useState([
    {
      id: Date.now(),
      option: "",
      isCorrect: false,
    },
  ]);

  const resetForm = () => {
    setQuizzeState({
      id: null,
      title: "",
      video_id: null,
      video_title: "",
      totalMark: 100,
    });
    setOptions([
      {
        id: Date.now(),
        option: "",
        isCorrect: false,
      },
    ]);
  };
  const handleField = (e) => {
    setQuizzeState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const checkTrueOption = options.some((opt) => opt.isCorrect);
    if (!checkTrueOption) {
      return toast.warn("At Least One Option Must Be Correct Ans");
    }
    if (options.length < 2) {
      return toast.warn("Minimum Two Option Required");
    }
    const payload = {
      question: quizzeState?.question,
      video_id: quizzeState?.video_id,
      video_title: quizzeState?.video_title,
      options,
    };
    if (type === "edit-quiz") {
      edit({
        id: id || quizze?.id,
        data: payload,
      });
    } else {
      save(payload);
      resetForm();
    }
  };
  useEffect(() => {
    if (type === "edit-quiz") {
      setIsReq(false);
    }
  }, [type, id]);

  useEffect(() => {
    if (id && quizze?.id) {
      setQuizzeState((prev) => ({
        ...prev,
        id: quizze?.id,
        question: quizze?.question,
        video_id: quizze?.video_id,
        video_title: quizze?.video_title,
      }));
      setOptions(quizze?.options);
    }
  }, [quizze, id]);

  useEffect(() => {
    if (addSuccess) {
      resetForm();
      toast.success("New Quizze Added");
    } else {
      editSuccess && toast.success("Quizze Edited Successfully");
    }
  }, [addSuccess, editSuccess]);
  return (
    <section className="py-2 bg-primary grid place-items-center border-spacing-8 shadow-2xl">
      {(saving || editing) && <Loading />}
      <div className="mx-auto w-full px-5 lg:px-20">
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <h2 className="mt-2 text-3xl font-extrabold text-slate-100">
              Add New Quizze
            </h2>
            <div className="flex justify-between">
              <button
                type="submit"
                className="btn text-xl ml-auto bg-violet-600 hover:bg-violet-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn ml-auto"
              >
                Back
              </button>
            </div>
          </div>

          <div className="rounded-md shadow-sm -space-y-px">
            <div className="py-1">
              <label htmlFor="question">Question: </label>
              <input
                id="question"
                name="question"
                type="text"
                required
                className="login-input rounded-t-md"
                placeholder="question"
                value={quizzeState?.question}
                onChange={(e) => handleField(e)}
              />
            </div>
            <div className="py-1">
              <label htmlFor="title">Select Assigned Video: </label>
              <select
                className="login-input rounded-t-md"
                name="video_title"
                id="video_title"
                required
                value={quizzeState?.video_title}
                onChange={(e) => {
                  const findVideo = videosDDL.find(
                    (v) => v.title === e?.target?.value
                  );
                  setQuizzeState((prev) => ({
                    ...prev,
                    video_title: findVideo?.title,
                    video_id: findVideo?.id,
                  }));
                }}
              >
                <option value="" hidden selected>
                  Select Video
                </option>
                {videosDDL?.length > 0 &&
                  videosDDL.map((m) => (
                    <option key={m?.id} value={m?.title}>
                      {m?.title}
                    </option>
                  ))}
              </select>
            </div>
            <div className="py-2">
              <div className="flex mb-2">
                <p>Options: </p>
                <button
                  type="button"
                  className="btn ml-3"
                  onClick={() => {
                    setOptions((prev) => [
                      ...prev,
                      {
                        id: Date.now(),
                        option: "",
                        isCorrect: false,
                      },
                    ]);
                  }}
                >
                  Add More
                </button>
              </div>
              <div className="">
                {options?.map((opt) => (
                  <div
                    className="flex items-center justify-start mt-2"
                    key={opt?.id}
                  >
                    <div className="flex items-center justify-between w-1/2">
                      <input
                        id="question"
                        name="option"
                        type="text"
                        required
                        className="login-input rounded-t-md inline-block"
                        placeholder="question"
                        value={opt?.option}
                        onChange={(e) => {
                          const modified = options.map((op) => {
                            if (opt.id === op.id) {
                              return {
                                ...op,
                                option: e?.target?.value,
                              };
                            } else {
                              return op;
                            }
                          });
                          setOptions(modified);
                        }}
                      />

                      <input
                        id="question"
                        name="question"
                        type="checkbox"
                        // required
                        className="rounded-t-md mx-3 inline-block"
                        placeholder="question"
                        value={opt?.isCorrect}
                        checked={opt?.isCorrect}
                        onChange={(e) => {
                          const modified = options.map((op) => {
                            if (opt.id === op.id) {
                              return {
                                ...op,
                                isCorrect: e.target.checked,
                              };
                            } else {
                              return op;
                            }
                          });
                          setOptions(modified);
                        }}
                      />
                      <label className="w-10 inline-block" htmlFor="question">
                        Is Correct?{" "}
                      </label>
                    </div>
                    <button
                      type="button"
                      className="btn ml-5"
                      onClick={() => {
                        const modified = options.filter(
                          (op) => op?.id !== opt?.id
                        );
                        setOptions(modified);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default QuizzesForm;
