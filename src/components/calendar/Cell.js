import { useState } from "react";
import {cToF, kphToMph, cmToIn} from "../../features/units"
import { DateTime } from "luxon";


function Cell({ color, cellData, x, y }) {
  const [detailDisplayStatus, setDetailDisplayStatus] = useState(false);
    // console.log(cellData);
    let dateOut = DateTime.fromISO(cellData.date);





    const handleCellClick = (e) => {
      e.stopPropagation();
      // console.log(`${cmToIn(cellData.value)}" on ${cellData.date.toISO()}`);
      // console.log(x,y);
      // console.log(dateOut.toLocaleString(DateTime.DATE_MED));
      console.log(cellData);
    }
  

    return (
      <div className='timeline-cells-cell' onClick={handleCellClick}
        style={{
            backgroundColor: color,
            gridColumn: `${y+1}/span 1`,
            gridRow: `${x+1}/span 1`,
            cursor: "pointer",
        }} 
        >
          <div className="cell-description">{cmToIn(cellData.value)}" on {dateOut.toLocaleString(DateTime.DATE_MED)}</div>


        </div>
    )
  }

export default Cell;
