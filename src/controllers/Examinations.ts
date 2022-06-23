import { Request, Response } from 'express';
import { Examination } from '../models/Examination';
import { Stat } from '../models/Stat';

const { getAllExaminations, getExaminationsByLocationId, getExaminationStats } = require('../managers/Examination');


const data = require('../hardCodedData/db.json');
const Covid19Examinations: Examination[] = data;


// getting all examinations
const getAll = async (req: Request, res: Response) => {
    try{
        // get examinations
        const pageSize = req.query.pageSize as unknown as number;
        const page = req.query.page as unknown as number;

        const examinations = getAllExaminations(Covid19Examinations, pageSize, page);
        
        return res.send(examinations);
    }
    catch (e) {
        return res.status(500).json({ status: 500, message: "Internal server error" });
    }
    
};

// getting all examinations by location id
const getByLocationId = async (req: Request, res: Response) => {
    try{
        // get the examination locationId from the req
        const locationId: number = +req.params.locationId;
        // get the examinations
        const examinations = getExaminationsByLocationId(Covid19Examinations, locationId);

        return res.send(examinations);
    }
    catch (e) {
        return res.status(500).json({ status: 500, message: "Internal server error" });
    }
};

// getting stats
const getStats = async (req: Request, res: Response) => {
    try{
        // get stats

        const dateFrom = req.query.dateFrom as unknown as Date;
        const dateTo = req.query.dateTo as unknown as Date;

        let stats: Stat[] = getExaminationStats(Covid19Examinations, dateFrom, dateTo);

        return res.send(stats);
    }
    catch (e) {
        return res.status(500).json({ status: 500, message: "Internal server error" });
    }
};


export default { getAll, getByLocationId, getStats };