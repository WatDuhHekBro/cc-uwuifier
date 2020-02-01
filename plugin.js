export default class uwuifier extends Plugin
{
	constructor(mod)
	{
		super(mod);
		this.MOD_NAME = mod.name;
		this.BASE_DIR = mod.baseDirectory;
		this.RELATIVE_DIR = this.BASE_DIR.substring(7);
		this.LEXICON = {
			'them': 'dem',
			'the': 'da',
			'th': 'd',
			'l': 'w',
			'r': 'w',
			'oo': '\u0000',
			'o': 'owo',
			'u': 'uwu',
			'\u0000': 'uwu',
			'\\.': '\u0000',
			'.': ' uwu.',
			'\u0000': '\\.',
			'?': ' owo?'
		};
	}
	
	async preload() {}
	async postload() {}
	
	async prestart()
	{
		const self = this;
		
		ig.LangLabel.inject({
			init: function(a)
			{
				if(a && a.status !== 'uwuified')
				{
					a.en_US = self.generateDumpsterFire(a.en_US.toLowerCase());
					a.status = 'uwuified';
				}
				this.parent(...arguments);
			}
		});
	}
	
	generateDumpsterFire(line)
	{
		if(line && line.constructor === String)
			for(let key in this.LEXICON)
				line = line.split(key).join(this.LEXICON[key]);
		return line;
	}
}