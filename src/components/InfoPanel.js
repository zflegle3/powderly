import { FaTemperatureLow, FaTint, FaSnowflake, FaWind } from 'react-icons/fa';


function InfoPanel({selectedMarker}) {

    let hiF = ((selectedMarker.hi*9/5)+32).toFixed(1);
    let loF = ((selectedMarker.lo*9/5)+32).toFixed(1);

    return (
        <div className="info-window">
            <h2>{selectedMarker.name}</h2>
            <p>{selectedMarker.date.toDateString()}</p>
            <p>Snow Showers</p>
            <div className="info-window-detail">
                
                <div className="info-window-detail-item">
                    <div className="detail-item-icon">
                            <FaTemperatureLow />
                        </div>
                    <div className="detail-item-header">
                        <p>High/Low</p>
                        <p>{hiF}/{loF}°F</p>
                    </div>
                </div>

                <div className="info-window-detail-item">
                    <div className="detail-item-icon">
                            <FaWind />
                    </div>
                    <div className="detail-item-header">
                        <p>Wind</p>
                        <p>{(selectedMarker.wind*0.621371).toFixed(1)} mph</p>
                    </div>
                </div>

                <div className="info-window-detail-item">
                    <div className="detail-item-icon">
                        <FaSnowflake />
                    </div>
                    <div className="detail-item-header">
                        <p>Snowfall</p>
                        <p>{(selectedMarker.snow*0.393701).toFixed(1)} in.</p>
                    </div>
                </div>

                <div className="info-window-detail-item">
                    <div className="detail-item-icon">
                        <FaTint />
                    </div>
                    <div className="detail-item-header">
                        <p>Humidity</p>
                        <p>{80}%</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default InfoPanel;