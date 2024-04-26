import type { AuthModel } from "pocketbase";

export const serializeNonPOJOs = (obj: AuthModel): AuthModel => {
    return structuredClone(obj);
};

export const generateUserName = (name: string): string => {
    return `${name.slice(0, 5)}${Math.random()}`;
}

export const getLocation = () => {
    let error : any;
    if (navigator.geolocation) {
     const location  = navigator.geolocation.getCurrentPosition(
        position => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          return userLocation;
        },
        err => {
          error = err.message;
        }

      );
      return location;
    } else {
      error = "Geolocation is not supported by this browser.";
    }
  };