'use strict';

class Validator {
    constructor(data, rules) {
        this.data = data;
        this.rules = rules;
        this.isFails = true;
        this.errors = [];
    }

    validate() {
        for (let rule in this.rules) {
            if((this.data).hasOwnProperty(rule)) {
                for(let r of (this.rules[rule]).split('|')) {
                    this[r](rule);
                }
                //console.log(rule, this.data[rule]);
            } else {
                // put the error directly because the field is not present but show the corrent validation

            }
        }
    }

    required(rule) {
        console.log(rule);
    }
}

module.exports = Validator;
