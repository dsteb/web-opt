## Website Performance Optimization portfolio project

The challenge is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

### Getting started

The project is accessible in [GitHub Pages](https://dsteb.github.io/web-opt/).
You can check the PageSpeed Insights score using [this link](https://developers.google.com/speed/pagespeed/insights/?url=https://dsteb.github.io/web-opt/).

#### Installation
If you want to run everything locally, you need:
 
```bash
apt-get install imagemagick
git clone https://github.com/dsteb/web-opt
cd web-opt
npm install
gulp

```
The Gulp task do:
 * Image optimization (resize and compress).
 * Reduces the render critical path by inlining CSS.
 * Minimizes CSS and HTML.
 * Run the local server on port 8000.
 * Run the ngrok to make the web project be accessible from the Internet (the URL is printed in the console).
 * Run the PageSpeed Insights with mobile and desktop strategy.
 * Provides the link to open PageSpeed Insights in a browser.

#### Work done
 * PageSpeed Insights score for index.html is optimized to over 90 points.
 * Frames per Second in pizza.html are optimized to 60fps
 * Junk and "force layouts/reflows" are removed from pizza.html

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>
