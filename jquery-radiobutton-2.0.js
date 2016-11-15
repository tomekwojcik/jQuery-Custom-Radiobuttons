/**
 * jQuery custom radiobuttons
 * 
 * Copyright (c) 2010-2012 Tomasz Wójcik (bthlabs.pl)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @version 2.0
 * @category visual
 * @package jquery
 * @subpakage ui.checkbox
 * @author Tomasz Wójcik <labs@tomekwojcik.pl>
 */

/*
 * Edited by @joelthorner
 * jQuery corrections and prevent duplicate plugin instances
 */
(function() {
    jQuery.fn.radiobutton = function(options) {
        options = options || {};
        
    	var defaults = {
    		className: 'jquery-radiobutton',
    		checkedClass: 'jquery-radiobutton-on'
    	};
    	
    	var settings = jQuery.extend(defaults, options || {});
    	
    	return this.each(function() {
    	    var self = $(this);

            // prevent duplicate init of plugin in same node
            var data = self.data("radiobutton");
            if (!data){
               
                var replacement = jQuery(
                    '<div class="' + settings.className + '-wrapper">' +
                        '<a data-radiobutton="radiobutton-link" class="' + settings.className + '" href="#" name="' + self.attr('id') + '" rel="' + self.attr('name') + '"></a>' + 
                    '</div>'
                );

        	   self.data('radiobutton', 'radiobutton');

        		var element = jQuery('a', replacement);
        		
                if (self.attr('checked') === 'checked') {
                    element.addClass(settings.checkedClass);
                }
                
                element.on('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();

                    var input = jQuery('input#' + jQuery(this).attr('name'), replacement.parent());
                    
                    // original code
                    // if (input.attr('checked') === 'checked') {
                    // 	input.removeAttr('checked');
                    // } else {
                    // 	input.attr('checked', 'checked');
                    // }
                    // input.trigger('change');

                    // new code
                    input.click();
                    
                    return false;
                });
                
                self.on('change', function(event) {
                    var input = jQuery(this);
        			
                    jQuery('a[rel="' + input.attr('name') + '"].' + settings.checkedClass)
                        .removeClass(settings.checkedClass);
                    
                    // original code
                    // if (input.attr('checked') === 'checked') {
        			
                    // new code
                    if (input.prop('checked')) {
        				jQuery('a[name=' + input.attr('id') + ']', replacement.parent())
                            .addClass(settings.checkedClass);
        			} else {
        				jQuery('a[name=' + input.attr('id') + ']', replacement.parent())
                            .removeClass(settings.checkedClass);
        			}
                });
                
                self.css({ 
                    'position': 'absolute', 
                    'top': '-200px', 
                    'left': '-200px'
                }).before(replacement);

                replacement.parent()
                    .css('overflow', 'hidden');

            }
        });
    };
})();
