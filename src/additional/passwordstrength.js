$.validator.addMethod("pwcheck", function(value) {
   return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(value) // consists of only these
    },'Password should be 8 characters length and contain at least one uppercase,lowercase,digit and special character');
