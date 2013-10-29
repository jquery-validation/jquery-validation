jQuery.validator.addMethod("cnpjBR", function(value, element, param) {

  var pos, i;

  // remove all non-digit values
  value = value.replace(/[^\d]+/g,'');

  // remove well-known invalid CPF values
  if (value.length !== 14 ||
    value === "00000000000000" || 
    value === "11111111111111" || 
    value === "22222222222222" || 
    value === "33333333333333" || 
    value === "44444444444444" || 
    value === "55555555555555" || 
    value === "66666666666666" || 
    value === "77777777777777" || 
    value === "88888888888888" || 
    value === "99999999999999")
    return false;

  // validates checksum for the digits
  var length = value.length - 2;
  var values = value.substring(0, length);
  var digits = value.substring(length);
  var total  = 0;

  pos = length - 7;
  for (i=length;i>=1;i--) {
    total += values.charAt(length - i) * pos--;
    if (pos < 2)
      pos = 9;
  }
  var result = total % 11 < 2 ? 0 : 11 - total % 11;
  if (result != digits.charAt(0))
    return false;

  // validates checksum for the digits
  var length = length + 1;
  var values = value.substring(0, length);
  var total  = 0;

  pos = length - 7;
  for (i=length;i>=1;i--) {
    total += values.charAt(length - i) * pos--;
    if (pos < 2)
      pos = 9;
  }
  result = total % 11 < 2 ? 0 : 11 - total % 11;
  if (result != digits.charAt(1))
      return false;

  return true;

}, 'Please enter a valid CNPJ number.');
