import svgSprite from 'gulp-svg-sprite';

export const sprite = () =>
    app.src(app.path.src.svg)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVG",
                message: "Error: <% error.message %>"
            })
        ))
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: `../icons/sprite.svg`,
                }
            }
        }))
        .pipe(app.dest(app.path.build.img))
