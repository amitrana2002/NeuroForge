export const isOwner = (id: number) => {
  const ownerId = process.env.TELEGRAM_OWNER_ID;
  if (!ownerId) {
    console.warn("TELEGRAM_OWNER_ID is not set!");
    return false;
  }
  return String(id) === ownerId.trim();
};
