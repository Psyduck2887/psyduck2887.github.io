import { AnatoloSearch } from '../components/search';
import * as comment from './comment';
import { darkLightToggle } from './dark-light-toggle';
import { site } from './site';

async function getPageTitle() {
  return (await site.thisPage())?.title ?? document.querySelector('title')?.textContent ?? '';
}

// Classes for interacting with elements in static HTML
export const Anatolo = {
  comment,
  site,
  search: new AnatoloSearch(),
  getPageTitle,
  share: {
    native: async () => {
      const title = await getPageTitle();
      if (window.navigator.share) {
        try {
          await window.navigator.share({
            url: window.location.href,
            text: title,
            title,
          });
          return;
        } catch (_e) {
          // 用户取消或分享失败，降级复制链接。
        }
      }
      const { copyToClipboard } = await import('../utils/copy-to-clipboard');
      await copyToClipboard(window.location.href);
      const indicator = document.querySelector('#success-indicator');
      if (indicator) indicator.classList.add('show');
    },
  },
  darkLightToggle,
};
