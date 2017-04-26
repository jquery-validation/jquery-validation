$.validator.addMethod("rib_fr_simple", function (value, element) {
        return this.optional(element) || /^[0-9]{5} - [0-9]{5} - [0-9a-zA-Z]{11} - [0-9]{2}$/i.test(value);
    }
//                , "Please enter a valid rib key" // do not uncomment if you want to use localization  
);