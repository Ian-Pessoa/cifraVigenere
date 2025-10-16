const ALFABETO = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
                "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
                "0","1","2","3","4","5","6","7","8","9",
                "á","é","í","ó","ú","â","ê","ô","ã",
                " ", "," , ";" , "." , "_" , "#" , "*", '"' , "-" , "+"]

function criarMapas (alfabeto) {
    mapaIndice = new Map();
    mapaCaractere = []

    for (let i = 0; i < alfabeto.length; i++){
        mapaIndice.set(alfabeto[i], i)
        mapaCaractere.push(alfabeto[i])
    }

    return {mapaIndice, mapaCaractere, tamanho: alfabeto.length}
}

function expandirChave(chave, tamanhoTexto){
    if (chave.length === 0) throw new Error("Chave deve ser informada.")

    chaveExpandida = ""
    for (let i = 0; i < tamanhoTexto; i++){
        chaveExpandida += chave[i % chave.length]
    }

    return chaveExpandida
}

function cifrarVigenere(textoClaro, chave) {
    if(textoClaro.length === 0) throw new Error("Texto deve ser informado.")

    const { mapaIndice, mapaCaractere, tamanho } = criarMapas(ALFABETO);
    const chaveExpandida = expandirChave(chave, textoClaro.length);

    let resultado = "";

    for (let i = 0; i < textoClaro.length; i++) {
        const caractereTexto = textoClaro[i];
        const caractereChave = chaveExpandida[i];

        if (!mapaIndice.has(caractereChave)){
            throw new Error(`Caractere da chave fora do alfabeto: '${caractereChave}'`);
        }

        const indiceChave = mapaIndice.get(caractereChave);

        if (!mapaIndice.has(caractereTexto)) {
            throw new Error(`Caractere do texto fora do alfabeto: '${caractereTexto}'`);
        }

        const indiceTexto = mapaIndice.get(caractereTexto);
        const indiceCifrado = (indiceTexto + indiceChave) % tamanho;
        resultado += mapaCaractere[indiceCifrado];
    }

    return resultado;
}

function decifrarVigenere(textoCifrado, chave) {
    if(textoCifrado.length === 0) throw new Error("Texto deve ser informado.")

    const { mapaIndice, mapaCaractere, tamanho } = criarMapas(ALFABETO);
    const chaveExpandida = expandirChave(chave, textoCifrado.length);

    let resultado = "";

    for (let i = 0; i < textoCifrado.length; i++) {
        const caractereCifrado = textoCifrado[i];
        const caractereChave = chaveExpandida[i];

        if (!mapaIndice.has(caractereChave)) {
            throw new Error(`Caractere da chave fora do alfabeto: '${caractereChave}'`);
        }

        const indiceChave = mapaIndice.get(caractereChave);

        if (!mapaIndice.has(caractereCifrado)) {
            throw new Error(`Caractere cifrado fora do alfabeto: '${caractereCifrado}'`);
        }

        const indiceCifrado = mapaIndice.get(caractereCifrado);
        const indiceDecifrado = (indiceCifrado - indiceChave + tamanho) % tamanho;
        resultado += mapaCaractere[indiceDecifrado];
    }

    return resultado;
}

if(require.main === module){
    const textoClaro = '';
    const chave = "CHAVE";

    console.log("Alfabeto:", ALFABETO);
    console.log("Texto original:", textoClaro);
    console.log("Chave:", chave);

    const textoCifrado = cifrarVigenere(textoClaro, chave);
    console.log("Texto cifrado:", textoCifrado);

    const textoDecifrado = decifrarVigenere(textoCifrado, chave);
    console.log("Texto decifrado:", textoDecifrado);
}