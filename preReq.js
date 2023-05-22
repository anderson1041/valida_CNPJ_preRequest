var moment = require('moment')
var createDate = moment

pm.collectionVariables.set("createDate", moment().toISOString().replace('Z', '000'))
pm.collectionVariables.set("dataAccession", moment().subtract(30, 'day').toISOString().replace('Z', '000'))
pm.collectionVariables.set("dataRenewal", moment().add(1, 'year').toISOString().replace('Z', '000'))

function gerarCnpj() {
    const rnd = (n) => Math.round(Math.random() * n);
    const mod = (base, div) => Math.round(base - Math.floor(base / div) * div)
    const n1 = rnd(9);
    const n2 = rnd(9);
    const n3 = rnd(9);
    const n4 = rnd(9);
    const n5 = rnd(9);
    const n6 = rnd(9);
    const n7 = rnd(9);
    const n8 = rnd(9);
    const n9 = 0;
    const n10 = 0;
    const n11 = 0;
    const n12 = 1;
	

    let d1 = (n1 * 5) + (n2 * 4) + (n3 * 3) + (n4 * 2) + (n5 * 9) + (n6 * 8) + (n7 * 7) + (n8 * 6) + (n9 * 5) + (n10 * 4) + (n11 * 3) + (n12 * 2);
    d1 = 11 - mod(d1, 11);
    if (d1 < 2) d1 = 0;
    

    let d2 = (n1 * 6) + (n2 * 5) + (n3 * 4) + (n4 * 3) + (n5 * 2) + (n6 * 9) + (n7 * 8) + (n8 * 7) + (n9 * 6) + (n10 * 5) + (n11 * 4) + (d1 * 3) + (n12 * 2);
    d2 = 11 - mod(d2, 11);
    if (d2 > 2) d2 = 11 - d2;
	
	const cnpjParaValidar =`${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${n11}${n12}${d1}${d2}`;
	const cnpjEValido = validarCNPJ(cnpjParaValidar);
	console.log(cnpjEValido, cnpjParaValidar);
	if (cnpjEValido === true){
		return cnpjParaValidar;
	}
	return gerarCnpj();
}

function validarCNPJ(cnpj) {
    if (cnpj.length != 14)
        return false;
 
    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0,tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
		return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
	  return false;
  
    return true;
}
let trueCnpj = gerarCnpj();
console.log(trueCnpj);
pm.collectionVariables.set("cnpjValid", trueCnpj);