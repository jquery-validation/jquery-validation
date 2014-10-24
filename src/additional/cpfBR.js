/*
 * Brazillian CPF number (Cadastrado de Pessoas Físicas) is the equivalent of a Brazilian tax registration number.
 * CPF numbers have 11 digits in total: 9 numbers followed by 2 check numbers that are being used for validation.
 */
$.validator.addMethod("cpfBR", function(value) {
  var sum = 0,
    firstCN, secondCN, checkResult, i;

  firstCN = parseInt(value.substring(9, 10));
  secondCN = parseInt(value.substring(10, 11));

  checkResult = function(sum, cn) {
    var result = (sum * 10) % 11;
    if ((result == 10) || (result == 11)) {result = 0;}
    if (result != cn) {
      return false;
    }
    return true;
  };

  // Checking for dump data
  if (value == "" ||
    value == "00000000000" ||
    value == "11111111111" ||
    value == "22222222222" ||
    value == "33333333333" ||
    value == "44444444444" ||
    value == "55555555555" ||
    value == "66666666666" ||
    value == "77777777777" ||
    value == "88888888888" ||
    value == "99999999999"
  ) {
    return false;
  }

  // Step 1 - using first Check Number:
  for ( i = 1; i <= 9; i++ ) {
    sum = sum + parseInt(value.substring(i - 1, i)) * (11 - i);
  }

  // If first Check Number (CN) is valid, move to Step 2 - using second Check Number:
  if ( checkResult(sum, firstCN) ) {
    sum = 0;
    for ( i = 1; i <= 10; i++ ) {
      sum = sum + parseInt(value.substring(i - 1, i)) * (12 - i);
    }
    if ( checkResult(sum, secondCN) ) { // If CPF number is valid
      return true;
    } else { // If second Check Number (CN) number is NOT valid
      return false;
    }
  } else { // If first Check Number (CN) is NOT valid
    return false;
  }
}, "Please specify a valid CPF number");
