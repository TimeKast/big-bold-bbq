/**
 * Menu content — single source of truth.
 * Source: client "MENU PAGE COPY" doc (2026-05-30).
 * Consumed by the home MenuPreview (featured subset) and the full /menu page.
 *
 * No prices — catering is custom-quoted. Family names (Jean's, Big Mama's,
 * Faydean's, Chef Roy's) tie back to the About story (the McCullough family).
 */

export type MenuVariant = { name: string; description: string };

export type MenuItem = {
  name: string;
  description: string;
  /** Short eyebrow tag, e.g. "King of Meats", "Award-Winning". */
  tag?: string;
  /** Optional sub-variants (e.g. gumbo styles). */
  variants?: MenuVariant[];
  /** Optional note, e.g. "Also available sandwich-style." */
  note?: string;
};

export type MenuCategory = {
  /** Anchor slug for the sticky jump-link index. */
  id: string;
  title: string;
  blurb?: string;
  items: MenuItem[];
};

export const menuIntro = {
  eyebrow: "The Menu",
  title: "Southern BBQ Catering with a Creole and Cajun Kick",
  body:
    "At Chef Dee's Big Bold BBQ, every dish tells a story rooted in over 100 years of Southern tradition. From slow-smoked meats to bold Creole and Cajun classics, our menu is crafted to bring unforgettable flavor to your event. Whether you are planning a corporate event, wedding, private party, or community gathering, we customize every menu to fit your vision.",
};

export const menuClosing = {
  title: "Ready to Build Your Menu?",
  body:
    "Whether you are planning a wedding, corporate event, backyard gathering, or large celebration, Chef Dee's Big Bold BBQ delivers bold Southern flavor your guests will remember.",
};

export const menu: MenuCategory[] = [
  {
    id: "smoked-meats",
    title: "Smoked Meats Beyond the Brisket",
    items: [
      {
        name: "Brisket",
        tag: "King of Meats",
        description:
          "Our signature oak-smoked brisket is seasoned with a savory house rub and smoked for over 15 hours low-and-slow, creating a rich, smoky, melt-in-your-mouth finish.",
      },
      {
        name: "Baby Back Ribs",
        tag: "3-2-1 Style",
        description:
          "Slow-smoked to tender perfection, coated with our savory spice blend and hardwood smoked for deep flavor, then finished with a sweet and tangy BBQ glaze.",
      },
      {
        name: "Signature Smoked Pulled Pork",
        note: "Also available sandwich-style.",
        description:
          "Slow pit-smoked pulled pork rubbed with our house seasoning blend, hand-pulled and smothered in our signature BBQ sauce.",
      },
      {
        name: "Chef Roy's Cajun Smoked Leg Quarters",
        description:
          "Our signature smoked chicken leg quarters coated in a bold Cajun dry rub and smoked low-and-slow to juicy perfection.",
      },
    ],
  },
  {
    id: "sides",
    title: "Southern Side Fixins",
    items: [
      {
        name: "Chef Dee's 50/51 Potato Salad",
        description:
          "A classic Southern-style potato salad featuring tender diced potatoes, hard-boiled eggs, celery, and pickle relish tossed in our rich and creamy signature dressing.",
      },
      {
        name: "Jean's Cajun Dirty Cabbage",
        description:
          "Tender cabbage and collard greens sautéed with smoked andouille sausage, holy trinity vegetables, and bold Cajun spices for a smoky Southern classic.",
      },
      {
        name: "Big Mama's Bayou BBQ Smoked Baked Beans",
        description:
          "Sweet, smoky, and savory baked beans blended with andouille sausage, smoked pork, Cajun-Creole spices, and holy trinity vegetables, finished with a BBQ glaze and smoked to perfection.",
      },
      {
        name: "Faydean's Creole Dirty Rice",
        description:
          "A true Louisiana staple featuring seasoned pork and chicken, holy trinity vegetables, and bold Creole spices blended into savory rice full of deep Southern flavor.",
      },
      {
        name: "Chef Dee's Southern Style Mac-N-Cheese",
        description:
          "Our rich Southern-style baked macaroni and cheese features a four-cheese heavy cream custard blend baked until creamy, velvety, and golden.",
      },
      {
        name: "Chef Dee's Creole Apple Gala Coleslaw",
        description:
          "Fresh shredded cabbage, crisp Gala apples, and green onions tossed in a bold Creole-spiced dressing with the perfect balance of sweetness and zest.",
      },
    ],
  },
  {
    id: "breads",
    title: "Fresh Breads",
    items: [
      {
        name: "Cinnamon Honey-Butter Cornbread Muffins",
        description:
          "Moist Southern cornbread muffins finished with a cinnamon honey-butter glaze and golden baked crust.",
      },
    ],
  },
  {
    id: "desserts",
    title: "Southern Desserts",
    items: [
      {
        name: "Big Mama's Southern Peach Cobbler",
        description:
          "Slow-baked spiced peaches topped with a caramelized brown sugar lattice crust for a comforting Southern classic.",
      },
      {
        name: "Faydean's Sweet Potato Pudding",
        note: "With vanilla custard sauce.",
        description:
          "A rich Southern-style sweet potato pudding infused with cinnamon and nutmeg, finished with a delicate vanilla custard cream sauce.",
      },
      {
        name: "Chef Dee's Cheesecake Banana Pudding",
        description:
          "A Southern comfort favorite featuring layers of banana cheesecake custard, vanilla wafers, fresh bananas, caramel drizzle, powdered sugar, and optional pecans.",
      },
    ],
  },
  {
    id: "beverages",
    title: "Signature Beverages",
    items: [
      {
        name: "Pineapple Fruit Punch",
        description:
          "A refreshing tropical mocktail made with pineapple juice, fresh citrus, and sparkling ginger ale.",
      },
      {
        name: "Muddy Water",
        description:
          "A Southern-inspired mocktail blending unsweetened tea and sweet lemonade for the perfect refreshing balance.",
      },
    ],
  },
  {
    id: "creole-cajun",
    title: "Creole & Cajun Specialties",
    items: [
      {
        name: "Award-Winning Gumbo",
        tag: "Award-Winning",
        description:
          "Chef Dee's first-place gumbo, offered three soulful ways.",
        variants: [
          {
            name: "Collard Green Gumbo (“Gumbo Z'Herbes”)",
            description:
              "A soulful Bayou classic featuring collard greens, smoked andouille sausage, chicken, holy trinity vegetables, and a rich dark Cajun roux. Shrimp optional.",
          },
          {
            name: "Seafood Gumbo",
            description:
              "A hearty Cajun stew loaded with shrimp, blue crab claws, smoked andouille sausage, okra, and holy trinity vegetables simmered in a deep savory roux.",
          },
          {
            name: "Chicken & Sausage Gumbo",
            description:
              "Tender chicken thigh meat and smoked andouille sausage slow-simmered with holy trinity vegetables in a rich dark Cajun roux. Okra optional.",
          },
        ],
      },
      {
        name: "Jambalaya",
        description:
          "A bold Creole rice dish featuring chicken, smoked andouille sausage, tomatoes, holy trinity vegetables, and signature Creole spices. Shrimp or crawfish optional.",
      },
      {
        name: "Corn Maque Choux",
        description:
          "A colorful Creole corn sauté featuring sweet corn, tomatoes, holy trinity vegetables, and rich Creole seasoning with optional bacon.",
      },
      {
        name: "Chicken & Sausage Creole",
        description:
          "Tender chicken and spicy andouille sausage slow-simmered in a savory tomato-based Creole sauce with holy trinity vegetables.",
      },
      {
        name: "Stuffed Bayou Peppers",
        description:
          "Bell pepper halves stuffed with bold Cajun-seasoned boudin meat and rice, topped with Monterey Jack cheese and baked until bubbling.",
      },
      {
        name: "Smoked Half Birds",
        description:
          "Half chickens seasoned with our signature BBQ rub and smoked low-and-slow to perfection. BBQ sauce optional.",
      },
      {
        name: "Texas Style Smoked Sausage",
        note: "“Hot Links”",
        description:
          "A flavorful beef and pork sausage blend seasoned with SPG seasoning and slow-smoked for authentic Texas-style flavor.",
      },
    ],
  },
];

/**
 * Featured items for the home MenuPreview macro tiles (V3–V6) + supporting list.
 * Keys map to the existing macro videos.
 */
export const featuredMenu = {
  brisket: {
    name: "Brisket",
    tag: "King of Meats",
    short: "Oak-smoked 15+ hours, low-and-slow.",
  },
  pulledPork: {
    name: "Signature Smoked Pulled Pork",
    tag: "Pulled by hand",
    short: "Pit-smoked, hand-pulled, house BBQ sauce.",
  },
  ribs: {
    name: "Baby Back Ribs",
    tag: "3-2-1 Style",
    short: "Hardwood-smoked, sweet-and-tangy glaze.",
  },
  mac: {
    name: "Southern Style Mac-N-Cheese",
    tag: "Four-cheese",
    short: "Heavy-cream custard, baked golden.",
  },
} as const;
