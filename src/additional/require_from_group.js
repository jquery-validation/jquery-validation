/*
 * Lets you say "at least X inputs that match selector Y must be filled."
 *
 * The end result is that neither of these inputs:
 *
 *  <input class="productinfo" name="partnumber">
 *  <input class="productinfo" name="description">
 *
 *  ...will validate unless at least one of them is filled.
 *
 * partnumber:  {require_from_group: [1,".productinfo"]},
 * description: {require_from_group: [1,".productinfo"]}
 *
 */
jQuery.validator.addMethod("require_from_group", function (value, element, options) {
    var validator = this;
    var minRequired = options[0];
    var selector = options[1];
    var validOrNot = jQuery(selector, element.form).filter(function () {
        return validator.elementValue(this);
    }).length >= minRequired;

    // remove all events in namespace upload

    jQuery(selector, element.form).off('.require_from_group');

    if (this.settings.onkeyup) {
        jQuery(selector, element.form).on({
            'keyup.require_from_group': function (e) {
                jQuery(selector, element.form).valid();
            }
        });
    }
    if (this.settings.onfocusin) {
        jQuery(selector, element.form).on({
            'focusin.require_from_group': function (e) {
                jQuery(selector, element.form).valid();
            }
        });
    }
    if (this.settings.click) {
        jQuery(selector, element.form).on({
            'click.require_from_group': function (e) {
                jQuery(selector, element.form).valid();
            }
        });
    }
    if (this.settings.onkeyup) {
        jQuery(selector, element.form).on({
            'keyup.require_from_group': function (e) {
                jQuery(selector, element.form).valid();
            }
        });
    }

    return validOrNot;
}, jQuery.format("Please fill at least {0} of these fields."));

