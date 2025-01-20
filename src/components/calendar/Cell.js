import { cmToIn } from "../../features/units";
import { DateTime } from "luxon";


function Cell({ color, cellData, x, y }) {
  let dateOut = DateTime.fromISO(cellData.date);

  const handleCellClick = (e) => {
    e.stopPropagation();
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
