const table = (id, fields, formats, links, data) =>
  `${tableStyles(formats)}<table id="${id}">\n${tableRow(
    tableHeader(fields, [])
  )}${tableData(fields, formats, data).join('')}</table>`;

const styles = (formats) => [
  ...new Set(formats.reduce((styles, format) => [...styles, format.style], [])),
];

const tableStyles = (formats) =>
  `<style> ${styles(formats)
    .map((style, i) => `.c${i} {${style}}`)
    .join(' ')}</style>\n`;

const tableClasses = (classes = []) =>
  classes.length ? ` class="${classes.join(' ')}"` : ``;

const tableRow = (columns, classes = []) =>
  `<tr${tableClasses(classes)}>${columns.join('')}</tr>\n`;

const compareValue = (field, operator, value) => {
  switch (operator) {
    case '=':
      return field == value;
    case '!=':
      return field != value;
    case '>':
      return field > value;
    case '<':
      return field < value;
    case '>=':
      return field >= value;
    case '<=':
      return field <= value;
    default:
      return true;
  }
};

const tableRowClasses = (row, formats) => {
  const classes = [];
  formats.map((format, i) => {
    if (compareValue(row[format.field], format.operator, format.value))
      classes[format.field] = `c${i}`;
  });
  const result = [];
  for (var item in classes) {
    result.push(classes[item]);
  }
  return result;
};

const tableHeader = (fields, classes = []) =>
  fields.map((field) => `<th${tableClasses(classes)}>${field.title}</th>`);

const tableData = (fields, formats, data) =>
  data.map((row) =>
    tableRow(
      fields.map((field) => `<td>${tableValue(field, row)}</td>`),
      tableRowClasses(row, formats)
    )
  );
const tableValue = (field, row) => formatValue(field.type, row[field.name]);

const formatValue = (type, value) => {
  if (value === null || value === undefined) return '';
  switch (type) {
    case 'STRING':
      return value;
    case 'DATE':
      return new Date(value).toDateString();
    case 'NUMBER':
      return value.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$& ');
    case 'FLOAT':
      return value.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$& ');
    default:
      return `${type}:${value}`;
  }
};

export default table;
