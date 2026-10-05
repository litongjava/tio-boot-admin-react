const { existsSync } = require('node:fs');
const { spawnSync } = require('node:child_process');
// Subdirectory consumers must not replace their parent repository hooks.
if (existsSync('.git') && process.env.HUSKY !== '0' && !process.env.CI) {
  const result = spawnSync(process.execPath, [require.resolve('husky/lib/bin.js'), 'install'], {
    stdio: 'inherit',
  });
  process.exitCode = result.status || 0;
}
