import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'
 
Vue.use(MLInstaller);

 
export default new MLCreate({
  initial: window.config.activeLang,
  save: process.env.NODE_ENV === 'production',
  languages: [
	new MLanguage('ru').create({
		lang: 'ru',
		lang_url: '',
		title: 'Ru',
		main: {
			view_all_cases: 'Смотреть все кейсы',
			next: 'далее',
			open_case: 'открыть кейс',
			open: 'открыть',
			case: 'кейс',
			kyiv_ukraine: 'Киев, Украина',
			privacy_policy: 'Privacy Policy',
			terms_of_use: 'Terms of Use'
		},
		cases: {
			realized: 'реализованных',
			ideas: 'идей',
			sq_m: 'кв.м.',
			all_projects: 'Все проекты'
		},
		case: {
			customer: 'Клиент',
			location: 'Локация',
			size: 'Площадь',
			status: 'Статус',
			back: 'назад',
			find_out: 'Узнать',
			the_cost: 'стоимость',
			calculate: 'Рассчитать стоимость проекта',
			share: 'ПОДЕЛИТЬСЯ'
		},
		contacts: {
			for_clients: 'для клиентов',
			office: 'офис',
			for_contractors: 'для подрядчиков',
			maps: 'карту'
		},
		menu: {
			about: 'О нас',
			projects: 'Проекты',
			services: 'Услуги',
			contacts: 'Контакты'
		},
		about: {
			play: 'смотреть',
			video: 'видео',
			our_team: 'Наша команда',
			all: 'Все',
			our_clients: 'Наши клиенты'
		},
		calc: {
			calc: 'Рассчитать стоимость',
			name: 'Имя',
			enter_name: 'Пожалуйста, введите ваше имя',
			phone: 'Телефон',
			enter_phone: 'Пожалуйста, введите ваш номер телефона',
			email: 'Почта',
			object_location: 'Локация объекта',
			size: 'Площадь, кв.м.',
			office: 'Офис',
			apartments: 'Апартаменты',
			house: 'Дом',
			other: 'Другое',
			urgency: 'Срочность',
			send_request: 'Отправить запрос',
			thanks: 'Благодарим вас!',
			sended: 'Ваш запрос на расчет стоимости отправлен. Мы свяжемся с вами в скором времени.',
			good: 'OK'
		},
		cookie: {
			text: 'Продолжая использовать данный сайт, Вы принимаете наши',
			cookie: 'правила использования cookie-файлов',
			got_it: 'Принимаю'
		},
		nopage: {
			not_found: 'Страница не найдена',
			back: 'Вернуться на главную'
		}
	}),
	new MLanguage('en').create({
		lang: 'en',
		lang_url: '/en',
		title: 'En',
		main: {
			view_all_cases: 'Смотреть все кейсы',
			next: 'Next',
			open_case: 'Open case',
			open: 'Open',
			case: 'case',
			kyiv_ukraine: 'Kyiv, Ukraine',
			privacy_policy: 'Privacy Policy',
			terms_of_use: 'Terms of Use'
		},
		cases: {
			realized: 'Realised',
			ideas: 'ideas',
			sq_m: 'sq.m.',
			all_projects: 'All projects'
		},
		case: {
			customer: 'Customer',
			location: 'Location',
			size: 'Size',
			status: 'Status',
			back: 'Back',
			find_out: 'Find out',
			the_cost: 'the cost',
			calculate: 'Calculate the cost of your project',
			share: 'SHARE'
		},
		contacts: {
			for_clients: 'For clients',
			office: 'Office',
			for_contractors: 'For contractors',
			maps: 'Maps'
		},
		menu: {
			about: 'About',
			projects: 'Projects',
			services: 'Services',
			contacts: 'Contacts'
		},
		about: {
			play: 'Play',
			video: 'video',
			our_team: 'Our team',
			all: 'All',
			our_clients: 'Our clients'
		},
		calc: {
			calc: 'Calculate the cost',
			name: 'Name',
			enter_name: 'Please enter your name',
			phone: 'Phone',
			enter_phone: 'Please enter your phone',
			email: 'Email',
			object_location: 'Object location',
			size: 'Size sq.m.',
			office: 'Office',
			apartments: 'Apartments',
			house: 'House',
			other: 'Other',
			urgency: 'Urgency',
			send_request: 'Send request',
			thanks: 'Thank you!',
			sended: 'Your request for cost calculation was sent. We will contact you shortly.',
			good: 'Good'
		},
		cookie: {
			text: 'By using this site you agree with',
			cookie: 'Cookie Policy',
			got_it: 'GOT IT!'
		},
		nopage: {
			not_found: 'Page Not Found',
			back: 'Back to main'
		}
	}),

	new MLanguage('ua').create({
		lang: 'ua',
		lang_url: '/ua',
		title: 'Ua',
		main: {
			view_all_cases: 'дивитися всі кейси',
			next: 'далі',
			open_case: 'відкрити кейс',
			open: 'відкрити',
			case: 'кейс',
			kyiv_ukraine: 'Київ, Україна',
			privacy_policy: 'Privacy Policy',
			terms_of_use: 'Terms of Use'
		},
		cases: {
			realized: 'реалізованих',
			ideas: 'ідей',
			sq_m: 'кв.м.',
			all_projects: 'Всі проекти'
		},
		case: {
			customer: 'Клієнт',
			location: 'Локація',
			size: 'Площа',
			status: 'Статус',
			back: 'назад',
			find_out: 'Дізнатися',
			the_cost: 'вартість',
			calculate: 'Розрахувати вартість проекту',
			share: 'Поділитися'
		},
		contacts: {
			for_clients: 'для клієнтів',
			office: 'офіс',
			for_contractors: 'для підрядників',
			maps: 'мапу'
		},
		menu: {
			about: 'Про нас',
			projects: 'Проекти',
			services: 'Послуги',
			contacts: 'Контакти'
		},
		about: {
			play: 'дивитися',
			video: 'відео',
			our_team: 'Наша команда',
			all: 'Всі',
			our_clients: 'Наші клієнти'
		},
		calc: {
			calc: 'Розрахувати вартість',
			name: 'Ім\'я',
			enter_name: 'Будь ласка, введіть ваше ім\'я',
			phone: 'Телефон',
			enter_phone: 'Будь ласка, введіть ваш номер телефону',
			email: 'Пошта',
			object_location: 'локація об\'єкта',
			size: 'Площа, кв.м.',
			office: 'Офіс',
			apartments: 'Апартаменти',
			house: 'Будинок',
			other: 'Інше',
			urgency: 'Терміновість',
			send_request: 'Надіслати запит',
			thanks: 'Дякуємо вам!',
			sended: 'Ваш запит на розрахунок вартості надіслано. Ми незабаром зв’яжемося з вами.',
			good: 'OK'
		},
		cookie: {
			text: 'Продовжуючи використовувати даний сайт, Ви погоджуєтесь з нашими ',
			cookie: 'правилами використання cookie-файлів',
			got_it: 'Приймаю'
		},
		nopage: {
			not_found: 'Сторінку не знайдено',
			back: 'Повернутися на головну'
		}
	})
  ]
})