import StoreModule from "../module";

class Language extends StoreModule {
    initState() {
        return {
            isLanguage: true,
        }
      }
      
      toggleLanguage() {
        this.setState({
          ...this.getState(),
          isLanguage: !this.getState().isLanguage,
        });
      }
    


}

export default Language