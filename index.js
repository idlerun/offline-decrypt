const CryptoJS = require("crypto-js");
const fs = require("fs");

// DOWNLOADED FILE NAME
const enc_file = "../../Downloads/3a3a771a5f242498.enc";

// VALUES FROM METADATA PROPERTIES
const salt_hex = "b01835d790dbc9792b1640212e97aba255c29cf85f439e849518d4a74664a943";
const pass = "test";
const iterations = 2000;
const enc_name = "494fb591ec766d797b3cda21dbc1dc700ae1820203851a2598c116588d91fa65";


// Shouldn't need to change anything past here

const salt = CryptoJS.enc.Hex.parse(salt_hex);
const key = CryptoJS.PBKDF2(pass, salt, { keySize: 256/32, iterations });
const key_hash = CryptoJS.SHA256(key.toString(CryptoJS.enc.Hex)).toString(CryptoJS.enc.Hex);	
console.log("KEY_HASH=", key_hash);

var filename = CryptoJS.AES.decrypt( { ciphertext: CryptoJS.enc.Hex.parse(enc_name)},
	key, { iv: salt, padding: CryptoJS.pad.Pkcs7, mode: CryptoJS.mode.OFB })
	.toString(CryptoJS.enc.Utf8);

console.log("FILE_NAME=", filename);

var decryptor = CryptoJS.algo.AES.createDecryptor(
	key, { iv: salt, padding: CryptoJS.pad.NoPadding, mode: CryptoJS.mode.OFB });

var reader = fs.createReadStream(enc_file);
var writer = fs.createWriteStream(filename);

reader.on('data', function (chunk) {
	var d = decryptor.process(CryptoJS.enc.Hex.parse(chunk.toString("hex")));
    writer.write(Buffer.from(d.toString(CryptoJS.enc.Hex), "hex"));
});
  
reader.on('end', function () {
	var d = decryptor.finalize();
	writer.write(Buffer.from(d.toString(CryptoJS.enc.Hex), "hex"));
	writer.close();
});