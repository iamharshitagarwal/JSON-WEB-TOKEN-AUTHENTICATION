const noteModel = require("../modals/note");

//CREATE -----------------------------------------------
const createNote = async (req,res) => {
    // console.log(req.userId);
const {title, description} = req.body;
const newNote = new noteModel({
    title : title,
    description : description,
    userId : req.userId
});

try {
    await newNote.save();
    res.status(201).json(newNote);
} catch (error) {
    console.log(error);
    res.status(500).json({ message : "Something went wrong!"})
}
}


//UPDATE--------------------------------------------------------
const updateNote = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;

    const newNote = {
        title: title,
        description: description,
        userId: req.userId
    }

    try {
        await noteModel.findByIdAndUpdate(id, newNote, { new: true });
        res.status(200).json(newNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }

}


//DELETE--------------------------------------------------------
const deleteNote = async (req, res) => {
    const id = req.params.id;

    try {
        const note = await noteModel.findByIdAndRemove(id);
        res.status(202).json(note);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
}


//GET--------------------------------------------------------
const getNotes = async (req, res) => {

    try {
        const notes = await noteModel.find({ userId: req.userId })
        // if(!notes){
        //     res.status(401).json({ message : "user not found!"})
        // }
        res.status(200).json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
}

module.exports = { createNote, updateNote, getNotes, deleteNote };