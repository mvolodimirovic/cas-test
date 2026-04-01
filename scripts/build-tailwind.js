const fs = require('fs');
const path = require('path');
const { compile } = require('tailwindcss');

const rootDir = path.resolve(__dirname, '..');
const inputFile = path.join(rootDir, 'src/styles/tailwind.css');
const outputFile = path.join(rootDir, 'assets/css/main.css');
const htmlFile = path.join(rootDir, 'index.html');
const tailwindPackageDir = path.dirname(require.resolve('tailwindcss/package.json'));

const extractClasses = (content) => {
  const classes = new Set();
  const classMatches = content.matchAll(/class\s*=\s*"([^"]+)"/g);

  for (const match of classMatches) {
    const tokens = match[1].split(/\s+/).filter(Boolean);

    tokens.forEach((token) => {
      classes.add(token);
    });
  }

  return Array.from(classes);
};

const loadStylesheet = async (id, base) => {
  let filePath = '';

  if (id === 'tailwindcss') {
    filePath = path.join(tailwindPackageDir, 'index.css');
  } else if (id.startsWith('tailwindcss/')) {
    filePath = path.join(tailwindPackageDir, id.replace('tailwindcss/', ''));
  } else {
    filePath = path.resolve(base || rootDir, id);
  }

  return {
    base: path.dirname(filePath),
    content: fs.readFileSync(filePath, 'utf8'),
  };
};

const build = async () => {
  const inputCss = fs.readFileSync(inputFile, 'utf8');
  const html = fs.readFileSync(htmlFile, 'utf8');
  const candidates = extractClasses(html);
  const compiler = await compile(inputCss, {
    from: inputFile,
    loadStylesheet,
  });
  const outputCss = compiler.build(candidates);

  fs.writeFileSync(outputFile, outputCss);
  console.log(`Tailwind CSS compiled successfully → ${path.relative(rootDir, outputFile)}`);
};

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
