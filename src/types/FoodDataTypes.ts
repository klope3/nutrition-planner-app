export type FoodSearchJson = {
  foods: FoodSearchResultData[];
};

export type FoodSearchResultData = {
  description: string;
  fdcId: number;
  dataType: string;
};
