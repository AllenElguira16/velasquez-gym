
export const today = new Date().toISOString().split('T')[0];

export const membershipExpiryDate = new Date(new Date().setDate((new Date()).getDate() + 30)).toISOString().split('T')[0];
