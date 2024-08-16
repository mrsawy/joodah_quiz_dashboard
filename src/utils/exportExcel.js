import * as XLSX from 'xlsx';

const exportExcel = (data) => {
  const workSheet = XLSX.utils.json_to_sheet(data);
  const workBook = XLSX.utils.book_new(data);
  XLSX.utils.book_append_sheet(workBook, workSheet, `test`);
  //Buffer
  XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' });
  //Binary string
  XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' });
  //Download
  XLSX.writeFile(workBook, 'report.xlsx');
};

export default exportExcel;
