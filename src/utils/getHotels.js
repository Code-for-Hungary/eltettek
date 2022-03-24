function cleanPersonData(personName) {
	return personName && personName.trim() ? personName.trim() : [];
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

/**
 * @param {Object<string, string>[]} csvRowsAsObjects
 * @returns {Hotel[]}
 */
export function getHotels(csvRowsAsObjects) {
  return csvRowsAsObjects.map((csvRow, index) => {
    const peps = [
      csvRow['PEP_1'], csvRow['PEP_2'], csvRow['PEP_3'], csvRow['PEP_4'], csvRow['PEP_5'], 
    ];
    return {
      type: 'Feature',
      properties: {
        id: index,
        address: `${csvRow['city']}, ${csvRow['address']}, ${csvRow['zip']}`,
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
