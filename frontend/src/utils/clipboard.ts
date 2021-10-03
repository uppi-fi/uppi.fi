export async function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  // "document.execCommand" fallback method
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // Move out of viewport
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  const wasCopied = document.execCommand('copy');
  textArea.remove();
  return wasCopied;
}
