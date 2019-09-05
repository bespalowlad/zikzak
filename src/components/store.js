import Vue from 'vue'
import Vuex from 'vuex'
import $api from '@/components/api.js';

var VueCookie = require('vue-cookie');
Vue.use(VueCookie);

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        modalCalc: false,
        modalThanks: false,
        isPreloader: false,
        isMenuOpened: false,
        isCookie: VueCookie.get('cookie') ? true : false,
        projects: [],
        team: [],
        contacts: {
            isEmpty: true
        },
        main: {
            isEmpty: true
        },
        about: {
            isEmpty: true
        },
        services: {
            isEmpty: true
        },
        projectsPage: {
            isEmpty: true
        },
        categories: [],
        positions: [],
        terms: {
            isEmpty: true
        },
        privacy: {
            isEmpty: true
        }
    },
    mutations: {
        SET_COOKIES(state) {
            state.isCookie = true;
            VueCookie.set('cookie', 'true', 182);
        },
        SET_MODALCALC(state, val) {
            state.modalCalc = val;
        },
        SET_MODALTHANKS(state, val) {
            state.modalThanks = val;
        },
        SET_PROJECTS(state, payload) {
            state.projects = payload;
        },
        SET_CATEGORIES(state, payload) {
            state.categories = payload;
        },
        SET_POSITIONS(state, payload) {
            state.positions = payload;
        },
        SET_TEAM(state, payload) {
            state.team = payload;
        },
        SET_MAIN_PAGE(state, payload) {
            state.main = payload;
        },
        SET_TERMS(state, payload) {
            state.terms = payload;
        },
        SET_PRIVACY(state, payload) {
            state.privacy = payload;
        },
        SET_CONTACTS_PAGE(state, payload) {
            state.contacts = payload;
        },
        SET_SERVICES_PAGE(state, payload) {
            state.services = payload;
        },
        SET_ABOUT_PAGE(state, payload) {
            state.about = payload;
        },
        SET_PROJECTS_PAGE(state, payload) {
            state.projectsPage = payload;
        },
        SET_PRELOADER(state, payload) {
            state.isPreloader = payload;
        },
        TOGGLE_MENU(state, payload) {
            state.isMenuOpened = payload;
        }
    },
    getters: {
        getProjectBySlug: state => slug => {
            return state.projects.find(item => item.slug === slug);
        },
        getNextProject: state => slug => {
            let i = state.projects.findIndex(item => item.slug === slug);
            let next = i < state.projects.length-1 ? i+1 : 0;
            return state.projects[next];
        },
        getProjectsByIds: state => ids => {
            let arr = [];
            ids.forEach(id => {
                let p = state.projects.find(el => el.id === id);
                if (p) arr.push(p);
            });
            return arr;
        },
        getCategories: state => {
            return state.categories.filter(item => state.projects.find(a => a.cases_category.indexOf(item.id)) != undefined);
        },
        getPositions: state => id =>  {
            let pos = state.positions.filter(item => { return item.id == id})[0];
            if (pos != undefined) return pos.name;
        },
        filterTeam: state => id => {
            if(id == -1) return state.team;
            return state.team.filter(item => item.position[0] == id );
        }
    },
	actions: {
        SET_PRELOADER: async (context, payload) => {
            context.commit('SET_PRELOADER', payload);
        },
        SET_COOKIES: async (context) => {
            context.commit('SET_COOKIES');
        },
        TOGGLE_MENU: async (context, payload) => {
            context.commit('TOGGLE_MENU', payload);
        },
        GET_PROJECTS: async (context) => {
            let {data} = await $api.projects.get();
            context.commit('SET_PROJECTS', data);
        },
        GET_CATEGORIES: async (context) => {
            let {data} = await $api.categories.get();
            context.commit('SET_CATEGORIES', data);
        },
        GET_POSITIONS: async (context) => {
            let {data} = await $api.positions.get();
            context.commit('SET_POSITIONS', data);
        },
        GET_TEAM: async (context) => {
            let {data} = await $api.team.get();
            context.commit('SET_TEAM', data);
        },
        GET_MAIN_PAGE: async (context) => {
            let {data} = await $api.main.get();
            context.commit('SET_MAIN_PAGE', data[0]);
        },
        GET_CONTACTS_PAGE: async (context) => {
            let {data} = await $api.contacts.get();
            context.commit('SET_CONTACTS_PAGE', data[0]);
        },
        GET_ABOUT_PAGE: async (context) => {
            let {data} = await $api.about.get();
            context.commit('SET_ABOUT_PAGE', data[0]);
        },
        GET_TERMS: async (context) => {
            let {data} = await $api.terms.get();
            context.commit('SET_TERMS', data[0]);
        },
        GET_PRIVACY: async (context) => {
            let {data} = await $api.privacy.get();
            context.commit('SET_PRIVACY', data[0]);
        },
        GET_SERVICES_PAGE: async (context) => {
            let {data} = await $api.services.get();
            context.commit('SET_SERVICES_PAGE', data[0]);
        },
        GET_PROJECTS_PAGE: async (context) => {
            let {data} = await $api.projects.getPage();
            context.commit('SET_PROJECTS_PAGE', data[0]);
        }
    }
});