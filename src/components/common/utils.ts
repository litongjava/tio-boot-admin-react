export const prettify = (key: string) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());

export const isEmpty = (v: any) =>
  v === null || v === undefined || (typeof v === 'string' && v.trim() === '');

export const looksLikeDateTime = (v: any) =>
  typeof v === 'string' && /\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}:\d{2}(?:\.\d+)?)?/.test(v);

export const isURL = (v: any) =>
  typeof v === 'string' && /^https?:\/\/[\w\-]+(\.[\w\-]+)+([/?#].*)?$/i.test(v);

export const isImageURL = (v: string) =>
  /^data:image\//i.test(v) ||
  /\.(png|jpe?g|gif|webp|svg|bmp|ico)(\?.*)?$/i.test(v) ||
  /\/image\/|\/images\/|imgcdn|cloudfront|clerk\.com\/.*\/image/i.test(v);

export const formatDateTime = (v: string) => {
  const d = new Date(v.replace(' ', 'T'));
  return Number.isFinite(d.getTime()) ? d.toLocaleString() : v;
};

/**
 * 构建打印 HTML（与原版逻辑一致）
 * 注意：为了避免在运行期对对象/数组做无意义 stringify，这里是打印时才做
 */
export function buildPrintHTML(params: {
  dataObj: Record<string, any>;
  keys: string[];
  hideEmpty: boolean;
  titleMap?: Record<string, any>;
  title?: React.ReactNode;
  printTitle?: string;
}) {
  const { dataObj, keys, hideEmpty, titleMap, title, printTitle } = params;

  const escapeHTML = (s: any) =>
    String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const rows = keys
    .filter((k) => !(hideEmpty && isEmpty((dataObj as any)[k])))
    .map((k) => {
      const raw = (dataObj as any)[k];
      let val: string;

      if (raw === null || raw === undefined || (typeof raw === 'string' && raw.trim() === '')) {
        val = '-';
      } else if (Array.isArray(raw) || (typeof raw === 'object' && raw !== null)) {
        val = `<pre style="white-space:pre-wrap;margin:0">${escapeHTML(
          JSON.stringify(raw, null, 2),
        )}</pre>`;
      } else if (typeof raw === 'boolean') {
        val = raw ? 'Yes' : 'No';
      } else if (typeof raw === 'string' && isURL(raw)) {
        if (isImageURL(raw)) {
          val = `<div style="display:flex;flex-direction:column;gap:6px">
                   <img src="${escapeHTML(
            raw,
          )}" style="max-width:260px;max-height:260px;object-fit:contain;border:1px solid #eee;border-radius:6px" />
                   <a href="${escapeHTML(raw)}" target="_blank" rel="noreferrer">${escapeHTML(
            raw,
          )}</a>
                 </div>`;
        } else {
          val = `<a href="${escapeHTML(raw)}" target="_blank" rel="noreferrer">${escapeHTML(
            raw,
          )}</a>`;
        }
      } else {
        val = escapeHTML(raw);
      }

      const label =
        titleMap?.[k] !== undefined ? escapeHTML(String(titleMap[k])) : prettify(k);

      return `<tr>
        <th style="vertical-align:top;padding:8px 10px;border:1px solid #e5e5e5;background:#fafafa;width:220px">${label}</th>
        <td style="padding:8px 10px;border:1px solid #e5e5e5">${val}</td>
      </tr>`;
    })
    .join('');

  const docTitle =
    (typeof printTitle === 'string' && printTitle) ||
    (typeof title === 'string' && title) ||
    (dataObj?.id ? String(dataObj.id) : 'Detail');

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>${escapeHTML(docTitle)}</title>
<style>
  @page { size: A4; margin: 16mm; }
  * { box-sizing: border-box; }
  body { font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,'Apple Color Emoji','Segoe UI Emoji'; color:#111; }
  h1 { font-size: 20px; margin: 0 0 16px; }
  table { border-collapse: collapse; width: 100%; font-size: 12px; }
  a { color: #1677ff; text-decoration: none; word-break: break-all; }
  pre { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; }
  .header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:12px; }
  .meta { color:#888; font-size:12px; }
  @media print { .noprint { display:none; } }
</style>
</head>
<body>
  <div class="header">
    <h1>${escapeHTML(docTitle)}</h1>
    <div class="meta">Generated at ${escapeHTML(new Date().toLocaleString())}</div>
  </div>
  <table>${rows}</table>
  <script>
    function allImgsLoaded() {
      const imgs = Array.from(document.images || []);
      if (imgs.length === 0) return Promise.resolve();
      return Promise.allSettled(imgs.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(res => { img.onload = img.onerror = res; });
      }));
    }
    allImgsLoaded().then(() => { window.print(); });
  </script>
</body>
</html>`;
}
