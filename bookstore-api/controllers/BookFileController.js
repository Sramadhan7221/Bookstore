const fs = require('fs');
const path = require('path');
const {BookFiles} = require('../models');

const addBookFile = async (req, res) => {
    if(req.files === null) return res.status(400).json({msg: "No file Uploaded"});
    const {bookId,totalPage} = req.body;
    const file = req.files.bookFile;
    const fileSize = file.data.length;
    const fileExt = path.extname(file.name);
    const fileName = file.md5 + fileExt;
    const url = `${req.protocol}://${req.get("host")}/files/${fileName}`;
    const allowedType = ['.jpg','.png','.jpeg','.pdf'];

    if(!allowedType.includes(fileExt.toLowerCase())) return res.status(422).json({msg:"invalid Files"});
    if(fileSize > 5000000) return res.status(422).json({msg:"File must be less than 5mb"});

    file.mv(`./public/files/${fileName}`, async(err) => {
        if(err) return res.status(500).json({msg: err.message});
        try {
            await BookFiles.create({
                bookId: bookId,
                bookFile: url,
                totalPage: totalPage
            });
            res.status(200).json({msg: "Book Episode added"});
        } catch (error) {
            console.log(error.message)
        }
    });
}

const deleteBookFile = async (req, res) => {
    const book = await BookFiles.findOne({
        where: {
            id: req.params.id
        }
    });

    if(!book) return res.status(404).json({msg: "Data Not found"});

    try {
        const url = book.bookFile;
        const arrUrl = url.replace(`${req.protocol}://`,"").split("/")
        const filePath = `./public/files/${arrUrl[2]}`;
        fs.unlinkSync(filePath);

        await BookFiles.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Book Episode Deleted !"});
    } catch (error) {
        console.log(error);
    }

}

module.exports = {addBookFile, deleteBookFile};