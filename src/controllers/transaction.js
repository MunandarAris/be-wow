const {transactions,users} = require("../../models");

//fitur for user
exports.addTransaction = async (req,res) => {

    const idUser = req.user.id;

    if(req.file === undefined)
    {
        return res.send({
            message : "Please Select Image"
        });
    }

    const saveData = await transactions.create({
        idUser,
        proofTransaction : req.file.filename,
        remainingActive : 30,
        statusUser : "Active",
        statusPayment : "Pending"
    });

    let data = await transactions.findOne({
        where : {
            id : saveData.id
        },
        include : {
            model : users,
            as : "user",
            attributes : {
                exclude : ["email","password","role","createdAt","updatedAt"]
            }
        },
        attributes : {
            exclude : ["idUser","createdAt","updatedAt"]
        }
    });

    data = {
        ...data.dataValues,
        proofTransaction : process.env.PATH_FILE + data.dataValues.proofTransaction
    }

    try {

        res.send({
            status : "Success",
            data : {
                transaction : data
            }
        });
        
    } catch (error) {
        
        console.log(error);
        res.send({
            status : "Failed",
            message : "Server Error"
        });

    }

}

//fitur for admin
exports.updateTransaction = async (req,res) => {

    const {id} = req.params;

    try {

        await transactions.update(
            {statusPayment : req.body.statusPayment},{
            where : {
                id
            }
        });

        let data = await transactions.findOne({
            where : {
                id
            },
            include : {
                model : users,
                as : "user",
                attributes : {
                    exclude : ["email","password","role","createdAt","updatedAt"]
                }
            },
            attributes : {
                exclude : ["idUser","createdAt","updatedAt"]
            }
        });

        data = {
            ...data.dataValues,
            proofTransaction : process.env.PATH_FILE + data.dataValues.proofTransaction
        }

        res.send({
            status : "Success",
            data : {
                transaction : data
            }
        });
        
    } catch (error) {
        
        console.log(error);
        res.send({
            status : "Failed",
            message : "Server Error"
        });

    }

}

//fitur for admin
exports.getTransactions = async (req,res) => {

    try {

        let dataTransactions = await transactions.findAll({
            include : {
                model : users,
                as : "user",
                attributes : {
                    exclude : ["email","password","role","createdAt","updatedAt"]
                }
            },
            attributes : {
                exclude : ["idUser","createdAt","updatedAt"]
            }
        }); 

        dataTransactions = dataTransactions.map(item => {
            return {
                ...item.dataValues,
                proofTransaction : process.env.PATH_FILE + item.dataValues.proofTransaction
            }
        });

        res.send({
            status : "Success",
            data : {
                transactions : dataTransactions
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

//fitur for admin
exports.getTransaction = async (req,res) => {

    const {id} = req.params;

    try {

        let dataTransactions = await transactions.findOne({
            where : {
                id
            },
            include : {
                model : users,
                as : "user",
                attributes : {
                    exclude : ["email","password","role","createdAt","updatedAt"]
                }
            },
            attributes : {
                exclude : ["idUser","createdAt","updatedAt"]
            }
        }); 

        dataTransactions = {
            ...dataTransactions.dataValues,
            proofTransaction : process.env.PATH_FILE + dataTransactions.dataValues.proofTransaction
        }

        res.send({
            status : "Success",
            data : {
                transaction : dataTransactions
            }
        });
        
    } catch (error) {
        
        console.log(error);
        res.send({
            status : "Failed",
            message : "Data Not Found"
        })

    }

}