export default class uwuifier extends Plugin
{
	constructor(mod)
	{
		super(mod);
		this.MOD_NAME = mod.name;
		this.BASE_DIR = mod.baseDirectory;
		this.RELATIVE_DIR = this.BASE_DIR.substring(7);
		this.LEXICON = {
			'the': 'da',
			'th': 'd',
			'oo': '\u0000',
			'l': 'w',
			'r': 'w',
			'o': 'owo',
			'u': 'uwu',
			'\\.': ' uwu.',
			'\u0000': 'uwu'
		};
	}
	
	async preload() {}
	async postload() {}
	async prestart() {this._inject(this);}
	
	_inject(mod)
	{
		ig.LangLabel.inject({
			init: function(a)
			{
				if(a)
					a.en_US = mod.generateDumpsterFire(a.en_US);
				this.parent(...arguments);
			}
		});
	}
	
	generateDumpsterFire(line)
	{
		if(line && line.constructor === String)
			for(let key in this.LEXICON)
				line = line.replace(new RegExp(key, 'g'), this.LEXICON[key]);
		return line;
	}
}