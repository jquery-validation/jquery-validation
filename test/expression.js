module("expression");

test("expression: :blank", function() {
	var e = $("#lastname")[0];
	equal( 1, $(e).filter(":blank").length );
	e.value = " ";
	equal( 1, $(e).filter(":blank").length );
	e.value = "   ";
	equal( 1, $(e).filter(":blank").length );
	e.value= " a ";
	equal( 0, $(e).filter(":blank").length );
});

test("expression: :filled", function() {
	var e = $("#lastname")[0];
	equal( 0, $(e).filter(":filled").length );
	e.value = " ";
	equal( 0, $(e).filter(":filled").length );
	e.value = "   ";
	equal( 0, $(e).filter(":filled").length );
	e.value= " a ";
	equal( 1, $(e).filter(":filled").length );
});

test("expression: :unchecked", function() {
	var e = $("#check2")[0];
	equal( 1, $(e).filter(":unchecked").length );
	e.checked = true;
	equal( 0, $(e).filter(":unchecked").length );
	e.checked = false;
	equal( 1, $(e).filter(":unchecked").length );
});
