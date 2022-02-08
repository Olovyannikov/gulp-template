import webpHtmlNoSvg from 'gulp-webp-html-nosvg';
import version from 'gulp-version-number';
import pug from 'gulp-pug';

export const pugHtml = () =>
    app.src(app.path.src.pug)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'PUG',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(pug({
            pretty: true,
            verbose: true
        }))
        .pipe(app.plugins.replace(/@img\//g, "img/"))
        .pipe(app.plugins.if(
            app.isBuild,
            webpHtmlNoSvg()
        ))
        .pipe(
            app.plugins.if(
                app.isBuild,
                version({
                    'value': '%DT%',
                    'append': {
                        'key': '_v',
                        'cover': 0,
                        'to': [
                            'css',
                            'js'
                        ]
                    },
                    'output': {
                        'file': 'gulp/version.json'
                    }
                })
            )
        )
        .pipe(app.dest(app.path.build.html))
        .pipe(app.plugins.bs.stream());
