// import { commentPlugin } from "vuepress-plugin-comment2";
module.exports = {
	title: 'WebComponent',
	description: '开箱即用的 webComponent 框架',
	head: [
		/*['script', { charset: "utf-8", src: "/core.esm.js" }],
		['script', { charset: "utf-8", src: "/web-plus.esm.js" }],*/

		['script', { charset: "utf-8", src: "https://unpkg.com/vconsole@latest/dist/vconsole.min.js" }],
		['script', { charset: "utf-8", src: "/js/core/index.iife.min.js" }],
		['script', { charset: "utf-8", src: "/js/example/index.umd.js" }],
		// ['script', { charset: "utf-8", src: "/js/upload/index.umd.js" }],

		['script', { charset: "utf-8", src: "/js/ui/index.umd.js" }],
		['script', { charset: "utf-8", src: "/js/monaco-editor/index.umd.js" }],
		['script', { charset: "utf-8", src: "/js/sandbox/index.umd.js" }],
		['script', { charset: "utf-8", src: "/js/comment/index.umd.js" }],
		['script', { charset: "utf-8", src: "/js/lottie/index.umd.js" }],
		['script', { charset: "utf-8", src: "/js/code-playground/index.umd.js" }],
		// ['script', { charset: "utf-8", src: "/js/comment/index.umd.js" }],
		// ['script', { charset: "utf-8", src: "/js/lottie/index.umd.js" }],

		// ['script', { charset: "utf-8", src: "/js/comment-shadow/index.umd.js" }],
		// ['script', { charset: "utf-8", src: "https://unpkg.com/@waline/client@v2/dist/waline.js" }],
		// ['link', { rel: 'stylesheet', src: "https://unpkg.com/@waline/client@v2/dist/waline.css" }],

		['link', { rel: 'icon', href: '/images/photo.png' }],
		['meta', { name: 'theme-color', content: '#0084ff' }],
		['link', { rel: 'manifest', href: '/manifest.json' }],
		['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
		['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
		['meta', { name: 'msapplication-TileImage', content: '/images/photo' }],
		['meta', { name: 'msapplication-TileColor', content: '#000000' }],
	],
	theme: 'antdocs',
	base: '/',
	markdown: {
		lineNumbers: false
	},
	lang: 'zh-CN',
	themeConfig: {
		lastUpdated: false,
		backToTop: true,
		smoothScroll: true,
		nav:[
			{text: '指南', key: '14', link: '/introduction/index'},
			{text: '框架', key: '15', link: '/frame/log/changelog'},
			{text: '组件', key: '16', link: '/component-plus/log/changelog'},
			{text: '路由', key: '167', link: '/router/log/changelog'},
			{text: '讨论', key: '16765', link: '/issues/index'},
			{
				text: '生态',
				items: [
					{text: 'wu-cli', key: '167623', link: '/t-cli/安装/install'},
					{ text: 'Admin-Template', key: '1014', link: 'https://static-cdn.canyuegongzi.xyz/admin-template/index.html#/button?'},
					{ text: 'playground', key: '1017', link: 'https://static-cdn.canyuegongzi.xyz/wu-code-playground/index.html'},
				]
			},
			{text: 'v1.x', key: '10112', link: 'https://wu-component.github.io/docs-v1'},
			{text: 'Github', key: '10', link: '/component-plus/log/changelog'}

		],
		sidebarDepth: 0,
		sidebar: {
			'/frame/': [
				'/frame/log/changelog',
				{
					title: "开发者",
					sidebarDepth: 0,
					children: [
						'/frame/CorePlus/Install',
						'/frame/CorePlus/Decorators',
						'/frame/CorePlus/Lifecycle',
						'/frame/CorePlus/Build',

					]
				},
			],
			'/router/': [
				'/router/log/changelog',
				{
					title: "开发者",
					sidebarDepth: 0,
					children: [
						'/router/Development/OverView',
						'/router/Development/Install',
					]
				},
				'/router/Example/RouterJs',
			],
			'/component-plus/': [
				'/component-plus/log/changelog',
				{
					title: 'Development',
					sidebarDepth: 0,
					children: [
						'/component-plus/Development/Installation',
						'/component-plus/Development/Quickstart',
						'/component-plus/Development/Transition'
					]
				},
				{
					title: 'Basic',
					sidebarDepth: 0,
					children: [
						'/component-plus/Basic/Avatar',
						'/component-plus/Basic/Button',
						'/component-plus/Basic/Icon',
						'/component-plus/Basic/Link',
						'/component-plus/Basic/Tag',
						'/component-plus/Basic/Progress',
					]
				},
				{
					title: 'Form',
					sidebarDepth: 0,
					children: [
						'/component-plus/Form/Radio',
						'/component-plus/Form/Input',
						'/component-plus/Form/Switch',
						'/component-plus/Form/Checkbox',
						'/component-plus/Form/Rate',
						'/component-plus/Form/Cascader',
						'/component-plus/Form/ColorPicker',
						'/component-plus/Form/DatePicker',
						'/component-plus/Form/DateTimePicker',
						'/component-plus/Form/Select',
						'/component-plus/Form/Upload',
					]
				},
				{
					title: 'Layout',
					sidebarDepth: 0,
					children: [
						'/component-plus/Layout/Layout',
						'/component-plus/Layout/Container',
						'/component-plus/Layout/Breadcrumb',
						'/component-plus/Layout/PageHeader',
					]
				},
				{
					title: 'Data',
					sidebarDepth: 0,
					children: [
						'/component-plus/Data/Table',
						'/component-plus/Data/Badge',
						'/component-plus/Data/Card',
						'/component-plus/Data/Collapse',
						'/component-plus/Data/Empty',
						'/component-plus/Data/Image',
						'/component-plus/Data/Pagination',
						'/component-plus/Data/Timeline',
						// '/component-plus/Data/Tree',
						'/component-plus/Data/Tree-v2',
					]
				},
				{
					title: 'Notice',
					sidebarDepth: 0,
					children: [
						'/component-plus/Notice/Message',
						'/component-plus/Notice/Alert',
						'/component-plus/Notice/Dialog',
					]
				},
				{
					title: 'Navigation',
					sidebarDepth: 0,
					children: [
						'/component-plus/Navigation/Menu',
					]
				},
				{
					title: 'Others',
					sidebarDepth: 0,
					children: [
						'/component-plus/Others/Popconfirm',
						'/component-plus/Others/Popover',
						'/component-plus/Others/Tooltip',

					]
				},
				{
					title: 'Complex',
					sidebarDepth: 0,
					children: [
						'/component-plus/Complex/Comment',
						'/component-plus/Complex/Lottie',
						'/component-plus/Complex/CodeEditor',
						'/component-plus/Complex/Sandbox',

					]
				},
				{
					title: 'Plugin',
					sidebarDepth: 0,
					children: [
						'/component-plus/Plugin/RightMenu'

					]
				},

			],

			'/t-cli/': [
				{
					title: '安装',
					sidebarDepth: 0,
					children: [
						'/t-cli/安装/install',
						'/t-cli/安装/t-cli-cmd',
					]
				},
				{
					title: '工程模板',
					sidebarDepth: 0,
					children: [
						'/t-cli/工程模板/web-core-component',
						'/t-cli/工程模板/node-nest',
						'/t-cli/工程模板/node-simple-typescript',
						'/t-cli/工程模板/web-webpack4-typescript',
						'/t-cli/工程模板/web-webpack4-vue2-javascript',
						'/t-cli/工程模板/web-webpack4-vue2-typescript',
						'/t-cli/工程模板/web-webpack4-react-javascript',
						'/t-cli/工程模板/web-webpack4-react-typescript',
						'/t-cli/工程模板/web-webpack5-vue2-javascript',
						'/t-cli/工程模板/web-webpack5-vue2-typescript',
					]
				}
			],
		}
	},
	plugins: [
		require('vuepress-plugin-demo-container'),
		['@vuepress/search', {
			searchMaxSuggestions: 10
		}],
		['@vuepress/medium-zoom', {
			selector: 'img.medium-zoom',
			// medium-zoom options here
			// See: https://github.com/francoischalifour/medium-zoom#options
			options: {
				margin: 16,
				// background: 'rgba(0, 0, 0, 0.3)',
			}
		}],
		/*['comment1', {
			provider: "waline",
			// 插件选项
			serverURL: "https://whl47bsd.api.lncldglobal.com"
		}],*/

		/*[
			'vuepress-plugin-comment',
			{
				// choosen: 'valine',
				choosen: 'gitalk',
				// options选项中的所有参数，会传给Valine的配置
				options: {
					// el: '#valine-vuepress-comment',
					// appId: 'PVsiIhfVXf7pLlF4CKL4duC7-gzGzoHsz',
					// appKey: 'kpiIiP94nrjz2w5lMMHmyRcA'

					clientID: 'e2904d004ede111c5047',
					clientSecret: '31929050c6443cdba855213a72a31c904dceb050',
					repo: 'canyuegongzi.github.io',
					owner: 'canyuegongzi',
					admin: ['canyuegongzi'],
					distractionFreeMode: false
				}
			}
		]*/
	],
};
