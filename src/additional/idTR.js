/*
 * Returns true, if the value is a well formatted turkish identification number (T.C. Kimlik No).
 *
 * Better to use with minlength, maxlength, digits.
 *
 * Example: tcnoInputName: {minlength: 11, maxlength: 11, digits: true, idTR: true}
 *
 */
$.validator.addMethod("idTR", function(value, element) {
    var d = value.split(""), t = 0, e = 0, o = 0, i;
    for (i = 0; i < 9; i++) {
        n = parseInt(d[i], 10);
        t += n;
        if (i % 2 === 1) {
            e += n;
        } else {
            o += n;
        }
    }
    return this.optional(element) || !(!/^[1-9][0-9]{10}$/.test(value) || ( (t + parseInt(d[9], 10)) % 10 !== d[10]) || (o * 7 - e) % 10 !== d[9]);
}, $.validator.messages.remote);
