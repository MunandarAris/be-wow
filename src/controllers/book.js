const { books } = require('../../models');

const Joi = require('joi');

const fs = require('fs');

exports.addBook = async (req,res) => {

    //Create validation
    const schema = Joi.object({
        title : Joi.string().required(),
        pages : Joi.number().required(),
        publicationDate : Joi.date().required(),
        author : Joi.string().required(),
        isbn : Joi.number().required(),
        aboutBook : Joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if(error)
    {
        return res.status(400).send({
            status : "Failed",
            message : error.details[0].message
        });
    }

    try {

        const addBook = await books.create({
            title : req.body.title,
            pages : req.body.pages,
            author : req.body.author,
            publicationDate : req.body.publicationDate,
            isbn : req.body.isbn,
            aboutBook : req.body.aboutBook,
            bookFile : req.file.filename,
        });

        let book = await books.findOne({
            where : {
                id : addBook.id
            },
            attributes : {
                exclude : ["createdAt","updatedAt"]
            }
        });

        book = {
            ...book.dataValues,
            bookFile : process.env.PATH_FILE + book.dataValues.bookFile,
            
        }
        
        res.send({
            status : "Success",
            data : {
                book
            }
        })
        
    } catch (error) {
        
        console.log(error);
        req.send({
            status : "Error",
            message : "Server Error"
        })

    }

}

exports.getBooks = async (req,res) => {

    let dataBooks = await books.findAll({

        attributes : {
            exclude : ["createdAt","updatedAt"]
        }

    });

    dataBooks = dataBooks.map(item => {

        return {
            ...item.dataValues,
            bookFile : process.env.PATH_FILE + item.dataValues.bookFile
        }

    });

    try {

        res.send({
            status : "Success",
            data  : {
                books : dataBooks
            }
        })
        
    } catch (error) {
        
        console.log(error);
        res.send({
            status : "Error",
            message : "Server Error"
        })

    }

}

exports.getBook = async (req,res) => {

    const {id} = req.params;

    let dataBook = await books.findOne({
        where : {
            id
        },
        attributes : {
            exclude : ["createdAt","updatedAt"]
        }
    });

    if(!dataBook)
    {
        return res.send({
            message : "Data Not Found"
        });
    }

    dataBook = {
        ...dataBook.dataValues,
        bookFile : process.env.PATH_FILE + dataBook.dataValues.bookFile
    }

    try {

        res.send({
           
            status : "Success",
            data : {
                book : dataBook
            }

        });
        
    } catch (error) {
        
        console.log(error);
        res.send({
            status : "Error",
            message : "Server Error"
        })

    }

}

exports.updateBook = async (req,res) => {

    //Create validation
    const schema = Joi.object({
        title : Joi.string().required(),
        pages : Joi.number().required(),
        publicationDate : Joi.date().required(),
        author : Joi.string().required(),
        isbn : Joi.number().required(),
        aboutBook : Joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if(error)
    {
        return res.status(400).send({
            status : "Failed",
            message : error.details[0].message
        });
    }

    const {id} = req.params;

    const newData = req.body;

    try {

        if(req.file === undefined)
        {
            await books.update({...newData},{
                where : {
                    id
                }
            });
        }
        else 
        {

            const book = await books.findOne({
                where : {
                    id
                }
            });

            fs.unlinkSync("uploads/" + book.bookFile);

            await books.update({...newData,bookFile : req.file.filename},{
                where : {
                    id
                }
            });

        }


        let dataBook = await books.findOne({
            where : {
                id
            },
            attributes : {
                exclude : ["createdAt","updatedAt"]
            }
        });

        dataBook = {
            ...dataBook.dataValues,
            bookFile : process.env.PATH_FILE + dataBook.dataValues.bookFile
        }

        res.send({
            status : "Success",
            data : {
                book : dataBook
            }
        })
        
    } catch (error) {
        
        console.log(error);
        res.send({
            status : "Error",
            message : "Server Error"
        });

    }

}

exports.deleteBook = async (req,res) => {

    const {id} = req.params;

    const book = await books.findOne({
        where : {
            id
        }
    });

    if(!book)
    {
        res.send({
            message : "Data Not Found"
        })
    }

    fs.unlinkSync("uploads/" + book.bookFile);

    await books.destroy({
        where : {
            id
        }
    });

    try {

        res.send({
            status : "Success",
            data : {
                id : id
            }
        })
        
    } catch (error) {
        
        console.log(error);
        res.send({
            status : "Error",
            message : "Server Error"
        });

    }

}