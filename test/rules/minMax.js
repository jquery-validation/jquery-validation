module( "Min/Max" );

test("Min and Max type absent set by attributes greater", function() {
	var form = $("#ranges"),
		name = $("#rangeAbsentInvalidGreater"),
		label;

	form.validate();
	form.get(0).reset();
	name.valid();

	label = $("#ranges label");
	equal( label.text(), "Please enter a value less than or equal to 200.", "Correct error label" );
});

test("Min and Max type absent set by attributes less", function() {
	var form = $("#ranges"),
		name = $("#rangeAbsentInvalidLess"),
		label;

	form.validate();
	form.get(0).reset();
	name.valid();

	label = $("#ranges label");
	equal( label.text(), "Please enter a value greater than or equal to 200.", "Correct error label" );
});

test("Min and Max type absent set by attributes valid", function() {
	var form = $("#ranges"),
		name = $("#rangeAbsentValid"),
		label;

	form.validate();
	form.get(0).reset();
	name.valid();

	label = $("#ranges label");
	equal( label.text(), "", "Correct error label" );
});

test("Min and Max range set by attributes valid", function() {
	//
	// cannot test for overflow:
	// When the element is suffering from an underflow,
	// the user agent must set the element"s value to a valid
	// floating-point number that represents the minimum.
	// http://www.w3.org/TR/html5/forms.html#range-state-%28type=range%29
	//
	var form = $("#ranges"),
		name = $("#rangeRangeValid"),
		label;

	form.validate();
	form.get(0).reset();
	name.valid();

	label = $("#ranges label");
	equal( label.text(), "", "Correct error label" );
});


test("Min and Max number set by attributes valid", function() {
	var form = $("#ranges"),
		name = $("#rangeNumberValid"),
		label;

	form.validate();
	form.get(0).reset();
	name.valid();

	label = $("#ranges label");
	equal( label.text(), "", "Correct error label" );
});


test("Min and Max number set by attributes greater", function() {
	var form = $("#ranges"),
		name = $("#rangeNumberInvalidGreater"),
		label;

	form.validate();
	form.get(0).reset();
	name.valid();

	label = $("#ranges label");
	equal( label.text(), "Please enter a value less than or equal to 200.", "Correct error label" );
});


test("Min and Max number set by attributes less", function() {
	var form = $("#ranges"),
		name = $("#rangeNumberInvalidLess"),
		label;

	form.validate();
	form.get(0).reset();
	name.valid();

	label = $("#ranges label");
	equal( label.text(), "Please enter a value greater than or equal to 50.", "Correct error label" );
});

test("Rules allowed to have a value of zero invalid", function() {
	var form = $("#ranges"),
		name = $("#rangeMinZeroInvalidLess"),
		label;

	form.validate();
	form.get(0).reset();
	name.valid();

	label = $("#ranges label");
	equal( label.text(), "Please enter a value greater than or equal to 0.", "Correct error label" );
});

test("Rules allowed to have a value of zero valid equal", function() {
	var form = $("#ranges"),
		name = $("#rangeMinZeroValidEqual"),
		label;

	form.validate();
	form.get(0).reset();
	name.valid();

	label = $("#ranges label");
	equal( label.text(), "", "Correct error label" );
});

test("Rules allowed to have a value of zero valid greater", function() {
	var form = $("#ranges"),
		name = $("#rangeMinZeroValidGreater"),
		label;

	form.validate();
	form.get(0).reset();
	name.valid();

	label = $("#ranges label");
	equal( label.text(), "", "Correct error label" );
});

test("Min and Max strings set by attributes valid", function() {
	var form = $("#ranges"),
		name = $("#rangeTextValid"),
		label;

	form.validate();
	form.get(0).reset();
	name.valid();

	label = $("#ranges label");
	equal( label.text(), "", "Correct error label" );
});

test("Min date set by attribute", function() {
	var form = $("#rangesMinDateInvalid"),
		name = $("#minDateInvalid"),
		label;

	form.validate();
	form.get(0).reset();
	name.valid();

	label = $("#rangesMinDateInvalid label");
	equal( label.text(), "Please enter a value greater than or equal to 2012-12-21.", "Correct error label" );
});

test("Max date set by attribute", function() {
	var form = $("#ranges"),
		name = $("#maxDateInvalid"),
		label;

	form.validate();
	form.get(0).reset();
	name.valid();

	label = $("#ranges label");
	equal( label.text(), "Please enter a value less than or equal to 2012-12-21.", "Correct error label" );
});

test("Min and Max date set by attributes greater", function() {
	var form = $("#ranges"),
		name = $("#rangeDateInvalidGreater"),
		label;

	form.validate();
	form.get(0).reset();
	name.valid();

	label = $("#ranges label");
	equal( label.text(), "Please enter a value less than or equal to 2013-01-21.", "Correct error label" );
});

test("Min and Max date set by attributes less", function() {
	var form = $("#ranges"),
		name = $("#rangeDateInvalidLess"),
		label;

	form.validate();
	form.get(0).reset();
	name.valid();

	label = $("#ranges label");
	equal( label.text(), "Please enter a value greater than or equal to 2012-11-21.", "Correct error label" );
});

test("Min date set by attribute valid", function() {
	var form = $("#rangeMinDateValid"),
		name = $("#minDateValid"),
		label;

	form.validate();
	form.get(0).reset();
	name.valid();

	label = $("#rangeMinDateValid label");
	equal( label.text(), "", "Correct error label" );
});

test("Max date set by attribute valid", function() {
	var form = $("#ranges"),
		name = $("#maxDateValid"),
		label;

	form.validate();
	form.get(0).reset();
	name.valid();

	label = $("#ranges label");
	equal( label.text(), "", "Correct error label" );
});

test("Min and Max date set by attributes valid", function() {
	var form = $("#ranges"),
		name = $("#rangeDateValid"),
		label;

	form.validate();
	form.get(0).reset();
	name.valid();

	label = $("#ranges label");
	equal( label.text(), "", "Correct error label" );
});

test("Min and Max strings set by attributes greater", function() {
	var form = $("#ranges"),
		name = $("#rangeTextInvalidGreater"),
		label;

	form.validate();
	form.get(0).reset();
	name.valid();

	label = $("#ranges label");
	equal( label.text(), "Please enter a value less than or equal to 200.", "Correct error label" );
});

test("Min and Max strings set by attributes less", function() {
	var form = $("#ranges"),
		name = $("#rangeTextInvalidLess"),
		label;

	form.validate();
	form.get(0).reset();
	name.valid();

	label = $("#ranges label");
	equal( label.text(), "Please enter a value greater than or equal to 200.", "Correct error label" );
});
