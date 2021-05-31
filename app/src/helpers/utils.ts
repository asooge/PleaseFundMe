import web3 from 'web3';

export const weiToEther = (amount: string): string => {
  return web3.utils.fromWei(amount, 'ether');
};

export const etherToWei = (amount: string): string => {
  return web3.utils.toWei(amount, 'ether');
};

export const timestampToCalendar = (timestamp: string): string => {
  return new Date(parseInt(timestamp) * 1000).toISOString().slice(0, 10);
};

export const timestampToDateString = (timestamp: string): string => {
  return new Date(parseInt(timestamp) * 1000).toDateString();
}