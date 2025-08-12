import { Request, Response } from "express";
import Work from "../models/Work";


const addWork = async (request: Request, response: Response) => {
    try{
        const { workType, workPrice, workMechanic } = request.body;
        const work = await Work.create({workType: workType, workPrice: workPrice, workMechanic: workMechanic});

        if (!work){
            response.status(500).json({message: "Error adding work"});
            return;
        }

        response.status(200).json({message: `Work added successfully.`, workType: workType, workPrice: workPrice, workMechanic: workMechanic});
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

const getAllWorks = async (response: Response) => {
    try{
        const works = await Work.find();
        if (!works){
            response.status(500).json("No works found")
        }
        response.status(200).json(works);
        return;
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

const getWorkById = async (req: Request, response: Response) => {
    try{
        const workId = req.params.id;
        const work = await Work.findById(workId);
        if (!work){
            response.status(500).json("No work found");
            return;
        }
        response.status(200).json(work);
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

const updateWork = async (request: Request, response: Response) => {
    try{
        const workId = request.params.id;
        const updateFields = request.body;
        const work = await Work.findOneAndUpdate(
            {_id: workId},
            updateFields,
            { new: true, omitUndefined: true }
        );
        if (!work){
            response.status(500).json("No work found");
            return;
        }
        response.status(200).json(work);
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

const deleteWork = async (request: Request, response: Response) => {
    try{
        const workId = request.params.id;
        const work = await Work.findOneAndDelete({_id: workId});
        if (!work){
            response.status(500).json("No work found")
            return;
        }
        response.status(200).json(work);
    }
    catch(err: any)
    {
        response.status(500).json({message: err.message})
    }
}

export {addWork, getAllWorks, getWorkById, updateWork, deleteWork};