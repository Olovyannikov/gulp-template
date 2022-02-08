import webpack from 'webpack-stream';

export const js = () =>
    app.src(app.path.src.js, {sourcemaps: app.isDev})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <% error.message %>"
            })
        ))
        .pipe(webpack({
            mode: app.isBuild ? 'production' : 'development',
            output: {
                filename: 'script.min.js',
            }
        }))
        .pipe(app.dest(app.path.build.js))
        .pipe(app.plugins.bs.stream())
