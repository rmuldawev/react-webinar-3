import StoreModule from "../module";

class AboutProduct extends StoreModule {
    initState() {
        return {
          aboutProduct: null
        }
      }
      
    async loadAboutProduct (id) {
        try {
          const res = await fetch(`api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
          const json = await res.json();
    
          this.setState({
            ...this.getState(),
            aboutProduct: json.result || null,
          }, 'Данные о товаре загружены');
        } catch (error) {
          console.error('Ошибка при загрузке данных о товаре:', error);
        }
      }
    


}

export default AboutProduct