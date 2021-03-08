import json
import string
import random
from datetime import datetime

import pytz
from flask import Response
import gspread
from oauth2client.service_account import ServiceAccountCredentials

import config
import credentials

# Authorize Google Sheets
try:
	scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
	credentials = ServiceAccountCredentials.from_json_keyfile_dict(credentials.credentials(), scope)
	gc = gspread.authorize(credentials)
except OSError:
	print("JSON file with Google account credentials not found!")
	exit(1)

# Open sheets
datasheet = gc.open(config.spreadsheet).sheet1
indexsheet = gc.open(config.spreadsheet).worksheet("index")
index = int(indexsheet.cell(1, 1).value)

def add_row(short, long):
  global index

  short = ensure_unique(short)

  timestamp = datetime.now(pytz.timezone("US/Eastern")).strftime("%d/%m/%Y %H:%M:%S")

  cells = datasheet.range("B" + str(index + 1) + ":E" + str(index + 1))
  cells[0].value = timestamp
  cells[1].value = 0
  cells[2].value = short
  cells[3].value = long
  datasheet.update_cells(cells, "USER_ENTERED")

  index += 1
  indexsheet.update("A1", index)

  response = {"status": 201, "message": "Added!", "short": short}
  return Response(json.dumps(response), status=201, mimetype="application/json")

def get_row(short_url):
  data = datasheet.get_all_values()

  for i, row in enumerate(data):
    if(row[3] == short_url):
      datasheet.update_cell(i+1, 3, int(row[2])+1)
      response = {"status": 301, "url": row[4]}
      return Response(json.dumps(response), status=301, mimetype="application/json")

  response = {"status": 404, "message": "URL doesn't exist!"}
  return Response(json.dumps(response), status=404, mimetype="application/json")

def generate_random(length):
  letters = string.ascii_lowercase
  return("".join(random.choice(letters) for i in range(length)))

def ensure_unique(url):
  data = datasheet.get_all_values()

  while True:
    already_exists = False
    for row in data:
      if row[3] == url:
        already_exists = True
        url = generate_random(config.random_url_length)
        break;

    if(not already_exists): break;

  return url
