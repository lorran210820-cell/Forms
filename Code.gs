const SHEET_NAME = 'Efetivo';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const payload = JSON.parse(e.postData.contents);
    validate_(payload);
    const sheet = getSheet_();
    const submittedAt = new Date();
    const submissionId = Utilities.getUuid();
    const rows = payload.entries.map(item => [
      submissionId,
      submittedAt,
      payload.referenceDate,
      clean_(payload.foreman),
      clean_(item.registration),
      item.status
    ]);
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
    return json_({ ok: true, submissionId: submissionId, count: rows.length });
  } catch (error) {
    return json_({ ok: false, error: error.message });
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['ID do envio', 'Enviado em', 'Data de referência', 'Encarregado', 'Matrícula', 'Situação']);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#083b66').setFontColor('#ffffff');
  }
  return sheet;
}

function validate_(data) {
  const allowed = ['PRESENTE', 'FALTA', 'FOLGA', 'ATESTADO', 'AFASTADO'];
  if (!data || !String(data.foreman || '').trim()) throw new Error('Encarregado não informado.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.referenceDate || '')) throw new Error('Data inválida.');
  if (!Array.isArray(data.entries) || data.entries.length < 1 || data.entries.length > 200) throw new Error('Quantidade de registros inválida.');
  const registrations = new Set();
  data.entries.forEach(item => {
    const registration = clean_(item.registration);
    if (!registration || registration.length > 30) throw new Error('Matrícula inválida.');
    if (registrations.has(registration)) throw new Error('Matrícula repetida.');
    if (!allowed.includes(item.status)) throw new Error('Situação inválida.');
    registrations.add(registration);
  });
}

function clean_(value) {
  const text = String(value || '').trim();
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
