// <~~ Invoice generetor ~~>
export const INVOICE_TEMPLATE =
  '<!DOCTYPE html>\n' +
  '<html lang="he">\n' +
  '\t<head>\n' +
  '\t\t<meta charset="utf-8" />\n' +
  '\t\t<meta name="viewport" content="width=device-width, initial-scale=1" />\n' +
  '\n' +
  '\t\t<!-- Invoice styling -->\n' +
  '\t\t<style>\n' +
  '\t\t\tbody {\n' +
  '\t\t\t\ttext-align: center;\n' +
  '\t\t\t\tcolor: black;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\tbody h1 {\n' +
  '\t\t\t\tfont-weight: 300;\n' +
  '\t\t\t\tmargin-bottom: 0px;\n' +
  '\t\t\t\tpadding-bottom: 0px;\n' +
  '\t\t\t\tcolor: black;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\tbody h3 {\n' +
  '\t\t\t\tfont-weight: 300;\n' +
  '\t\t\t\tmargin-top: 10px;\n' +
  '\t\t\t\tmargin-bottom: 20px;\n' +
  '\t\t\t\tfont-style: italic;\n' +
  '\t\t\t\tcolor: black;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\tbody a {\n' +
  '\t\t\t\tcolor: black;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.invoice-box {\n' +
  '\t\t\t\tmax-width: 800px;\n' +
  '\t\t\t\tmargin: auto;\n' +
  '\t\t\t\tpadding: 30px;\n' +
  '\t\t\t\tfont-size: 16px;\n' +
  '\t\t\t\tline-height: 24px;\n' +
  '\t\t\t\tcolor: black;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.invoice-box table {\n' +
  '\t\t\t\twidth: 100%;\n' +
  '\t\t\t\tline-height: inherit;\n' +
  '\t\t\t\ttext-align: left;\n' +
  '\t\t\t\tborder-collapse: collapse;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.invoice-box table td {\n' +
  '\t\t\t\tpadding: 5px;\n' +
  '\t\t\t\tvertical-align: top;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.invoice-box table tr td:nth-child(2) {\n' +
  '\t\t\t\ttext-align: right;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.invoice-box table tr.top table td {\n' +
  '\t\t\t\tpadding-bottom: 20px;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.invoice-box table tr.top table td.title {\n' +
  '\t\t\t\tfont-size: 45px;\n' +
  '\t\t\t\tline-height: 45px;\n' +
  '\t\t\t\tcolor: black;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.invoice-box table tr.information table td {\n' +
  '\t\t\t\tpadding-bottom: 40px;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.invoice-box table tr.heading td {\n' +
  '\t\t\t\tbackground: rgb(238, 238, 238);\n' +
  '\t\t\t\tborder-bottom: 1px solid rgb(221, 221, 221);\n' +
  '\t\t\t\tfont-weight: bold;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.invoice-box table tr.details td {\n' +
  '\t\t\t\tpadding-bottom: 20px;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.invoice-box table tr.item td {\n' +
  '\t\t\t\tborder-bottom: 1px solid rgb(238, 238, 238);\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.invoice-box table tr.item.last td {\n' +
  '\t\t\t\tborder-bottom: none;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.invoice-box table tr.total td:nth-child(1) {\n' +
  '\t\t\t\tborder-top: 2px solid rgb(238, 238, 238);\n' +
  '\t\t\t\tfont-weight: bold;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t@media only screen and (max-width: 600px) {\n' +
  '\t\t\t\t.invoice-box table tr.top table td {\n' +
  '\t\t\t\t\twidth: 100%;\n' +
  '\t\t\t\t\tdisplay: block;\n' +
  '\t\t\t\t\ttext-align: center;\n' +
  '\t\t\t\t}\n' +
  '\n' +
  '\t\t\t\t.invoice-box table tr.information table td {\n' +
  '\t\t\t\t\twidth: 100%;\n' +
  '\t\t\t\t\tdisplay: block;\n' +
  '\t\t\t\t\ttext-align: center;\n' +
  '\t\t\t\t}\n' +
  '\t\t\t}\n' +
  '\t\t</style>\n' +
  '\t</head>\n' +
  '\n' +
  '\t<body>\n' +
  '\t\t<div class="invoice-box">\n' +
  '\t\t\t<table>\n' +
  '\t\t\t\t<tr class="top">\n' +
  '\t\t\t\t\t<td colspan="2">\n' +
  '\t\t\t\t\t\t<table>\n' +
  '\t\t\t\t\t\t\t<tr>\n' +
  '\t\t\t\t\t\t\t\t<td>\n' +
  '\t\t\t\t\t\t\t\t\tקרמר-ברוש-ביתאן<br />\n' +
  '\t\t\t\t\t\t\t\t\tיבנאל, 15225<br />\n' +
  '\t\t\t\t\t\t\t\t</td>\n' +
  '\n' +
  '\t\t\t\t\t\t\t\t<td>\n' +
  '\t\t\t\t\t\t\t\t\tתאריך: {DATE_NOW}<br />\n' +
  '\t\t\t\t\t\t\t\t\tשעה: {HOUR_NOW}<br />\n' +
  '\t\t\t\t\t\t\t\t</td>\n' +
  '\t\t\t\t\t\t\t</tr>\n' +
  '\t\t\t\t\t\t</table>\n' +
  '\t\t\t\t\t</td>\n' +
  '\t\t\t\t</tr>\n' +
  '\n' +
  '\t\t\t\t<tr class="information">\n' +
  '\t\t\t\t\t<td colspan="2">\n' +
  '\t\t\t\t\t\t<table>\n' +
  '\t\t\t\t\t\t\t<tr>\n' +
  '\t\t\t\t\t\t\t\t<td>\n' +
  '\t\t\t\t\t\t\t\t</td>\n' +
  '\n' +
  '\t\t\t\t\t\t\t\t<td>\n' +
  '\t\t\t\t\t\t\t\t\tשם השוקל: {SCALER_NAME}<br />\n' +
  '\t\t\t\t\t\t\t\t\tמספר טלפון: {SCALER_PHONE}<br />\n' +
  '\t\t\t\t\t\t\t\t\tמקור: {ORIGIN} <br>\n' +
  '\t\t\t\t\t\t\t\t\tיעד: {DESTINATION} <br>\n' +
  '\t\t\t\t\t\t\t\t</td>\n' +
  '\t\t\t\t\t\t\t</tr>\n' +
  '\t\t\t\t\t\t</table>\n' +
  '\t\t\t\t\t</td>\n' +
  '\t\t\t\t</tr>\n' +
  '\n' +
  '\t\t\t\t<tr class="heading">\n' +
  '\t\t\t\t\t<td></td>\n' +
  '\t\t\t\t\t<td>פרטי המטען</td>\n' +
  '\t\t\t\t</tr>\n' +
  '\n' +
  '\t\t\t\t<tr class="item">\n' +
  '\t\t\t\t\t<td>{MATERIAL_TYPE}</td>\n' +
  '\t\t\t\t\t<td>סוג החומר</td>\n' +
  '\t\t\t\t</tr>\n' +
  '\n' +
  '\t\t\t\t<tr class="item">\n' +
  '\t\t\t\t\t<td>{MORE_INFO}</td>\n' +
  '\t\t\t\t\t<td>פרטים נוספים</td>\n' +
  '\t\t\t\t</tr>\n' +
  '\n' +
  '\t\t\t\t<tr class="heading">\n' +
  '\t\t\t\t\t<td></td>\n' +
  '\t\t\t\t\t<td>פרטי הרכב</td>\n' +
  '\t\t\t\t</tr>\n' +
  '\n' +
  '\t\t\t\t<tr class="item">\n' +
  '\t\t\t\t\t<td>{VEHICLE_NUMBER}</td>\n' +
  '\t\t\t\t\t<td>מספר רכב</td>\n' +
  '\t\t\t\t</tr>\n' +
  '\n' +
  '\t\t\t\t<tr class="item">\n' +
  '\t\t\t\t\t<td>{DRIVER_NAME}</td>\n' +
  '\t\t\t\t\t<td>שם הנהג</td>\n' +
  '\t\t\t\t</tr>\n' +
  '\n' +
  '\t\t\t\t<tr class="item">\n' +
  '\t\t\t\t\t<td>{TOTAL_WEIGHT}</td>\n' +
  '\t\t\t\t\t<td>משקל ברוטו</td>\n' +
  '\t\t\t\t</tr>\n' +
  '\n' +
  '\t\t\t\t<tr class="item">\n' +
  '\t\t\t\t\t<td>{TARE_WEIGHT}</td>\n' +
  '\t\t\t\t\t<td>משקל טרה</td>\n' +
  '\t\t\t\t</tr>\n' +
  '\n' +
  '\t\t\t\t<tr class="total">\n' +
  '\t\t\t\t\t<td>משקל נטו: {NET_WEIGHT} ק״ג</td>\n' +
  '\t\t\t\t</tr>\n' +
  '\t\t\t</table>\n' +
  '\t\t</div>\n' +
  '\t</body>\n' +
  '</html>';

export const DATE_NOW = '{DATE_NOW}';
export const HOUR_NOW = '{HOUR_NOW}';
export const SCALER_NAME = '{SCALER_NAME}';
export const SCALER_PHONE = '{SCALER_PHONE}';
export const ORIGIN = '{ORIGIN}';
export const DESTINATION = '{DESTINATION}';
export const MATERIAL_TYPE = '{MATERIAL_TYPE}';
export const MORE_INFO = '{MORE_INFO}';
export const VEHICLE_NUMBER = '{VEHICLE_NUMBER}';
export const DRIVER_NAME = '{DRIVER_NAME}';
export const TOTAL_WEIGHT = '{TOTAL_WEIGHT}';
export const TARE_WEIGHT = '{TARE_WEIGHT}';
export const NET_WEIGHT = '{NET_WEIGHT}';

//<~~ Firebase ~~>
export const USERS_DB = 'Users';
