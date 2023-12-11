import GoogleMapReact from 'google-map-react';
import React, { useCallback } from 'react';
import { Box, SwipeableDrawer, Typography } from '@mui/material';

import Marker from './components/Marker/Marker';
import { IUserLocation } from './types/types';
import socket from './services/socket/socket';
import './App.css';

const defaultState = {
  center: {lat: 55.751574, lng: 37.573856},
  zoom: 10,
};

const App: React.FC = () => {
  const [choosenLocation, setChoosenLocation] = React.useState<IUserLocation>(null);
  const [usersLocations, setUserLocations] = React.useState<IUserLocation[]>([]);

  React.useEffect(() => {
    const listener = (locations: IUserLocation[]) => {
      setUserLocations(locations);
    }

    socket.on('locations', listener)

    return () => {
      socket.off('locations', listener);
    }
  }, []);

  const handleMarkerLocation = useCallback((userId: string) => {
    const location = usersLocations.find(userLocation => userLocation.id === userId);
    if (location) {
      setChoosenLocation(location);
    }
  }, [usersLocations]);

  return (
    <div className='main'>
      <React.Fragment>
      <SwipeableDrawer
      anchor={'right'}
      open={!!choosenLocation}
      onOpen={() => {}}
      onClose={() => setChoosenLocation(null)}
    >
      <Box sx={{display: 'flex', flexDirection: 'column', paddingTop: 5, alignItems: 'center', width: 500}}>
        <img className={'drawer-img'} alt={'avatar'} src={choosenLocation?.avatar} />
        <Typography sx={{fontSize: 35, fontWeight: '800', marginTop: 3}}>{choosenLocation?.name}</Typography>
      </Box>
    </SwipeableDrawer>
      </React.Fragment>
      <GoogleMapReact bootstrapURLKeys={{key: process.env.REACT_APP_MAPS_API_KEY!}} defaultCenter={defaultState.center} defaultZoom={defaultState.zoom}>
        {usersLocations.map(location => (
          <Marker 
            key={location.id}
            img={location.avatar}
            onClick={() => handleMarkerLocation(location.id)}
            // @ts-ignore
            lat={location.latitude} lng={location.longitude}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}

export default App;
