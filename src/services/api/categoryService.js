import categoriesData from "@/services/mockData/categories.json";

let categories = [...categoriesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const categoryService = {
  async getAll() {
    await delay(200);
    return [...categories];
  },

  async getById(id) {
    await delay(150);
    return categories.find(category => category.Id === parseInt(id));
  },

  async create(categoryData) {
    await delay(250);
    const newCategory = {
      Id: Math.max(...categories.map(c => c.Id)) + 1,
      ...categoryData
    };
    categories.push(newCategory);
    return newCategory;
  },

  async update(id, categoryData) {
    await delay(200);
    const categoryIndex = categories.findIndex(category => category.Id === parseInt(id));
    if (categoryIndex !== -1) {
      categories[categoryIndex] = {
        ...categories[categoryIndex],
        ...categoryData
      };
      return categories[categoryIndex];
    }
    return null;
  },

  async delete(id) {
    await delay(200);
    const categoryIndex = categories.findIndex(category => category.Id === parseInt(id));
    if (categoryIndex !== -1) {
      const deletedCategory = categories[categoryIndex];
      categories.splice(categoryIndex, 1);
      return deletedCategory;
    }
    return null;
  }
};

export default categoryService;