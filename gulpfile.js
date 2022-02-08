import gulp from "gulp";
import {path} from "./gulp/config/index.js";
import {
    copy,
    clear,
    pugHtml,
    server,
    scss,
    js,
    images,
    otfToTtf,
    ttfToWoff,
    fontsStyle,
    sprite
} from "./gulp/tasks/index.js";
import {plugins} from "./gulp/config/index.js";

const {src, dest, series, task, parallel, watch} = gulp;

global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    src: src,
    dest: dest,
    series: series,
    parallel: parallel,
    watch: watch,
    task: task,
    plugins: plugins,
}

const watcher = () => {
    watch(path.watch.assets, copy);
    /* use task HTML if you use native HTML
    watch(path.watch.html, html); */
    watch(path.watch.pug, pugHtml);
    watch(path.watch.scss, scss);
    watch(path.watch.js, js);
    watch(path.watch.img, images);
}

const fonts = series(otfToTtf, ttfToWoff, fontsStyle)

const mainTasks = series(sprite, fonts, parallel(copy, pugHtml, scss, js, images));

const dev = series(clear, mainTasks, parallel(watcher, server));
const build = series(clear, mainTasks);

export {dev, build, sprite};

task('default', dev);
