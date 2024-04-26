export const getPlaces = async (catergories: string, rect: string) => {
    try {
        const response = await fetch(
            // `https://api.geoapify.com/v2/places?categories=${catergories}&filter=rect:${rect}&lang=en&limit=20&apiKey=37b56c71535b48da909b01dc2bfec8b2`
            "https://api.geoapify.com/v2/places?categories=commercial&filter=rect:90.34358338852036,23.907219375419032,90.44181661148184,23.827158625602067&lang=en&limit=20&apiKey=37b56c71535b48da909b01dc2bfec8b2"
        );
        const respo = await response.json();
        let places: any[] = [];
        respo.features.forEach((feature: any) => {
            console.log(feature.properties);
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