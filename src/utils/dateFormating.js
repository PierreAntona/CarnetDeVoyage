const dateFormating = (myDate) => {
  const date =
    typeof myDate.getMonth === "function"
      ? myDate
      : new Date(myDate.seconds * 1000);

  let d =
    date.getDate().toString().length === 1
      ? `0${date.getDate()}`
      : date.getDate();
  let m =
    (date.getMonth() + 1).toString().length === 1
      ? `0${date.getMonth() + 1}`
      : date.getMonth() + 1;
  let y = date.getFullYear();
  return `${d}/${m}/${y}`;
};

export { dateFormating };
