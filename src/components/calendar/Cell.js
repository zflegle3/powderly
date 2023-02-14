function Cell({ color, cellData, x, y }) {

    const handleCellClick = () => {
        console.log(cellData.date.toISO(),cellData.value);
        console.log(x,y);
    }
  
    return (
      <div 
        className='timeline-cells-cell'
        style={{
            backgroundColor: color,
            gridColumn: `${y+1}/span 1`,
            gridRow: `${x+1}/span 1`,
            cursor: "pointer",
        }} 
        onClick={handleCellClick}
        ></div>
    )
  }

export default Cell;
