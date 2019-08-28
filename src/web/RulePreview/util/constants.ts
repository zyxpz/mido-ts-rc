import lang from './lang';

export const configColumns = (language: string) => [
	{
		title: lang(language).conditions,
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: lang(language).conditionsContent,
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: lang(language).operation,
		dataIndex: 'address',
		key: 'address',
	},
];
