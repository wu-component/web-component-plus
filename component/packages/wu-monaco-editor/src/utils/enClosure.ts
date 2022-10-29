export const enClosure = (code: string) => `;(function(){
	${code}
	})();`
