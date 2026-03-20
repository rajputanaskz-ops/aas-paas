import { cellToBoundary, polygonToCells } from "h3-js";

const CreateRegions = async (req, res) => {
  try {
    // Step 1: Define Hyderabad polygon (lat, lng)
    const hyderabadPolygon = [
      [
        [25.36, 68.33],
        [25.36, 68.42],
        [25.44, 68.42],
        [25.44, 68.33],
        [25.36, 68.33]
      ]
    ];

    // Step 2: Generate H3 cells at resolution 7
    const cells = polygonToCells(hyderabadPolygon, 8);

    // Step 3: Convert cells into GeoJSON features
    const features = cells.map(cell => {
      const boundary = cellToBoundary(cell); // [[lat, lng], ...]
      const coordinates = boundary.map(([lat, lng]) => [lng, lat]); // GeoJSON: [lng, lat]
      coordinates.push(coordinates[0]); // Close polygon

      return {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [coordinates]
        },
        properties: { h3Index: cell }
      };
    });

    // Step 4: Wrap into FeatureCollection
    const geojson = {
      type: "FeatureCollection",
      features
    };

    // Step 5: Respond with formatted GeoJSON
    return res.json({
      status: 200,
      success: true,
      cells: geojson // directly usable in Kepler.gl or geojson.io
    });

  } catch (error) {
    console.error(error);
    return res.json({
      status: 500,
      success: false,
      message: "Failed to create regions"
    });
  }
};

export { CreateRegions };