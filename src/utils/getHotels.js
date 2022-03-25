function cleanPersonData({name, link}) {
	return name && name.trim() ? { name: name.trim(), link } : [];
}

/**
 * @param {string[]} people
 * @returns {string[]} Without empty ones, and with "!!!"-s removed
 */
function cleanAllPeps(people) {
  return people.flatMap(cleanPersonData);
}

function parseCoordinates(coordStr) {
  const floatable = coordStr.replace(',', '.')
  return parseFloat(floatable)
}

function createAddress(city, address, zip) {
  let result = city;
  if (address) result = `${result}, ${address}`;
  if (zip) result = `${result}, ${zip}`;
  return result;
}

/**
 * @param {Object<string, string>[]} csvRowsAsObjects
 * @returns {Hotel[]}
 */
export function getHotels(csvRowsAsObjects) {
  return csvRowsAsObjects.map((csvRow, index) => {
    const peps = ['PEP_1', 'PEP_2', 'PEP_3', 'PEP_4', 'PEP_5'].map(name => {
      return { name: csvRow[name], link: csvRow[`${name}_link`] }
    });
    
    return {
      type: 'Feature',
      properties: {
        id: index,
        address: createAddress(csvRow['city'], csvRow['address'], csvRow['zip']),
        company: {
          name: csvRow['kekva_nev'].trim(), 
          link: csvRow['kekva_link'], 
          info: csvRow['kekva_info'],
          code: csvRow['kekva_kod'],
        },
        name: csvRow['location_name'],
        city: csvRow['city'],
        type: csvRow['tipus'],
        link: csvRow['news'],
        peps: cleanAllPeps(peps),
        date: csvRow['date'],
        details: csvRow['details'],
        imageUrl: csvRow['pic_url']
      },
      geometry: {
        type: 'Point',
        coordinates: [parseCoordinates(csvRow['lat']), parseCoordinates(csvRow['lng'])],
      },
    };
  });
}

export function getCategories(csvRowsAsObjects) {
  return csvRowsAsObjects.reduce((object, csvRow) => {
    object[csvRow.kekva_kod] = csvRow.kekva_nev;
    return object
  }, {})
}
