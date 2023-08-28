import React, { useEffect, useState } from "react";
import { useGetAllQuizeMarkQuery } from "../../../features/student/studentApi";
import { useGetMarksLandingQuery } from "../../../features/admin/marksApi";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const { id } = useSelector((state) => state?.profile?.user);

  const { data: allQuizeMarks } = useGetAllQuizeMarkQuery();
  const { data: allAssignmentMarks } = useGetMarksLandingQuery();
  const [landing, setLanding] = useState([]);
  const [studentResult, setStudentResult] = useState({});
  console.log({allQuizeMarks,allAssignmentMarks })
  useEffect(() => {
    const modifiedCommonQuizeArray = allQuizeMarks?.reduce(
      (modifiedArr, currValue) => {
        const studentIndex = modifiedArr.findIndex(
          (obj) => obj.student_id === currValue.student_id
        );
        if (studentIndex !== -1) {
          modifiedArr[studentIndex].mark += currValue.mark;
        } else {
          modifiedArr.push({
            student_id: currValue.student_id,
            student_name: currValue.student_name,
            mark: currValue.mark,
          });
        }
        return modifiedArr;
      },
      []
    );
    const modifiedCommonMarksArray = allAssignmentMarks?.reduce(
      (modifiedArr, currValue) => {
        const studentIndex = modifiedArr.findIndex(
          (obj) => obj.student_id === currValue.student_id
        );
        if (studentIndex !== -1) {
          modifiedArr[studentIndex].assingmentMarks += +currValue.mark;
          modifiedArr[studentIndex].mark = 0;
        } else {
          modifiedArr.push({
            student_id: currValue.student_id,
            student_name: currValue.student_name,
            assingmentMarks: +currValue.mark,
            mark: 0,
          });
        }
        return modifiedArr;
      },
      []
    );
    const mergedArray = modifiedCommonMarksArray?.map((student) => {
      const temp = modifiedCommonQuizeArray?.find(
        (quiz) => quiz.student_id === student.student_id
      );
      return { ...student, ...temp };
    });
    const sortingList = mergedArray?.sort((a, b) => {
      const sumA = a.mark + a.assingmentMarks;
      const sumB = b.mark + b.assingmentMarks;
      return sumB - sumA;
    });
    const temp = sortingList?.map((obj, index, arr) => {
      const prevObj = arr[index - 1];
      const prevPos = prevObj ? prevObj.position : undefined;
      const sum = obj.mark + obj.assingmentMarks;
      if (prevObj && sum === prevObj.sum) {
        obj.position = prevPos;
      } else {
        obj.position = index + 1;
      }
      obj.sum = sum;
      return obj;
    });
    console.log({temp})
    setStudentResult(temp?.find((item) => item?.student_id === id));
    setLanding(temp);
  }, [allQuizeMarks, allAssignmentMarks, id]);
  console.log(landing)

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div>
          <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
          {studentResult?.position ? (
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr>
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-2 border-cyan">
                  <td className="table-td text-center font-bold">
                    {studentResult?.position}
                  </td>
                  <td className="table-td text-center font-bold">
                    {studentResult?.student_name}
                  </td>
                  <td className="table-td text-center font-bold">
                    {studentResult?.mark}
                  </td>
                  <td className="table-td text-center font-bold">
                    {studentResult?.assingmentMarks}
                  </td>
                  <td className="table-td text-center font-bold">
                    {studentResult?.assingmentMarks + studentResult?.mark}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <><h3 className="text-md font-bold my-4">Please participate in quizzes and assignments to position yourself on the leaderboard.</h3></>
          )}
        </div>

        <div className="my-8">
          <h3 className="text-lg font-bold">Top 20 Result</h3>
          <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
            <thead>
              <tr className="border-b border-slate-600/50">
                <th className="table-th !text-center">Rank</th>
                <th className="table-th !text-center">Name</th>
                <th className="table-th !text-center">Quiz Mark</th>
                <th className="table-th !text-center">Assignment Mark</th>
                <th className="table-th !text-center">Total</th>
              </tr>
            </thead>

            <tbody>
              {landing?.length > 0 &&
                landing?.slice(0, 20).map((item, idx) => (
                  <tr
                    key={item?.student_id}
                    className="border-b border-slate-600/50"
                  >
                    <td className="table-td text-center">{item?.position}</td>
                    <td className="table-td text-center">
                      {item?.student_name}
                    </td>
                    <td className="table-td text-center">{item?.mark}</td>
                    <td className="table-td text-center">
                      {item?.assingmentMarks}
                    </td>
                    <td className="table-td text-center">
                      {item?.assingmentMarks + item?.mark}
                    </td>
                  </tr>
                ))}
              {/*  <tr className="border-b border-slate-600/50">
                <td className="table-td text-center">4</td>
                <td className="table-td text-center">Saad Hasan</td>
                <td className="table-td text-center">50</td>
                <td className="table-td text-center">50</td>
                <td className="table-td text-center">100</td>
              </tr>

              <tr className="border-b border-slate-600/50">
                <td className="table-td text-center">4</td>
                <td className="table-td text-center">Saad Hasan</td>
                <td className="table-td text-center">50</td>
                <td className="table-td text-center">50</td>
                <td className="table-td text-center">100</td>
              </tr>

              <tr className="border-b border-slate-600/50">
                <td className="table-td text-center">4</td>
                <td className="table-td text-center">Saad Hasan</td>
                <td className="table-td text-center">50</td>
                <td className="table-td text-center">50</td>
                <td className="table-td text-center">100</td>
              </tr>

              <tr className="border-b border-slate-600/50">
                <td className="table-td text-center">4</td>
                <td className="table-td text-center">Saad Hasan</td>
                <td className="table-td text-center">50</td>
                <td className="table-td text-center">50</td>
                <td className="table-td text-center">100</td>
              </tr>

              <tr className="border-b border-slate-600/50">
                <td className="table-td text-center">4</td>
                <td className="table-td text-center">Saad Hasan</td>
                <td className="table-td text-center">50</td>
                <td className="table-td text-center">50</td>
                <td className="table-td text-center">100</td>
              </tr>

              <tr className="border-slate-600/50">
                <td className="table-td text-center">4</td>
                <td className="table-td text-center">Saad Hasan</td>
                <td className="table-td text-center">50</td>
                <td className="table-td text-center">50</td>
                <td className="table-td text-center">100</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
