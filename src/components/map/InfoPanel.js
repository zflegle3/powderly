import { FaTemperatureLow, FaTint, FaSnowflake, FaWind } from 'react-icons/fa';
import {cToF, kphToMph, cmToIn} from "../../features/units";
import { DateTime } from 'luxon';


function InfoPanel({selectedMarker}) {

    return (
        <div className="info-window">
            <h2>{selectedMarker.name}</h2>
            <p>{selectedMarker.date.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</p>
            <div className="info-window-detail">
                
                <div className="info-window-detail-item">
                    <div className="detail-item-icon">
                            <FaTemperatureLow />
                        </div>
                    <div className="detail-item-header">
                        <p>High/Low</p>
                        <p>{cToF(selectedMarker.hi)}/{cToF(selectedMarker.lo)}°F</p>
                    </div>
                </div>

                <div className="info-window-detail-item">
                    <div className="detail-item-icon">
                            <FaWind />
                    </div>
                    <div className="detail-item-header">
                        <p>Wind</p>
                        <p>{kphToMph(selectedMarker.wind)} mph</p>
                    </div>
                </div>

                <div className="info-window-detail-item">
                    <div className="detail-item-icon">
                        <FaSnowflake />
                    </div>
                    <div className="detail-item-header">
                        <p>Snowfall</p>
                        <p>{cmToIn(selectedMarker.snow)} in.</p>
                    </div>
                </div>

                <div className="info-window-detail-item">
                    <div className="detail-item-icon">
                        <FaTint />
                    </div>
                    <div className="detail-item-header">
                        <p>Humidity</p>
                        <p>{selectedMarker.humidity}%</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default InfoPanel;