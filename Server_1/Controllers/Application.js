const data = require('../applicationData.js');

exports.checkUpdate = async (req, res) => {
    try{
        const {version, platform} = req.body;
        const latestVersion = data[data.length - 1];

        if(!latestVersion){
            return res.status(404).json({
                success: false,
                message: "No version found",
                updateAvailable: false
            })
        }

        if(latestVersion.version === version && latestVersion.platform === platform){
            return res.status(200).json({
                success: true,
                message: "No updates available",
                updateAvailable: false
            })
        }

        return res.status(200).json({
            success: true,
            updateAvailable: true,
            message: "Update available",
            data: latestVersion
        })

    }catch(e){
        console.error(e);

        return res.status(500).json({
            success: false,
            message: "Unable to check for updates. Please try again."
        })
    }
};

