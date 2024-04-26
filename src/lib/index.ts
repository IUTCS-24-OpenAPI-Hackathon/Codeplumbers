export const getPlaces = async (catergories: string, locationName: string) => {
    try {
        const location = await searchPlace(locationName);
        console.log("FFF" + location);
        const response = await fetch(
            // `https://api.geoapify.com/v2/places?categories=${catergories}&filter=rect:${rect}&lang=en&limit=20&apiKey=37b56c71535b48da909b01dc2bfec8b2`
            "https://api.geoapify.com/v2/places?categories=commercial&filter=rect:90.34358338852036,23.907219375419032,90.44181661148184,23.827158625602067&lang=en&limit=20&apiKey=37b56c71535b48da909b01dc2bfec8b2"
        );
        const respo = await response.json();
        let places: any[] = [];
        respo.features.forEach((feature: any) => {
            // console.log(feature.properties);
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
