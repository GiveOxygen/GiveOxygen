import React, { Fragment, useEffect, useState } from 'react';
import {
  Map as LeafletMap,
  Marker,
  Popup,
  TileLayer,
  // LayersControl,
} from 'react-leaflet';
import L from 'leaflet';
// import { GoogleLayer } from 'react-leaflet-google';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import request from '../utils/request';
import SearchHospital from '../components/SearchHospital';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// const { BaseLayer } = LayersControl;

// let map;
const Map = (props) => {
  const [currentPosition, setCurrentPosition] = useState([40.7128, 74.0060]); // ny
  const [hospitals, setHospitals] = useState([]);

  const getHospitals = async () => {
    const { data: { listHospitals: { items: result } } } = await request( /* GraphQL */ `
    query ListHospitals(
      $filter: ModelHospitalFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listHospitals(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          id
          name
          description
          email
          phoneNumber
          address {
            street
            street2
            city
            state
            zipCode
          }
          coordinates {
            latitude
            longitude
          }
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  `, null, 'API_KEY');
    console.log(result);
    setHospitals(result);
  };

  useEffect(() => {
    const { geolocation } = navigator;
    geolocation.getCurrentPosition(({ coords }) => {
      if (coords) {
        console.log(coords);
        setCurrentPosition([coords.latitude, coords.longitude]);
      }
    });

    (async () => {
      await getHospitals();
    })();
  }, []);
  return (
    <Fragment>
      <SearchHospital
        addNewIfNotExist={false}
        onUpdate={(selected)=>{
          if (selected) {
            global.logger.debug(selected);
            setCurrentPosition([selected.coordinates.latitude, selected.coordinates.longitude]);  
          }
        }}/>
      <LeafletMap
        center={currentPosition}
        // bounds={bounds}
        boundsOptions={{ padding: 16 }}
        zoom={12}
        // ref={(ref) => map = ref}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=""
        />
        {/* <LayersControl position='topright'>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution=""
            maxNativeZoom={19}
            minZoom={10}
            maxZoom={19}
          />
          {
            ['ROARDMAP', 'TERRAIN', 'SATELLITE', 'HYBRID'].map((type, index)=>(
              <BaseLayer key={index} checked={index===0} name={`Google Maps - ${type}`}>
                <GoogleLayer googlekey={getConfig('googlekey')}  maptype={type}/>
              </BaseLayer>
            ))
          }
          <BaseLayer name="Open Street Map">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution=""
              maxNativeZoom={19}
              minZoom={10}
              maxZoom={19}
            />
          </BaseLayer>
        </LayersControl> */}
        <Marker position={currentPosition}>
          <Popup>
            I am here!
          </Popup>
        </Marker>
      </LeafletMap>
    </Fragment>
  );
};

export default Map;
