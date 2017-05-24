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

            currentIndex = nextIndex;
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
            }));

            if (!data.mediaClickDisabled) {
                for (var i = 0; i < items.length; i++) {
                    if (!$(items[i]).hasClass("dr_gallery_click_disable")) {
                        $(items[i]).addClass("dr_gallery_media_clickable");
                    }
                }
            }

            if (data.autoscroll) {
                galleryInterval = setInterval(runLoop, (data.interval * 1000));
            }
        }

        $this.on("click", ".dr_gallery_go_left, .dr_gallery_go_right, .dr_gallery-item", function () {
            $this = $(this);

            if (items.length <= 1) {
                return;
            }

            var action = $this.attr("data-action");

            if (action != undefined && action == "left") {
                var prevIndex = (currentIndex - 1 < 0) ? (items.length - 1) : (currentIndex - 1);

                items.eq(currentIndex).fadeOut(500);
                items.eq(prevIndex).fadeIn(500).parent(".dr_gallery").parent().css("height", items.eq(prevIndex).find("img").height() + "px");

                currentIndex = prevIndex;
            } else {
                if (action == undefined && ($this.hasClass("dr_gallery_click_disable") || data.mediaClickDisabled)) {
                    return;
                }

                var nextIndex = (currentIndex + 1 == items.length) ? 0 : (currentIndex + 1);

                items.eq(currentIndex).fadeOut(500);
                items.eq(nextIndex).fadeIn(500).parent(".dr_gallery").parent().css("height", items.eq(nextIndex).find("img").height() + "px");

                currentIndex = nextIndex;
            }

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