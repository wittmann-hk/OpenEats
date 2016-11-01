
export var serverURLs = {
  auth_token: '/api/v1/accounts/obtain-auth-token/',
  browse: '/api/v1/recipe/recipes/?format=json&fields=id,title,pub_date,rating,photo_thumbnail',
  //create: '/api/v1/recipe/recipes/',
  cuisine: '/api/v1/recipe_groups/cuisine/?format=json',
  course: '/api/v1/recipe_groups/course/?format=json',
  tag: '/api/v1/recipe_groups/tag/?format=json',
  ingredient: '/api/v1/ingredient/ingredient/?format=json',
  news: '/api/v1/news/entry/?format=json',
  recipe: '/api/v1/recipe/recipes/',
};


export var measurements = [
  'tablespoon',
  'teaspoon',
  'cup',
  'pint',
  'gallon',
  'gram',
  'kilogram',
];


// http://www.bbc.co.uk/food/ingredients/by/letter/b
export var ingredient = [
  '',
];
