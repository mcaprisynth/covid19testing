import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { Examination } from '../models/Examination';
import { Stat } from '../models/Stat';


const data = require('../hardCodedData/db.json');
const Covid19Examinations: Examination[] = data;


// getting all examinations
const getAll = async (req: Request, res: Response) => {
    // get examinations
    const pageSize = req.query.pageSize as unknown as number;
    const page = req.query.page as unknown as number;

    let examinations;

    if(pageSize !== undefined && page !== undefined)
        examinations = Covid19Examinations.slice((page - 1) * pageSize, page * pageSize);
    else
        examinations = Covid19Examinations;
    
    return res.send(examinations);
};

// getting all examinations by location id
const getByLocationId = async (req: Request, res: Response) => {
    // get the examination locationId from the req
    let locationId: number = +req.params.locationId;
    // get the examinations
    const examinations = Covid19Examinations.filter((obj) => {
        return obj.locationId === locationId;
    });
    return res.send(examinations);
};

// getting stats
const getStats = async (req: Request, res: Response) => {
    // get stats

    const dateFrom = req.query.dateFrom as unknown as Date;
    const dateTo = req.query.dateTo as unknown as Date;

    let examinations;

    if(dateFrom !== undefined && dateTo !== undefined)
        examinations = Covid19Examinations.filter((item: Examination) => item.date >= dateFrom && item.date <= dateTo);
    else
        examinations = Covid19Examinations;

    let stats : Stat[] = [];
    examinations.forEach((item: Examination) => {
        let locationId = item.locationId;
        let pending = 0;
        let negative = 0;
        let positive = 0;

        let stat = stats.find((obj) => {
            return obj.locationId === locationId;
        });

        if(!stat){
            stats.push({locationId, pending, negative, positive});
        }

        switch(item.result){
            case 'pending':
                pending = 1;
                break;
            case 'negative':
                negative = 1;
                break;
            case 'positive':
                positive = 1;
                break;
        }

        stat = stats.find(location => location['locationId'] === locationId);
        stat!.pending += pending;
        stat!.negative += negative;
        stat!.positive += positive;
    });

    return res.send(stats);
};


export default { getAll, getByLocationId, getStats };