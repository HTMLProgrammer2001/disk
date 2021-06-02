const generateCode = (len = 24) => {
	const chars = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890'
	return new Array(len).fill('').map(() => chars[Math.round(Math.random() * chars.length)]).join('')
}

export default generateCode
