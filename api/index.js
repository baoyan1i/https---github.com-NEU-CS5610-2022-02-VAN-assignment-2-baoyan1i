import express from "express";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import { assert, object, string, size, refine } from 'superstruct';
import isEmail from 'isemail';

const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const prisma = new PrismaClient();


app.get("/list", async ( req, res ) => {
    const result = await prisma.user.findMany();
    res.json(result);
});


app.post("/signup", async (req, res )=> {
    const { name, email } = req.body;
    const result = await prisma.user.create({
        data: {
            name,
            email,
        },
    });
    if(!result) res.status(404).send("user required");
    else if(result.name.length >= 50 || result.name.length <= 2){
        res.status(406).send("length of name out of range");
    }
    else if(!result.email.includes("@")){
        res.status(406).send("This is not an emali address");
    }else{
        res.json(result);
    }
    
});

app.put("/update", async ( req, res ) => {
    const { id, name, email } = req.body;
    const result = await prisma.user.update({
        where:{
            id : Number(id),
        },
        data: {
            name,
            email,
        },
    });
    if(!result.id) res.status(404).send("user required");
    else if(result.name.length >= 50 || result.name.length <= 2){
        res.status(406).send("length of name out of range");
    }
    else if(!result.email.includes("@")){
        res.status(406).send("This is not an emali address");
    }else{
        res.json(result);
    }
});

app.delete("/delete", async (req, res) => {
    const { id } = req.body;
    const result = await prisma.user.delete({
        where: {
            id : Number(id),
        },
    });
    if(!result.id) res.status(404).send("id required");
    else{
        res.json(result);
    }
});

app.listen(8000);
