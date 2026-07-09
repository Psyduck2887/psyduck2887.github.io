const cp = require('child_process');
const fs = require('fs');
const path = require('path');

/** @param {import("hexo")} hexo */
module.exports = function (hexo) {
  if (hexo.env?.cmd?.startsWith('n')) {
    return;
  }

  const themeDir = path.resolve(hexo.base_dir, 'themes/Anatolo');
  const bundleJs = path.join(themeDir, 'source/js_complied/bundle.js');
  const bundleCss = path.join(themeDir, 'source/js_complied/bundle.css');
  const shouldBuild = process.env.ANATOLO_BUILD_ASSETS === '1';

  if (!shouldBuild && fs.existsSync(bundleJs) && fs.existsSync(bundleCss)) {
    return;
  }

  if (hexo.env?.cmd === 's' || hexo.env?.cmd === 'server') {
    hexo.log.info('Using committed Anatolo assets. Set ANATOLO_BUILD_ASSETS=1 to rebuild them.');
  } else {
    hexo.log.info('Building js...');
    cp.execSync('npm run build', { cwd: themeDir, stdio: 'inherit' });
    hexo.log.info('Build successful!');
  }
};
