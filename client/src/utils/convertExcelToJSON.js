import * as XLSX from "xlsx";

// Utility function
export const convertExcelToJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const users = XLSX.utils
          .sheet_to_json(sheet, { defval: "" })
          .map((user) => ({
            name: user["name"]?.trim(),
            email: user["email"]?.trim(),
          }));

        resolve(users);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
};
