/*!
 * jQuery Validation extention Plugin @VERSION
 * @description
   extend the message shown on html tags
   eg. 
   <input type="text" class="required" data-message="the field is required" />
   <input type="text" class="required email" data-multi-message="{required: 'the filed is required, email: 'email is wrong'}" />
 * @author: yorsal | leyang@soocook.com | http://yorsal.com
 * @date: 2012.08.16
 */

(function() {
	jQuery.extend(jQuery.validator.prototype, {
		defaultMessage: function( element, method) {

			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customMetaMessage( element, method ),
				// title is never undefined, so handle empty string as undefined
				
				!this.settings.ignoreTitle && $(element).attr('data-message') || undefined,
	
				$.validator.messages[method],
			
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		},
		
		formatAndAdd: function( element, rule, message ) {
			if (!message){
				var message = this.defaultMessage( element, rule.method ),
				theregex = /\$?\{(\d+)\}/g;
				if ( typeof message == "function" ) {
					message = message.call(this, rule.parameters, element);
				} else if (theregex.test(message)) {
					message = jQuery.format(message.replace(theregex, '{$1}'), rule.parameters);
				}
			}
			
			
			this.errorList.push({
				message: message,
				element: element
			});

			this.errorMap[element.name] = message;
			this.submitted[element.name] = message;
		},
		
		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $(element).rules();
			var dependencyMismatch = false;
			for (var method in rules ) {
				var rule = { method: method, parameters: rules[method] };
				try {
					var result = $.validator.methods[method].call( this, element.value.replace(/\r/g, ""), element, rule.parameters );
				
					// if a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result == "dependency-mismatch" ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result == "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor(element) );
						return;
					}

					if( !result ) {
						
						var message;
						if ($(element).attr('data-multi-message')){
							var j = eval('(' + $(element).attr('data-multi-message') + ')');
							for(s in j){
								if (s === rule.method){
									message = j[s];
								}
							}
						}
						
						this.formatAndAdd( element, rule, message );

						return false;
					}
				} catch(e) {
					this.settings.debug && window.console && console.log("exception occured when checking element " + element.id
						 + ", check the '" + rule.method + "' method", e);
					throw e;
				}
			}
			if (dependencyMismatch)
				return;
			if ( this.objectLength(rules) )
				this.successList.push(element);
			return true;
		}
	});
})()
