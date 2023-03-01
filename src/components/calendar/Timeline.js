import Cell from "./Cell";
import WeekDay from "./Weekday";
import Month from "./Month";
import { DateTime } from 'luxon';
import { useSelector, useDispatch } from 'react-redux';

function Timeline({dataIn}) {
    const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
    //Component takes in historical data as an array of objects
    //each object should be {date: DateObject, snowfall: number}

    let data =[]
    dataIn.forEach(item => {
        data.push({
        date: DateTime.fromISO(item.snowDate),
        value: item.snowVal
      })
    })

    //sets start date from today's date (default ~5 months)
    //if start date not a sunday, resets as next previous sunday for formatting
    let renderMonths = 5;
    //render months used to add responsive design to calendar display
    //renders 5 or 3 months depending on window width
    if (window.innerWidth < 600) {
      renderMonths = 3;
    };
    let dateStart = DateTime.now().minus({ days: (renderMonths*30) });
    if (dateStart.weekday !== 0) {
        let newDate = dateStart.minus({days: dateStart.weekday})
        dateStart = newDate;
    }

    const colorFunc= (alpha) => {
      if (user.theme === "light") {
        if (alpha === 0) {
          return `rgba(0, 0, 0, 0.05)`;
        } else {
          return `rgba(5, 5, 200, ${alpha})`;
        }
      } else {
        if (alpha === 0) {
          return `rgba(13, 17, 23, 0.5)`;
        } else {
          return `rgba(76, 193, 226, ${alpha})`;
        }
      }

    }

    //creates an array of two DateTime object entries to represent the range of dates
    //[0] = start date
    //[1] = tomorrow's date
    let range = [dateStart, DateTime.now().plus({days: 1})]

    //calculates the total days between start and tomorrow's date
    // **includes an entry for today**
    let dayDiff = range[1].diff(dateStart, "days").toObject();
    let days = Math.floor(Math.abs(dayDiff.days));

    //creates a new array called cells w/ days # of elements
    //array is maped over to output one cell per entry
    let cells = Array.from(new Array(days));

    //creates a new array called cells w/ 7 elements to represent a week
    // 0-6 w/ 0 being sunday
    //array is mapped over to output one day label per 
    let weekDays = Array.from(new Array(7));

    //creates a new array called months w/ days/7 elements 
    //** actually finds number of weeks within the selected # of days
    //array is mapped over to output one month label component per entry
    //only the first of the labels output is visable
    let months = Array.from(new Array(Math.floor(days / 7)));

    //GRID FORMAT VALUES
    //used to plot cells in grid layout
    let daysNum = days;
    let weeksNum = Math.ceil(days/7) + 1;
  
    //creates min and max variables used to determine color value
    let min = Math.min(0, ...data.map(d => d.value));
    let max = Math.max(...data.map(d => d.value));
    let colorMultiplier = 1 / (max - min);
  

    return (
      <div className='timeline'>
  
        <div className="timeline-months">
          {months.map((_, index) => <Month key={index} index={index} startDate={dateStart} />)}
        </div>
  
        <div className="timeline-body">
  
          <div className="timeline-weekdays">
            {weekDays.map((_, index) => <WeekDay key={index} index={index} startDate={dateStart} />)}
          </div>
  
          <div 
            className="timeline-cells" 
            style={{
                gridTemplateRows: `repeat(${7},14px)`,
                gridTemplateColumns: `repeat(${weeksNum}, 14px)`
            }} 
          >
            {cells.map((_, index) => {
                //new date object created for every cell
                let date = dateStart.plus({ days: index });
                
                //filters data to find value where dates match btw data and date object
                //returns a data object with date and value properties
                //returns 0 if no value found
                let dataPoint ;
                if (data.filter(dataObj => date.hasSame(dataObj.date, "day")).length > 0) {
                    dataPoint = data.find(dataObj => date.hasSame(dataObj.date, "day"));
                } else {
                    dataPoint = {
                        date: date,
                        value: 0,
                    }
                }

                //color value representing opacity btw 0-1
                let alpha = colorMultiplier * dataPoint.value;

                //sets rgba color with alpha as opacity value
                let color = colorFunc(alpha);

                //creates x(weekday) and y(week) values based on weekday # and week # values 
                //values used to plot cell on calendar grid layout
                //reformats sundays (7 in luxon to)
                let x = date.weekday;
                if (x === 7) {
                    x = 0;
                };
                let diffObj = date.diff(dateStart, "days").toObject();
                let daysDiffSelect = Math.floor(Math.abs(diffObj.days));
                let y = Math.floor(daysDiffSelect/7);

              return (
                <Cell
                    daysNum={daysNum}
                    weeksNum={weeksNum}
                    x={x}
                    y={y}
                    key={index}
                    index={index}
                    date={date}
                    color={color}
                    cellData={dataPoint}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

export default Timeline;