QUnit.test("lettersonlyCL", function (assert) {
    var valid_list = ["Hola Mundo", "El Ñandú es un ave que no vuela", "O'Higgins no es el Padre de la Patria"];
    var non_valid_list = ["¡Hola mundo!", "¿Cómo estás?", "Me debes $1.000"]
    var method = methodTest("lettersonlyCL");
    for (var i = 0; i < valid_list.length; i++) {
        assert.ok(method(valid_list[i]), valid_list[i] + " is a valid string");
    }
    for (i = 0; i < non_valid_list.length; i++) {
        assert.ok(method(non_valid_list[i]), non_valid_list[i] + " is not a valid string");
    }
});