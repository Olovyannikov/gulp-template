import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());
const project_folder = "./build";
const source_folder = "./src";

export const path = {
    build: {
        assets: `${project_folder}/assets/`,
        html: `${project_folder}/`,
        css: `${project_folder}/styles/`,
        js: `${project_folder}/js/`,
        img: `${project_folder}/img/`,
        svg: `${project_folder}/img/svg/`,
        fonts: `${project_folder}/fonts/`,
    },
    src: {
        assets: `${source_folder}/assets/**/*.*`,
        html: `${source_folder}/html/pages/*.html`,
        pug: `${source_folder}/pug/pages/*.pug`,
        scss: `${source_folder}/scss/style.scss`,
        js: `${source_folder}/js/script.js`,
        img: `${source_folder}/img/**/*.{png,jpeg,jpg,gif,webp}`,
        svg: `${source_folder}/img/svg/**/*.svg`,
        fonts: `${source_folder}/fonts/*.{woff,woff2,ttf,svg}`,
    },
    watch: {
        assets: `${source_folder}/assets/**/*.*`,
        html: `${source_folder}/**/*.html`,
        pug: `${source_folder}/**/*.pug`,
        scss: `${source_folder}/scss/**/*.scss`,
        js: `${source_folder}/js/**/*.js`,
        img: `${source_folder}/img/**/*.{png,jpeg,jpg,svg,gif,ico,webp}`,
    },
    clean: project_folder,
    buildFolder: project_folder,
    srcFolder: source_folder,
    rootFolder: rootFolder
};
