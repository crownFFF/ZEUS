import Drip from "@/components/Drip"

const About = () => {
  return (
    <>
      <article className="banner">
        <Drip background={"/banner.jpg"} />
        <p style={{ "--p": "1" }} className="splitText">
          以天氣查詢為主題的 Side Project
        </p>
        <p style={{ "--p": "2" }} className="splitText">
          重點在於資料取得策略、效能優化與 UI 架構設計
        </p>
        <p style={{ "--p": "3" }} className="splitText">
          透過實際情境，驗證 Next.js App Router的使用方式。
        </p>
      </article>
      <section>
        <article style={{ "--area": "a" }}>
          <h1>使用技術一覽</h1>
          <p>React</p>
          <ul>
            <li>Component-based UI 架構</li>
            <li>Hooks 管理狀態與邏輯</li>
            <hr />
          </ul>
          <p>Next.js（App Router）</p>
          <ul>
            <li>Server Components / Client Components 分工</li>
            <li>檔案式路由</li>
            <hr />
          </ul>
          <p>SCSS</p>
          <ul>
            <li>快速建立一致的 UI</li>
            <li>架構採用模組化樣式管理</li>
            <li>易於實作 Bento Grid 排版</li>
            <hr />
          </ul>
          <p>RWD</p>
          <ul>
            <li>支援手機、平板、桌機</li>
            <hr />
          </ul>
          <p>Weather API</p>
          <ul>
            <li>即時天氣資料</li>
            <li>天氣預測</li>
            <hr />
          </ul>
          <p>Fetch / SWR</p>
          <ul>
            <li>Client 端資料同步</li>
            <li>減少重複請求</li>
            <hr />
          </ul>
        </article>
        <article style={{ "--area": "b" }}>
          <h1>資料流設計</h1>
          <p>Server Side</p>
          <ul>
            <li>預設城市天氣</li>
            <li>SEO 友善內容</li>
            <li>更快的首次載入</li>
            <li>降低 Client 負擔</li>
            <hr />
          </ul>
          <p>Client Side</p>
          <ul>
            <li>使用者切換城市</li>
            <li>即時互動更新</li>
            <li>SWR 快取與 revalidate 機制</li>
            <hr />
          </ul>
        </article>
        <article style={{ "--area": "c" }}>
          <h1>UI / UX 設計理念</h1>
          <p>Bento Grid Layout</p>
          <ul>
            <li>首頁採用 Bento Grid 設計</li>
            <li>將不同層級的資訊拆分成獨立卡片</li>
            <li>提高可讀性並維持清楚的視覺節奏</li>
            <hr />
          </ul>
          <p>使用者導向設計</p>
          <ul>
            <li>Home：快速理解網站用途</li>
            <li>Weather：專注查詢與閱讀</li>
            <li>About：清楚呈現專案價值</li>
            <li>Project：展示其他作品</li>
            <hr />
          </ul>
          <p>Shader</p>
          <ul>
            <li>部分區塊使用THREE.js搭配GLSL呈現水滴畫面</li>
          </ul>
        </article>
        <article style={{ "--area": "d" }} className="efficacy">
          <h1>效能與最佳化</h1>
          <ul>
            <li>使用 Next.js 的 Server Rendering</li>
            <li>減少不必要的 Client JS</li>
            <li>API 請求加上快取與 debounce</li>
            <li>避免過度 re-render</li>
            <hr />
          </ul>
        </article>
        <article style={{ "--area": "e" }}>
          <h1>專案學習重點</h1>
          <ul>
            <li>實際理解 Server / Client Component 的差異</li>
            <li>在真實專案中設計資料流</li>
            <hr />
          </ul>
        </article>
      </section>
    </>
  )
}

export default About