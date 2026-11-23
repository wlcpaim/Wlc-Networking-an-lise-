export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  image: string;
  sparkline_in_7d?: { price: number[] };
}

export interface Post {
  id: string;
  user_id: string;
  content: string;
  likes_count: number;
  created_at: string;
  profiles?: {
    username: string;
    full_name: string;
    avatar_url: string;
  };
}

export interface PortfolioItem {
  id: string;
  coin_id: string;
  symbol: string;
  amount: number;
  buy_price: number;
}

export interface AIQueryResponse {
  answer: string;
}
