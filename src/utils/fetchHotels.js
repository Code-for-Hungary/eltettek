import { config } from '../config';
import { convertCsvToObject } from './csvParser.js';
import { getHotels, getCategories } from './getHotels'

export async function loadHotels() {
    const response = await fetch(config.csvUrl, {
        method: 'GET',
    });
    const csvString = await response.text();
    const csvRowsAsObjects = convertCsvToObject(csvString);
    return getHotels(csvRowsAsObjects);
}

export async function loadCategories() {
    const response = await fetch(config.categoriesUrl, {
        method: 'GET',
    });
    const csvString = await response.text();
    const csvRowsAsObjects = convertCsvToObject(csvString);
    return getCategories(csvRowsAsObjects);
}