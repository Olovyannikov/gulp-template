import webp from "gulp-webp";
import imagemin from 'gulp-imagemin'

export const images = () =>
    app.src(app.path.src.img)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "Images",
                message: "Error: <% error.message %>"
            })
        ))
        .pipe(app.plugins.newer(app.path.build.img))
        .pipe(app.plugins.if(
            app.isBuild,
            webp()
        ))
        .pipe(app.plugins.if(
            app.isBuild,
            app.dest(app.path.build.img)
        ))
        .pipe(app.plugins.if(
            app.isBuild,
            app.src(app.path.src.img)
        ))
        .pipe(app.plugins.if(
            app.isBuild,
            app.plugins.newer(app.path.build.img)
        ))
        .pipe(app.plugins.if(
            app.isBuild,
            imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                interlaced: true,
                optimizationLevel: 3
            })
        ))
        .pipe(app.dest(app.path.build.img))
        .pipe(app.src(app.path.src.svg))
        .pipe(app.dest(app.path.build.img))
        .pipe(app.plugins.bs.stream())
