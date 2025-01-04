export function download(response: Blob, filename: string) {
  // 创建一个Blob URL，它指向内存中的Blob数据
  const url = window.URL.createObjectURL(response);

  // 创建一个隐藏的<a>标签并设置下载属性
  const a = document.createElement('a');
  a.href = url;
  a.download = filename; // 设定下载文件名，可以根据需要修改

  document.body.appendChild(a); // 将<a>标签添加到页面中

  // 触发<a>标签的点击事件以启动下载
  a.click();

  // 清理创建的URL和<a>标签，避免内存泄露
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
