// Replace with your actual API key
const apiKey: string = 'AIzaSyAlKBcslA7PS5cLhPMtmVEEJFa1mW9TJAs';

// Function to perform the search
async function searchPlace(placeName: string): Promise<{ lat: number, lng: number } | null> {
    try {
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(placeName)}&key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK' && data.results.length > 0) {
            const firstResult = data.results[0];
            const { name, geometry: { location: { lat, lng } } } = firstResult;
            return { lat, lng };
        } else {
            console.error('No results found');
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
// Example usage
const placeNameToSearch = 'Statue of Liberty';
searchPlace(placeNameToSearch)
  .then(location => {
    if (location) {
      console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}`);
    }
  });

