const { users } = require("../../models");

exports.getUsers = async (req,res) => {

    try {

        const usersData = await users.findAll({
            attributes : {
                exclude : ["password","role","createdAt","updatedAt"]
            }
        });

        res.send({
            status : "Success",
            data : {
                users : usersData
            }
        })
        
    } catch (error) {

        console.log(error);
        res.send({
            status : "Failed",
            message : "Server Error"
        });

    }

};

exports.deleteUser = async (req,res) => {

    try {

        const {id} = req.params;

        await users.destroy({
            where : {
                id
            }
        });

        res.send({
            status : "Success",
            data : {
                id
            }
        });
        
    } catch (error) {
        console.log(error);
        res.send({
            status : "Failed",
            message : "Server Error"
        })
    }

}