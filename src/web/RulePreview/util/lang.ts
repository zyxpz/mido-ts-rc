interface LangObj {
  select: string,
  output: string,
  context: string,
  string: string,
  integer: string,
  long: string,
  double: string,
  or: string,
  and: string,
}

interface Lang {
  [language: string]: any
  ZH: LangObj,
  EN: LangObj
}

const lang: Lang = {
	ZH: {
		select: '选择变量',
		output: '输出变量',
		context: '上下文变量',
		string: '字符串',
		integer: '整形',
		long: '长整形',
		double: '双精度浮点型',
		or: '或',
		and: '与',
	},
	EN: {
		select: 'Select',
		output: 'Output',
		context: 'Context',
		string: 'String',
		integer: 'Integer',
		long: 'Long',
		double: 'Double',
		or: 'or',
		and: 'and',
	}
};


export default (language: string): void => lang[language];