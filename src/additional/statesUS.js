jQuery.validator.addMethod("stateUS", function(value, element) {
	return this.optional(element) || /^(?:A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])*$/.test(value);
}, "The specified US State is invalid");
