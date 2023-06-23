import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';

const Map = ({ position, containerStyle }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'marker-example',
        googleMapsApiKey: 'AIzaSyA_0XSZLfnEm3iBHA2yd_1nhu8dRojCeT8',
    });

    const [, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback() {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={position}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <>{position && <Marker id="marker-example" visible position={position} />}</>
        </GoogleMap>
    ) : (
        <></>
    );
};

export default Map;
