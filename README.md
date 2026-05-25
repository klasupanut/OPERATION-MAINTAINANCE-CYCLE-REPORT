# Warehouse Operation Dashboard

A browser-based dashboard for monitoring warehouse asset improvement cycles from Excel data. The app summarizes current status, upcoming work, and budget requirements in real time as the data or filters change.

## How to Use

1. Open `index.html` in a browser.
2. Click `Import Excel` and select an `.xlsx`, `.xls`, or `.csv` file.
3. Or use the built-in Warehouse Operation Dashboard Google Sheet URL and click `Refresh Sheet Data`.
4. Use the discipline, status, and search filters to review the improvement register.
5. Click `Export CSV` to export the filtered records.

## Google Sheet Sync

The dashboard can read Google Sheet data when the sheet is shared publicly. The app now includes the Warehouse Operation Dashboard template URL as the default sync source.

Template:

- [Warehouse Operation Dashboard Template](https://docs.google.com/spreadsheets/d/1UdyLxEI-v07rzwpKanJAGuJlyPV8bC9BN9gxBxXnB1U/edit)

Recommended setup:

1. Create a Google Sheet using the supported columns below.
2. Or make a copy of the template above.
3. Click `Share`.
4. Set `General access` to `Anyone with the link`.
5. Set the role to `Viewer`.
6. Copy the normal Google Sheet URL, such as `https://docs.google.com/spreadsheets/d/.../edit#gid=0`.
7. Paste it into `Google Sheet URL` and click `Refresh Sheet Data` if you want to override the built-in default URL.

The app uses the Google Visualization API JSONP endpoint for normal Google Sheet URLs, which avoids browser CORS issues when the dashboard is opened from a local file or static website.

## Supported Excel Columns

The app maps these English headers automatically:

| Field | Accepted Column Names |
| --- | --- |
| Project | project, project name, site, warehouse project |
| Block | block, building block, zone block |
| Unit | unit, unit no, unit number, warehouse unit |
| Discipline | category, discipline, type, work category. Supported examples: Structural, Architectural, Electrical, Ventilation system |
| Asset | asset, equipment, item, component, asset name |
| Area | location, area, zone, position |
| Improvement Cycle | cycle, improvement cycle, frequency, interval. Use numeric months only, e.g. 1, 3, 6, 12, 24, 60 |
| Last Update | last update, last maintenance, last date |
| Due Date | due date, next due, next update. In the Google Sheet template this is calculated automatically from last update + improvement cycle |
| Priority | priority, criticality, importance |
| Status | status |
| Contractor | contractor, vendor, supplier |
| Owner | owner, responsible, pic, person in charge |
| Budget | budget, cost, amount |

## Status Rules

- `Overdue`: due date is earlier than today.
- `Due Soon`: due within 30 days.
- `Planned`: due after 30 days.
- `Completed`: status is set to done, complete, or completed.

## Budget Horizons

The dashboard calculates budget by multiplying `budget` by the number of required improvement occurrences based on the `cycle` and `due date`.

- `Short Term`: within 2 years.
- `Mid Term`: within 5 years.
- `Long Term`: within 10 years.

If an item is already overdue, the app counts one occurrence now and then counts the next cycles from today.

## Forecast

The dashboard shows a 5-year annual budget forecast based on each record's `due date`, `improvement cycle`, and `budget`.

## Project Filter Values

- F&WH CHODTHANAWAT 1
- F&WH CHODTHANAWAT 2
- F&WH CHODTHANAWAT 3
- F&WH CHODTHANAWAT 5
- CHODBIZ CHAENGWATTANA
- CHODBIZ BANGNA KM.8
- CHODBIZ PUTTHAMONTHON SAI 4

Note: Reading `.xlsx/.xls` files and rendering charts requires internet access for the SheetJS and Chart.js CDN libraries. CSV files can still be read without the Excel reader library.
