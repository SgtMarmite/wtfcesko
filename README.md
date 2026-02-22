# WTF Česko

**[→ Živá verze](https://sgtmarmite.github.io/wtfcesko/)**

Scrollytelling web o české ekonomice. Grafy, co mluví za vše.

Astro 5, Tailwind CSS v4, Chart.js.

## Spuštění

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
docker compose up app
```

## Testy

```sh
docker compose run tests
```

## Zdroje dat

| Dataset | Zdroj |
|-|-|
| Mzdy | ČSÚ via kurzy.cz |
| Inflace/CPI | ČSÚ via inflationtool.com |
| Fertility | World Bank / FRED |
| Státní dluh | MF ČR |
| Obsluha dluhu | MF ČR |
| Důchody | ČSSZ via kurzy.cz |
| Bytová výstavba | ČSÚ/ČNB via kurzy.cz |
| Tax wedge | OECD via Tax Foundation |
| Zdanění práce | Zákon o daních z příjmů, zákon o pojistném |
