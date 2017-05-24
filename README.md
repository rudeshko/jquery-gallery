## jQuery-Based Gallery for Images, Videos, etc.

Adds a simple gallery to your site. Supports any HTML element

## Requirements

1. jQuery library is a requirement for this plugin
1. Each item in the gallery has to have a `dr-gallery-item` class

## Optional

1. To disable 'next' feature by clicking anywhere on the media item for only selected items, add class `dr_gallery_click_disable` to your `dr-gallery-item` element.

## Parameters

1. `autoscroll` - Default: Boolean true; Whether gallery should autoscroll through the items using time interval.
1. `interval` - Default: Int 10; If 'autoscroll' is true, scroll after this number of seconds to the next slide.
1. `mediaClickDisabled` - Default: Boolean false; Global boolean to disable 'next' feature by clicking anywhere on the media item.

## How To Use

```html
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="./js/dr_gallery.js"></script>
    <link href="./css/dr_gallery.css" rel="stylesheet" />
</head>
```

```html
<div class="test-gallery">
    <div class="dr_gallery-item">
        <img src="./images/1.jpg" title="" alt="" />
    </div>
    <div class="dr_gallery-item">
        <img src="./images/2.jpg" title="" alt="" />
    </div>
    <div class="dr_gallery-item">
        <img src="./images/3.jpg" title="" alt="" />
    </div>
</div>

<script>
$(".test-gallery").dr_gallery({
    autoscroll: true,
    interval: 10,
    mediaClickDisabled: false
});
</script>
```