
   export const useGetLocale = (lang, data) => {
      if (data) {
        const filterData = data.attributes?.localizations?.data.filter(
          (l) => l.attributes?.locale === lang
        );
        return filterData[0]?.attributes || data.attributes;
      }
    };

    export const useGetLocaleSections = (lang, data) => {
      if (data) {
       const filterData = data.attributes?.localizations?.data.filter(l=> l.attributes.locale === lang);
          return filterData[0]?.attributes  || data.attributes;
        }
    };
