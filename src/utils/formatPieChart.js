const gradeFormat = (correctAnswers, totalQuestions) =>
  ((correctAnswers * 100) / totalQuestions).toFixed(0);

export default ({ users }) => {
  let data = {};
  let results = users?.map((u) => u?.result);
  results?.forEach((result) => {
    let grade = +gradeFormat(result?.correctAnswers, result?.totalQuestions);
    if (data[result.levelName]) {
      let existingGrade = data[result.levelName].find((l) => l?.grade == grade);
      if (existingGrade) {
        existingGrade.numberOfUsers++;
      } else {
        data[result.levelName].push({
          grade,
          numberOfUsers: 1,
        });
      }
    } else {
      data[result.levelName] = [
        {
          grade,
          numberOfUsers: 1,
        },
      ];
    }
  });
  //   console.log(
  //     Object.entries(data).map((d) => {
  //       return {
  //         id: d[0],
  //         label: d[0],
  //         value: d[1].reduce((accumulator, currentValue) => {
  //           return accumulator + currentValue.num;
  //         }, 0),
  //       };
  //     })
  //   );
  return Object.entries(data).map((d) => {
    return {
      id: d[0],
      label: d[0],
      value: d[1].reduce((accumulator, currentValue) => {
        return accumulator + currentValue.numberOfUsers;
      }, 0),
    };
  });
};

// {
//     name:[{grade , num},{grade , num}] ,
// }
