import { EnvironmentService } from '../../environment.variables';
import { white, red, yellow, green, gray, blue } from 'chalk';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { DATABASES } from '../../server.constants';

import * as url from 'url';
const URL = url.URL;

/**
 * Defines if the provided parameter is an empty object {} or not
 */
function isEmptyObject(value) {
    for (const key in value) {
        if (value.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

function getMethodColor(method) {
    let color;
    switch (method) {
        case 'POST':
            color = yellow;
            break;
        case 'GET':
            color = green;
            break;
        case 'PUT':
            color = blue;
            break;
        case 'PATCH':
            color = gray;
            break;
        case 'DELETE':
            color = red;
            break;
    }
    return color;
}

const getOrigin = url => {
    if (url) {
        const newURL = new URL(url);
        return newURL.host;
    } else {
        return null;
    }
};

const getDatabaseFromOrigin = headers => {
    //  El req.headers.origin de postman es undefined, hay que filtrar que otras conexiones no lleguen aqui.
    let subdomainDB,
        isValidSubdomain;
    const origin = getOrigin(headers.origin);

    if (origin) {
        console.log('ORIGIN HERE');
        subdomainDB = origin.split('.')[0].toLowerCase();
        const allowedDbs = DATABASES.map(db => db.toLowerCase());
        console.log('allowed dbs');
        console.log(allowedDbs);
        isValidSubdomain = allowedDbs.includes(`${subdomainDB}`);
    }
    console.log(headers.origin);
    console.log(origin);
    console.log(isValidSubdomain);
    console.log(subdomainDB);

    if (isValidSubdomain) {
        return subdomainDB;
    } else {
        return 'default';
    }
};

const returnExtensionByMime = (mimeType: string): string => {
    console.log('Myme is');
    console.log(mimeType);
    switch(mimeType) {
        case 'text/csv':
            return 'csv';
        break;
        case 'text/html':
            return 'html';
        break;
        case 'text/plain':
            return 'txt';
        break;
        case 'text/css':
            return 'css';
        break;            
        case 'audio/mpeg':
            return 'mp3';
        break;
        case 'image/svg+xml':
            return 'svg';
        break;
        case 'image/gif':
            return 'gif';
        break;
        case 'image/vnd.adobe.photoshop':
            return 'psd';
        break;        
        case 'image/jpeg':
            return 'jpg';
        break;
        case 'image/png':
            return 'png';
        break;
        case 'application/javascript':
            return 'js';
        break;
        case 'application/msword':
            return 'doc';
        break;        
        case 'video/mpeg':
            return 'mpeg';
        break;
        case 'application/pdf':
            return 'pdf';
        break;
        case 'application/xhtml+xml':
            return 'xhtml';
        break;
        case 'application/vnd.ms-excel':
            return 'xls';
        break;
        case 'application/xml':
            return 'xml';
        break;
        case 'application/zip':
            return 'zip';
        break;
        case 'application/x-7z-compressed':
            return '7z';
        break;
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return 'docx';
        break;
    }
};

const isUserOwner = (user, model) => {
    const creatorId = model.creator._id || model.creator;
    const userId = user._id.toString();
    if (creatorId.toString() !== userId) {
        throw new HttpException('You must be the creator', HttpStatus.FORBIDDEN);        
    }
};

const validateEmployerUser = (user) => {
    if (user.userType !== 'employer') {
        throw new HttpException('Error, operation not allowed', HttpStatus.FORBIDDEN);
    }
};

const getRandom = (arr, qty) =>  {
    var result = new Array(qty),
        len = arr.length,
        taken = new Array(len);
    if (qty > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (qty--) {
        var x = Math.floor(Math.random() * len);
        result[qty] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

// Remove the object properties if the value is null/undefined
const removeEmpty = obj => {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') removeEmpty(obj[key]);
    else if (obj[key] === undefined) delete obj[key];
  });
  return obj;
};

export {
    isEmptyObject,
    getMethodColor,
    getOrigin,
    getDatabaseFromOrigin,
    returnExtensionByMime,
    isUserOwner,
    getRandom,
    removeEmpty
};
