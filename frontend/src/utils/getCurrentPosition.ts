const getCurrentPosition = async () => {
  const { lat, lng }: { lat: number, lng: number } = await new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      resolve({ lat, lng })
    });
  })

  return { lat, lng }
}

export default getCurrentPosition