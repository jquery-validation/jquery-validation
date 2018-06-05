/**
 * 条件验证器，可根据条件验证多个规则
 * 
 * $(element).rules("add", {when: [{
 * 		min: 0,
 * 		email: true,
 * 		required: true,
 * 		messages: {
 * 			min: "the value min 0",
 * 			// 其他验证器的消息为默认值
 * 		},
 * 		when: function(){
 * 			if(test){
 * 				return true;
 * 			}
 * 			return false;
 * 		},
 * },{
 * 		min: 100,
 * 		email: false,
 * 		required: false,
 * 		messages: {
 * 			min: "the value min 10",
 * 			// 其他验证器的消息为默认值
 * 		},
 * 		when: function(){
 * 			if(test){
 * 				return false;
 * 			}
 * 			return true;
 * 		},
 * }]});
 * 
 * @param array
 *            options [{min: {}, ...},{},{}]
 */
$.validator.addMethod("when", function(value, element, options) {

	if ($.isArray(options) == false) {
		console.error("validator “when” options must be a Array");
		return false;
	}

	var context = this;

	var valid = true, validator = this, errorList = [];

	for (var i = 0; i < options.length; i++) {

		if (!options[i].when) {
			continue;
		}

		var when = options[i].when;

		if ($.isFunction(when) == false) {
			// 动态创建函数
			eval("when = " + when);
		}

		if ($.isFunction(when) == false) {
			console.error("validator “when” options.when must be a function");
			return false;
		}

		var rules = {};
		var messages = options[i].messages;

		for ( var method in options[i]) {
			if (method != "messages" && method != "when") {
				rules[method] = options[i][method];
			}
		}

		// 当when返回true这进行验证
		if (when.call(value, element)) {
			valid = this.element(element, rules, messages) && valid;
			if (!valid) {
				// 动态修改“when”的 message
				this.settings.messages[element.name]["when"] = this.errorMap[element.name];
				errorList = errorList.concat(this.errorList);
				this.errorList = errorList;
				break;
			}
		}
	}

	return valid;
});