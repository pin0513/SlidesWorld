# Slide References - 投影片相關技能參考庫

此目錄包含 `slide-consult` 和 `slide-maker` 所參考的所有相關技能，方便追蹤和開發。

## 📁 目錄結構

```
slide-references/
├── slide-skills/          # Slide 系列技能
│   ├── slide-export/      # 投影片匯出（HTML → PDF）
│   ├── slide-image/       # AI 圖片生成
│   ├── slide-qa/          # Q&A 問答準備
│   ├── slide-research/    # 內容研究與引用
│   ├── slide-reviewer/    # 投影片審核
│   ├── slide-script/      # 演講逐字稿生成
│   ├── slide-story/       # 數據故事化
│   ├── slide-template/    # 簡報模板選擇
│   └── slide-theme/       # 主題樣式工具
├── mayo-skills/           # MAYO 品牌相關
│   └── mayo-slide-expert/ # MAYO 品牌投影片專家
├── image-generation/      # 圖片生成工具
│   └── Gemini-GenImage/   # Google Gemini AI 生圖
└── other-dependencies/    # 其他依賴（保留）
```

## 🔗 引用關係

### slide-consult 引用：
- slide-template (模板選擇)
- mayo-slide-expert (MAYO 品牌規範)
- slide-research (內容研究)
- slide-image (AI 生圖)
- slide-script (演講稿)
- slide-qa (Q&A 準備)
- slide-reviewer (品質審核)
- slide-story (數據故事)
- slide-theme (主題樣式)

### slide-maker 引用：
- slide-research (內容研究)
- slide-image (圖片生成)
- slide-template (模板)
- slide-theme (主題)
- slide-qa (Q&A)
- slide-reviewer (審核)
- slide-export (匯出)
- Gemini-GenImage (AI 生圖)

## 📊 使用方式

1. **開發時參考**：查看各 skill 的實作方式
2. **依賴追蹤**：了解 slide-consult/slide-maker 的完整依賴鏈
3. **本地修改**：可在此目錄修改並測試
4. **同步更新**：修改完成後可同步回全域 ~/.claude/skills/

## ⚠️ 注意事項

- 此目錄為**參考副本**，全域 skills 仍在 `~/.claude/skills/`
- 修改此目錄不會影響全域 skills
- 如需更新全域，需手動同步

---

**建立日期**：2026-02-08
**來源**：~/.claude/skills/
**用途**：slide-consult 和 slide-maker 的依賴參考
