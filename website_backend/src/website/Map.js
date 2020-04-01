import React, { useEffect, useState } from 'react';
import {
  Map as LeafletMap,
  Marker,
  Popup,
  TileLayer,
  Circle,
  // LayersControl,
} from 'react-leaflet';
import L from 'leaflet';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import convert from 'convert-units';
import { useTranslation } from 'react-i18next';

// import { GoogleLayer } from 'react-leaflet-google';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import request from '../utils/request';
// import SearchHospital from '../components/SearchHospital';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// https://github.com/pointhi/leaflet-color-markers
const redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// const goldIcon = new L.Icon({
//   iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

// const { BaseLayer } = LayersControl;

// let map;
const Map = (props) => {
  const { t } = useTranslation();
  const [myPosition, setMyPosition] = useState([]);
  const [currentPosition, setCurrentPosition] = useState([40.7505189, -74.0014762]);
  const [hospitals, setHospitals] = useState([]);
  const [makers, setMakers] = useState([]);

  const [zoomLevel, setZoomLevel] = useState(9); // 11
  const [radiusInMiles, setRadiusInMiles] = useState(10);

  const getHospitals = async () => {
    const { data: { listHospitals: { items: result } } } = await request( /* GraphQL */ `
      query ListHospitals(
        $filter: ModelHospitalFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listHospitals(filter: $filter, limit: $limit, nextToken: $nextToken) {
          items {
            name
            address {
              city
              state
              zipCode
              country
            }
            coordinates {
              latitude
              longitude
            }
          }
          nextToken
        }
      }
    `, { limit: 100 }, 'API_KEY');
    setHospitals(result);
  };

  const getMakers = async () => {
    const { data: { listMakers: { items: result } } } = await request( /* GraphQL */ `
      query ListMakers(
        $email: String
        $filter: ModelMakerFilterInput
        $limit: Int
        $nextToken: String
        $sortDirection: ModelSortDirection
      ) {
        listMakers(
          email: $email
          filter: $filter
          limit: $limit
          nextToken: $nextToken
          sortDirection: $sortDirection
        ) {
          items {
            firstName
            jobTitle
            address {
              city
              state
              zipCode
              country
            }
            coordinates {
              latitude
              longitude
            }
          }
          nextToken
        }
      }
    `, { limit: 100 }, 'API_KEY');
    setMakers(result);
  };

  useEffect(() => {
    const cache = window.localStorage.getItem('position');
    if (cache) {
      setCurrentPosition(JSON.parse(cache));
      setMyPosition(JSON.parse(cache));
    }

    const { geolocation } = navigator;
    geolocation.getCurrentPosition(({ coords }) => {
      if (coords) {
        setTimeout(() => {
          const position = [coords.latitude, coords.longitude];
          setCurrentPosition(position);
          setMyPosition(position);
          window.localStorage.setItem('position', JSON.stringify(position));
        });
      }
    });

    (async () => {
      await Promise.all([getHospitals(), getMakers()]);
    })();
  }, []);
  return (
    <Grid container spacing={2} style={{ height: '100%', padding: 16 }}>
      <Grid item xs={8} className="map-container">
        <LeafletMap
          center={currentPosition}
          // bounds={bounds}
          boundsOptions={{ padding: 16 }}
          zoom={zoomLevel}
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
          {/* <Marker position={myPosition}>
            <Popup>
              I am here!
            </Popup>
          </Marker> */}

          {myPosition.length > 0 &&
            <Circle center={myPosition} color="grey" radius={convert(radiusInMiles).from('mi').to('m')}>
              <Popup>
                {t('map.aroundMe', { radiusInMiles })}
              </Popup>
            </Circle>}

          {hospitals.map((hospital, index)=>(
            <Marker
              key={index}
              icon={redIcon}
              position={[hospital.coordinates.latitude, hospital.coordinates.longitude]}
            >
              <Popup>
                {hospital.name}
              </Popup>
            </Marker>
          ))}
          {makers.map((maker, index)=>(
            <Marker
              key={index}
              icon={greenIcon}
              position={[maker.coordinates.latitude, maker.coordinates.longitude]}
            >
              <Popup>
                {maker.firstName} ({maker.jobTitle})
              </Popup>
            </Marker>
          ))}
        </LeafletMap>
      </Grid>
      <Grid item xs={2} className="list-container">
        {/* <div style={{ padding: 10 }}>
          <SearchHospital
            addNewIfNotExist={false}
            data={hospitals}
            onUpdate={(selected)=>{
              if (selected) {
                global.logger.debug(selected);
                setCurrentPosition([selected.coordinates.latitude, selected.coordinates.longitude]);
              }
            }}
          />
        </div> */}
        <Paper>
          <List
            component="nav"
            subheader={
              <ListSubheader disableSticky={true} color="red">
                {t('hospitals')}
              </ListSubheader>
            }
          >
            {hospitals.map((hospital, index)=>(
              <ListItem
                key={index}
                divider
                button
                onClick={()=>{
                  setCurrentPosition([hospital.coordinates.latitude, hospital.coordinates.longitude]);
                }}
              >
                <ListItemText
                  primary={hospital.name}
                  secondary={hospital.address.city}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={2} className="list-container">
        <Paper>
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                {t('makers')}
              </ListSubheader>
            }
          >
            {makers.map((maker, index)=>(
              <ListItem
                key={index}
                divider
                button
                onClick={()=>{
                  setCurrentPosition([maker.coordinates.latitude, maker.coordinates.longitude]);
                }}
              >
                <ListItemText
                  primary={`${maker.firstName} (${maker.jobTitle})`}
                  secondary={maker.address.city}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Map;
