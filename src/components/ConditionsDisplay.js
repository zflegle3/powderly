
function ConditionsDisplay({resortData}) {
    let cmToIn = 2.54;
    //format data for display
    let baseDepth = (resortData.conditions.current.baseDepth/cmToIn).toFixed(1);
    let topDepth = (resortData.conditions.current.topDepth/cmToIn).toFixed(1);
    let snow24 = (resortData.conditions.current.snow24/cmToIn).toFixed(1);
    let snow72 = (resortData.conditions.current.snow24/cmToIn).toFixed(1);
    let desc = resortData.conditions.current.description;
    if (desc.length < 1) {
        desc = "Snow Condition Unknown"
    };
    let fresh = resortData.conditions.current.freshSnow;
    if (fresh !== "-") {
        fresh = fresh/cmToIn.toFixed(1);
    } else {
        fresh = (0).toFixed(1);
    }




    return (
        <div className="resort-conditions-display">
            <div className="resort-conditions-data">

                <p className="rating">6.9</p>

                <p className="resort-name">{resortData.name}</p>

                <div className="twenty-four-hr-snow">
                    <p>{fresh}"</p>
                    <p>Fresh Snow</p>
                </div>

                <div className="twenty-four-hr-snow">
                    <p>{snow24}"</p>
                    <p>24 hrs</p>
                </div>

                <div className="seventy-two-hr-snow">
                    <p>{snow72}"</p>
                    <p>72 hrs</p>
                </div>

                <div className="conditions-detail">
                    <p>{baseDepth}" - {topDepth}"</p>
                    <p>{desc}</p>
                </div>

                <div className="lifts-detail">
                    <p>{resortData.lifts.open}/{resortData.lifts.total}</p>
                    <p>Lifts Open</p>
                </div>

            </div>
            <div className="resort-conditions-calendar"></div>
            <br></br>
        </div>
    );
  }
  
  export default ConditionsDisplay;