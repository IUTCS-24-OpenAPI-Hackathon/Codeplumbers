import type { AuthModel } from "pocketbase";

export const serializeNonPOJOs = (obj: AuthModel): AuthModel => {
    return structuredClone(obj);
};

export const generateUserName = (name: string): string => {
    return `${name.slice(0, 5)}${Math.random()}`;
}

export const getLocation = () => {
  console.log("looog");
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          console.log(userLocation);
          resolve(userLocation);
        },
        err => {
          reject(err.message);
        }
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
};