import type { Access, Where } from "payload";

export const isAuthenticated: Access = ({ req: { user } }) => Boolean(user);

export const isPublishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) {
    return true;
  }

  const publishedWhere: Where = {
    and: [
      {
        _status: {
          equals: "published",
        },
      },
      {
        publishedAt: {
          less_than_equal: new Date().toISOString(),
        },
      },
    ],
  };

  return publishedWhere;
};

export const canCreateFirstUserOrAuthenticated: Access = async ({ req }) => {
  if (req.user) {
    return true;
  }

  const { totalDocs } = await req.payload.count({
    collection: "users",
    overrideAccess: true,
  });

  return totalDocs === 0;
};
