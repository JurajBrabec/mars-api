import * as db from '../models/mariadb.js';
import htmlTable from '../table.js';

export const customers = async (req, res) => {
  try {
    res.json(await db.customers());
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const reports = async (req, res) => {
  try {
    res.json(await db.reports());
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const report = async (req, res) => {
  const { reportName } = req.params;
  const { tower, customer, timePeriod, mode } = req.query;
  try {
    const sources = await db.sources(reportName);
    if (sources.length == 0)
      return res
        .status(404)
        .json({ error: `Invalid report name '${reportName}'` });
    const source = sources[0];
    const result = await db.data({ source, tower, customer, timePeriod });
    const data = result.pop();
    switch (mode) {
      case 'html':
        const fields = await db.fields(reportName);
        const formats = await db.formats(reportName);
        const links = await db.links(reportName);
        const html = htmlTable({ source, fields, formats, links, data });
        res.send(html);
        break;
      default:
        res.json(data);
        break;
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const towers = async (req, res) => {
  try {
    res.json(await db.towers());
  } catch (error) {
    res.status(400).json({ error });
  }
};
