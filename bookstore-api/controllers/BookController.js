const fs = require('fs');
const path = require('path');
const {Books, BookFiles} = require('../models');

const addBook = async (req, res) => {
    if(req.files === null) return res.status(400).json({msg: "No file Uploaded"});
    const {title,desc,author,release_date} = req.body;
    const slug = title.replace(/\s/g,"-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
    const file = req.files.cover;
    const fileSize = file.data.length;
    const fileExt = path.extname(file.name);
    const fileName = file.md5 + fileExt;
    const url = `${req.protocol}://${req.get("host")}/covers/${fileName}`;
    const allowedType = ['.jpg','.png','.jpeg'];

    if(!allowedType.includes(fileExt.toLowerCase())) return res.status(422).json({msg:"invalid Image"});
    if(fileSize > 5000000) return res.status(422).json({msg:"Image must be less than 5mb"});

    file.mv(`./public/covers/${fileName}`, async(err) => {
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Books.create({
                title: title,
                desc: desc,
                slug: slug,
                author: author,
                release_date: release_date,
                cover: url
            });
            res.status(200).json({msg: "Book added"});
        } catch (error) {
            console.log(error.message)
        }
    });
}

const getBooks = async (req, res) => {
    try {
        const response = await Books.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

const getBooksDetail = async(req,res) => {
    try {
        const response = await Books.findOne({
            where: {
                slug: req.params.slug
            },
            include: [{
                model: BookFiles,
                as: 'bookFiles'
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

const updateBook = async (req, res) => {
    const {title,desc,author,release_date} = req.body;
    const slug = title.replace(/\s/g,"-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
    const book = await Books.findOne({
        where: {
            id: req.params.id
        }
    });

    if(!book) return res.status(404).json({msg: "Data Not found"});

    try {
        let url = book.cover;
        if(req.files !== null)
        {
            const file = req.files.cover;
            const fileSize = file.data.length;
            const fileExt = path.extname(file.name);
            const fileName = file.md5 + fileExt;
            url = `${req.protocol}://${req.get("host")}/covers/${fileName}`;
            const allowedType = ['.jpg','.png','.jpeg'];

            if(!allowedType.includes(fileExt.toLowerCase())) return res.status(422).json({msg:"invalid Image"});
            if(fileSize > 5000000) return res.status(422).json({msg:"Image must be less than 5mb"});

            file.mv(`./public/covers/${fileName}`, async(err) => {
                if(err) return res.status(500).json({msg: err.message});
                try {
                    const oldUrl = book.cover;
                    const arrUrl = oldUrl.replace(`${req.protocol}://`,"").split("/")
                    const filePath = `./public/covers/${arrUrl[2]}`;
                    fs.unlinkSync(filePath);
                } catch (error) {
                    console.log(error.message)
                }
            });
        }

        await Books.update({
            title: title,
            desc: desc,
            slug: slug,
            author: author,
            release_date: release_date,
            cover: url
        }, 
        {
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Book Updated !"});
    } catch (error) {
        console.log(error);
    }
}

const deleteBook = async (req, res) => {
    const book = await Books.findOne({
        where: {
            id: req.params.id
        }
    });

    if(!book) return res.status(404).json({msg: "Data Not found"});

    try {
        const url = book.cover;
        const arrUrl = url.replace(`${req.protocol}://`,"").split("/")
        const filePath = `./public/covers/${arrUrl[2]}`;
        fs.unlinkSync(filePath);

        await Books.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Book Deleted !"});
    } catch (error) {
        console.log(error);
    }

}

module.exports = {getBooks, getBooksDetail, addBook, updateBook, deleteBook};