const { validationResult } = require('express-validator');

function requestValidator(req: any, res: any, next: any) { // TODO: Types
    const errors = validationResult(req);

    if(!errors.isEmpty())
        res.status(422).json(errors);
    else
        next();
}

export default requestValidator;