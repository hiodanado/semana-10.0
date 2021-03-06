const Dev = require('../models/Dev');
const axios = require('axios');
const parseStringAsArray = require('../utils/ParseStringAsArray');

//index - lista, show - exibe 1, store, update, destroy

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req, res){
        const {github_username, techs, latitude, longitude} = req.body

        let dev = await Dev.findOne({github_username});

        if(!dev){
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
    
            let {name} = response.data;
            if(!name)
                name = response.data.login;
    
            const { avatar_url, bio } = response.data;
            const techsArray = parseStringAsArray(techs);
            const location = {
                type: "Point",
                coordinates: [longitude, latitude],
            };
    
    
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }

        res.json(dev);
    },

}