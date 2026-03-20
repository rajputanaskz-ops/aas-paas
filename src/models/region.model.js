import mongoose from "mongoose";

const RegionSchema = mongoose.Schema({

    cityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },

    hexId: {
        type: String,
        required: true
    }

})

export const RegionModel = mongoose.model('Region', RegionSchema)