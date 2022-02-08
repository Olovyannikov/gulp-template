import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () =>
    app.src(app.path.srcFolder + '/fonts/*.otf', {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'FONTS',
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(app.dest(`${app.path.srcFolder}/fonts/`))

export const ttfToWoff = () =>
    app.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(fonter({
            formats: ['woff']
        }))
        .pipe(app.dest(app.path.build.fonts))
        .pipe(app.src(`${app.path.srcFolder}/fonts/*.ttf`))
        .pipe(ttf2woff2())
        .pipe(app.dest(app.path.build.fonts))

export const fontsStyle = () => {
    let fontsFile = `${app.path.srcFolder}/scss/general/_fonts.scss`;

    fs.readdir(app.path.build.fonts, (err, fontsFiles) => {
        if (fontsFiles) {
            if (!fs.existsSync(fontsFile)) {
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;

                for (let i = 0; i < fontsFiles.length; i++) {
                    let fontFileName = fontsFiles[i].split('.')[0];

                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ?? fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ?? fontFileName;

                        switch (fontWeight.toLowerCase()) {
                            case ('thin'):
                                fontWeight = 100;
                                break;
                            case ('extralight'):
                                fontWeight = 200;
                                break;
                            case ('light'):
                                fontWeight = 300;
                                break;
                            case ('medium'):
                                fontWeight = 500;
                                break;
                            case ('semibold'):
                                fontWeight = 600;
                                break;
                            case ('bold'):
                                fontWeight = 700;
                                break;
                            case ('extrabold'):
                                fontWeight = 800;
                                break;
                            case ('heavy'):
                                fontWeight = 800;
                                break;
                            case ('black'):
                                fontWeight = 900;
                                break;
                            default:
                                fontWeight = 400;
                                break;
                        }

                        fs.appendFile(fontsFile,
                            `@font-face {
                                    font-family: ${fontName};
                                    font-display: swap;
                                    src:
                                        url("../fonts/${fontFileName}.woff2") format("woff2"),
                                        url("../fonts/${fontFileName}.woff") format("woff");
                                    font-weight: ${fontWeight};
                                    font-style: normal;
                                }\r\n`, cb);
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                console.log("Файл scss/fonts.scss уже существует. Удалите старый файл для записи новой версии файла")
            }
        }
    });

    return app.src(`${app.path.srcFolder}`);
    function cb() {}
}
