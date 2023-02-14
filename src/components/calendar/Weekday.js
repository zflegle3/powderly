
function WeekDay({ index }) {
    const DayNames = {
        1: 'Mon',
        3: 'Wed',
        5: 'Fri'
    }
    // console.log(index);

    return (
      <div className='timeline-weekdays-weekday'>
        {DayNames[index]}
      </div>
    )
}


export default WeekDay;