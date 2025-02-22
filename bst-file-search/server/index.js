import express from "express";
import cors from "cors";
import BinaryTree from "./schemas/tree.schema.js";
import upload from "./services/upload.file.service.js";

const app=express();
app.use(cors());
app.use(express.json());
const tree=new BinaryTree();
app.post("/upload", upload.single("file"), (req, res) =>{
    const file = req.file;
    if(!file){
        return res.status(400).json({
            success: false,
            error:"Please pass the file",
        });
    }

    tree.insert(file.filename, {
        path: file.path,
        size: file.size,
        mimetype: file.mimetype
    });

    const response={
        success:true,
        message: "File Found",
        data: tree.toJson(),
        file: file
    };
    res.json(response);
});





app.get("/search", (req, res)=>{
    const key=req.query.key;
    const result=tree.search(key);

    if(result){
        res.json({
            success: true,
            data: result
        });
    }
    else{
        res.json({
            success: "false",
            message:"File not found",
        });
    }
});


app.get("/show-tree", (req,res)=>{
    res.json({
        success: true,
        data: tree.toJson()
    });
});
app.listen(3001, ()=> console.log("Backend running on port 3001"));