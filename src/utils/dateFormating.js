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
  const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
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
  const date = new Date(null);
  date.setTime(myDate.seconds * 1000)

  let w = days[date.getDay()];
  let d = date.getUTCDate();
  let m = months[date.getMonth()];

  return `${w} ${d} ${m}`;
};

const timeFromDate = (myDate) => {
  let h =
    myDate.getHours().toString().length === 1
      ? `0${myDate.getHours()}`
      : myDate.getHours();
  let m =
    myDate.getMinutes().toString().length === 1
      ? `0${myDate.getMinutes()}`
      : myDate.getMinutes();

  return `${h}:${m}`
}

const timeFromTimestamp = (myDate) => {
  const date = new Date(myDate.seconds * 1000);

  let h =
    date.getHours().toString().length === 1
      ? `0${date.getHours()}`
      : date.getHours();
  let m =
    date.getMinutes().toString().length === 1
      ? `0${date.getMinutes()}`
      : date.getMinutes();

  return `${h}:${m}`
}

export { digitalDate, textDate, timeFromDate, timeFromTimestamp };
