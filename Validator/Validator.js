'use strict';

class Validator {
    constructor(req, rules) {
        this.data = req.body;
        this.req = req;
        this.rules = rules;
        this.isFails = false;
        this.errors = [];
    }

    validate() {
        for (let key in this.rules) {
            if((this.data).hasOwnProperty(key)) {
                for(let r of (this.rules[key]).split('|')) {
                    let otherParams = r.split(':');
                    if(otherParams.length == 1) {
                        this[r](key);
                    } else {
                        this[otherParams[0]](key, otherParams[1]);
                    }
                }
            } else {
                // put the error directly because the field is not present but show the corrent validation
                let error = {};
                error[key] = `The ${key} must be present`;
                this.errors.push(error);
                this.isFails = true;
            }
        }

        if(this.isFails){
            let structuredErrors = {};
            for(let error of this.errors) {
                let key = Object.getOwnPropertyNames(error)[0];
                if(!structuredErrors.hasOwnProperty(key)) {
                    structuredErrors[key] = error[key];
                }
            }
            this.req.flash('validationErrors', structuredErrors);
        }

        return {
            isFails: this.isFails,
            errors: this.errors
        };
    }

    // Field under validation must be a value after a given value
    // There are some options for the options
    // 1. today
    // 2. yestarday
    // 3. tomorrow
    // 4. your specific date
    // How to use this by, e.g. "after:today"
    after(key, options) {
        let currentData = new Date(this.data[key]);
        switch(options) {
            case 'today':
                let today = new Date();
                if(currentData <= today) {
                    let error = {};
                    error[key] = `The ${key} must be after today.`;
                    this.errors.push(error);
                    this.isFails = true;
                }
                break;
            case 'yesterday':
                let yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                if(currentData <= yesterday) {
                    let error = {};
                    error[key] = `The ${key} must be after yesterday.`;
                    this.errors.push(error);
                    this.isFails = true;
                }
                break;
            case 'tomorrow':
                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                if(currentData <= tomorrow) {
                    let error = {};
                    error[key] = `The ${key} must be after tomorrow.`;
                    this.errors.push(error);
                    this.isFails = true;
                }
                break;
            default:
                let optionDate = new Date(options);
                if(currentData <= optionDate) {
                    let error = {};
                    error[key] = `The ${key} must be after ${options}.`;
                    this.errors.push(error);
                    this.isFails = true;
                }
                break;
        }
    }

    // Field under validation must be a value after or equal a given value
    // There are some options for the options
    // 1. today
    // 2. yestarday
    // 3. tomorrow
    // 4. your specific date
    // How to use this by, e.g. "afterOrEqual:today"
    afterOrEqual(key, options) {
        let currentData = new Date(this.data[key]);
        switch(options) {
            case 'today':
                let today = new Date();
                if(currentData < today) {
                    let error = {};
                    error[key] = `The ${key} must be after today.`;
                    this.errors.push(error);
                    this.isFails = true;
                }
                break;
            case 'yesterday':
                let yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                if(currentData < yesterday) {
                    let error = {};
                    error[key] = `The ${key} must be after yesterday.`;
                    this.errors.push(error);
                    this.isFails = true;
                }
                break;
            case 'tomorrow':
                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                if(currentData < tomorrow) {
                    let error = {};
                    error[key] = `The ${key} must be after tomorrow.`;
                    this.errors.push(error);
                    this.isFails = true;
                }
                break;
            default:
                let optionDate = new Date(options);
                if(currentData < optionDate) {
                    let error = {};
                    error[key] = `The ${key} must be after ${options}.`;
                    this.errors.push(error);
                    this.isFails = true;
                }
                break;
        }
    }

    // Field under validation must be entirely alphabetics characters
    alpha(key) {
        let pattern = /^[a-zA-Z]+$/i;
        if (!pattern.test(this.data[key])) {
            let error = {};
            error[key] = `The ${key} must be an alphabetic characters`;
            this.errors.push(error);
            this.isFails = true;
        }
    }

    // Field under validation must be an array instance type
    array(key) {

    }

    // Field under validation must be a value before a given value
    before(key, options) {
        let currentData = new Date(this.data[key]);
        switch(options) {
            case 'today':
                let today = new Date();
                if(currentData >= today) {
                    let error = {};
                    error[key] = `The ${key} must be before today.`;
                    this.errors.push(error);
                    this.isFails = true;
                }
                break;
            case 'yesterday':
                let yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                if(currentData >= yesterday) {
                    let error = {};
                    error[key] = `The ${key} must be before yesterday.`;
                    this.errors.push(error);
                    this.isFails = true;
                }
                break;
            case 'tomorrow':
                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                if(currentData >= tomorrow) {
                    let error = {};
                    error[key] = `The ${key} must be before tomorrow.`;
                    this.errors.push(error);
                    this.isFails = true;
                }
                break;
            default:
                let optionDate = new Date(options);
                if(currentData >= optionDate) {
                    let error = {};
                    error[key] = `The ${key} must be before ${options}.`;
                    this.errors.push(error);
                    this.isFails = true;
                }
                break;
        }
    }

    // Field under validation must be a value before or equal a given value
    beforeOrEqual(key, options) {
        let currentData = new Date(this.data[key]);
        switch(options) {
            case 'today':
                let today = new Date();
                if(currentData > today) {
                    let error = {};
                    error[key] = `The ${key} must be before today.`;
                    this.errors.push(error);
                    this.isFails = true;
                }
                break;
            case 'yesterday':
                let yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                if(currentData > yesterday) {
                    let error = {};
                    error[key] = `The ${key} must be before yesterday.`;
                    this.errors.push(error);
                    this.isFails = true;
                }
                break;
            case 'tomorrow':
                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                if(currentData > tomorrow) {
                    let error = {};
                    error[key] = `The ${key} must be before tomorrow.`;
                    this.errors.push(error);
                    this.isFails = true;
                }
                break;
            default:
                let optionDate = new Date(options);
                if(currentData > optionDate) {
                    let error = {};
                    error[key] = `The ${key} must be before ${options}.`;
                    this.errors.push(error);
                    this.isFails = true;
                }
                break;
        }
    }

    // Field under validation must be between min and max received in parameters
    between(key, options) {
        let optionValue = (options.replace(/\s/g, '')).split(',');
        if(optionValue.length != 2) {
            let error = {};
            error[key] = `Please check your rules for between parameters.`;
            this.errors.push(error);
            this.isFails = true;
            return;
        }

        if(optionValue[0] > optionValue[1]) {
            let error = {};
            error[key] = `Please input correct format of parameters.`;
            this.errors.push(error);
            this.isFails = true;
            return;
        }

        if(this.data[key] > optionValue[1] && this.data[key] < optionValue[0]) {
        } else {
            let error = {};
            error[key] = `The ${key} must be between ${optionValue[0]} and ${optionValue[1]}.`;
            this.errors.push(error);
            this.isFails = true;
            return;
        }
    }

    // Field under validation must be a
    // 1. boolean instance or
    // 2. string '1' or '0' or
    // 3. integer 1 or 0
    boolean(key) {
        let validInput = [true, false, '1', '0', 1, 0];
        let anyValidInput = false;
        for(v in validInput) {
            if(this.data[key] == v) {
                anyValidInput = true;
            }
        }

        if(!anyValidInput) {
            let error = {};
            error[key] = `The ${key} must be a boolean`;
            this.errors.push(error);
            this.isFails = true;
        }
    }

    // Field under validation must be a valid date
    date(key) {

    }

    // Field under validation must be a number with specific length
    digits(key, options) {
        if(isNaN(this.data[key])) {
            let error = {};
            error[key] = `The ${key} must be a valid number`;
            this.errors.push(error);
            this.isFails = true;
            return;
        }

        options = (options.replace(/\s/g, ''));
        if(this.data[key].length != options) {
            let error = {};
            error[key] = `The ${key} must be with a length of ${options}`;
            this.errors.push(error);
            this.isFails = true;
        }
    }

    // Field under validation must be a number with length between min and max paramters
    digitsBetween(key, options) {

    }

    email(key) {
        let pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!pattern.test(this.data[key])) {
            let error = {};
            error[key] = `The ${key} must be a valid email`;
            this.errors.push(error);
            this.isFails = true;
        }
    }

    exists(key, options) {

    }

    image(key) {

    }

    in(key, options) {
        options = (options.replace(/\s/g, ''));
        let isFound = false;
        for(let option of options.split(',')) {
            if(this.data[key] == option) {
                isFound = true;
            }
        }

        if(!isFound) {
            let error = {};
            error[key] = `The ${key} must be any options between ${options}`;
            this.errors.push(error);
            this.isFails = true;
        }
    }

    integer(key) {
        if(isNaN(this.data[key])) {
            let error = {};
            error[key] = `The ${key} must be a valid number`;
            this.errors.push(error);
            this.isFails = true;
            return;
        }

        if(this.data[key] % 1 != 0) {
            let error = {};
            error[key] = `The ${key} must be an integer`;
            this.errors.push(error);
            this.isFails = true;
        }
    }

    max(key, max) {
        max = (max.replace(/\s/g, ''));
        if(isNaN(max)) {
            let error = {};
            error[key] = `The ${key} must be a valid number`;
            this.errors.push(error);
            this.isFails = true;
            return;
        }

        switch(typeof(this.data[key])) {
            case 'string':
                if(this.data[key].length > max) {
                    let error = {};
                    error[key] = `The ${key} length more than ${max}`;
                    this.errors.push(error);
                    this.isFails = true;
                }
                break;
            case 'number':
                if(this.data[key] > max) {
                    let error = {};
                    error[key] = `The ${key} more than ${max}`;
                    this.errors.push(error);
                    this.isFails = true;
                }
                break;
            default:
                let error = {};
                error[key] = `The ${key} type is unknown`;
                this.errors.push(error);
                this.isFails = true;
                break;
        }
    }

    mimetypes(key, type) {

    }

    mimes(key, type) {

    }

    min(key, min) {
        min = (min.replace(/\s/g, ''));
        if(isNaN(min)) {
            let error = {};
            error[key] = `The ${key} must be a valid pattern`;
            this.errors.push(error);
            this.isFails = true;
            return;
        }

        switch(typeof(this.data[key])) {
            case 'string':
                if(this.data[key].length < min) {
                    let error = {};
                    error[key] = `The ${key} length more than ${min}`;
                    this.errors.push(error);
                    this.isFails = true;
                }
                break;
            case 'number':
                if(this.data[key] < min) {
                    let error = {};
                    error[key] = `The ${key} more than ${min}`;
                    this.errors.push(error);
                    this.isFails = true;
                }
                break;
            default:
                let error = {};
                error[key] = `The ${key} type is unknown`;
                this.errors.push(error);
                this.isFails = true;
                break;
        }
    }

    notIn(key, options) {
        options = (options.replace(/\s/g, ''));
        let isFound = false;
        for(let option of options.split(',')) {
            if(this.data[key] == option) {
                isFound = true;
            }
        }

        if(isFound) {
            let error = {};
            error[key] = `The ${key} must not be any options between ${options}`;
            this.errors.push(error);
            this.isFails = true;
        }
    }

    regex(key, pattern) {
        if (!pattern.test(this.data[key])) {
            let error = {};
            error[key] = `The ${key} must be a valid pattern`;
            this.errors.push(error);
            this.isFails = true;
        }
    }

    required(key) {
        if(typeof(this.data[key]) === 'undefined' || !this.data[key] || this.data[key] == '') {
            let error = {};
            error[key] = `The ${key} is required`;
            this.errors.push(error);
            this.isFails = true;
        }
    }

    same(key, otherField) {
        let optionValue = (otherField.replace(/\s/g, ''));
        if(typeof(this.data[optionValue]) === 'undefined') {
            let error = {};
            error[key] = `The ${key} must be supplied`;
            this.errors.push(error);
            this.isFails = true;
        } else if(this.data[optionValue] != this.data[key]){
            let error = {};
            error[key] = `The ${key} must be the same value as ${otherField}`;
            this.errors.push(error);
            this.isFails = true;
        }
    }

    slugify(key) {
        let pattern = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/;
        if (!pattern.test(this.data[key])) {
            let error = {};
            error[key] = `The ${key} must be a valid slug`;
            this.errors.push(error);
            this.isFails = true;
        }
    }

    unique(key, options) {

    }
}

module.exports = Validator;
