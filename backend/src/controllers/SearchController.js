const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/ParseStringAsArray');

module.exports = {
    async index (req, res){
        const {latitude, longitude, techs} = req.query;
        const techsArray = parseStringAsArray(techs);

        const devs = Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                }
            }
        })
    }
};