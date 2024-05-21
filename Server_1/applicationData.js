const { verify } = require("jsonwebtoken");
const { version } = require("mongoose");

const data = [
    {
        version: '1.0.0',
        platform: 'android',
        desc: 'Initial release',
        package_name: 'EcoHarvest1.0.0.apk',
    },
    {
        version: '2.0.0',
        platform: 'android',
        desc: 'Added Auto App update feature',
        package_name: 'EcoHarvest2.0.0.apk',
    },
    {
        version: '2.0.1',
        platform: 'android',
        desc: 'Fixed sign in issue',
        package_name: 'EcoHarvest2.0.1.apk',
    },
    {
        version: '2.1.0',
        platform: 'android',
        desc: 'Added Modal to display update information',
        package_name: 'EcoHarvest2.1.0.apk', 
    },
    {
        version: '2.1.1',
        platform: 'android',
        desc: 'Fixed Auto updation issue',
        package_name: 'EcoHarvest2.1.1.apk', 
    },
    {
        version: '2.1.2',
        platform: 'android',
        desc: 'Added haptic feedbaacks and Carousel',
        package_name: 'EcoHarvest2.1.2.apk',
    },
    {
        version: '2.2.0',
        platform: 'android',
        desc: 'Added Plant Disease Detection feature',
        package_name: 'EcoHarvest2.2.0.apk',
    },
    {
        version: '2.3.0',
        platform: 'android',
        desc: 'Added Yeild Prediction feature and Enhanced UI',
        package_name: 'EcoHarvest2.3.0.apk',
    },
    {
        version: '2.3.1',
        platform: 'android',
        desc: 'Fixed UI glitches',
        package_name: 'EcoHarvest2.3.1.apk',
    },
    {
        version: '2.3.2',
        platform: 'android',
        desc: 'Fixed return to Home Screen issue',
        package_name: 'EcoHarvest2.3.2.apk',
    }
];

module.exports = data;