const LEXICON = {
	'...': '... ',
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

const APPREHEND = {
	'there': 'der',
	'just': 'jus',
	'you': 'yuwu',
	'oo': 'uwu',
	'ou': 'ouwu',
	'\\.': '\\.',
	'or': 'ow'
};

ig.LangLabel.inject({
	init(data) {
		if(data)
			data.en_US = generateDumpsterFire(data.en_US.toLowerCase());
		this.parent(data);
	}
});

// Adding a non-enumerable property to prevent crashing while also keeping track of which text has been uwuified doesn't seem to be working.
// So I'm taking the lazy solution of just checking if there's a null byte at position zero.
function generateDumpsterFire(line) {
	if(line && line.constructor === String && line[0] !== '\0') {
		// Press \\i[key-up]\\i[key-left]\\i[key-down]\\i[key-right] to move around
		// You are at \\c[3]level \\v[player.level]\\c[0]!
		let stack = [];
		let selection = '';
		let mode = false;
		
		for(let i = 0; i < line.length; i++) {
			if(line.substring(i-3, i) === '\\v[' || line.substring(i-3, i) === '\\i[')
				mode = true;
			else if(mode && line[i] === ']') {
				mode = false;
				stack.push(selection);
				line = line.replace(selection, '\0');
				i -= selection.length - 1;
				selection = '';
			}
			
			if(mode)
				selection += line[i];
		}
		
		let index = 0;
		
		for(let key in APPREHEND)
			line = line.split(key).join('\u0001' + index++);
		
		for(let key in LEXICON)
			line = line.split(key).join(LEXICON[key]);
		
		index = 0;
		
		for(let key in APPREHEND)
			line = line.split('\u0001' + index++).join(APPREHEND[key]);
		
		while(stack.length > 0)
			line = line.replace('\0', stack.shift());
		
		line = '\0' + line;
	}
	
	return line;
}
