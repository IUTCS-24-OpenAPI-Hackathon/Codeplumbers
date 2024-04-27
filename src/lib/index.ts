import { error } from "@sveltejs/kit";
import { getLocation } from "./utils";

export const getPlaces = async (categories: string, locationName: string, radius: number) => {
    try {
        if(categories === "" || locationName === ""){
            throw error(400, "Specify the category and LocationName");
        }
        let lat: number;
        let lon: number;
        if(locationName.toLowerCase() === "my location"){
            const location: any = await getLocation();
            lat = location.lat;
            lon = location.lon;
            console.log(location);
        }
        else{
            const location: any = await searchPlace(locationName);
            lat = location.lat;
            lon = location.lon;
        }

        const rect = `${lon},${lat}`;

        const apiKey = "37b56c71535b48da909b01dc2bfec8b2";
        const response = await fetch(
            // `https://api.geoapify.com/v2/places?categories=${categories.toLowerCase()}&filter=rect:${rect}&long=en&limit=20&apiKey=${apiKey}`
            `https://api.geoapify.com/v2/places?categories=commercial&filter=circle:${rect},${radius}&bias=proximity:${rect}&limit=20&apiKey=37b56c71535b48da909b01dc2bfec8b2`
        );
        const respo = await response.json();
        let places: any[] = [];
        respo.features.forEach((feature: any) => {
            console.table(feature.properties);
            places.push({
                name: feature.properties.name,
            });
        });

        return places;
    } catch (err) {
        console.error("Could not fetch the place: ", err);
        return [];
    }
}
export const getWeather = async (days: string, locationName: string) => {
    try {
        if(days === "" || locationName === ""){
            throw error(400, "Specify the category and LocationName");
        }

        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=15c63f8bf94249e689e132213242604&q=${locationName}&days=${days}`
        );
        const respo = await response.json();
        console.log(JSON.stringify(respo))

        return respo;
    } catch (err) {
        console.error("Could not fetch the place: ", err);
        return [];
    }
}

export async function searchPlace(placeName: string): Promise<{ lat: number, lon: number } | null> {
    console.table("MyLocation : " + placeName);
    try {
        const apiKey = 'c487b263cf294fa5b7bb7ea914cd1c3c';
        const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(placeName)}&format=json&apiKey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length > 0) {
            const result = data.results[0];
            const { lat, lon } = result;
            console.log("Eigula: ", lat, lon);
            return { lat, lon };
        } else {
            console.error('No results found');
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}