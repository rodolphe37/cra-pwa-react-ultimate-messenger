import { useEffect, useState } from "react";

//  A hook to provide the geolocation info on client side.

function getGeoLocation(options) {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (res) => {
          const { coords } = res;
          const { latitude, longitude } = coords;
          resolve({
            isError: false,
            lat: latitude,
            lng: longitude,
            message: "",
          });
        },
        (error) => {
          reject({ isError: true, message: error.message });
        },
        options
      );
    } else {
      reject({
        isError: true,
        message: "Geolocation is not supported for this Browser/OS.",
      });
    }
  });
}

const defaultGeoLocationOptions = {
  enableHighAccuracy: false,
  maximumAge: 0,
  timeout: Number.POSITIVE_INFINITY,
  when: true,
};

/**
 * useGeolocation
 * Gets the geolocation data as a hook
 *
 * @param geoLocationOptions Geolocation options
 */
function useGeolocation(
  // hooksOptions: IUseGeoLocationHook = defaultHookOptions,
  geoLocationOptions = defaultGeoLocationOptions
) {
  const [geoObject, setGeoObject] = useState(null);
  const { when, enableHighAccuracy, timeout, maximumAge } = geoLocationOptions;

  useEffect(() => {
    async function getGeoCode() {
      try {
        const value = await getGeoLocation({
          enableHighAccuracy,
          maximumAge,
          timeout,
          when,
        });
        setGeoObject(value);
      } catch (error) {
        setGeoObject(error);
      }
    }
    if (when) {
      getGeoCode();
    }
  }, [when, enableHighAccuracy, timeout, maximumAge]);

  return geoObject;
}

export { useGeolocation };

// How to use it :
//  const geoObj = useGeolocation();
//   if (geoObj) {
//      console.log("geo lat :", geoObj.lat);
//      console.log("geo long :", geoObj.lng);
//   }
