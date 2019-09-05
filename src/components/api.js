

import axios from 'axios';
let lang = window.config.activeLang;


let base = 'http://ribs.pro/zikzak/backend/wp-json/wp/v2/'; 

export default {
    projects: {
        get() {
            return axios.get(base + 'projects?orderby=menu_order&order=asc&per_page=100&lang=' + lang);
        },
        getPage() {
            return axios.get(base + 'vpages/?slug=projects&lang=' + lang);
        }
    },
    main: {
        get() {
            return axios.get(base + 'vpages/?slug=main&lang=' + lang);
        }
    },
    contacts: {
        get() {
            return axios.get(base + 'vpages/?slug=contacts&lang=' + lang);
        }
    },
    about: {
        get() {
            return axios.get(base + 'vpages/?slug=about&lang=' + lang);
        }
    },
    team: {
        get() {
            return axios.get(base + 'team?per_page=100&lang=' + lang);
        }
    },
    services: {
        get() {
            return axios.get(base + 'vpages/?slug=services&lang=' + lang);
        }
    },
    categories: {
        get() {
            return axios.get(base + 'cases_category/?lang=' + lang);
        }
    },
    positions: {
        get() {
            return axios.get(base + 'position/?lang=' + lang);
        }
    },
    terms: {
        get() {
            return axios.get(base + 'vpages/?slug=terms&lang=' + lang);
        }
    },
    privacy: {
        get() {
            return axios.get(base + 'vpages/?slug=privacy&lang=' + lang);
        }
    },
    sendForm(fd, callback) {
        axios.post('http://zikzak.ribs.pro/zikzak/backend/wp-json/contact-form-7/v1/contact-forms/286/feedback', fd).then(resp => {
            callback(resp);
        });
    }
};