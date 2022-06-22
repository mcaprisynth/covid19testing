import { Examination } from "../models/Examination";
import { Stat } from "../models/Stat";

module.exports = { getAllExaminations, getExaminationsByLocationId, getExaminationStats };

function getAllExaminations(Covid19Examinations: Examination[], pageSize: number, page: number) {
    let examinations;

    if (pageSize !== undefined && page !== undefined)
        examinations = Covid19Examinations.slice((page - 1) * pageSize, page * pageSize);

    else
        examinations = Covid19Examinations;
    return examinations;
}

function getExaminationsByLocationId(Covid19Examinations: Examination[], locationId: number){
    const examinations = Covid19Examinations.filter((obj) => {
        return obj.locationId === locationId;
    });
    return examinations;
}

function getExaminationStats(Covid19Examinations: Examination[], dateFrom: Date, dateTo: Date) {
    let examinations;

    if (dateFrom !== undefined && dateTo !== undefined)
        examinations = Covid19Examinations.filter((item: Examination) => item.date >= dateFrom && item.date <= dateTo);

    else
        examinations = Covid19Examinations;

    let stats: Stat[] = [];
    examinations.forEach((item: Examination) => {
        let locationId = item.locationId;
        let pending = 0;
        let negative = 0;
        let positive = 0;

        let stat = stats.find((obj) => {
            return obj.locationId === locationId;
        });

        if (!stat) {
            stats.push({ locationId, pending, negative, positive });
        }

        switch (item.result) {
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
    return stats;
}