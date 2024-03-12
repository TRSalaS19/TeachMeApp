import React from 'react';
import GoogleMapReact from 'google-map-react';

const GoogleMap = ({ lat, long, mapKey}) => {

  const googleApi = import.meta.env.VITE_GOOGLE_API;

  const options = {
    streetViewControl: true, 
    fullscreenControl: true, 
    zoomControl: true 
  };
  

  return (
    <div style={{ height: '300px', width: '100%' }} key={mapKey}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleApi }}
        defaultCenter={{ lat: lat, lng: long }}
        defaultZoom={2}
        options={options}
      >
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;