const digitalDate = (myDate) => {
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

const textDate = (myDate) => {
  const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Samedi"];
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  const date = new Date(myDate.seconds * 1000);

  let w = days[date.getDay()];
  let d = date.getDate();
  let m = months[date.getMonth()];

  return `${w} ${d} ${m}`;
};

export { digitalDate, textDate };
