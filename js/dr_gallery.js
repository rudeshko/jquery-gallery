/**
 * Author: Dima Rudeshko
 * Website: http://rudeshko.net/
 */

(function ($) {
    var dr_galleryClass = function (e, data) {
        $(e).wrapInner($("<div />", {
            "class": "dr_gallery"
        }));

        var $this = $(e).find(".dr_gallery");
        var items = $this.children(".dr_gallery-item");
        var currentIndex = 0;
        var galleryInterval;
        var runLoop = function () {
            var nextIndex = (currentIndex + 1 == items.length) ? 0 : (currentIndex + 1);

            items.eq(currentIndex).fadeOut(500);
            items.eq(nextIndex).fadeIn(500).parent(".dr_gallery").parent().css("height", items.eq(nextIndex).find("img").height() + "px");

            $this.find(".dr_gallery_nav_item").removeClass("active");
            $this.find(".dr_gallery_nav_item_" + nextIndex).addClass("active");

            currentIndex = parseInt(nextIndex);
        };

        if (items[currentIndex] != undefined) {
            items.eq(currentIndex).show();
        }

        if (items.length > 1) {
            $this.append($("<div />", {
                "class": "dr_gallery_go_left",
                "data-action": "left"
            })).append($("<div />", {
                "class": "dr_gallery_go_right",
                "data-action": "right"
            })).append($("<ul />", {
                "class": "dr_gallery_nav"
            }));

            for (var i = 0; i < items.length; i++) {
                $this.find(".dr_gallery_nav").append($("<li />", {
                    "class": "dr_gallery_nav_item dr_gallery_nav_item_" + i + (i == 0 ? " active" : ""),
                    "data-index": i
                }).text(i));

                if (!data.mediaClickDisabled && !$(items[i]).hasClass("dr_gallery_click_disable")) {
                    $(items[i]).addClass("dr_gallery_media_clickable");
                }
            }

            if (data.autoscroll) {
                galleryInterval = setInterval(runLoop, (data.interval * 1000));
            }
        }

        $this.on("click", ".dr_gallery_go_left, .dr_gallery_go_right, .dr_gallery-item", function () {
            var $action = $(this);
            var $nav = $action.siblings(".dr_gallery_nav");

            if (items.length <= 1) {
                return;
            }

            var action = $action.attr("data-action");

            if (action != undefined && action == "left") {
                var prevIndex = (currentIndex - 1 < 0) ? (items.length - 1) : (currentIndex - 1);

                items.eq(currentIndex).fadeOut(500);
                items.eq(prevIndex).fadeIn(500).parent(".dr_gallery").parent().css("height", items.eq(prevIndex).find("img").height() + "px");

                currentIndex = parseInt(prevIndex);
            } else {
                if (action == undefined && ($action.hasClass("dr_gallery_click_disable") || data.mediaClickDisabled)) {
                    return;
                }

                var nextIndex = (currentIndex + 1 == items.length) ? 0 : (currentIndex + 1);

                items.eq(currentIndex).fadeOut(500);
                items.eq(nextIndex).fadeIn(500).parent(".dr_gallery").parent().css("height", items.eq(nextIndex).find("img").height() + "px");

                currentIndex = parseInt(nextIndex);
            }

            $nav.find(".dr_gallery_nav_item").removeClass("active");
            $nav.find(".dr_gallery_nav_item_" + nextIndex).addClass("active");

            if (data.autoscroll) {
                clearInterval(galleryInterval);
                galleryInterval = setInterval(runLoop, (data.interval * 1000));
            }
        });

        $this.on("click", ".dr_gallery_nav_item", function () {
            var index = $(this).attr("data-index");

            items.eq(currentIndex).fadeOut(500);
            items.eq(index).fadeIn(500).parent(".dr_gallery").parent().css("height", items.eq(index).find("img").height() + "px");

            currentIndex = parseInt(index);

            $this.find(".dr_gallery_nav_item").removeClass("active");
            $(this).addClass("active");

            if (data.autoscroll) {
                clearInterval(galleryInterval);
                galleryInterval = setInterval(runLoop, (data.interval * 1000));
            }
        });
    };

    $.fn.dr_gallery = function (options) {
        var data = $.extend({}, $.fn.dr_gallery.defaults, options);

        return this.each(function () {
            new dr_galleryClass($(this), data);
        });
    }

    $.fn.dr_gallery.defaults = {
        autoscroll: true,
        interval: 10,
        mediaClickDisabled: false
    }
}(jQuery));