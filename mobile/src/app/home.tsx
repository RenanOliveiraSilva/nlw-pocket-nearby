import { useEffect, useRef, useState } from "react";
import { View, Alert, Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { router } from "expo-router";

import { api } from "@/services/api";
import { fontFamily, colors } from "@/styles/theme";

import { Places } from "@/components/places";
import { PlaceProps } from "@/components/place";
import { Categories, CategoryProps } from "@/components/categories";

type MarketsProps = PlaceProps & {
    latitude: number;
    longitude: number;
}

const currentLocation = {
    latitude: -23.561187293883442,
    longitude: -46.656451388116494,
}

export default function Home() {
    const [categories, setCategories] = useState<CategoryProps>([]);
    const [category, setCategory] = useState("");
    const [markets, setMarkets] = useState<MarketsProps[]>([]);
    const [render, setRender] = useState(false);

    async function fetchCategories() {
        try {

            const { data } = await api.get("/categories");
            setCategories(data);
            setCategory(data[0].id);

        } catch (error) {
            console.log(error);
            Alert.alert('Erro ao buscar categorias');
        }
    }

    async function fetchMarkets() {
        try {
            if (!category) {
                return
            };

            const { data } = await api.get("/markets/category/" + category);
            setMarkets(data);
        

        } catch (error) {
            console.log(error);
            Alert.alert('Locais', 'Erro ao buscar locais');
        }
    }

    async function getCurrentLocation() {
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync();

            if (granted) {
                const location = await Location.getCurrentPositionAsync();
                //console.log(location);

            } 
    
        } catch (error) {
            console.log(error);
            Alert.alert('Erro ao buscar localização');

        }
    }


    useEffect(() => {
        getCurrentLocation();
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchMarkets();
    }, [category]);

    useEffect(() => {
        setTimeout(() => {
        setRender(true);
        }, 1);
    }, [markets]);


    return (
        <View style={{ flex: 1, backgroundColor: "#CECECE" }}>
            <Categories data={categories} onSelect={setCategory} selected={category} />

            { render && (
                <MapView 
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,

                    }}
                >
                    <Marker 
                        identifier="current"
                        coordinate={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                        }}
                        image={require("@/assets/location.png")}
                        
                    />

                    {
                        markets.map((item) => (
                            <Marker
                                key={item.id}
                                identifier={item.id}
                                coordinate={{
                                    latitude: item.latitude,
                                    longitude: item.longitude,
                                }}
                                image={require("@/assets/pin.png")}
                                anchor={{x:1 , y:1 }}
                               
                            >
                                <Callout
                                   onPress={() => router.navigate(`/market/${item.id}`)}                               
                                >
                                    <View>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontFamily: fontFamily.medium,
                                                color: colors.gray[600]
                                            }}
                                        >
                                            {item.name}
                                            
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontFamily: fontFamily.regular,
                                                color: colors.gray[600]
                                            }}
                                        >
                                            {item.address}
                                        </Text>

                                    </View>
                                </Callout>
                            </Marker>
                        ))
                    }
                    
                </MapView>

            )}

            <Places data={markets} />
        </View>
    )
}