export const copy = () =>
    app.src(app.path.src.assets)
        .pipe(app.dest(app.path.build.assets))
