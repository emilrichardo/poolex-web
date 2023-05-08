

//const locale = "es"
export const useGetLocale =  ( locale,data, text) => {
    if(data){
        const filterData =   data.attributes.localizations.data.filter(
            (l) => l.attributes.locale === locale
          );
          const response = computed(() => {
            if (
              locale === "en" ||
              filterData.length === 0 ||
              !filterData[0].attributes[text]
            ) {
              return data.attributes[text];
            } else {
              return filterData[0].attributes[text];
            }
          });

          return response;
    }


      };
