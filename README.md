---
page: https://idle.run/offline-decrypt
title: Offline Decrypt of Google Drive Encrypted Files
tags: nodejs, encryption
date: 2020-01-02
---

A while ago I created https://drive-encrypt.com for storing encrypted files in Google Drive with client-side encryption.

One of the fears for using such a system is what happens if https://drive-encrypt.com went offline. This repository is the answer to that fear.

## Requirements

- Install NodeJS and NPM
- Clone this repository
- Run `npm install` in the checkout dir to install crypto-js

## Get the File

Download your encrypted file (with a `.enc` extension) from Google Drive to the checkout directory. 
You can also download elsewhere, but will need to worry more about input and output paths.

## Get the Encryption Parameters

Metadata is stored along with each file which contains crutial parameters for encryption. The easiest way to get them manually is with the Google Drive API Explorer:

#### File ID

First we need the file ID:

https://developers.google.com/drive/api/v3/reference/files/list?apix=true&apix_params=%7B%22q%22%3A%22name%20%3D%20%27d10c584654379418.enc%27%22%7D#try-it

Edit the `q` parameter to match the name of your `.enc` file and press execute. Copy the `file ID` from the response

#### Properties

Edit the `file ID` parameter to match the output of the previous request, then execute and note the properties returned for the file.

https://developers.google.com/drive/api/v3/reference/files/get?apix_params=%7B%22fileId%22%3A%221LDAhaOi5qEYFuyeg6Po_1PiNt7WNeRt8%22%2C%22fields%22%3A%22properties%22%7D#try-it

#### Apply the parameters

Edit index.js and set the filename and matching encryption parameters based on the results of the request above

## Run the Decryption

Just run `node .` to decrypt the file
