module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		backdropFilter: {
			none: 'none',
			'blur-10': 'blur(10px)',
			'blur-20': 'blur(20px)',
			'blur-30': 'blur(30px)',
			'blur-40': 'blur(40px)',
			'blur-50': 'blur(50px)',
		},
		extend: {
			fontFamily: {
				kiwi: ['Kiwi Maru'],
			},
		},
	},
	variants: {
		extend: {
			animation: ['hover'],
		},
	},
	plugins: [require('tailwindcss-filters')],
};
