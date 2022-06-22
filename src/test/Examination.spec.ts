import { expect } from 'chai';
import 'mocha';

const data = require('../hardCodedData/db.json');
const Covid19Examinations = data;
const { getAllExaminations, getExaminationsByLocationId, getExaminationStats } = require('../managers/Examination');

describe('Examination test', () => {
    it('should just work', () => {
        expect(true).equal(true);
    });

    it('should return a list of all examinations', () => {
        //GIVEN
    
        //WHEN
        let examinations = getAllExaminations(Covid19Examinations);
    
        //THEN
        expect(Covid19Examinations).equal(examinations);
      });

    it('should return a list of paged examinations', () => {
    //GIVEN

    //WHEN
    let examinations = getAllExaminations(Covid19Examinations, 10, 1);

    //THEN
    expect(examinations).to.have.lengthOf(10);
    });

    it('should return a list of all examinations by location id', () => {
    //GIVEN
    const locationId :number = 1;

    //WHEN
    let examinations = getExaminationsByLocationId(Covid19Examinations, locationId);

    //THEN
    expect(examinations).to.have.length.greaterThan(0);
    });

    it('should return a list of all examinations with location id 1', () => {
    //GIVEN
    const locationId :number = 1;

    //WHEN
    let examinations = getExaminationsByLocationId(Covid19Examinations, locationId);

    //THEN
    expect(examinations).to.have.length.greaterThan(0);
    });

    it('should return a list of overall stats', () => {
    //GIVEN

    //WHEN
    let examinations = getExaminationStats(Covid19Examinations);

    //THEN
    expect(examinations).to.have.length.greaterThan(0);
    });

    it('should return a list of stats in range dates', () => {
    //GIVEN
    const dateFrom = '2020-05-31T14:00:00.000Z' as unknown as Date;
    const dateTo = '2020-06-12T14:00:00.000Z' as unknown as Date;

    //WHEN
    let examinations = getExaminationStats(Covid19Examinations, dateFrom, dateTo);

    //THEN
    expect(examinations).to.have.length.greaterThan(0);
    });
});