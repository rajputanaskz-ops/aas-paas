import { cellToBoundary, polygonToCells } from "h3-js";
import { RegionModel } from "../../models/region.model.js"
import { CityModel } from "../../models/city.model.js";

const CreateRegions = async (req, res) => {
  try {
    console.log(1)
    const { polygon, city, country } = await req.body


    if (!polygon) {
      return res.json({
        message: 'Polygon is required',
        success: false,
        status: 401
      })
    }
    console.log(2)

    if (!city) {
      return res.json({
        message: 'City is required',
        success: false,
        status: 401
      })
    }

    if (!country) {
      return res.json({
        message: 'Country is required',
        success: false,
        status: 401
      })
    }

    // const polygon = [
    //   [
    //     [25.36, 68.33],
    //     [25.36, 68.42],
    //     [25.44, 68.42],
    //     [25.44, 68.33],
    //     [25.36, 68.33]
    //   ]
    // ];

    // Step 2: Generate H3 cells at resolution 7
    const cells = polygonToCells(polygon, 8);
    console.log(3)
  

    if (!cells) {
      return res.json({
        message: 'Unable to generate cells, make sure polygon is 2D array of number',
        success: false,
        status: 401
      })
    }

    // return res.json({
    //   cells: cells
    // })

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

    console.log(4)


    // Step 4: Wrap into FeatureCollection
    const geojson = {
      type: "FeatureCollection",
      features
    };

    const newCity = await CityModel.create({
      city,
      country,
      numberOfRegions: cells.length,
      // polygon,
      cells,
      geoJSON: geojson
    })
    console.log(5)

    const regions = cells.map(cell => {
      return {
        hexId: cell,
        cityId: newCity._id
      }
    })

    await RegionModel.insertMany(regions)

    // Step 5: Respond with formatted GeoJSON
    return res.json({
      status: 200,
      success: true,
      cells: cells // directly usable in Kepler.gl or geojson.io
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