/**
 *	Objectives:
 *	1: File Operations:
 *		1. Create File Interface
 *		2. Read File Interface
 *		3. Write File Interface
 *		4. Delete File Interface
 *	2: Folder Operation:
 *		1. Create Folder Interface
 *		2. Read Folder Interface
 *		3. Delete Folder Interface
 */

// Load Module Dependencies
var fs = require('fs');

// Interfaces
exports.createFile = createFile;
exports.read = readFile;
exports.write = writeFile;
exports.deleteFile = removeFile;
exports.createFolder = createDir;
exports.readFolder = readDir;
exports.deleteFolder = removeDir;

// This function creates a file
function createFile(filename, callback){
	var flags = 'a';
	var mode  = 0777; 
	fs.open(filename, flags, mode, function cb(err, fd){
		if(err) {
			var er = new Error('Something went wrong!');
			return callback(er);
		}
		// Return data back to callback
		callback(null, fd);
	});
}

// This function returns a read method files
function readFile(filename, callback){
	var opts = {
		encoding: 'utf-8'
	}
	fs.readFile(filename, opts, function cb(err, data){
		if(err) {
			var er = new Error('Something went wrong!');
			return callback(er);
		}
		// Return data back to callback
		callback(null, data);
	});
}

// This method returns a write method files
function writeFile(filename, data, callback){
	fs.writeFile(filename, data, function cb(err){
		if(err) {
			var er = new Error('Something went wrong!');
			return callback(er);
		}
		// return a callback notification
		callback(null, `data has been sucessfully written to ${filename} !`);
	});
}

// This method removes a file
function removeFile(filename, callback){
	fs.unlink(filename, function cb(err){
		// Error Handler
		if(err) {
			var er = new Error('Something went wrong!');
			return callback(er);
		}
		// notify the user
		callback(null, `${filename} has been sucessfully deleted!`)
	})
}

// This method creates a directory
function createDir(foldername, callback){
	fs.mkdir(foldername, function cb(err){
		// Error handling
		if(err) {
			var er = new Error('Something went wrong!');
			return callback(er);
		} 
		// notify user
		callback(null, `${foldername} folder is sucessfully created!`);
	});
}

// This method reads the content of a directory
function readDir(foldername, callback){
	fs.readdir(foldername, function cb(err, files){
		// Error handling
		if(err) {
			var er = new Error('Something went wrong!');
			return callback(er);
		}
		// return files back to callback
		callback(null, files); 
	});
}

// This method removes a directory
function removeDir(foldername, callback){
	fs.rmdir(foldername, function cb(err, files){
		// Error handling
		if(err) {
			var er = new Error('Something went wrong!');
			return callback(er);
		}
		// notification to callback
		callback(null, `${foldername} folder is sucessfully deleted!`); 
	});
}
