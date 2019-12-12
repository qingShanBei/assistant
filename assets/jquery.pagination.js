/**
 * This jQuery plugin displays pagination links inside the selected elements.
 *
 * This plugin needs at least jQuery 1.4.2
 *
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 2.2
 * @param {int} maxentries Number of entries to paginate
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
(function($) {
    /**
     * @class Class for calculating pagination values
     */
    $.PaginationCalculator = function(maxentries, opts) {
        this.maxentries = maxentries;
        this.opts = opts;
    }
    $.extend($.PaginationCalculator.prototype, {
        /**
         * Calculate the maximum number of pages
         * @method
         * @returns {Number}
         */
        numPages : function() {
            return Math.ceil(this.maxentries / this.opts.items_per_page);
        },
        /**
         * Calculate start and end point of pagination links depending on
         * current_page and num_display_entries.
         * @returns {Array}
         */
        getInterval : function(current_page) {
            var ne_half = Math.floor(this.opts.num_display_entries / 2);
            var np = this.numPages();
            var upper_limit = np - this.opts.num_display_entries;
            var start = current_page > ne_half ? Math.max(Math.min(current_page - ne_half, upper_limit), 0) : 0;
            var end = current_page > ne_half ? Math.min(current_page + ne_half + (this.opts.num_display_entries % 2), np) : Math.min(this.opts.num_display_entries, np);
            return {
                start : start,
                end : end
            };
        }
    });

    // Initialize jQuery object container for pagination renderers
    $.PaginationRenderers = {}

    /**
     * @class Default renderer for rendering pagination links
     */
    $.PaginationRenderers.defaultRenderer = function(maxentries, opts) {
        this.maxentries = maxentries;
        this.opts = opts;
        this.pc = new $.PaginationCalculator(maxentries, opts);
    }

    $.extend($.PaginationRenderers.defaultRenderer.prototype, {
        /**
         * Helper function for generating a single link (or a span tag if it's the current page)
         * @param {Number} page_id The page id for the new item
         * @param {Number} current_page
         * @param {Object} appendopts Options for the new item: text and classes
         * @returns {jQuery} jQuery object containing the link
         */
        createLink : function(page_id, current_page, appendopts) {
            var lnk, np = this.pc.numPages();
            page_id = page_id < 0 ? 0 : (page_id < np ? page_id : np - 1);
            // Normalize page id to sane value
            appendopts = $.extend({
                text : page_id + 1,
                classes : ""
            }, appendopts || {});
            if (page_id == current_page) {
                lnk = $("<span class='current'>" + appendopts.text + "</span>");
            } else {
                lnk = $("<a>" + appendopts.text + "</a>").attr('href', this.opts.link_to.replace(/__id__/, page_id));
            }
            if (appendopts.classes) {
                lnk.addClass(appendopts.classes);
            }
            lnk.data('page_id', page_id);
            return lnk;
        },
        // Generate a range of numeric links
        appendRange : function(container, current_page, start, end, opts) {
            var i;
            for ( i = start; i < end; i++) {
                this.createLink(i, current_page, opts).appendTo(container);
            }
        },
        getLinks : function(current_page, eventHandler, goClickHandler) {
            var begin, end, interval = this.pc.getInterval(current_page), np = this.pc.numPages(), fragment = $("<div class='pagination'></div>");

            //Generate "First"-Link.Added by riiiqpl
            if (this.opts.first_show) {
                fragment.append(this.createLink(0, current_page, {
                    text : this.opts.first_text,
                    classes : "first"
                }));
            }

            // Generate "Previous"-Link
            if (this.opts.prev_text && (current_page > 0 || this.opts.prev_show_always)) {
                fragment.append(this.createLink(current_page - 1, current_page, {
                    text : this.opts.prev_text,
                    classes : "prev"
                }));
            }
            // Generate starting points
            if (interval.start > 0 && this.opts.num_edge_entries > 0) {
                end = Math.min(this.opts.num_edge_entries, interval.start);
                this.appendRange(fragment, current_page, 0, end, {
                    classes : 'sp'
                });
                if (this.opts.num_edge_entries < interval.start && this.opts.ellipse_text) {
                    jQuery("<span class='ellipse_text'>" + this.opts.ellipse_text + "</span>").appendTo(fragment);
                }
            }
            // Generate interval links
            this.appendRange(fragment, current_page, interval.start, interval.end);
            // Generate ending points
            if (interval.end < np && this.opts.num_edge_entries > 0) {
                if (np - this.opts.num_edge_entries > interval.end && this.opts.ellipse_text) {
                    jQuery("<span class='ellipse_text'>" + this.opts.ellipse_text + "</span>").appendTo(fragment);
                }
                begin = Math.max(np - this.opts.num_edge_entries, interval.end);
                this.appendRange(fragment, current_page, begin, np, {
                    classes : 'ep'
                });

            }
            // Generate "Next"-Link
            if (this.opts.next_text && (current_page < np - 1 || this.opts.next_show_always)) {
                fragment.append(this.createLink(current_page + 1, current_page, {
                    text : this.opts.next_text,
                    classes : "next"
                }));
            }

            //Generate "Last"-Link.Added by riiiqpl
            if (this.opts.last_show) {
                fragment.append(this.createLink(np, current_page, {
                    text : this.opts.last_text,
                    classes : "last"
                }));
            }

            //Generate "Go" input and button.Added by riiiqpl
            if (this.opts.go_show) {
                $("<span class='pagination_jump_text pagination_jump_text1'>到</span><input type='text' class='pagination_go_input' style='ime-mode:disabled;' /><span class='pagination_jump_text pagination_jump_text2'>页</span><a class='pagination_go_button' href='"+ this.opts.link_to +"'>" + this.opts.go_text + "</a>").appendTo(fragment);
                $(".pagination_go_input", fragment).keydown(function(e) {
                    var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
                    if (keyCode == 13) {//Enter
                        $(".pagination_go_button", fragment).click();
                    }
                }).keypress(function(e) {
                    var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;

                    if (keyCode == 8 || keyCode == 37 || keyCode == 39 || keyCode == 46) {//key:backspace left right delete is Allowed
                        return true;
                    }

                    if (keyCode < 48 || keyCode > 57) {
                        return false;
                    }
                    return true;
                });
                $(".pagination_go_input", fragment)[0].onpaste = function() {//No Paste for the Input
                    return false;
                };

                $(".pagination_go_button", fragment).click(goClickHandler);
            }
            $('a', fragment).click(eventHandler);
            return fragment;
        }
    });

    // Extend jQuery
    $.fn.pagination = function(maxentries, opts) {

        // Initialize options with default values
        opts = jQuery.extend({
            items_per_page : 10,
            num_display_entries : 11,
            current_page : 0,
            num_edge_entries : 1,
            link_to : "#",
            prev_text : "<",
            next_text : ">",
            ellipse_text : "...",
            prev_show_always : false,
            next_show_always : false,
            renderer : "defaultRenderer",
            load_first_page : false,

            go_text : "Go",
            go_show : true,
            invalidInput_text : "输入的不是有效页码",
            largerInput_text : "输入页面超过最大页码",
            first_show : false,
            last_show : false,
            first_text : "First",
            last_text : "Last",

            callback : function() {
                return false;
            }
        }, opts || {});

        var containers = this, renderer, links, current_page;

        /**
         * This is the event handling function for the pagination links.
         * @param {int} page_id The new page number
         */
        function paginationClickHandler(evt) {
            var links;
            var new_current_page = $(evt.target).data('page_id');

            if (new_current_page == undefined) {//because it maybe Go-button
                return null;
            }

            var continuePropagation = selectPage(new_current_page);
            if (!continuePropagation) {
                evt.stopPropagation();
            }
            return continuePropagation;
        }

        /**
         * This is the event handling function for the pagination Go-button.
         * Added by riiiqpl
         */
        function goClickHandler(e) {
            var newPage = parseInt($(".pagination_go_input", containers).val(), 10);
            if (!newPage || newPage < 1) {
                alert(opts.invalidInput_text);
                $(".pagination_go_input", containers).select();
                return false;
            }
            if (newPage > Math.ceil(maxentries / opts.items_per_page)) {
                alert(opts.largerInput_text);
                $(".pagination_go_input", containers).select();
                return false;
            }
            selectPage(newPage - 1);
        }

        /**
         * This is a utility function for the internal event handlers.
         * It sets the new current page on the pagination container objects,
         * generates a new HTMl fragment for the pagination links and calls
         * the callback function.
         */
        function selectPage(new_current_page) {
            // update the link display of a all containers
            containers.data('current_page', new_current_page);
            links = renderer.getLinks(new_current_page, paginationClickHandler, goClickHandler);
            containers.empty();
            links.appendTo(containers);

            if ($(".pagination_go_input", containers)[0]) {
                $(".pagination_go_input", containers).val(new_current_page + 1);
            }

            // call the callback and propagate the event if it does not return false
            var continuePropagation = opts.callback(new_current_page, containers);
            return continuePropagation;
        }

        // -----------------------------------
        // Initialize containers
        // -----------------------------------
        current_page = opts.current_page;
        containers.data('current_page', current_page);
        // Create a sane value for maxentries and items_per_page
        maxentries = (!maxentries || maxentries < 0) ? 1 : maxentries;
        opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0) ? 1 : opts.items_per_page;

        if (!$.PaginationRenderers[opts.renderer]) {
            throw new ReferenceError("Pagination renderer '" + opts.renderer + "' was not found in jQuery.PaginationRenderers object.");
        }
        renderer = new $.PaginationRenderers[opts.renderer](maxentries, opts);

        // Attach control events to the DOM elements
        var pc = new $.PaginationCalculator(maxentries, opts);
        var np = pc.numPages();
        containers.bind('setPage', {
            numPages : np
        }, function(evt, page_id) {
            if (page_id >= 0 && page_id < evt.data.numPages) {
                selectPage(page_id);
                return false;
            }
        });
        containers.bind('prevPage', function(evt) {
            var current_page = $(this).data('current_page');
            if (current_page > 0) {
                selectPage(current_page - 1);
            }
            return false;
        });
        containers.bind('nextPage', {
            numPages : np
        }, function(evt) {
            var current_page = $(this).data('current_page');
            if (current_page < evt.data.numPages - 1) {
                selectPage(current_page + 1);
            }
            return false;
        });

        // When all initialisation is done, draw the links
        links = renderer.getLinks(current_page, paginationClickHandler, goClickHandler);
        containers.empty();
        links.appendTo(containers);

        if (opts.go_show) {
            $(".pagination_go_input", containers).val(current_page + 1);
        }

        // call callback function
        if (opts.load_first_page) {
            opts.callback(current_page, containers);
        }
    } // End of $.fn.pagination block
})(jQuery);
