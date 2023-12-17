import { convertCategories,modifiedCategories } from "../../utils";
import StoreModule from "../module";

class Categories extends StoreModule {
  initState() {
    return {
      categories: []
    };
  }

  fetchCategories = async () => {
    try {
      const response = await fetch(
        "/api/v1/categories?fields=_id,title,parent(_id)&limit=*"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();
      const converted = convertCategories([
        ...data.result.items,
      ]);
      const categories = modifiedCategories(converted);

      this.setState({
        categories: [{title:"Все" , value: 'All'},...categories]
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };
}

export default Categories;

