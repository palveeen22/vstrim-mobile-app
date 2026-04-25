import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';
import type { StackScreenProps } from '@react-navigation/stack';
import type { MapStackParamList } from '../navigation/MapStackNavigator';
import { useUserLocation } from '../hooks/useUserLocation';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { selectPin } from '../store/map.slice';
import { PlacePin } from '../components/PlacePin';
import { CategoryFilter } from '../components/CategoryFilter';
import { PlaceBottomDrawer } from '../components/PlaceBottomDrawer';
import { MOCK_PLACES } from '../mock/mapMock';

type Props = StackScreenProps<MapStackParamList, 'MapScreen'>;

const lang = 'ru'; // можно потом брать из настроек пользователя

const tileUrl = `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=DG9u6CSDECf0u9APE1ve&language=${lang}`;

export function MapScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const selectedPinId = useAppSelector((s) => s.map.selectedPinId);
  const { location } = useUserLocation();
  const places = MOCK_PLACES;
  const mapRef = useRef<MapView>(null);
  const isPinPressRef = useRef(false);

  const selectedPlace = places.find((p) => p.id === selectedPinId) ?? null;

  const handlePinPress = (id: string) => {
    isPinPressRef.current = true;
    dispatch(selectPin(id));
    setTimeout(() => { isPinPressRef.current = false; }, 100);
  };

  const handleMapPress = () => {
    if (isPinPressRef.current) return;
    dispatch(selectPin(null));
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        mapType="none"
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        showsUserLocation
        showsMyLocationButton={false}
        onPress={handleMapPress}
      >
        {/* CartoDB Voyager — OSM data, renders local Cyrillic labels for Russia */}
        <UrlTile
          urlTemplate={tileUrl}
          maximumZ={19}
          flipY={false}
          tileSize={256}
          zIndex={-1}
        />

        {places.map((place) => (
          <PlacePin
            key={place.id}
            place={place}
            selected={place.id === selectedPinId}
            onPress={() => handlePinPress(place.id)}
          />
        ))}
      </MapView>

      {/* Floating header — sits above map */}
      {/* <MapHeader onSearchPress={() => {}} /> */}

      {/* Category filter chips — sits above drawer */}
      <CategoryFilter />

      <PlaceBottomDrawer
        place={selectedPlace}
        onClose={() => dispatch(selectPin(null))}
        onViewDetail={(placeId) => {
          dispatch(selectPin(null));
          navigation.navigate('PlaceDetailScreen', { placeId });
        }}
        onSave={(placeId) => console.log('save', placeId)}
        onVisited={(placeId) => console.log('visited', placeId)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
