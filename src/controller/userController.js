const { users, profile } = require("../../models");

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
                usersData
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

exports.addUser = async (req,res) => {

    try {
        
        await users.create(req.body);
        res.send({
            status : "Success",
        });

    } catch (error) {
        console.log(error);
        res.send({
            status : "Failed",
            message : "Server Error"
        })
    }

}

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
        })
        
    } catch (error) {
        console.log(error);
        res.send({
            status : "Failed",
            message : "Server Error"
        })
    }

}