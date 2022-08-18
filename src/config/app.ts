export const isKfb =
  process.env.KFB_APP === 'kfb' || process.env.STORYBOOK_KFB_APP === 'kfb';
export const isSsc =
  process.env.KFB_APP === 'ssc' || process.env.STORYBOOK_KFB_APP === 'ssc';
export const isProd = process.env.NODE_ENV === 'production';
