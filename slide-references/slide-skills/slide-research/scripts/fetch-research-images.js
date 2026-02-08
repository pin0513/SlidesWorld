#!/usr/bin/env node
/**
 * 研究素材圖片搜集腳本
 * 在研究階段搜集相關圖片素材，支援多種權威來源
 *
 * 來源分類：
 * 1. 開放授權：Wikimedia Commons, Wikipedia
 * 2. 新聞來源：世界前 20 大新聞網站
 * 3. 搜尋引擎：Google Image Search（僅供參考位置）
 *
 * 用法: node fetch-research-images.js <search_term> <output_dir> [--source=all|news|wiki|google]
 * 範例: node fetch-research-images.js "Tai Tzu-ying badminton" ./research/images --source=all
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// 世界前 20 大新聞網站配置
const NEWS_SOURCES = {
  // 美國
  cnn: {
    name: 'CNN',
    country: 'US',
    searchUrl: (term) => `https://edition.cnn.com/search?q=${encodeURIComponent(term)}&size=10&type=article`,
    resultSelector: '.container__link, .card',
    imageSelector: ['img.image__dam-img', 'img[data-src]', '.image__picture img'],
    license: '新聞用途，需標註 CNN'
  },
  nytimes: {
    name: 'New York Times',
    country: 'US',
    searchUrl: (term) => `https://www.nytimes.com/search?query=${encodeURIComponent(term)}`,
    resultSelector: '[data-testid="search-result"] a, .css-1l4w6pd a',
    imageSelector: ['picture img', 'img[srcset]', '.css-79elbk img'],
    license: '新聞用途，需標註 NYT'
  },
  washingtonpost: {
    name: 'Washington Post',
    country: 'US',
    searchUrl: (term) => `https://www.washingtonpost.com/search/?query=${encodeURIComponent(term)}`,
    resultSelector: '.article-link, [data-feature="search-results"] a',
    imageSelector: ['picture img', 'img[data-hi-res-src]', '.img-wrap img'],
    license: '新聞用途，需標註 Washington Post'
  },
  apnews: {
    name: 'AP News',
    country: 'US',
    searchUrl: (term) => `https://apnews.com/search?q=${encodeURIComponent(term)}`,
    resultSelector: '.SearchResultsModule-results a, .PagePromo-title a',
    imageSelector: ['picture img', 'img[srcset]', '.Image img'],
    license: '新聞用途，需標註 AP'
  },
  usatoday: {
    name: 'USA Today',
    country: 'US',
    searchUrl: (term) => `https://www.usatoday.com/search/?q=${encodeURIComponent(term)}`,
    resultSelector: '.gnt_se_a, .search-result-item a',
    imageSelector: ['picture img', 'img[srcset]', '.gnt_ar_i img'],
    license: '新聞用途，需標註 USA Today'
  },

  // 英國
  bbc: {
    name: 'BBC',
    country: 'UK',
    searchUrl: (term) => `https://www.bbc.co.uk/search?q=${encodeURIComponent(term)}`,
    resultSelector: '[data-testid="search-result-item"] a, .ssrcss-1020bd1-Stack a',
    imageSelector: ['img[srcset]', 'img.ssrcss-evoj7m-Image', 'picture img'],
    license: '新聞用途，需標註 BBC'
  },
  guardian: {
    name: 'The Guardian',
    country: 'UK',
    searchUrl: (term) => `https://www.theguardian.com/search?q=${encodeURIComponent(term)}`,
    resultSelector: '.fc-item__link, .u-faux-block-link__overlay',
    imageSelector: ['picture img', 'img.dcr-evn1e9'],
    license: '新聞用途，需標註 The Guardian'
  },
  dailymail: {
    name: 'Daily Mail',
    country: 'UK',
    searchUrl: (term) => `https://www.dailymail.co.uk/home/search.html?s=&authornamef=&sel=site&searchPhrase=${encodeURIComponent(term)}`,
    resultSelector: '.sch-result a, .article a',
    imageSelector: ['img.blkBorder', 'picture img', '.mol-img img'],
    license: '新聞用途，需標註 Daily Mail'
  },
  telegraph: {
    name: 'The Telegraph',
    country: 'UK',
    searchUrl: (term) => `https://www.telegraph.co.uk/search/?q=${encodeURIComponent(term)}`,
    resultSelector: '.search-result__link, article a',
    imageSelector: ['picture img', 'img[srcset]', '.article-image img'],
    license: '新聞用途，需標註 Telegraph'
  },

  // 國際通訊社
  reuters: {
    name: 'Reuters',
    country: 'International',
    searchUrl: (term) => `https://www.reuters.com/site-search/?query=${encodeURIComponent(term)}`,
    resultSelector: '[data-testid="MediaStoryCard"] a, .search-result-content a',
    imageSelector: ['img[srcset]', 'picture img', '.media-story-card__image img'],
    license: '新聞用途，需標註 Reuters'
  },
  afp: {
    name: 'AFP',
    country: 'International',
    searchUrl: (term) => `https://www.afp.com/en/search/results/${encodeURIComponent(term)}`,
    resultSelector: '.node-title a, .field-title a',
    imageSelector: ['picture img', 'img[srcset]', '.field-image img'],
    license: '新聞用途，需標註 AFP'
  },

  // 其他地區
  aljazeera: {
    name: 'Al Jazeera',
    country: 'Qatar',
    searchUrl: (term) => `https://www.aljazeera.com/search/${encodeURIComponent(term)}`,
    resultSelector: '.gc__content a, .search-result__link',
    imageSelector: ['picture img', 'img[srcset]', '.gc__image img'],
    license: '新聞用途，需標註 Al Jazeera'
  },
  dw: {
    name: 'Deutsche Welle',
    country: 'Germany',
    searchUrl: (term) => `https://www.dw.com/search/?searchNavigationId=9097&item=${encodeURIComponent(term)}`,
    resultSelector: '.searchResult a, .news-list a',
    imageSelector: ['picture img', 'img[srcset]', '.teaser-img img'],
    license: '新聞用途，需標註 DW'
  },
  france24: {
    name: 'France 24',
    country: 'France',
    searchUrl: (term) => `https://www.france24.com/en/search/?q=${encodeURIComponent(term)}`,
    resultSelector: '.m-item-search a, .article-link',
    imageSelector: ['picture img', 'img[srcset]', '.m-item-search__img img'],
    license: '新聞用途，需標註 France24'
  },
  scmp: {
    name: 'South China Morning Post',
    country: 'Hong Kong',
    searchUrl: (term) => `https://www.scmp.com/search/${encodeURIComponent(term)}`,
    resultSelector: '.search-result a, .article-link',
    imageSelector: ['picture img', 'img[srcset]', '.article-img img'],
    license: '新聞用途，需標註 SCMP'
  },
  japantimes: {
    name: 'Japan Times',
    country: 'Japan',
    searchUrl: (term) => `https://www.japantimes.co.jp/?s=${encodeURIComponent(term)}`,
    resultSelector: '.article-link a, .post-title a',
    imageSelector: ['picture img', 'img[srcset]', '.post-thumbnail img'],
    license: '新聞用途，需標註 Japan Times'
  },
  abc: {
    name: 'ABC News Australia',
    country: 'Australia',
    searchUrl: (term) => `https://search-beta.abc.net.au/#/?query=${encodeURIComponent(term)}`,
    resultSelector: '.Card a, .article-link',
    imageSelector: ['picture img', 'img[srcset]', '.article-image img'],
    license: '新聞用途，需標註 ABC AU'
  },
  globo: {
    name: 'Globo',
    country: 'Brazil',
    searchUrl: (term) => `https://g1.globo.com/busca/?q=${encodeURIComponent(term)}`,
    resultSelector: '.widget--info__text-container a, .feed-post a',
    imageSelector: ['picture img', 'img[srcset]', '.feed-media-wrapper img'],
    license: '新聞用途，需標註 Globo'
  },
  hindustantimes: {
    name: 'Hindustan Times',
    country: 'India',
    searchUrl: (term) => `https://www.hindustantimes.com/search?q=${encodeURIComponent(term)}`,
    resultSelector: '.cartHolder a, .search-result a',
    imageSelector: ['picture img', 'img[srcset]', '.storyCard-img img'],
    license: '新聞用途，需標註 HT'
  }
};

// Wikipedia / Wikimedia 配置
const WIKI_SOURCES = {
  wikimedia: {
    name: 'Wikimedia Commons',
    searchUrl: (term) => `https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(term)}&title=Special:MediaSearch&type=image`,
    resultSelector: '.sdms-search-results a.sdms-image-result, .sdms-search-result__thumbnail',
    imageSelector: ['.fullImageLink a', '.mw-file-element', '#file img', '.fullMedia a'],
    license: 'CC BY-SA (可商用，需標註來源)'
  },
  wikipedia: {
    name: 'Wikipedia',
    searchUrl: (term) => `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(term)}&go=Go`,
    resultSelector: '.mw-search-result-heading a, .mw-search-result a',
    imageSelector: ['.infobox img', '.thumbimage', '.mw-file-element', 'figure img'],
    license: 'CC BY-SA (來自 Wikipedia 條目)'
  }
};

// Google Image Search 配置
const GOOGLE_SOURCES = {
  googleImages: {
    name: 'Google Images',
    searchUrl: (term) => `https://www.google.com/search?q=${encodeURIComponent(term)}&tbm=isch`,
    resultSelector: 'a[jsname]',
    imageSelector: ['img[data-src]', 'img[src*="encrypted"]', 'img.rg_i'],
    license: '⚠️ 僅供參考位置，使用需確認版權'
  }
};

// 預設來源群組
const SOURCE_GROUPS = {
  wiki: Object.keys(WIKI_SOURCES),
  news: Object.keys(NEWS_SOURCES),
  google: Object.keys(GOOGLE_SOURCES),
  // 精選新聞來源（避免太慢）
  'news-quick': ['reuters', 'bbc', 'cnn', 'guardian', 'apnews'],
  // 全部來源
  all: [...Object.keys(WIKI_SOURCES), ...Object.keys(NEWS_SOURCES), ...Object.keys(GOOGLE_SOURCES)]
};

// 合併所有來源
const ALL_SOURCES = { ...WIKI_SOURCES, ...NEWS_SOURCES, ...GOOGLE_SOURCES };

class ResearchImageFetcher {
  constructor(options = {}) {
    this.browser = null;
    this.context = null;
    this.verbose = options.verbose || false;
    this.maxImagesPerSource = options.maxImagesPerSource || 2;
  }

  async init() {
    this.browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.context = await this.browser.newContext({
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
      viewport: { width: 1920, height: 1080 }
    });
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  log(msg) {
    if (this.verbose) console.log(msg);
  }

  async fetchFromSource(searchTerm, sourceKey, outputDir) {
    const config = ALL_SOURCES[sourceKey];
    if (!config) {
      console.error(`❌ 不支援的來源: ${sourceKey}`);
      return [];
    }

    console.log(`\n🔍 [${config.name}] 搜尋: ${searchTerm}`);
    const page = await this.context.newPage();
    const results = [];

    try {
      const searchUrl = config.searchUrl(searchTerm);
      this.log(`   URL: ${searchUrl}`);

      await page.goto(searchUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });

      await page.waitForTimeout(2500);

      const resultLinks = await page.$$(config.resultSelector);
      this.log(`   找到 ${resultLinks.length} 個結果`);

      if (resultLinks.length === 0) {
        console.log(`   ⚠️ 沒有找到結果`);
        await page.close();
        return [];
      }

      const maxImages = Math.min(this.maxImagesPerSource, resultLinks.length);

      for (let i = 0; i < maxImages; i++) {
        try {
          const links = await page.$$(config.resultSelector);
          if (i >= links.length) break;

          const href = await links[i].getAttribute('href');
          if (!href) continue;

          const fullUrl = href.startsWith('http') ? href : new URL(href, page.url()).href;
          this.log(`   前往: ${fullUrl}`);

          const articlePage = await this.context.newPage();
          await articlePage.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
          await articlePage.waitForTimeout(1500);

          let imageUrl = null;
          for (const selector of config.imageSelector) {
            const img = await articlePage.$(selector);
            if (img) {
              imageUrl = await img.getAttribute('src') || await img.getAttribute('href');
              if (imageUrl && imageUrl.startsWith('//')) {
                imageUrl = 'https:' + imageUrl;
              }
              if (imageUrl && !imageUrl.startsWith('http')) {
                imageUrl = new URL(imageUrl, articlePage.url()).href;
              }
              if (imageUrl && imageUrl.includes('data:')) {
                imageUrl = null;
                continue;
              }
              // 過濾太小的圖片
              if (imageUrl && (imageUrl.includes('1x1') || imageUrl.includes('pixel'))) {
                imageUrl = null;
                continue;
              }
              if (imageUrl) break;
            }
          }

          if (imageUrl) {
            const ext = this.getExtension(imageUrl);
            const filename = `${sourceKey}-${searchTerm.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${i + 1}${ext}`;
            const outputPath = path.join(outputDir, filename);

            const downloaded = await this.downloadImage(articlePage, imageUrl, outputPath);
            if (downloaded) {
              results.push({
                source: config.name,
                sourceKey,
                searchTerm,
                imageUrl,
                localPath: outputPath,
                license: config.license,
                articleUrl: fullUrl,
                country: config.country || 'N/A'
              });
              console.log(`   ✅ 已儲存: ${filename}`);
            }
          }

          await articlePage.close();
        } catch (err) {
          this.log(`   ⚠️ 抓取第 ${i + 1} 張時發生錯誤: ${err.message}`);
        }
      }

    } catch (error) {
      console.error(`   ❌ 錯誤: ${error.message}`);
    } finally {
      await page.close();
    }

    return results;
  }

  getExtension(url) {
    const match = url.match(/\.(jpg|jpeg|png|gif|webp)/i);
    return match ? `.${match[1].toLowerCase()}` : '.jpg';
  }

  async downloadImage(page, imageUrl, outputPath) {
    try {
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const response = await page.evaluate(async (url) => {
        const res = await fetch(url);
        const buffer = await res.arrayBuffer();
        return Array.from(new Uint8Array(buffer));
      }, imageUrl);

      fs.writeFileSync(outputPath, Buffer.from(response));
      return true;
    } catch (err) {
      this.log(`   下載失敗: ${err.message}`);

      try {
        const imgPage = await this.context.newPage();
        const response = await imgPage.goto(imageUrl, { waitUntil: 'load', timeout: 15000 });
        if (response) {
          const buffer = await response.body();
          fs.writeFileSync(outputPath, buffer);
          await imgPage.close();
          return true;
        }
        await imgPage.close();
      } catch (e) {
        this.log(`   備用下載也失敗: ${e.message}`);
      }
      return false;
    }
  }

  async fetchByGroup(searchTerm, outputDir, groupName = 'news-quick') {
    const sourceKeys = SOURCE_GROUPS[groupName] || [groupName];
    const allResults = [];

    for (const key of sourceKeys) {
      const results = await this.fetchFromSource(searchTerm, key, outputDir);
      allResults.push(...results);
    }

    return allResults;
  }

  async fetchMultiple(searchTerms, outputDir, groupName = 'news-quick') {
    const allResults = [];

    for (const term of searchTerms) {
      const results = await this.fetchByGroup(term, outputDir, groupName);
      allResults.push(...results);
    }

    return allResults;
  }
}

// 產生素材報告
function generateReport(results, outputDir, searchTerms) {
  if (results.length === 0) {
    console.log('\n📋 沒有找到任何圖片');
    return;
  }

  const reportPath = path.join(outputDir, 'research-images-report.md');
  const lines = [
    '# 研究素材圖片報告',
    '',
    `生成時間: ${new Date().toISOString()}`,
    `搜尋詞: ${searchTerms.join(', ')}`,
    '',
    '## 已下載圖片',
    '',
    '| # | 來源 | 國家 | 檔案 | 授權 | 原始文章 |',
    '|---|------|------|------|------|----------|'
  ];

  results.forEach((r, i) => {
    const filename = path.basename(r.localPath);
    lines.push(`| ${i + 1} | ${r.source} | ${r.country} | ${filename} | ${r.license} | [連結](${r.articleUrl}) |`);
  });

  lines.push('', '## 來源分類統計', '');

  // 統計各來源數量
  const sourceStats = {};
  results.forEach(r => {
    sourceStats[r.source] = (sourceStats[r.source] || 0) + 1;
  });
  Object.entries(sourceStats).forEach(([source, count]) => {
    lines.push(`- ${source}: ${count} 張`);
  });

  lines.push('', '## 使用注意事項', '');
  lines.push('### 開放授權');
  lines.push('- Wikimedia Commons / Wikipedia 圖片通常可自由使用，但需標註來源和授權');
  lines.push('');
  lines.push('### 新聞用途');
  lines.push('- 新聞網站圖片僅供教育/報導用途');
  lines.push('- 商用需取得各新聞機構授權');
  lines.push('- 務必標註圖片來源');
  lines.push('');
  lines.push('### Google 搜尋');
  lines.push('- Google 搜尋結果僅供參考位置');
  lines.push('- 實際使用需追溯原始來源確認版權');
  lines.push('');
  lines.push('---');
  lines.push('*此報告由 slide-research 圖片搜集腳本自動生成*');

  fs.writeFileSync(reportPath, lines.join('\n'));
  console.log(`\n📋 報告已儲存: ${reportPath}`);
}

// CLI 執行
async function main() {
  const args = process.argv.slice(2);

  let searchTerms = [];
  let outputDir = './research/images';
  let sourceGroup = 'news-quick';

  for (const arg of args) {
    if (arg.startsWith('--source=')) {
      sourceGroup = arg.split('=')[1];
    } else if (arg.startsWith('--output=')) {
      outputDir = arg.split('=')[1];
    } else if (arg.startsWith('--max=')) {
      // 可擴展用
    } else if (!arg.startsWith('--')) {
      searchTerms.push(arg);
    }
  }

  if (searchTerms.length === 0) {
    console.log(`
📷 研究素材圖片搜集工具 (slide-research)

用法: node fetch-research-images.js <搜尋詞...> [選項]

選項:
  --source=<群組>    指定來源群組
                     可用群組:
                       wiki        - Wikimedia Commons + Wikipedia
                       news        - 世界前 20 大新聞網站
                       news-quick  - 精選 5 大新聞來源（預設，較快）
                       google      - Google Image Search
                       all         - 所有來源
                     或指定單一來源: reuters, bbc, cnn, wikimedia, etc.

  --output=<目錄>    指定輸出目錄（預設: ./research/images）

可用的新聞來源 (${Object.keys(NEWS_SOURCES).length} 個):
  ${Object.keys(NEWS_SOURCES).join(', ')}

可用的 Wiki 來源:
  ${Object.keys(WIKI_SOURCES).join(', ')}

範例:
  node fetch-research-images.js "Tai Tzu-ying" --source=wiki
  node fetch-research-images.js "Lin Dan badminton" "Lee Chong Wei" --source=news-quick
  node fetch-research-images.js "羽球" --source=all --output=./images
`);
    process.exit(1);
  }

  console.log('🚀 開始搜集研究素材圖片...');
  console.log(`   搜尋詞: ${searchTerms.join(', ')}`);
  console.log(`   輸出目錄: ${outputDir}`);
  console.log(`   來源群組: ${sourceGroup}`);

  const fetcher = new ResearchImageFetcher({ verbose: true });

  try {
    await fetcher.init();
    const results = await fetcher.fetchMultiple(searchTerms, outputDir, sourceGroup);
    generateReport(results, outputDir, searchTerms);

    console.log(`\n✅ 完成！共抓取 ${results.length} 張圖片`);
  } catch (err) {
    console.error(`❌ 發生錯誤: ${err.message}`);
    process.exit(1);
  } finally {
    await fetcher.close();
  }
}

if (require.main === module) {
  main();
}

module.exports = { ResearchImageFetcher, ALL_SOURCES, SOURCE_GROUPS };
