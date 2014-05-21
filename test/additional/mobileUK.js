module("mobileUK");

test("mobileUK", function() {
	var method = methodTest("mobileUK");
	ok( method( "07134234323" ), "Valid UK Mobile Number" );
	ok( method( "07334234323" ), "Valid UK Mobile Number" );
	ok( method( "07624234323" ), "Valid UK Mobile Number" );
	ok( method( "07734234323" ), "Valid UK Mobile Number" );
	ok( method( "+447134234323" ), "Valid UK Mobile Number" );
	ok( method( "+447334234323" ), "Valid UK Mobile Number" );
	ok( method( "+447624234323" ), "Valid UK Mobile Number" );
	ok( method( "+447734234323" ), "Valid UK Mobile Number" );
	ok(!method( "07034234323" ), "Invalid UK Mobile Number" );
	ok(!method( "0753423432" ), "Invalid UK Mobile Number" );
	ok(!method( "07604234323" ), "Invalid UK Mobile Number" );
	ok(!method( "077342343234" ), "Invalid UK Mobile Number" );
	ok(!method( "044342343234" ), "Invalid UK Mobile Number" );
	ok(!method( "+44753423432" ), "Invalid UK Mobile Number" );
	ok(!method( "+447604234323" ), "Invalid UK Mobile Number" );
	ok(!method( "+4477342343234" ), "Invalid UK Mobile Number" );
	ok(!method( "+4444342343234" ), "Invalid UK Mobile Number" );
});
