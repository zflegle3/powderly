import { DateTime } from 'luxon';
//A Component that returns Month labels for calendar
function Month({ startDate, index }) {
  //takes in a startdate DateTime object and an index number
  //creates a new date moment object by adding (index * 7) days
  let date = startDate.plus({ days: index*7 });

  //Only displays month label for first week of month
  //Else label acts as a spacer to hold formatting
  if (date.day > 7) {
    return (
      <div className={`timeline-months-month ${date.monthShort}`} style={{visibility: "hidden"}}>
        {date.monthShort}
      </div>
    )

  } else {
    return (
      <div className={`timeline-months-month ${date.monthShort}`}>
        {date.monthShort}
      </div>
    )
  }
}

export default Month;