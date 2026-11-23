import { CryptoAsset } from '@/types/crypto';

export async function fetchTopCryptos(): Promise<CryptoAsset[]> {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true',
      { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error('Failed to fetch CoinGecko');
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function fetchBinanceTicker(symbol = 'BTCUSDT') {
  try {
    const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol.toUpperCase()}`);
    if (!res.ok) throw new Error('Binance error');
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
