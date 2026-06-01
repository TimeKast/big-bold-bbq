import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'
import { menu } from '../lib/content/menu'

const featuredHomeSummaries: Record<string, string> = {
  Brisket: 'Oak-smoked 15+ hours, low-and-slow.',
  'Signature Smoked Pulled Pork': 'Pit-smoked, hand-pulled, house BBQ sauce.',
  'Baby Back Ribs': 'Hardwood-smoked, sweet-and-tangy glaze.',
  "Chef Dee's Southern Style Mac-N-Cheese": 'Heavy-cream custard, baked golden.',
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  for (const [categoryIndex, category] of menu.entries()) {
    const existingCategory = await payload.find({
      collection: 'menu-categories',
      limit: 1,
      overrideAccess: true,
      req,
      where: {
        slug: {
          equals: category.id,
        },
      },
    })

    const createdCategory =
      existingCategory.docs[0] ??
      (await payload.create({
        collection: 'menu-categories',
        data: {
          title: category.title,
          slug: category.id,
          blurb: category.blurb,
          isVisible: true,
          sortOrder: (categoryIndex + 1) * 10,
        },
        overrideAccess: true,
        req,
      }))

    for (const [itemIndex, item] of category.items.entries()) {
      const slug = toSlug(item.name)
      const existingItem = await payload.find({
        collection: 'menu-items',
        limit: 1,
        overrideAccess: true,
        req,
        where: {
          slug: {
            equals: slug,
          },
        },
      })

      if (existingItem.docs.length) {
        continue
      }

      await payload.create({
        collection: 'menu-items',
        data: {
          name: item.name,
          slug,
          category: createdCategory.id,
          description: item.description,
          tag: item.tag,
          note: item.note,
          variants:
            item.variants?.map((variant) => ({
              name: variant.name,
              description: variant.description,
            })) ?? [],
          isVisible: true,
          showOnHome: item.name in featuredHomeSummaries,
          homeSummary: featuredHomeSummaries[item.name],
          sortOrder: (itemIndex + 1) * 10,
        },
        overrideAccess: true,
        req,
      })
    }
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DELETE FROM "menu_items";
    DELETE FROM "menu_categories";
  `)
}
