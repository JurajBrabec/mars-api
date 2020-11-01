import mariadb from 'mariadb';
import config from '../mariadb-config.js';

export const pool = mariadb.createPool(config);

export const customers = async () =>
  pool.query(
    `select name from config_customers where obsoleted is null order by name;`
  );
export const data = async ({ source, tower, customer, timePeriod }) => {
  let sql = '';
  if (tower) sql += `set @tower='${tower}';`;
  if (customer) sql += `set @customer='${customer}';`;
  if (timePeriod) sql += `set @datetime_from='${timePeriod}';`;
  sql += `select * from ${source.name};`;
  const data = pool.query(sql);
  return data;
};
export const fields = async (source) =>
  pool.query(
    `select name,title,type,link,description from core_fields 
    where source='${source}' and obsoleted is null order by ord;`
  );
export const formats = async (source) =>
  pool.query(
    `select field,ord,operator,value,style,description,fields from core_formats 
    where '${source}' regexp source and obsoleted is null order by field,ord;`
  );
export const links = async (source) =>
  pool.query(
    `select field,target,ord,filter,operator,value from core_links 
    where '${source}' regexp source and obsoleted is null order by field,target,ord;`
  );
export const reports = async () =>
  pool.query(
    `select name,title,description from core_sources where obsoleted is null order by name;`
  );
export const sources = async (report) =>
  pool.query(
    `select report,ord,name,title,description,fields,link,pivot,tower,customer,timeperiod,\`limit\` 
    from core_sources where name='${report}' and obsoleted is null order by report,ord;`
  );
export const towers = async () =>
  pool.query(
    `select name from config_towers where obsoleted is null order by name;`
  );

export default pool;
