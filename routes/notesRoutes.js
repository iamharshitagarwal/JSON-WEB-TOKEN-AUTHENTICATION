const express = require("express");
const { getNotes, createNote, updateNote, deleteNote } = require("../controllers/noteController");
const auth = require("../middlewares/auth");
const notesRouter = express.Router();

notesRouter.get("/",auth,getNotes
//  (req,res)=>{
// res.send("note get request");
// }
);
notesRouter.post("/",auth,createNote
//  (req,res)=> {
//     res.send("note post request");
// }
);

notesRouter.put("/:id",auth, updateNote
//  (req,res)=> {
//     res.send("update put request");
// }
);
notesRouter.delete("/:id",auth, deleteNote
//  (req,res)=> {
//     res.send("delete request");
// }
);

module.exports = notesRouter;