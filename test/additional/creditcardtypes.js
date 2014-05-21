module("creditcardtypes");

function testCardTypeByNumber(number, cardname, expected) {
	$("#cardnumber").val(number);
	var actual = $("#ccform").valid();
	equal(actual, expected, $.validator.format("Expect card number {0} to validate to {1}, actually validated to ", number, expected));
}

test("creditcardtypes, all", function() {
	$("#ccform").validate({
		rules: {
			cardnumber: {
				creditcard: true,
				creditcardtypes: {
					all: true
				}
			}
		}
	});

	testCardTypeByNumber( "4111-1111-1111-1111", "VISA", true );
	testCardTypeByNumber( "5111-1111-1111-1118", "MasterCard", true );
	testCardTypeByNumber( "6111-1111-1111-1116", "Discover", true );
	testCardTypeByNumber( "3400-0000-0000-009", "AMEX", true );

	testCardTypeByNumber( "4111-1111-1111-1110", "VISA", false );
	testCardTypeByNumber( "5432-1111-1111-1111", "MasterCard", false );
	testCardTypeByNumber( "6611-6611-6611-6611", "Discover", false );
	testCardTypeByNumber( "3777-7777-7777-7777", "AMEX", false );
});

test("creditcardtypes, visa", function() {
	$("#ccform").validate({
		rules: {
			cardnumber: {
				creditcard: true,
				creditcardtypes: {
					visa: true
				}
			}
		}
	});

	testCardTypeByNumber( "4111-1111-1111-1111", "VISA", true );
	testCardTypeByNumber( "5111-1111-1111-1118", "MasterCard", false );
	testCardTypeByNumber( "6111-1111-1111-1116", "Discover", false );
	testCardTypeByNumber( "3400-0000-0000-009", "AMEX", false );
});

test("creditcardtypes, mastercard", function() {
	$("#ccform").validate({
		rules: {
			cardnumber: {
				creditcard: true,
				creditcardtypes: {
					mastercard: true
				}
			}
		}
	});

	testCardTypeByNumber( "5111-1111-1111-1118", "MasterCard", true );
	testCardTypeByNumber( "6111-1111-1111-1116", "Discover", false );
	testCardTypeByNumber( "3400-0000-0000-009", "AMEX", false );
	testCardTypeByNumber( "4111-1111-1111-1111", "VISA", false );
});
