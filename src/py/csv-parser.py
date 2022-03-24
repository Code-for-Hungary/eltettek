import csv
import json

file = 'map_data.csv'
jsonFilePath = 'map_data.json'

arr = []
id = 0


def get_main_peps(arr):
	new_arr = []
	for name in arr:
		if name.startswith('!!!'):
			name = name.replace('!', '').strip()
		new_arr.append(name)
	return new_arr


def clean_peps(arr):
	new_arr = []
	for name in arr:
		if name != '':
			name = name.replace('!', '').strip()
		new_arr.append(name)
	return new_arr


def parse_coords(coord_str):
	floatable = coord_str.replace(',', '.')
	return float(floatable)


with open(file) as csvFile:
	csvReader = csv.DictReader(csvFile)

	for csvRow in csvReader:
		peps = [
			csvRow['PEP_1'],
			csvRow['PEP_2'],
			csvRow['PEP_3']
		]
		address = f'{csvRow['city']}, {csvRow['address']}, {csvRow['zip']}'
		data = {
			'type': 'Feature',
			'properties': {
				'id': id,
				'address': address,
				'company': {'name': csvRow['company'].strip(), 'link': csvRow['company_link']},
				'name': csvRow['location_name'],
				'city': csvRow['city'],
				'type': csvRow['type'],
				'link': csvRow['news'],
				'mainPeps': get_main_peps(peps),
				'peps': clean_peps(peps),
				'date': csvRow['date'],
				'details': csvRow['details']
			},
			'geometry': {
				'type': 'Point',
				'coordinates': [parse_coords(csvRow['lat']), parse_coords(csvRow['lng'])]
			}
		}
		id = id + 1
		arr.append(data)


with open(jsonFilePath, "w") as jsonFile:
    jsonFile.write(json.dumps(arr, indent = 2))