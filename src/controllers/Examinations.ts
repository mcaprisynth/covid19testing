import { Request, Response } from 'express';
import { Examination } from '../models/Examination';
import { Stat } from '../models/Stat';

const { getAllExaminations, getExaminationsByLocationId, getExaminationStats } = require('../managers/Examination');


const data = require('../hardCodedData/db.json');
const Covid19Examinations: Examination[] = data;


// getting all examinations
const getAll = async (req: Request, res: Response) => {
    // get examinations
    const pageSize = req.query.pageSize as unknown as number;
    const page = req.query.page as unknown as number;

    const examinations = getAllExaminations(Covid19Examinations, pageSize, page);
    
    return res.send(examinations);
};

// getting all examinations by location id
const getByLocationId = async (req: Request, res: Response) => {
    // get the examination locationId from the req
    const locationId: number = +req.params.locationId;
    // get the examinations
    const examinations = getExaminationsByLocationId(Covid19Examinations, locationId);

    return res.send(examinations);
};

// getting stats
const getStats = async (req: Request, res: Response) => {
    // get stats

    const dateFrom = req.query.dateFrom as unknown as Date;
    const dateTo = req.query.dateTo as unknown as Date;

    let stats: Stat[] = getExaminationStats(Covid19Examinations, dateFrom, dateTo);

    return res.send(stats);
};


export default { getAll, getByLocationId, getStats };