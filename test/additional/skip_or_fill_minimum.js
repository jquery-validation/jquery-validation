module("skip_or_fill_minimum");

function fillFormWithValuesAndExpect(formSelector, inputValues, expected) {
	var i, actual;

	for (i = 0; i < inputValues.length; i++) {
		$(formSelector + " input:eq(" + i + ")").val(inputValues[i]);
	}
	actual = $(formSelector).valid();
	equal(actual, expected, $.validator.format("Filled inputs of form '{0}' with {1} values ({2})", formSelector, inputValues.length, inputValues.toString()));
}

test("skip_or_fill_minimum", function() {
	$("#productInfo").validate({
		rules: {
			partnumber:  {skip_or_fill_minimum: [2,".productInfo"]},
			description: {skip_or_fill_minimum: [2,".productInfo"]},
			color:       {skip_or_fill_minimum: [2,".productInfo"]}
		}
	});

	fillFormWithValuesAndExpect("#productInfo", [], true);
	fillFormWithValuesAndExpect("#productInfo", [123], false);
	fillFormWithValuesAndExpect("#productInfo", [123, "widget"], true);
	fillFormWithValuesAndExpect("#productInfo", [123, "widget", "red"], true);
});

test("skip_or_fill_minimum preserve other rules", function() {
	$("#productInfo").validate({
		rules: {
			partnumber:  {skip_or_fill_minimum: [2,".productInfo"]},
			description: {skip_or_fill_minimum: [2,".productInfo"]},
			color:       {skip_or_fill_minimum: [2,".productInfo"]},
			supplier: {required: true}
		}
	});

	fillFormWithValuesAndExpect("#productInfo", [], false);
	fillFormWithValuesAndExpect("#productInfo", ["", "", "", "Acme"], true);
	fillFormWithValuesAndExpect("#productInfo", [123, "", "", "Acme"], false);
	fillFormWithValuesAndExpect("#productInfo", [123, "widget", "", "Acme"], true);
	fillFormWithValuesAndExpect("#productInfo", [123, "widget", "red", "Acme"], true);
});
