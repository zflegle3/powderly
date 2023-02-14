
//A Component that returns Month labels for calendar
function Month({ startDate, index }) {
    //takes in a startdate DateTime object and an index number
    //creates a new date moment object by adding (index * 7) days
    let date = startDate.plus({ days: index*7 })

    //returns a div with the text of the month name 
    return (
      <div className={`timeline-months-month ${date.monthShort}`}>
        {date.monthShort}
      </div>
    )
}

export default Month;