export const socialLinks: Record<string, string> = (() => {
  let data = process.env.NEXT_PUBLIC_SOCIAL_LINKS || "";

  try {
    data = JSON.parse(data);
  } catch (error) {
    console.error("Failed to parse social links.", data);
  }

  return data || {};
})();
