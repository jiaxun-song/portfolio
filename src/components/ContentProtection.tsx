'use client';

import { useEffect } from 'react';

/**
 * 內容保護：擋掉右鍵選單、複製／剪下、圖片拖曳與相關快捷鍵。
 * 文字選取本身由 globals.css 的 user-select 關閉。
 *
 * 這層只擋得住一般訪客順手的複製，擋不掉檢視原始碼、DevTools、
 * 關掉 JS 或爬蟲——那些是瀏覽器層級的能力，前端無法封鎖。
 *
 * 未來若加入表單／輸入框，替該區塊加上 .selectable class 即可豁免。
 */
const EXEMPT = 'input, textarea, select, [contenteditable="true"], .selectable';
const BLOCKED_KEYS = ['c', 'x', 'a', 's', 'u'];

export default function ContentProtection() {
  useEffect(() => {
    const isExempt = (target: EventTarget | null) =>
      target instanceof Element && target.closest(EXEMPT) !== null;

    const block = (e: Event) => {
      if (isExempt(e.target)) return;
      e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || isExempt(e.target)) return;
      if (BLOCKED_KEYS.includes(e.key?.toLowerCase())) e.preventDefault();
    };

    document.addEventListener('contextmenu', block);
    document.addEventListener('copy', block);
    document.addEventListener('cut', block);
    document.addEventListener('dragstart', block);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('contextmenu', block);
      document.removeEventListener('copy', block);
      document.removeEventListener('cut', block);
      document.removeEventListener('dragstart', block);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return null;
}
