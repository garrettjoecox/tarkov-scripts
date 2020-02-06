import { getTradersListRequest, buyFromTraderRequest, sellToTraderRequest } from './api/traders';

export async function getTradersList() {
  const response = await getTradersListRequest();

  return response.data;
}

export async function buyFromTrader(traderId: string, itemId: string) {
  const response = await buyFromTraderRequest({

  });

  return response.data;
}

export async function sellToTrader(traderId: string, itemId: string, amount: number = 1) {
  const response = await sellToTraderRequest({
    data: [{
      Action: 'TradingConfirm',
      type: 'sell_to_trader',
      tid: traderId,
      items: [{
        id: itemId,
        count: amount,
        scheme_id: 0,
      }],
    }],
    tm: 0,
  });

  return response.data;
}
