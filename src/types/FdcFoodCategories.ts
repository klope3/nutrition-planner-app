export const foodCategories: FoodCategory[] = [
  {
    categoryName: "Fruits & Vegetables",
    fdcCategories: [
      "Pre-Packaged Fruit & Vegetables",
      "Frozen Vegetables",
      "Vegetables and Vegetable Products",
      "Melons",
      "Lettuce and lettuce salads",
      "Olives, pickles, pickled vegetables",
      "Fried vegetables",
      "Coleslaw, non-lettuce salads",
      "Vegetable dishes",
      "French fries and other fried white potatoes",
      "Mashed potatoes and white potato mixtures",
      "White potatoes, baked or boiled",
      "String beans",
    ],
  },
  {
    categoryName: "Fruits and Fruit Juices",
    fdcCategories: [
      "Fruit & Vegetable Juice, Nectars & Fruit Drinks",
      "Fruits and Fruit Juices",
      "Other fruit juice",
    ],
  },
  {
    categoryName: "Sweets",
    fdcCategories: [
      "Ice Cream & Frozen Yogurt",
      "Ice cream and frozen dairy desserts",
      "Candy",
      "Cakes, Cupcakes, Snack Cakes",
      "Cakes and pies",
      "Cookies & Biscuits",
      "Pudding",
      "Cookies and brownies",
      "Jams, syrups, toppings",
      "Sweets",
      "Croissants, Sweet Rolls, Muffins & Other Pastries",
    ],
  },
  {
    categoryName: "Snacks",
    fdcCategories: [
      "Nut and Seed Products",
      "Chips, Pretzels & Snacks",
      "Snacks",
      "Wholesome Snacks",
      "Potato chips",
    ],
  },
  {
    categoryName: "Soda",
    fdcCategories: ["Soda"],
  },
  {
    categoryName: "Grains",
    fdcCategories: [
      "Processed Cereal Products",
      "Bagels and English muffins",
      "Breakfast Cereals",
      "Baked Products",
      "Rolls and buns",
      "Biscuits, muffins, quick breads",
      "Ready-to-eat cereal, higher sugar (>21.2g/100g)",
      "Yeast breads",
      "Cereal Grains and Pasta",
      "Cereal",
      "Ready-to-eat cereal, lower sugar (=<21.2g/100g)",
      "Breads & Buns",
      "Rice",
      "Rice mixed dishes",
      "Crackers, excludes saltines",
      "Tortilla, corn, other chips",
      "Nachos",
      "Grits and other cooked cereals",
      "Pasta mixed dishes, excludes macaroni and cheese",
      "Pizza",
      "Pizza Mixes & Other Dry Dinners",
    ],
  },
  {
    categoryName: "Fats & Oils",
    fdcCategories: ["Fats and Oils"],
  },
  {
    categoryName: "Milk Substitutes",
    fdcCategories: ["Milk substitutes"],
  },
  {
    categoryName: "Proteins",
    fdcCategories: [
      "Poultry mixed dishes",
      "Seafood mixed dishes",
      "Canned Meat",
      "Poultry, Chicken & Turkey",
      "Pepperoni, Salami & Cold Cuts",
      "Chicken, whole pieces",
      "Poultry mixed dishes",
      "Other Meats",
      "Sausages, Hotdogs & Brats",
      "Meat mixed dishes",
      "Sausages and Luncheon Meats",
      "Ground beef",
      "Beef Products",
      "Beef, excludes ground",
      "Other Deli",
      "Pork Products",
      "Pork",
      "Finfish and Shellfish Products",
      "Seafood mixed dishes",
      "Fish",
      "Frozen Fish & Seafood",
      "Fish & Seafood",
      "Eggs & Egg Substitutes",
      "Dairy and Egg Products",
      "Eggs and omelets",
      "Egg/breakfast sandwiches",
      "Egg rolls, dumplings, sushi",
      "Legumes and Legume Products",
      "Vegetable and Lentil Mixes",
      "Canned & Bottled Beans",
      "Beans, peas, legumes",
      "Legumes and Legume Products",
      "Bean, pea, legume dishes",
      "Processed soy products",
    ],
  },
  {
    categoryName: "Wine",
    fdcCategories: ["Wine"],
  },
  {
    categoryName: "Dairy",
    fdcCategories: [
      "Milk",
      "Cream",
      "Cheese",
      "Butter & Spread",
      "Yogurt",
      "Yogurt, regular",
      "Yogurt, Greek",
    ],
  },
  {
    categoryName: "Seasonings & Condiments",
    fdcCategories: [
      "Seasoning Mixes, Salts, Marinades & Tenderizers",
      "Soy-based condiments",
      "Salad dressings and vegetable oils",
      "Dips, gravies, other sauces",
    ],
  },
];

export type FoodCategoryName =
  | "Fruits & Vegetables"
  | "Fruits and Fruit Juices"
  | "Sweets"
  | "Snacks"
  | "Soda"
  | "Grains"
  | "Fats & Oils"
  | "Milk Substitutes"
  | "Proteins"
  | "Wine"
  | "Dairy"
  | "Seasonings & Condiments";

type FoodCategory = {
  categoryName: FoodCategoryName;
  fdcCategories: FdcFoodCategory[];
};

//The FDC database uses a LARGE number of categories that are not documented anywhere. This is not an exhaustive catalog, but it's a start.
export type FdcFoodCategory =
  | "Pre-Packaged Fruit & Vegetables"
  | "Frozen Vegetables"
  | "Vegetables and Vegetable Products"
  | "Melons"
  | "Lettuce and lettuce salads"
  | "Olives, pickles, pickled vegetables"
  | "Fried vegetables"
  | "Coleslaw, non-lettuce salads"
  | "Vegetable dishes"
  | "French fries and other fried white potatoes"
  | "Mashed potatoes and white potato mixtures"
  | "White potatoes, baked or boiled"
  | "String beans"
  | "Fruits and Fruit Juices"
  | "Other fruit juice"
  | "Fruit & Vegetable Juice, Nectars & Fruit Drinks"
  | "Nut and Seed Products"
  | "Chips, Pretzels & Snacks"
  | "Snacks"
  | "Wholesome Snacks"
  | "Potato chips"
  | "Soda"
  | "Ice Cream & Frozen Yogurt"
  | "Candy"
  | "Cakes, Cupcakes, Snack Cakes"
  | "Cakes and pies"
  | "Cookies & Biscuits"
  | "Pudding"
  | "Ice cream and frozen dairy desserts"
  | "Cookies and brownies"
  | "Jams, syrups, toppings"
  | "Sweets"
  | "Croissants, Sweet Rolls, Muffins & Other Pastries"
  | "Processed Cereal Products"
  | "Bagels and English muffins"
  | "Breakfast Cereals"
  | "Baked Products"
  | "Rolls and buns"
  | "Biscuits, muffins, quick breads"
  | "Ready-to-eat cereal, higher sugar (>21.2g/100g)"
  | "Yeast breads"
  | "Cereal Grains and Pasta"
  | "Cereal"
  | "Ready-to-eat cereal, lower sugar (=<21.2g/100g)"
  | "Breads & Buns"
  | "Rice"
  | "Rice mixed dishes"
  | "Crackers, excludes saltines"
  | "Tortilla, corn, other chips"
  | "Nachos"
  | "Grits and other cooked cereals"
  | "Pasta mixed dishes, excludes macaroni and cheese"
  | "Pizza"
  | "Pizza Mixes & Other Dry Dinners"
  | "Fats and Oils"
  | "Milk substitutes"
  | "Poultry mixed dishes"
  | "Seafood mixed dishes"
  | "Canned Meat"
  | "Poultry, Chicken & Turkey"
  | "Pepperoni, Salami & Cold Cuts"
  | "Chicken, whole pieces"
  | "Poultry mixed dishes"
  | "Other Meats"
  | "Sausages, Hotdogs & Brats"
  | "Meat mixed dishes"
  | "Sausages and Luncheon Meats"
  | "Ground beef"
  | "Beef Products"
  | "Beef, excludes ground"
  | "Other Deli"
  | "Pork Products"
  | "Pork"
  | "Finfish and Shellfish Products"
  | "Seafood mixed dishes"
  | "Fish"
  | "Frozen Fish & Seafood"
  | "Fish & Seafood"
  | "Eggs & Egg Substitutes"
  | "Dairy and Egg Products"
  | "Eggs and omelets"
  | "Egg/breakfast sandwiches"
  | "Egg rolls, dumplings, sushi"
  | "Legumes and Legume Products"
  | "Vegetable and Lentil Mixes"
  | "Canned & Bottled Beans"
  | "Beans, peas, legumes"
  | "Legumes and Legume Products"
  | "Bean, pea, legume dishes"
  | "Processed soy products"
  | "Wine"

  // | "Canned Soup"
  | "Seasoning Mixes, Salts, Marinades & Tenderizers"
  | "Soy-based condiments"
  | "Salad dressings and vegetable oils"
  | "Dips, gravies, other sauces"

  // | "Entrees, Sides & Small Meals"
  // | "Stir-fry and soy-based sauce mixtures"
  // | "Soups, Sauces, and Gravies"
  | "Milk"
  | "Cream"
  | "Cheese"
  | "Butter & Spread"
  | "Yogurt"
  | "Yogurt, regular"
  | "Yogurt, Greek";
