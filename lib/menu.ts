import type {
  Media,
  MenuCategory as PayloadMenuCategory,
  MenuItem as PayloadMenuItem,
} from "@/payload-types";
import { menu as fallbackMenu } from "@/lib/content/menu";
import { getPayloadClient } from "@/lib/payload";

type RelationValue<T extends { id: number | string }> = T | number | string | null | undefined;

type MenuImage = {
  alt: string;
  url: string;
};

export type MenuVariantDisplay = {
  description: string;
  name: string;
};

export type MenuItemDisplay = {
  description: string;
  homeSummary?: string;
  id: string;
  image: MenuImage | null;
  name: string;
  note?: string;
  showOnHome: boolean;
  tag?: string;
  variants: MenuVariantDisplay[];
};

export type MenuCategoryDisplay = {
  blurb?: string;
  id: string;
  items: MenuItemDisplay[];
  title: string;
};

export type MenuPageData = {
  categories: MenuCategoryDisplay[];
  source: "cms" | "fallback";
};

export type MenuPreviewListItem = {
  name: string;
  note: string;
};

export type MenuPreviewData = {
  featuredItems: MenuItemDisplay[];
  listItems: MenuPreviewListItem[];
  source: "cms" | "fallback";
};

type MenuItemWithRelations = PayloadMenuItem & {
  category?: PayloadMenuCategory | number | string;
  image?: Media | number | string;
};

function getRelationDoc<T extends { id: number | string }>(value: RelationValue<T>) {
  if (typeof value === "object" && value !== null && "id" in value) {
    return value;
  }

  return null;
}

function getMediaUrl(media: Media | null | undefined, size?: "card" | "hero" | "thumbnail") {
  if (!media) {
    return null;
  }

  if (size && media.sizes?.[size]?.url) {
    return media.sizes[size].url;
  }

  return media.url ?? null;
}

function getMenuImage(value: RelationValue<Media>): MenuImage | null {
  const media = getRelationDoc<Media>(value);
  const url = getMediaUrl(media, "card") ?? getMediaUrl(media);

  if (!media || !url) {
    return null;
  }

  return {
    alt: media.alt,
    url,
  };
}

function normalizeSort(value: number | null | undefined) {
  return typeof value === "number" ? value : 9999;
}

function fallbackMenuData(): MenuPageData {
  return {
    categories: fallbackMenu.map((category) => ({
      blurb: category.blurb,
      id: category.id,
      items: category.items.map((item) => ({
        description: item.description,
        id: `${category.id}-${item.name}`,
        image: null,
        name: item.name,
        note: item.note,
        showOnHome: false,
        tag: item.tag,
        variants:
          item.variants?.map((variant) => ({
            description: variant.description,
            name: variant.name,
          })) ?? [],
      })),
      title: category.title,
    })),
    source: "fallback",
  };
}

const fallbackPreviewData: MenuPreviewData = {
  featuredItems: [
    {
      description:
        "Our signature oak-smoked brisket is seasoned with a savory house rub and smoked for over 15 hours low-and-slow.",
      homeSummary: "Oak-smoked 15+ hours, low-and-slow.",
      id: "fallback-brisket",
      image: null,
      name: "Brisket",
      showOnHome: true,
      tag: "King of Meats",
      variants: [],
    },
    {
      description:
        "Slow pit-smoked pulled pork rubbed with our house seasoning blend, hand-pulled and smothered in our signature BBQ sauce.",
      homeSummary: "Pit-smoked, hand-pulled, house BBQ sauce.",
      id: "fallback-pulled-pork",
      image: null,
      name: "Signature Smoked Pulled Pork",
      showOnHome: true,
      tag: "Pulled by hand",
      variants: [],
    },
    {
      description:
        "Slow-smoked to tender perfection, coated with our savory spice blend and hardwood smoked for deep flavor.",
      homeSummary: "Hardwood-smoked, sweet-and-tangy glaze.",
      id: "fallback-ribs",
      image: null,
      name: "Baby Back Ribs",
      showOnHome: true,
      tag: "3-2-1 Style",
      variants: [],
    },
    {
      description:
        "Our rich Southern-style baked macaroni and cheese features a four-cheese heavy cream custard blend baked until creamy.",
      homeSummary: "Heavy-cream custard, baked golden.",
      id: "fallback-mac",
      image: null,
      name: "Southern Style Mac-N-Cheese",
      showOnHome: true,
      tag: "Four-cheese",
      variants: [],
    },
  ],
  listItems: [
    {
      name: "Award-Winning Gumbo",
      note: "Collard green, seafood, or chicken & sausage. First place at the Souper Bowl of Caring.",
    },
    {
      name: "Jambalaya",
      note: "Bold Creole rice with chicken, andouille, and the holy trinity. Shrimp or crawfish optional.",
    },
    {
      name: "Faydean's Creole Dirty Rice",
      note: "Seasoned pork and chicken, Creole spice, deep Southern flavor.",
    },
    {
      name: "Jean's Cajun Dirty Cabbage",
      note: "Cabbage and collards with smoked andouille and Cajun spice.",
    },
    {
      name: "Big Mama's Smoked Baked Beans",
      note: "Andouille, smoked pork, Cajun-Creole spice, BBQ glaze.",
    },
    {
      name: "Big Mama's Peach Cobbler",
      note: "Slow-baked spiced peaches under a caramelized lattice crust.",
    },
    {
      name: "Chef Dee's Cheesecake Banana Pudding",
      note: "Banana cheesecake custard, vanilla wafers, caramel drizzle.",
    },
  ],
  source: "fallback",
};

function formatMenuItem(item: MenuItemWithRelations) {
  return {
    description: item.description,
    homeSummary: item.homeSummary || undefined,
    id: String(item.id),
    image: getMenuImage(item.image),
    name: item.name,
    note: item.note || undefined,
    showOnHome: Boolean(item.showOnHome),
    tag: item.tag || undefined,
    variants:
      item.variants
        ?.map((variant) => ({
          description: variant.description || "",
          name: variant.name || "",
        }))
        .filter((variant) => variant.name && variant.description) ?? [],
    _sortOrder: normalizeSort(item.sortOrder),
  };
}

async function getCmsMenuData(): Promise<MenuPageData | null> {
  const payload = await getPayloadClient();
  const [categoriesResult, itemsResult] = await Promise.all([
    payload.find({
      collection: "menu-categories",
      limit: 100,
      overrideAccess: false,
      pagination: false,
      sort: ["sortOrder", "title"],
      where: {
        isVisible: {
          equals: true,
        },
      },
    }),
    payload.find({
      collection: "menu-items",
      depth: 1,
      limit: 300,
      overrideAccess: false,
      pagination: false,
      sort: ["sortOrder", "name"],
      where: {
        isVisible: {
          equals: true,
        },
      },
    }),
  ]);

  const items = itemsResult.docs as MenuItemWithRelations[];
  const categories = categoriesResult.docs
    .map((category) => {
      const categoryItems = items
        .filter((item) => {
          const itemCategory = getRelationDoc<PayloadMenuCategory>(item.category);
          return itemCategory?.id === category.id || item.category === category.id;
        })
        .map((item) => formatMenuItem(item))
        .sort((a, b) => a._sortOrder - b._sortOrder || a.name.localeCompare(b.name))
        .map((item) => ({
          description: item.description,
          homeSummary: item.homeSummary,
          id: item.id,
          image: item.image,
          name: item.name,
          note: item.note,
          showOnHome: item.showOnHome,
          tag: item.tag,
          variants: item.variants,
        }));

      return {
        blurb: category.blurb || undefined,
        id: category.slug,
        items: categoryItems,
        title: category.title,
      };
    })
    .filter((category) => category.items.length > 0);

  if (!categories.length) {
    return null;
  }

  return {
    categories,
    source: "cms",
  };
}

export async function getMenuPageData(): Promise<MenuPageData> {
  try {
    return (await getCmsMenuData()) ?? fallbackMenuData();
  } catch (error) {
    console.error("Failed to load CMS menu data", error);
    return fallbackMenuData();
  }
}

export async function getMenuPreviewData(): Promise<MenuPreviewData> {
  const menuData = await getMenuPageData();

  if (menuData.source !== "cms") {
    return fallbackPreviewData;
  }

  const allItems = menuData.categories.flatMap((category) => category.items);
  const featuredItems = allItems.filter((item) => item.showOnHome).slice(0, 4);

  if (featuredItems.length < 4) {
    return fallbackPreviewData;
  }

  const featuredIds = new Set(featuredItems.map((item) => item.id));
  const listItems = allItems
    .filter((item) => !featuredIds.has(item.id))
    .slice(0, 7)
    .map((item) => ({
      name: item.name,
      note: item.homeSummary || item.description,
    }));

  return {
    featuredItems,
    listItems: listItems.length ? listItems : fallbackPreviewData.listItems,
    source: "cms",
  };
}
