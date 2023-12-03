const { StatusCodes } = require("http-status-codes");
const AppErrors = require("./error-handler");
const message = 'Not able to validate the data sent in the request';

export default class ValidationError extends AppErrors {
    constructor(error){
        let errorName = error.name;
        let explanation = [];
        error.errors.forEach((err) => {
            explanation.push(err.message);
        });
        super(errorName,message,explanation,StatusCodes.BAD_REQUEST)
    }
}