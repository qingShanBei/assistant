/*!
 * tab 切换标签
 */
;(function () {
    'use strict';

    var Tab = function (element, options) {

        this.options = options;
        this.$element = $(element);

    }

    Tab.prototype.move = function () {

        var e = $.Event('tab.changing', {relatedTarget: this.$element});

        this.$element.trigger(e);

        if (e.isDefaultPrevented()) {
            return;
        }

        var that = this;

        var target = this.$element.siblings(this.options.slideClass);

        switch (this.options.action) {

            case 'slide': {

                if (target.is(':animated')) {
                    target.stop(true, true);
                }

                target.animate({

                    left: this.options.step * this.options.index

                }, 200, function () {

                    that.activeSelf(that.$element);

                    var e = $.Event('tab.changed', {relatedTarget: that.$element});

                    that.$element.trigger(e);

                });

            }
                break;

            case 'toggle': {

                target.css({
                    left: this.options.step * this.options.index
                });

                that.activeSelf(that.$element);

                var e = $.Event('tab.changed', {relatedTarget: that.$element});

                that.$element.trigger(e);
            }
        }

    };

    Tab.prototype.activeSelf = function ($ele) {

        if ($ele.hasClass(this.options.activeClassName)) {
            return;
        } else {
            $ele.siblings().removeClass(this.options.activeClassName).end().addClass(this.options.activeClassName);
        }
    };

    Tab.VERSION = '1.0.0';

    Tab.DEFAULTS = {
        duration: 400,
        slideClass: '.frame_tab_slide',
        step: 100,
        activeClassName: 'active'
    };

    function Plugin(opt) {

        return this.each(function () {

            var $this = $(this);

            var data = $this.data('frame.tab');

            var options = $.extend({}, Tab.DEFAULTS, opt);

            if (!data) {
                $this.data('frame.tab', (data = new Tab(this, options)));
            }

            data.move();

        });

    }

    var old = $.fn.tab;

    $.fn.tab = Plugin;
    $.fn.tab.Constructor = Tab;

    $.fn.tab.noConflict = function () {
        $.fn.tab = old;
        return this;
    }

    $(document).on('click.frame.tab', '[data-slide="tab"] .frame_tab_item', function () {
        var $this = $(this),
            action = $this.parent('[data-slide="tab"]').data('action');

        var actionAttr = action ? action : 'toggle';

        var options = {
            action: actionAttr,
            index: $this.index()
        };

        Plugin.call($this, options);

    });

})(jQuery);

/*! 新增tab **/
;(function () {
    //初始化
    $(document).ready(function () {
        var activeTd = $('.frame_tab_table td.active');
        var activeWidth = activeTd.width();
        activeTd.children('.frame_tab_arrow').css('left', (activeWidth - 4) / 2);
    });

    $(document).on('click', '.frame_tab_table td', function () {
        var $this = $(this);
        if ($this.hasClass('active')) {
            return;
        } else {
            $this.addClass('active').append('<div class="frame_tab_arrow" style="left:' + ($this.width() - 4) / 2 + 'px;"></div>').siblings('.active').removeClass('active').children('.frame_tab_arrow').remove();
        }
    });

    $(document).on('click', '.frame_tab_item2', function () {
        var $this = $(this);
        if ($this.hasClass('active')) {
            return false;
        }
        $(this).addClass('active').siblings().removeClass('active');
    });

})(jQuery, document);


;(function () {
    /*! 图片复选按钮 **/
    $(document).on('click', '.frame_checkbox_label,.frame_checkbox_only', function () {
        var $this = $(this);
        if ($this.attr('data-disabled') === 'true') {
            return;
        }
        $this.toggleClass('checked');
    });

    /*! 图片单选按钮 **/
    $(document).on('click', '.frame_radio_label,.frame_radio_only', function () {

        var $this = $(this);

        var e = $.Event('frame.radioChange');

        $this.trigger(e);

        if (e.isDefaultPrevented()) {
            return;
        }

        if ($this.attr('data-disabled') === 'true') {
            return;
        }
        if ($this.hasClass('checkded')) {
            return false;
        } else {
            if ($this.hasClass('frame_radio_label')) {
                $('.frame_radio_label[data-name="' + $this.attr('data-name') + '"]').removeClass('checked');
            } else {
                $('.frame_radio_only[data-name="' + $this.attr('data-name') + '"]').removeClass('checked');
            }
            $this.addClass('checked');
        }
    });
    /*! 切换按钮 **/
    $(document).on('click', '.frame_toggle_item_container', function () {
        var $this = $(this);
        if ($this.hasClass('active')) {
            return false;
        } else {
            $this.addClass('active').siblings('.frame_toggle_item_container').removeClass('active');
        }
    });

    /*! 添加联系人搜索框 **/
    $(document).on('keyup', '.frame_searchbar_input2', function () {
        var clearBtn = $(this).siblings('.frame_searchbar_clear_btn');
        $.trim(this.value) === '' ? clearBtn.addClass('hide') : clearBtn.removeClass('hide');
    });
    $(document).on('paste', '.frame_searchbar_input2', function () {
        $(this).siblings('.frame_searchbar_clear_btn').removeClass('hide');
    });
    $(document).on('focus', '.frame_searchbar_input2', function () {
        var $this = $(this),
            clearBtn = $this.siblings('.frame_searchbar_clear_btn'),
            hasValue = $this.siblings('.frame_searchbar_input2').data('frame.placeholder.has_value');
        if ($.trim(this.value) === '') {
            clearBtn.addClass('hide');
        } else if (hasValue) {
            clearBtn.removeClass('hide');
        }
    });
    $(document).on('click', '.frame_searchbar_clear_btn', function () {
        var input = $(this).siblings('.frame_searchbar_input2');
        input.val('');
        input.trigger('focus');
    });
})(jQuery, document);


/*!
*  placeholder插件
*  最后修改日期: 2016-06-16
*/
;(function ($) {
    'use strict';

    var Placeholder = function (element, options) {
        this.element = $(element);
        this.options = options;
    };

    Placeholder.VERSION = '1.0.0';

    Placeholder.DEFAULTS = {
        content: '请输入内容',
        colorBefore: '#cccccc',
        colorAfter: '#333333'
    };

    Placeholder.prototype.setTipsColor = function () {
        this.element.css('color', this.options.colorBefore);
    };

    Placeholder.prototype.setNormalColor = function () {
        this.element.css('color', this.options.colorAfter);
    };

    Placeholder.prototype.init = function () {
        this.element.css('color', this.options.colorBefore).val(this.options.content).data('frame.placeholder.has_value', false);
    };

    Placeholder.prototype.getColor = function () {

        var color = this.element.css('color');

        if (color.indexOf('rgb') != -1) {
            var rgb = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            var hex = function (x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            color = "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }

        if (color == this.options.colorBefore) {
            return 'before';
        } else if (color == this.options.colorAfter) {
            return 'after';
        }
    };

    Placeholder.prototype.load = function () {

        var $this = this.element;
        //init
        $this.css('color', this.options.colorBefore).val(this.options.content);

        $this.off('.frame.placeholder');
        $this.data('frame.placeholder.has_value', false);

        //set events
        var that = this;
        $this.on('focus.frame.placeholder', function () {
            if ($this.val() === that.options.content && that.getColor() === 'before') {
                $this.val('').css('color', that.options.colorAfter);
            }
        });
        $this.on('blur.frame.placeholder', function () {
            if ($.trim($this.val()) === '') {
                $this.css('color', that.options.colorBefore).val(that.options.content);
                $this.data('frame.placeholder.has_value', false);
            } else {
                $this.data('frame.placeholder.has_value', true);
            }
        });
        $this.on('keyup.frame.placeholder', function () {
            if ($.trim($this.val()) === '') {
                $this.data('frame.placeholder.has_value', false);
            } else {
                $this.data('frame.placeholder.has_value', true);
            }
        });
        $this.on('paste.frame.placeholder', function () {
            $this.trigger('focus');
        });
    };

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var options = $.extend({}, Placeholder.DEFAULTS, option);
            var data = $this.data('frame.placeholder');

            if (!data) {
                $this.data('frame.placeholder', (data = new Placeholder(this, options)));
                data['load']();
            } else {
                $this.data('frame.placeholder', (data = new Placeholder(this, options)));
                data['load']();
                //throw new Error('Can not set placeholder for a existing instance.');
            }
        });
    }

    var old = $.fn.placeholder;

    $.fn.placeholder = Plugin;
    $.fn.placeholder.Constructor = Placeholder;

    $.fn.placeholder.noConflict = function () {
        $.fn.placeholder = old;
        return this;
    }
})(jQuery);


/*!
* 下拉菜单交互
*/

$(function () {

    //通用下拉菜单

    //选择框点击
    $(document).on('click', '.frame_select_span', function () {
        $('.frame_select_span').removeClass('frame_select_slide');
        if ($(this).hasClass('disabled')) {
            return false;
        }
        var ul = $(this).next('.frame_select_ul'),
            spread = ul.css('display') == 'none' ? true : false;
        //input情况下的判断
        var iconSpan;
        $(this).is('input') ? iconSpan = $(this) : iconSpan = $(this).children('.frame_select_icon');
        $('.js_select_global_class').slideUp(200);
        $('.js_select_slide_icon').removeClass('js_select_slide_icon');
        $('.js_select_span_slide').removeClass('js_select_span_slide');
        if (spread) {
            ul.slideDown(200);
            $(this).addClass('frame_select_slide');
            iconSpan.addClass('js_select_slide_icon');
        } else {
            ul.slideUp(200);
            $(this).removeClass('frame_select_slide');
            iconSpan.removeClass('js_select_slide_icon');
        }
    });
    //下拉菜单点击
    $(document).on('click', '.frame_select_li', function () {
        var ul = $(this).closest('.frame_select_ul'),
            selectSpan = ul.prev('.frame_select_span');
        iconSpan = selectSpan.children('.frame_select_icon');
        iconSpan.removeClass('js_select_slide_icon');
        selectSpan.removeClass('frame_select_slide');
        //input情况下补充交互
        ul.prev('.frame_select_span').removeClass('js_select_slide_icon');
        ul.hide();
    });

    //空白处点击
    $(document).click(function (event) {

        event = event ? event : window.event;

        var obj = event.srcElement ? event.srcElement : event.target;
        //添加点击disabled input时候的判断
        if ($(obj).closest('.frame_select_wrapper').length === 0 || $(obj).attr('class') === 'frame_select_wrapper' || ($(obj).hasClass('frame_select_span') && $(obj).is('input') && $(obj).attr('disabled') == 'disabled')) {
            $('.js_select_global_class').slideUp(200);
            $('.frame_select_icon').removeClass('js_select_slide_icon');
            $('.frame_select_span').removeClass('frame_select_slide');
            //input情况添加交互
            $('input.frame_select_span').removeClass('js_select_slide_icon');
        }
    });
    //禁止选中
    $(document).on('selectstart', '.frame_select_span', function () {
        return false;
    });
});


/*! 
* 弹出层插件
* 最后修改时间 2017-10-23
*/
;(function ($) {
    'use strict';
    var Modal = function (element, options) {
        this.options = options;
        this.$body = $(document.body);
        this.$element = $(element);
        this.$self = options.$self;
    }

    Modal.VERSION = '1.0.0';

    Modal.DEFAULTS = {
        mask: true,
        maskZIndex: 1000,
        duration: 200,
        footerHeight: 56,
        headerHeight: 48
    };

    Modal.prototype.bodyCtrl = function () {

        this.$body.css('overflow', 'hidden');
        //for ie7
        //$('html').css('overflow', 'hidden');

    };

    Modal.prototype.bodyFree = function () {
        if ($('.frame_mask').length === 0) {
            this.$body.css('overflow', 'auto');
            //for ie7
            //$('html').css('overflow', 'auto');
        }
    };

    Modal.prototype.handleOverHeight = function () {
        this.$element.addClass('frame_over_height');
    };

    Modal.prototype.clearOverHeight = function () {
        this.$element.removeClass('frame_over_height');
    };

    Modal.prototype.setHeight = function (h) {

        var _relatedTarget = this.$element.find('.modal_dialog');

        var overHeight = $(window).height() < h ? true : false;

        var overWidth = $(window).width() < $(_relatedTarget).width() ? true : false;

        var position = {};

        _relatedTarget.height(h);

        if (overHeight) {
            position.top = 0;
            //弹出层超高处理
            this.handleOverHeight();
        } else {
            position.top = ($(window).height() - h) / 2;
        }

        if (overWidth) {
            position.left = 0;
        } else {
            position.left = ($(window).width() - $(_relatedTarget).width()) / 2;
        }

        // #set .modal_content_body height
        var $dialog = this.$element.children('.modal_dialog');
        var dialogHeight = h;
        var dialogContent = $dialog.children('.modal_content');

        if (dialogContent.children('.modal_content_footer').length === 0) {

            if (!dialogContent.children('.modal_content_body').attr('style')) {
                dialogContent.children('.modal_content_body').height(dialogHeight - this.options.footerHeight);
            }

        } else {

            dialogContent.children('.modal_content_body').height(dialogHeight - this.options.footerHeight - this.options.headerHeight);
        }

        //_relatedTarget.css({ opacity: 1 }).css(position);
        _relatedTarget.css(position);
    };

    Modal.prototype.show = function () {

        var that = this;

        var _relatedTarget = this.$element.find('.modal_dialog');

        //for ie7
        //var style = _relatedTarget.children('.modal_border').attr('style');
        //_relatedTarget.children('.modal_border').attr('style', (style ? style : '') + '*height:' + (10 + _relatedTarget.height()) + 'px;');

        var e = $.Event('showing.modal', {

            relatedTarget: _relatedTarget,
            $self: that.$self

        });

        this.$element.trigger(e);

        if (e.isDefaultPrevented()) {
            return;
        }

        this.$body.addClass('modal_open');


        if (this.options.mask) {
            this.mask();
        }

        this.bodyCtrl();

        var overHeight = $(window).height() < $(_relatedTarget).height() ? true : false;
        var overWidth = $(window).width() < $(_relatedTarget).width() ? true : false;
        /*         if (overHeight) {
                    var position = {
                        marginTop: 20,
                        marginBottom: 20
                    };
                } else {
                    var position = {
                        marginTop: ($(window).height() - $(_relatedTarget).height()) / 2
                    };
                } */

        var position = {};

        if (overHeight) {
            position.top = 0;
            //弹出层超高处理
            this.handleOverHeight();
        } else {
            position.top = ($(window).height() - $(_relatedTarget).height()) / 2;
        }

        if (overWidth) {
            position.left = 0;
        } else {
            position.left = ($(window).width() - $(_relatedTarget).width()) / 2;
        }

        this.$element.css({

            zIndex: parseInt($('.frame_mask').last().css('z-index')) + 1

        }).show();

        // #show modal with animation
        _relatedTarget.removeClass('frame_modal_close').addClass('frame_modal_open');

        // #set .modal_content_body height
        var $dialog = this.$element.children('.modal_dialog');
        var dialogHeight = $dialog.height();
        var dialogContent = $dialog.children('.modal_content');

        if (dialogContent.children('.modal_content_footer').length === 0) {

            if (!dialogContent.children('.modal_content_body').attr('style')) {
                dialogContent.children('.modal_content_body').height(dialogHeight - this.options.headerHeight);
            }

        } else {

            dialogContent.children('.modal_content_body').height(dialogHeight - this.options.footerHeight - this.options.headerHeight);
        }

        //_relatedTarget.css({ opacity: 1 }).css(position);
        _relatedTarget.css(position);

        var e = $.Event('showed.modal', {
            relatedTarget: _relatedTarget,
            $self: that.$self
        });

        function triggerEvent() {
            that.$element.trigger(e);
        }

        setTimeout(triggerEvent, 300);

    };

    Modal.prototype.hide = function ($mask) {

        var that = this;

        var _relatedTarget = that.$element.find('.modal_dialog');

        var e = $.Event('hide.modal', {
            relatedTarget: _relatedTarget,
            $self: that.$self
        });

        this.$element.trigger(e);

        this.$body.removeClass('modal_open');

        function close() {
            if ($mask) {
                $mask.remove();
            }
            that.$element.hide();
            that.clearOverHeight();
            that.bodyFree();
        }

        _relatedTarget.removeClass('frame_modal_open').addClass('frame_modal_close');
        setTimeout(close, 300);

        /*
        if ($mask) {
            $mask.remove();
        }
        that.$element.hide();
        */
    };

    Modal.prototype.mask = function () {

        if ($('.frame_mask').length === 0) {

            $('<div class="frame_mask" style="z-index:' + this.options.maskZIndex + ';"></div>').appendTo(this.$body);

        } else {

            var newzIndex = parseInt($('.frame_mask').last().css('z-index')) + 2;

            $('<div class="frame_mask" style="z-index:' + newzIndex + ';"></div>').appendTo(this.$body);
        }

    };

    Modal.prototype.center = function ($ele) {

        if ($(window).height() > $ele.height()) {
            this.clearOverHeight();
            $ele.css({
                top: ($(window).height() - $ele.height()) / 2
            });
        } else {
            this.handleOverHeight();
            $ele.css({
                top: 20
            });
        }

        //
    };

    function Plugin($self) {

        return this.each(function () {

            var $this = $(this);

            var options = $.extend({}, Modal.DEFAULTS, {$self: $self});

            var data = new Modal(this, options);

            if (!$this.data('frame.modal')) {
                $this.data('frame.modal', data);
            }

            data.show();

            $('[data-close="modal"]', $this).off('click.frame.modal')
                .on('click.frame.modal', function () {

                    if (!$(this).hasClass('modal-disabled')) {
                        data.hide($('.frame_mask').last());
                    }

                });


            /*             $(window).on('resize.frame.modal', function() {
                            data.center($this.find('.modal_dialog'));
                        }); */

        });
    }

    var old = $.fn.modal;

    $.fn.modal = Plugin;
    $.fn.modal.Constructor = Modal;

    $.fn.modal.noConflict = function () {
        $.fn.modal = old;
        return this;
    };

    $(document).on('click.frame.modal', '[data-toggle="modal"]', function (e) {

        $(this).each(function () {

            var $this = $(this);

            var href = $this.attr('href');

            var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, '')));

            $target.addClass('modal');

            var option;

            if ($this.is('a')) {
                e.preventDefault();
            }

            if ($target.css('display') === 'none') {
                Plugin.call($target, $this);
            }

        });
    });

})(jQuery);

//---------------

;$(function () {

    function toggleChatBoard(ele) {
        var $this = ele;
        var target = $('.frame_chat_container');
        if (target.hasClass('passtive')) {
            $this.addClass('frame_chat_active');
            target.removeClass('passtive').slideDown(400);
        } else {
            $this.removeClass('frame_chat_active');
            target.addClass('passtive');
            if (target.is(':animated')) {
                target.stop(true, true);
            } else {
                target.slideUp(400);
            }
        }
    }

    $(document).on('click.frame.chatboard', '.frame_chat_menu', function (e) {
        toggleChatBoard($(this));
        e.stopPropagation();
    });

    $(document).on('click.frame.chatboard', '.frame_chat_close', function () {
        $('.frame_chat_menu').trigger('click.frame.chatboard');
    });

    $('.frame_chat_container').on('mouseover.frame.chatboard', function () {
        $(this).addClass('isover');
    });

    $('.frame_chat_container').on('mouseout.frame.chatboard', function () {
        $(this).removeClass('isover');
    });

    $(document).on('mouseup.frame.chatboard', '.frame_chat_menu', function (e) {
        e.stopPropagation();
    });

    $(document).on('mouseup.frame.charboard', function () {
        var target = $('.frame_chat_container');
        $('.frame_chat_menu').removeClass('frame_chat_active');
        if (!target.hasClass('isover')) {
            target.addClass('passtive');
            if (target.is(':animated')) {
                target.stop(true, true);
            } else {
                target.slideUp(400);
            }
        }
    });
});


/** 弹出层拖拽交互 */
$(function () {

    if ($('body').hasClass('frame_drag_flag')) {
        return false;
    } else {
        $('body').addClass('frame_drag_flag');
    }
    var xTemp, yTemp;
    var can_move = false;
    var getTop = function ($modal) {
        var zIndex;
        var max;
        $modal.parent().each(function () {
            if (zIndex) {
                var itemZIndex = $(this).css('z-index');
                if (itemZIndex > zIndex) {
                    zIndex = itemZIndex;
                    max = $(this).children('.modal_dialog');
                }
            } else {
                zIndex = $(this).css('z-index');
                max = $(this).children('.modal_dialog');
            }
        });
        return max;
    };

    $(document).on('dragstart', '.modal_dialog', function () {
        return false;
    });
    $(document).on('mousedown', '.modal_content_header,.modal_content_header_style2', function (event) {
        var $win = getTop($('.modal_dialog:visible'));
        can_move = true;
        $(this).css('cursor', 'move');
        var mx = event.pageX;
        var my = event.pageY;
        xTemp = mx - parseInt($win.css('left'));
        yTemp = my - parseInt($win.css('top'));
    });

    var page;
    /MSIE 8.0/.test(window.navigator.userAgent) ? page = document : page = window;

    $(page).mousemove(function (event) {
        if (can_move) {
            var $win = getTop($('.modal_dialog:visible'));
            var $window = $(window);
            var mx = event.pageX;
            var my = event.pageY;
            if (mx - xTemp > 0 && mx - xTemp < $window.width() - $win.width()) {
                $win.css('left', mx - xTemp);
            }
            else {
                can_move = false;
                $('.modal_content_header,.modal_content_header_style2').css('cursor', 'default');
            }
            if (my - yTemp > 0 && my - yTemp < $window.height() - $win.height()) {
                $win.css('top', my - yTemp);
            }
            else {
                can_move = false;
                $('.modal_content_header,.modal_content_header_style2').css('cursor', 'default');
            }
        }
    }).mouseup(function () {
        can_move = false;
        $('.modal_content_header,.modal_content_header_style2').css('cursor', 'default');
    });
});

/*!
 * 左侧菜单栏交互
 * 最后修改日期：2016-07-12
 */
;(function () {
    'use strict';

    var LeftMenu = function (element, options) {

        this.options = options;
        this.$element = $(element);

    }

    LeftMenu.VERSION = '1.0.0';

    LeftMenu.DEFAULTS = {};

    LeftMenu.prototype.clearActive = function ($menu) {

        $menu.find('.frame_lm_item,.frame_lm_sitem,.frame_lm_titem').removeClass('active');
    };

    LeftMenu.prototype.activeSelf = function ($ele, slide) {


        if (slide) {
            if ($ele.hasClass('menu_slide_up')) {

                $ele.removeClass('menu_slide_up').addClass('menu_slide_down').next('.frame_lm_secondary').show();

            } else if ($ele.hasClass('menu_slide_down')) {

                $ele.removeClass('menu_slide_down').addClass('menu_slide_up').next('.frame_lm_secondary').hide();
            }
        } else {
            $ele.addClass('active');

            var e = $.Event('selected.menu', {relatedTarget: this.$element});

            this.$element.trigger(e);

        }

    };

    LeftMenu.prototype.toggleThird = function ($secondary) {


        $secondary.next('.frame_lm_third').toggle();

    }

    LeftMenu.prototype.slide = function () {


    };

    function Plugin(opt) {

        return this.each(function () {

            var $this = $(this);

            var data = $this.data('frame.leftmenu');

            var options = $.extend({}, LeftMenu.DEFAULTS, opt);

            if (!data) {
                $this.data('frame.leftmenu', (data = new LeftMenu(this, options)));
            }

            if (options.menuType === 'secondary' || options.menuType === 'main' || options.menuType === 'third') {

                data.clearActive(options.menu);
                data.activeSelf($this);
            }

            if (options.menuType === 'slide') {

                data.activeSelf($this, true);

            }

            if (options.menuType === 'secondary') {

                data.toggleThird($this);

            }

        });

    }

    var old = $.fn.leftmenu;

    $.fn.leftmenu = Plugin;
    $.fn.leftmenu.Constructor = LeftMenu;

    $.fn.leftmenu.noConflict = function () {
        $.fn.leftmenu = old;
        return this;
    }

    $(document).on('click.frame.leftmenu', '[data-menu="left"] .frame_left_menu_js', function (e) {

        var $this = $(this);
        var $menu = $this.closest('[data-menu="left"]');
        var options;

        e.stopPropagation();

        if ($this.hasClass('frame_lm_sitem')) {

            options = {
                menuType: 'secondary',
                menu: $menu
            };

        } else if ($this.hasClass('frame_lm_item')) {

            options = {
                menuType: 'main',
                menu: $menu
            };

            if ($this.next('.frame_lm_secondary').length) {
                options = {
                    menuType: 'slide',
                    menu: $menu
                };
            }

        } else if ($this.hasClass('frame_lm_titem')) {

            options = {
                menuType: 'third',
                menu: $menu
            };

        } else {

            options = {
                menuType: 'slide',
                menu: $menu
            };
        }

        Plugin.call($(this), options);

    });

})(jQuery);


/*! 
* 鼠标经过二级菜单
* 最后修改时间 2016-05-25
*/
;(function ($) {

    'use strict';

    var Bmenu = function (element, option) {
        this.$element = $(element);
        this.options = $.extend({}, Bmenu.DEFAULTS, option);
    }

    Bmenu.VERSION = '1.0.0';

    Bmenu.DEFAULTS = {
        duration: 400,
        menuActiveClass: 'frame_menu_active'
    };

    Bmenu.prototype.activeMenu = function () {
        this.$element.addClass(this.options.menuActiveClass);
    };

    Bmenu.prototype.passiveMenu = function () {
        this.$element.removeClass(this.options.menuActiveClass);
    };

    Bmenu.prototype.showSecondary = function (secondary) {
        if (secondary.not(':animated')) {
            secondary.slideDown(this.options.duration);
        }
    };

    Bmenu.prototype.hideSecondary = function (secondary) {
        if (secondary.is(':animated')) {
            secondary.stop(true, true)
        }
        secondary.hide();
    };

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('frame.bmenu')
            if (!data) {
                $this.data('frame.bmenu', (data = new Bmenu(this, option)))
            }
            ;

            var secondary = $this.next('[data-menu="secondary"]');

            data.showSecondary(secondary);
            data.activeMenu();

            secondary.one('mouseenter.frame.bmenu', function () {
                $(this).show();
                data.activeMenu();
            }).one('mouseleave.frame.bmenu', function () {
                $(this).hide();
                data.passiveMenu();
            });

            $this.one('mouseenter.frame.bmenu', function () {
                data.showSecondary(secondary);
                data.activeMenu();
            }).one('mouseleave.frame.bmenu', function () {
                data.hideSecondary(secondary);
                data.passiveMenu();
            });

        });
    }

    var old = $.fn.bmenu;

    $.fn.bmenu = Plugin;
    $.fn.bmenu.Constructor = Bmenu;

    $.fn.bmenu.noConflict = function () {
        $.fn.bmenu = old;
        return this;
    }

    $(document).on('mouseenter', '[data-menu="board"]', function () {
        $(this).each(function () {
            var durationValue;
            if ($(this).attr('data-board-duration')) {
                durationValue = parseInt($(this).attr('data-board-duration'));
                Plugin.call($(this), {duration: durationValue});
            } else {
                Plugin.call($(this));
            }
        });
    });

})(jQuery);


/* 日历控件交互 start */
/*
$(document).on('click','.frame_datepicker_icon_btn',function(){
	var othis = $(this);
	othis.siblings('.frame_datepicker_input')[0].click();
});
$(document).on('click','.frame_datepicker_del_btn',function(){
	$(this).siblings('.frame_datepicker_input').val('').end().hide();
});
*/
$(document).on('click', '.frame_datepicker_icon_btn', function () {
    $(this).siblings('.frame_datepicker_input')[0].focus();
});
$(document).on('click', '.frame_datepicker_del_btn', function () {
    $(this).siblings('.frame_datepicker_input').val('').end().hide();
});
$(document).on('blur', '.frame_datepicker_input', function () {
    if ($.trim(this.value) === '') {
        $(this).siblings('.frame_datepicker_del_btn').hide();
    }
});
/* 日历控件交互 end */


/* 新左侧菜单交互 start */
//一级菜单
$(document).on('click', '.frame_leftmenu_mainitem_name', function () {
    /*    var $this = $(this),
            $arrow = $this.next('.frame_leftmenu_arrow');
        if ($this.attr('data-disabled') === 'true') {
            return false;
        }
        if ($arrow.length !== 0) {
            var $secondMenu = $(this).parent('.frame_leftmenu_mainitem').next('.frame_leftmenu_nextgrade_container');
            if ($secondMenu.is(':hidden')) {
                $secondMenu.slideDown();
                $arrow.addClass('spread');
            } else {
                $secondMenu.slideUp();
                $arrow.removeClass('spread');
            }
        }*/
});
//二级菜单
$(document).on('click', '.frame_leftmenu_twograde_grounp .frame_left_menu_right_arrow', function (e) {
    e.stopPropagation();
    var $this = $(this),
        $secondMenu = $this.parent('.frame_leftmenu_twograde_grounp').next('.frame_leftmenu_lastgrade_ul');
    if ($secondMenu.is(':hidden')) {
        $secondMenu.slideDown();
        $this.addClass('arrow_spread');
    } else {
        $secondMenu.slideUp();
        $this.removeClass('arrow_spread');
    }
});

//active 状态切换，selected 状态切换
$(document).on('click', '.frame_leftmenu_mainitem_name,.frame_leftmenu_onegrade_name,.frame_leftmenu_twograde_grounp .frame_leftmenu_twograde_text', function () {
    var $this = $(this);

    if ($(this).parent().hasClass('frame_leftmenu_twograde_grounp')) {
        $this = $(this).parent();
    }

    if ($this.hasClass('frame_nolink')) {
        return false;
    }
    if (!$this.hasClass('active')) {
        $this.closest('.frame_leftpart_container,.frame_left_menu_container').find('.active').removeClass('active');
        $this.addClass('active').prev('.frame_leftmenu_point').addClass('active');
        // li 也加上 active
        if ($this.hasClass('frame_leftmenu_mainitem_name') || $this.hasClass('frame_leftmenu_onegrade_name')) {
            $this.closest('li').addClass('active');
        }
        if ($this.next('.frame_left_menu_right_arrow').length) {
            $this.next('.frame_left_menu_right_arrow').addClass('active');
        } else {
            $this.find('.frame_left_menu_right_arrow').addClass('active');
        }
        // selected
        var $mainMenu = $this.closest('.frame_leftmenu_nextgrade_container').prev('.frame_leftmenu_mainitem');
        var $second = $this.closest('.frame_leftmenu_twograde_container').find('>.frame_leftmenu_twograde_grounp');

        var $third;

        // 四级时候的最后一层
        if ($this.hasClass('frame_leftmenu_onegrade_name')) {
            //
            $third = $this.closest('.frame_leftmenu_lastgrade_ul').prev('.frame_leftmenu_thirdgrade_grounp');
            //console.log($second.length);
        }

        if (!$mainMenu.hasClass('selected')) {
            $mainMenu.addClass('selected').siblings('.frame_leftmenu_mainitem').removeClass('selected');
        }

        $('.frame_leftmenu_twograde_grounp').removeClass('selected');

        if (!$second.hasClass('selected')) {
            $second.addClass('selected');
        }

        if ($third && !$third.hasClass('selected')) {
            $third.addClass('selected');
        }

        if ($this.hasClass('frame_leftmenu_mainitem_name')) {
            $('.frame_leftmenu_twograde_grounp').removeClass('selected');
        }

        /*        $second.each(function (index, ele) {
                    if (index === 0) {
                        $('.frame_leftmenu_twograde_grounp').removeClass('selected');
                    }
                    if (!$(ele).hasClass('selected')) {
                        $(ele).addClass('selected');
                    }
                });*/
    }
});

$(document).on('click', '.frame_leftmenu_mainitem_name', function () {
    var $this = $(this);
    $this.closest('.frame_leftpart_container,.frame_left_menu_container').find('.active').removeClass('active');
    $this.parent('.frame_leftmenu_mainitem').addClass('active');
});

// 鼠标经过主菜单颜色变化
/*$(document).on('mouseenter', '.frame_leftmenu_mainitem_name a', function () {
    var $this = $(this);
    if (!$this.closest('.frame_leftmenu_mainitem').hasClass('selected')) {
        $this.addClass('frame_left_menu_orange');
    }
}).on('mouseleave', '.frame_leftmenu_mainitem_name a', function () {
    var $this = $(this);
    $this.removeClass('frame_left_menu_orange');
});*/

// 圆点鼠标经过样式控制
$(document).on('mouseenter', '.frame_leftmenu_onegrade_name', function () {
    $(this).prev('.frame_leftmenu_point').addClass('hover');
}).on('mouseleave', '.frame_leftmenu_onegrade_name', function () {
    $(this).prev('.frame_leftmenu_point').removeClass('hover');
});

$(document).on('mouseenter', '.frame_leftmenu_twograde_text', function () {
    $(this).prev('.frame_leftmenu_twograde_arrow').addClass('hover');
}).on('mouseleave', '.frame_leftmenu_twograde_text', function () {
    $(this).prev('.frame_leftmenu_twograde_arrow').removeClass('hover');
});

// 点击展开箭头
$(document).on('click', '.frame_leftmenu_arrow', function () {
    //$(this).prev('.frame_leftmenu_mainitem_name').trigger('click');
    var $mainMenu = $(this).siblings('.frame_leftmenu_mainitem_name'),
        $arrow = $(this);
    if ($mainMenu.attr('data-disabled') === 'true') {
        return false;
    }
    if ($arrow.length !== 0) {
        var $secondMenu = $mainMenu.parent('.frame_leftmenu_mainitem').next('.frame_leftmenu_nextgrade_container');
        if ($secondMenu.is(':hidden')) {
            $secondMenu.slideDown();
            $arrow.addClass('spread');
        } else {
            $secondMenu.slideUp();
            $arrow.removeClass('spread');
        }
    }
});
/* 新左侧菜单交互 end */

/* 左侧菜单新增交互 start */
/*
$(document).on('click', '.frame_leftmenu_mainitem', function () {
    var $this = $(this);
    if (!$this.hasClass('active')) {
        $this.addClass('selected').siblings().removeClass('selected');
    }
});
*/
$(document).on('click', '.frame_leftmenu_mainitem_name', function () {
    $(this).closest('.frame_leftmenu_mainitem').addClass('selected').siblings().removeClass('selected');
});
/* 左侧菜单新增交互 end */

//查看原图交互
(function ($) {
    $.fn.frameShowOriginPic = function (src) {
        var html = '<div class="frame_origin_img" id="frame_origin_img">'
            + '<div class="frame_origin_img_close" id="frame_origin_img_close">×</div>'
            + '<img src="' + src + '" alt="" />'
            + '</div>';
        $('body').append(html);
    };
    $(document).on('click', '#frame_origin_img_close', function () {
        $(this).closest('.frame_origin_img').remove();
    });
})(jQuery);

//新搜索框添加交互
$(document).on('focus', '.frame_new_search_input', function () {
    $(this).closest('.frame_new_search').addClass('active');
});
$(document).on('blur', '.frame_new_search_input', function () {
    $(this).closest('.frame_new_search').removeClass('active');
});

// 新首页交换
$(document).on('click', '.frame_js_view', function () {
    var $this = $(this);
    if ($this.hasClass('slide_down')) {
        return;
    }
    $this.removeClass('slide_up').addClass('slide_down');
});
$(document).on('mouseleave', '.frame_js_view .frame_home_view_menus_wrapper,.frame_js_view .frame_home_qrcode_wrapper', function () {
    var $this = $(this).closest('.frame_js_view');
    if ($this.hasClass('slide_up')) {
        return;
    }
    $this.removeClass('slide_down').addClass('slide_up');
});
$(document).click(function (event) {
    event = event ? event : window.event;
    var obj = event.srcElement ? event.srcElement : event.target;
    //添加点击disabled input时候的判断
    if ($(obj).closest('.frame_js_view').length === 0 && $(obj).closest) {
        if ($('.frame_js_view').hasClass('slide_down')) {
            $('.frame_js_view').removeClass('slide_down').addClass('slide_up');
        }
    }
});