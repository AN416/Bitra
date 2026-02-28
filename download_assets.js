const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const assetsDir = path.join(__dirname, 'assets');
const fontsDir = path.join(assetsDir, 'fonts');

// Ensure directories exist
if (!fs.existsSync(fontsDir)) {
    fs.mkdirSync(fontsDir, { recursive: true });
}

// Utility to download a file
function downloadFile(urlStr, destPath, options = {}) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destPath);
        https.get(urlStr, options, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                // Handle redirect
                const redirectUrl = new URL(res.headers.location, urlStr).href;
                return downloadFile(redirectUrl, destPath, options).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`Failed to get '${urlStr}' (${res.statusCode})`));
            }
            res.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(destPath, () => reject(err));
        });
    });
}

// Utility to fetch content as string
function fetchContent(urlStr, options = {}) {
    return new Promise((resolve, reject) => {
        https.get(urlStr, options, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                const redirectUrl = new URL(res.headers.location, urlStr).href;
                return fetchContent(redirectUrl, options).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`Failed to get '${urlStr}' (${res.statusCode})`));
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function main() {
    console.log('Downloading Tailwind CSS...');
    await downloadFile('https://cdn.tailwindcss.com', path.join(assetsDir, 'tailwindcss.js'));

    console.log('Downloading Lucide Icons...');
    await downloadFile('https://unpkg.com/lucide@latest', path.join(assetsDir, 'lucide.js'));

    console.log('Fetching Google Fonts CSS...');
    // Use Chrome User-Agent so we get woff2 links
    const fontCssUrl = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap';
    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
    };

    let cssContent = await fetchContent(fontCssUrl, options);

    // Extract unique font URLs
    const urlRegex = /url\((https:\/\/[^)]+)\)/g;
    let match;
    const fontUrls = new Set();
    while ((match = urlRegex.exec(cssContent)) !== null) {
        fontUrls.add(match[1]);
    }

    console.log(`Found ${fontUrls.size} font files to download.`);

    // Download each font file
    for (const fontUrl of fontUrls) {
        const urlParsed = new url.URL(fontUrl);
        const fileName = path.basename(urlParsed.pathname);
        const destPath = path.join(fontsDir, fileName);

        console.log(`Downloading ${fileName}...`);
        await downloadFile(fontUrl, destPath);

        // Update CSS to point to local file
        cssContent = cssContent.split(fontUrl).join(`./fonts/${fileName}`);
    }

    // Save the local fonts.css
    fs.writeFileSync(path.join(assetsDir, 'fonts.css'), cssContent, 'utf8');
    console.log('Done! All assets downloaded and fonts.css created.');
}

main().catch(console.error);
