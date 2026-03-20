import mongoose from "mongoose";

const featureSchema = mongoose.Schema({
    type: {
        type: String,
        default: 'Feature'
    },

    geometry: {
        type: {
            type: String,
            default: 'Polygon'
        },
        coordinates: {
            type: [[[Number]]], // 👈 Polygon = 3D array
            required: true
        }
    },

    properties: {
        h3Index: {
            type: String,
            required: true
        }
    }

})

const geoJSONSchema = mongoose.Schema({
    type: {
        type: String,
        default: 'FeatureCollection'
    },
    features: {
        type: [featureSchema]
    }
})

const CitySchema = new mongoose.Schema({
    country: {
        type: String,
        enum: ['Pakistan'],
        required: true
    },
    city: {
        type: String,
        enum: ['Hyderabad'],
        required: true
    },
    numberOfRegions: {
        type: Number,
        required: true
    },
    polygon: {
        type: [[Number]],
        // required: true
    },
    cells: {
        type: [String],
        required: true
    },
    geoJSON: {
        type: geoJSONSchema,
        required: true
    }
});

export const CityModel = mongoose.model('City', CitySchema)

