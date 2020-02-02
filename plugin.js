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
			'then': 'den',
			'they': 'dey',
			'these': 'deez',
			'give': 'giev',
			'ight': 'ite',
			'the': 'da',
			'and': 'an',
			'th': 'd',
			'wh': 'w',
			'rh': 'w',
			'gh': '',
			'l': 'w',
			'r': 'w',
			'o': 'owo',
			'u': 'uwu',
			'.': ' uwu.',
			'?': ' owo?'
		};
		this.APPREHEND = {
			'there': 'der',
			'just': 'jus',
			'you': 'yuwu',
			'oo': 'uwu',
			'ou': 'ouwu',
			'\\.': '\\.',
			'or': 'ow'
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
				if(a)
				{
					if(!a.status)
						a.status = '';
					
					if(!a.status.includes('uwuified'))
					{
						a.en_US = self.generateDumpsterFire(a.en_US.toLowerCase());
						a.status += 'uwuified';
					}
				}
				this.parent(...arguments);
			}
		});
	}
	
	generateDumpsterFire(line)
	{
		if(line && line.constructor === String)
		{
			// Press \\i[key-up]\\i[key-left]\\i[key-down]\\i[key-right] to move around
			// You are at \\c[3]level \\v[player.level]\\c[0]!
			let stack = [];
			let selection = '';
			let mode = false;
			
			for(let i = 0; i < line.length; i++)
			{
				if(line.substring(i-3, i) === '\\v[' || line.substring(i-3, i) === '\\i[')
					mode = true;
				else if(mode && line[i] === ']')
				{
					mode = false;
					stack.push(selection);
					line = line.replace(selection, '\u0000');
					i -= selection.length - 1;
					selection = '';
				}
				
				if(mode)
					selection += line[i];
			}
			
			let index = 0;
			
			for(let key in this.APPREHEND)
				line = line.split(key).join('\u0001' + index++);
			
			for(let key in this.LEXICON)
				line = line.split(key).join(this.LEXICON[key]);
			
			index = 0;
			
			for(let key in this.APPREHEND)
				line = line.split('\u0001' + index++).join(this.APPREHEND[key]);
			
			while(stack.length > 0) {
				line = line.replace('\u0000', stack.shift());
			}
		}
		return line;
	}
}