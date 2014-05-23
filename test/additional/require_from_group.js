module("require_from_group");

function fillFormWithValuesAndExpect(formSelector, inputValues, expected) {
	var i, actual;

	for (i = 0; i < inputValues.length; i++) {
		$(formSelector + " input:eq(" + i + ")").val(inputValues[i]);
	}
	actual = $(formSelector).valid();
	equal(actual, expected, $.validator.format("Filled inputs of form '{0}' with {1} values ({2})", formSelector, inputValues.length, inputValues.toString()));
}

test("require_from_group", function() {
	$("#productInfo").validate({
		rules: {
			partnumber: {require_from_group: [2,".productInfo"]},
			description: {require_from_group: [2,".productInfo"]},
			discount: {require_from_group: [2,".productInfo"]}
		}
	});

	fillFormWithValuesAndExpect("#productInfo", [], false);
	fillFormWithValuesAndExpect("#productInfo", [123], false);
	$("#productInfo input[type='checkbox']").attr("checked", "checked");
	fillFormWithValuesAndExpect("#productInfo", [123], true);
	$("#productInfo input[type='checkbox']").removeAttr("checked");
	fillFormWithValuesAndExpect("#productInfo", [123, "widget"], true);
	fillFormWithValuesAndExpect("#productInfo", [123, "widget", "red"], true);
	fillFormWithValuesAndExpect("#productInfo", [123, "widget", "red"], true);
});

test("require_from_group preserve other rules", function() {
	$("#productInfo").validate({
		rules: {
			partnumber: {require_from_group: [2,".productInfo"]},
			description: {require_from_group: [2,".productInfo"]},
			color: {require_from_group: [2,".productInfo"]},
			supplier: {required: true}
		}
	});

	fillFormWithValuesAndExpect("#productInfo", [], false);
	fillFormWithValuesAndExpect("#productInfo", [123], false);
	fillFormWithValuesAndExpect("#productInfo", [123, "widget"], false);
	fillFormWithValuesAndExpect("#productInfo", ["", "", "", "Acme"], false);
	fillFormWithValuesAndExpect("#productInfo", [123, "", "", "Acme"], false);
	fillFormWithValuesAndExpect("#productInfo", [123, "widget", "", "Acme"], true);
	fillFormWithValuesAndExpect("#productInfo", [123, "widget", "red", "Acme"], true);
});
