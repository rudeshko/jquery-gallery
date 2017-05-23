## jQuery-Based Gallery for Images, Videos, etc.

Adds a simple gallery to your site. Supports any HTML element

## Requirements

1. jQuery library is a requirement for this plugin
1. Each item in the gallery has to have a `dr-gallery-item` class

## How To Use

```html
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="./js/dr_gallery.js"></script>
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
    autoscroll: false,
    interval: 10
});
</script>
```